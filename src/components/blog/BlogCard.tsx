import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { id, title, excerpt, category, createdAt, coverImage, author } = post;
  
  // Get the background color class based on the category
  const getCategoryColorClass = (category: string) => {
    if (category.includes("Climate Change")) return "bg-red-500";
    if (category.includes("Sustainable Living")) return "bg-green-500";
    if (category.includes("Renewable Energy")) return "bg-blue-500";
    if (category.includes("Pollution")) return "bg-yellow-600";
    if (category.includes("Biodiversity")) return "bg-purple-500";
    if (category.includes("Environmental Technology")) return "bg-indigo-500";
    if (category.includes("Green Business")) return "bg-emerald-500";
    if (category.includes("Environmental Laws")) return "bg-cyan-500";
    if (category.includes("Agriculture")) return "bg-orange-500";
    if (category.includes("Water")) return "bg-teal-500";
    return "bg-gray-500"; // default color
  };
  
  return (
    <Link to={`/blog/${id}`} className="group h-full block">
      <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-[420px] flex flex-col transform group-hover:scale-[1.02] relative">
        {/* Image Container with Gradient Overlay */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span 
              className={`px-3 py-1.5 text-xs font-semibold rounded-full text-white backdrop-blur-sm shadow-lg ${getCategoryColorClass(category)} transition-transform duration-300 group-hover:scale-105`}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blog-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
          
          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {excerpt}
          </p>

          {/* Author and Date */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Author Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{author.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Read More Indicator */}
            <div className="text-blog-primary group-hover:translate-x-1 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
