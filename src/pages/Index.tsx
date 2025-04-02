import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";
import SidebarLatest from "@/components/blog/SidebarLatest";
import { getBlogPosts, getLatestPosts } from "@/lib/firestore";
import { BlogPost } from "@/types/blog";
import { Element } from 'react-scroll';
import { Link as ScrollLink } from 'react-scroll';
import TypewriterText from "@/components/ui/TypewriterText";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ChevronRight, Tag, Leaf, Zap, Trash2, Trees, Cpu, Building2, Scale, Wheat, Droplets } from "lucide-react";

const categories = [
  {
    name: "Climate Change & Global Warming",
    icon: Leaf,
    color: "from-red-500/10 to-transparent"
  },
  {
    name: "Sustainable Living",
    icon: Trees,
    color: "from-green-500/10 to-transparent"
  },
  {
    name: "Renewable Energy",
    icon: Zap,
    color: "from-blue-500/10 to-transparent"
  },
  {
    name: "Pollution & Waste Management",
    icon: Trash2,
    color: "from-yellow-600/10 to-transparent"
  },
  {
    name: "Biodiversity & Conservation",
    icon: Trees,
    color: "from-purple-500/10 to-transparent"
  },
  {
    name: "Environmental Technology & Innovation",
    icon: Cpu,
    color: "from-indigo-500/10 to-transparent"
  },
  {
    name: "Green Business & Economy",
    icon: Building2,
    color: "from-emerald-500/10 to-transparent"
  },
  {
    name: "Environmental Laws & Policies",
    icon: Scale,
    color: "from-cyan-500/10 to-transparent"
  },
  {
    name: "Agriculture & Food Sustainability",
    icon: Wheat,
    color: "from-orange-500/10 to-transparent"
  },
  {
    name: "Water & Ocean Conservation",
    icon: Droplets,
    color: "from-teal-500/10 to-transparent"
  }
];

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [allPosts, latest] = await Promise.all([
          getBlogPosts(),
          getLatestPosts(5)
        ]);
        setPosts(allPosts);
        setLatestPosts(latest);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blog-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="relative h-[700px] md:h-[700px] bg-gray-900 mb-12">
        <AnimatedBackground currentIndex={currentTextIndex} />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white max-w-4xl mx-auto">
              <TypewriterText 
                texts={[
                  "Explore, Learn, and Act for the Environment.",
                  "Green Ideas for a Better Tomorrow.",
                  "Protecting Nature, Sustaining the Future."
                ]} 
                className="mb-6 text-3xl md:text-4xl lg:text-5xl h-[150px]"
                onTextChange={setCurrentTextIndex}
              />
              <p className="text-[20px] md:text-xl text-stone-100 mb-8">
                Saving the planet, one step at a time
              </p>
              <div className="mt-2">
                {/* @ts-ignore */}
                <ScrollLink  to="news2" smooth={true} duration={500}
                  className="inline-flex cursor-pointer items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Subscribe to our newsletter
                  {/* @ts-ignore */}
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Element name="latest">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles Grid */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Advertisement */}
            {/* <Advertisement className="mb-6" /> */}

            {/* Latest Posts */}
            <SidebarLatest 
              title="Latest Posts" 
              posts={latestPosts} 
              viewAllUrl="/blog/latest" 
            />

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                <span className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blog-primary" />
                  Categories
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blog-primary to-transparent"></span>
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      to={`/categories/${encodeURIComponent(category.name)}`}
                      className="group block"
                    >
                      <div className="relative p-3 rounded-lg transition-all duration-300 bg-gradient-to-r hover:translate-x-2">
                        <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-500 group-hover:text-blog-primary transition-colors duration-300" />
                          <span className="text-gray-600 group-hover:text-blog-primary transition-colors duration-300 group-hover:font-medium">
                            {category.name}
                          </span>
                          <ChevronRight className="w-4 h-4 text-blog-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-2 group-hover:ml-0" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </Element>
    </main>
  );
};

export default Index;
