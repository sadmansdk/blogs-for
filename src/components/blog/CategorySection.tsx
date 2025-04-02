import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/types/blog";

interface CategorySectionProps {
  title: string;
  posts: BlogPost[];
  viewAllUrl: string;
}

const CategorySection = ({ title, posts, viewAllUrl }: CategorySectionProps) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link to={viewAllUrl} className="text-sm text-blog-grey hover:text-blog-primary">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
