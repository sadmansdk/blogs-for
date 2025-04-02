import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPost, getLatestPosts } from "@/lib/firestore";
import { BlogPost as BlogPostType } from "@/types/blog";
import SidebarLatest from "@/components/blog/SidebarLatest";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestPosts, setLatestPosts] = useState<BlogPostType[]>([]);

  // Scroll to top when component mounts or when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error("No post ID provided");
        }

        const [fetchedPost, fetchedLatestPosts] = await Promise.all([
          getBlogPost(id),
          getLatestPosts(3)
        ]);

        setPost(fetchedPost);
        setLatestPosts(fetchedLatestPosts);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blog-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
          <Link 
            to="/" 
            className="inline-block bg-blog-primary text-white px-6 py-2 rounded-md hover:bg-blog-secondary transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="p-6 md:p-8">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold category-badge ${post.category.toLowerCase()}`}>
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              {/* Meta Information */}
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-4 flex items-center justify-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {post.author.name}
                </span>
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Excerpt */}
              <div className="text-xl text-gray-600 mb-8">
                {post.excerpt}
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <SidebarLatest 
            title="Latest Posts" 
            posts={latestPosts} 
            viewAllUrl="/blog"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
