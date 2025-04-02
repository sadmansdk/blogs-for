import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";

interface SidebarLatestProps {
  title: string;
  posts: BlogPost[];
  viewAllUrl: string;
}

const SidebarLatest = ({ title, posts, viewAllUrl }: SidebarLatestProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Link to={viewAllUrl} className="text-sm text-blog-primary hover:text-blog-secondary">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="flex space-x-3 group"
          >
            <div className="flex-shrink-0 w-16 h-16">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium group-hover:text-blog-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <img src={post.author.avatar} alt={post.author.name} className="w-4 h-4 rounded-full" />
                <span className="text-xs text-gray-500">{post.author.name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarLatest;
