
import { Link } from "react-router-dom";

interface HeroPostProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

const HeroPost = ({ id, title, excerpt, category, date, image }: HeroPostProps) => {
  const categoryClass = `category-badge ${category.toLowerCase()}`;
  
  return (
    <div className="relative h-[500px] bg-blog-dark text-white mb-8">
      <div className="absolute inset-0">
        <img
          src='https://images.unsplash.com/photo-1741620979760-bccef3bb5b17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
          alt={title}
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-10">
        <div className="mb-4">
          <span className={categoryClass}>{category}</span>
        </div>
        <Link to={`/blog/${id}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 hover:text-blog-primary transition-colors">
            {title}
          </h1>
        </Link>
        <div className="flex items-center text-sm text-gray-300 mb-4">
          <span>Blog Tips</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <p className="text-gray-200 max-w-2xl">{excerpt}</p>
      </div>
    </div>
  );
};

export default HeroPost;
