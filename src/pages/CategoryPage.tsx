import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import SidebarLatest from "@/components/blog/SidebarLatest";
import { getPostsByCategory, getLatestPosts } from "@/lib/firestore";
import { BlogPost } from "@/types/blog";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching posts for category:", category);
        const [categoryPosts, latest] = await Promise.all([
          getPostsByCategory(category || ""),
          getLatestPosts(5)
        ]);
        console.log("Category posts:", categoryPosts);
        console.log("Latest posts:", latest);
        setPosts(categoryPosts);
        setLatestPosts(latest);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blog-primary"></div>
      </div>
    );
  }
  
  return (
    <main className="flex-grow">
      {/* Category Header */}
      <div className="bg-blog-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{capitalizedCategory}</h1>
          <p className="max-w-2xl mx-auto">
            Explore our latest articles and insights on {capitalizedCategory.toLowerCase()} topics.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="flex space-x-2">
                <button className="bg-white px-4 py-2 rounded border hover:bg-gray-100 transition-colors">
                  Prev
                </button>
                <button className="bg-blog-primary text-white px-4 py-2 rounded border border-blog-primary">
                  1
                </button>
                <button className="bg-white px-4 py-2 rounded border hover:bg-gray-100 transition-colors">
                  2
                </button>
                <button className="bg-white px-4 py-2 rounded border hover:bg-gray-100 transition-colors">
                  3
                </button>
                <button className="bg-white px-4 py-2 rounded border hover:bg-gray-100 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Category Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold mb-4">About {capitalizedCategory}</h3>
              <p className="text-gray-600">
                {capitalizedCategory === "Health" && "Discover articles about wellness, fitness, nutrition, and maintaining a healthy lifestyle."}
                {capitalizedCategory === "Technology" && "Stay updated with the latest trends in tech, gadgets, software, and digital innovation."}
                {capitalizedCategory === "Lifestyle" && "Explore content about living well, relationships, home, fashion, and personal growth."}
                {capitalizedCategory === "Business" && "Read insights about entrepreneurship, marketing, finance, and professional development."}
              </p>
            </div>
            
            {/* Advertisement */}
            {/* <Advertisement className="mb-6" /> */}
            
            {/* Latest Posts */}
            <SidebarLatest 
              title="Latest Posts" 
              posts={latestPosts} 
              viewAllUrl="/blog/latest" 
            />
            
            {/* Subscribe */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-600 mb-4">
                Get the latest {capitalizedCategory.toLowerCase()} updates delivered directly to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-blog-primary hover:bg-blog-secondary text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
