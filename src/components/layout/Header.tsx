import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <header className="bg-white shadow">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img 
              src="/envo.png" 
              alt="Wanderlust Blogster Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-bold hover:text-blog-primary">HOME</Link>
            <ScrollLink to="latest" smooth={true} duration={500} className="font-bold hover:text-blog-primary cursor-pointer">BLOG</ScrollLink>
            <ScrollLink className="text-[13px] bg-indigo-600 text-gray-200 font-bold px-2 py-2 rounded-lg hover:text-blog-primary cursor-pointer" to="news2" smooth={true} duration={500}>NEWSLETTER</ScrollLink>
            <div className="search relative">
              <Button variant="ghost" size="icon" className="text-blog-grey">
                <Search size={20} />
              </Button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-bold hover:text-blog-primary" onClick={handleLinkClick}>HOME</Link>
              <ScrollLink 
                to="latest" 
                smooth={true} 
                duration={500} 
                className="font-bold hover:text-blog-primary cursor-pointer"
                onClick={handleLinkClick}
              >
                BLOG
              </ScrollLink>
              <ScrollLink 
                className='bg-indigo-600 font-bold w-fit text-gray-200 px-2 py-2 rounded-lg hover:text-blog-primary cursor-pointer'  
                to="news2" 
                smooth={true} 
                duration={500}
                onClick={handleLinkClick}
              >
                NEWSLETTER
              </ScrollLink>

              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-2 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-transparent"
                />
                <div className="absolute right-3 top-2.5">
                  <Search size={18} className="text-blog-grey" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
