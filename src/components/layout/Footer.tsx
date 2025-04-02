import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, ChevronRight, Home, BookOpen, Users, Phone } from "lucide-react";
import { Element } from 'react-scroll';
import SubscriptionForm from "@/components/SubscriptionForm";

const categories = [
  "Climate Change & Global Warming",
  "Sustainable Living",
  "Renewable Energy",
  "Pollution & Waste Management",
  "Biodiversity & Conservation",
  "Environmental Technology & Innovation",
  "Green Business & Economy",
  "Environmental Laws & Policies",
  "Agriculture & Food Sustainability",
  "Water & Ocean Conservation"
];

const Footer = () => {
  const handleCategoryClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              About Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blog-primary to-transparent"></span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Wanderlust Blogster is your go-to source for environmental news, insights, and sustainable living tips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blog-primary to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li className="group">
                <Link to="/" className="flex items-center text-gray-400 hover:text-blog-primary transition-all duration-300 transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blog-primary" />
                  <span className="flex items-center gap-2 relative overflow-hidden group-hover:font-medium">
                    <Home className="w-4 h-4" />
                    Home
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blog-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link to="/blog" className="flex items-center text-gray-400 hover:text-blog-primary transition-all duration-300 transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blog-primary" />
                  <span className="flex items-center gap-2 relative overflow-hidden group-hover:font-medium">
                    <BookOpen className="w-4 h-4" />
                    Blog
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blog-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link to="/about" className="flex items-center text-gray-400 hover:text-blog-primary transition-all duration-300 transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blog-primary" />
                  <span className="flex items-center gap-2 relative overflow-hidden group-hover:font-medium">
                    <Users className="w-4 h-4" />
                    About Us
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blog-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              </li>
              <li className="group">
                <Link to="/contact" className="flex items-center text-gray-400 hover:text-blog-primary transition-all duration-300 transform hover:translate-x-2">
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blog-primary" />
                  <span className="flex items-center gap-2 relative overflow-hidden group-hover:font-medium">
                    <Phone className="w-4 h-4" />
                    Contact
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blog-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blog-primary to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category} className="group">
                  <Link
                    to={`/categories/${encodeURIComponent(category)}`}
                    className="flex items-center text-gray-400 hover:text-blog-primary transition-all duration-300 transform hover:translate-x-2"
                    onClick={handleCategoryClick}
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blog-primary" />
                    <span className="relative overflow-hidden group-hover:font-medium">
                      {category}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blog-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blog-primary to-transparent"></span>
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest environmental news and updates.
            </p>
            <Element name="news2">
              <SubscriptionForm />
            </Element>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Wanderlust Blogster. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-blog-primary transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blog-primary transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-blog-primary transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-blog-primary transform hover:scale-110 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
