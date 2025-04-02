import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "@/lib/firestore";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";

const CategoryPosts = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        const decodedCategory = decodeURIComponent(category || "");
        console.log("Decoded category:", decodedCategory);
        console.log("All posts:", allPosts);
        
        const categoryPosts = allPosts.filter((post) => {
          console.log("Comparing:", post.category, "with", decodedCategory);
          return post.category === decodedCategory;
        });
        
        console.log("Filtered posts:", categoryPosts);
        setPosts(categoryPosts);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blog-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        {decodeURIComponent(category || "")}
      </motion.h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">
          No posts found in this category. Please check if the category name matches exactly.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPosts; 