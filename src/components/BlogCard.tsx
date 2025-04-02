import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/blog/${post.id}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <div className="flex items-center mr-4">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime} min read
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blog-primary transition-colors duration-300">
            {post.title}
          </h2>
          
          <p className="text-gray-600 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.category}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 