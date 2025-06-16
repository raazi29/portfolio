
import React, { useState, useEffect } from "react";
import { cn } from '@/lib/util';
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AIChatbot from "./AIChatbot";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ['about', 'features', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Set home as active if at top
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      scrollToTop();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = window.innerWidth < 768 ? 100 : 80;
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const handleResumeDownload = () => {
    // Create a dummy resume download - replace with your actual resume file
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Replace with your actual resume file path
    link.download = 'Mohammed_Raazi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out",
        "w-[calc(100%-2rem)] max-w-3xl",
        isScrolled && "top-2 scale-95"
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl px-4 py-2.5 transition-all duration-300",
        "bg-white/5 dark:bg-black/5",
        "backdrop-blur-2xl backdrop-saturate-200",
        "border border-white/10 dark:border-white/5",
        "shadow-2xl shadow-black/5 dark:shadow-black/30",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-30 dark:before:from-white/5 dark:before:opacity-50"
      )}>
        <div className="relative flex items-center justify-between">
          {/* Logo with R */}
          <button 
            onClick={() => handleNavClick('home')}
            className="group flex items-center transition-all duration-300 hover:scale-110"
            aria-label="Home"
          >
            <div className={cn(
              "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
              "bg-white/10 dark:bg-white/5",
              "border border-white/20 dark:border-white/10",
              "group-hover:shadow-lg group-hover:shadow-white/20 dark:group-hover:shadow-white/10",
              "group-hover:border-white/30 dark:group-hover:border-white/20",
              "group-hover:bg-white/20 dark:group-hover:bg-white/10",
              "backdrop-blur-sm"
            )}>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                R
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  "hover:bg-white/10 dark:hover:bg-white/5",
                  "hover:backdrop-blur-sm hover:scale-105",
                  "hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                  activeSection === item.id 
                    ? "text-gray-900 dark:text-white bg-white/15 dark:bg-white/10 shadow-sm shadow-white/20 dark:shadow-white/5" 
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-white/5 dark:bg-white/5 rounded-xl backdrop-blur-sm" />
                )}
              </button>
            ))}
            
            {/* Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              className={cn(
                "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                "bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-200",
                "border border-pulse-500/30 dark:border-pulse-400/30",
                "hover:bg-pulse-500/10 dark:hover:bg-pulse-400/10",
                "hover:border-pulse-500/50 dark:hover:border-pulse-400/50",
                "hover:text-pulse-600 dark:hover:text-pulse-400",
                "hover:scale-105 hover:shadow-lg hover:shadow-pulse-500/20 dark:hover:shadow-pulse-400/20",
                "backdrop-blur-sm",
                "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-pulse-500/5 before:to-pulse-600/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
                "after:absolute after:inset-0 after:rounded-xl after:shadow-[0_0_15px_rgba(249,115,22,0.3)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
                "flex items-center space-x-2"
              )}
            >
              <Download className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Resume</span>
            </button>
          </nav>

          {/* Right side - AI Chatbot and Theme toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <AIChatbot />
            <div className="scale-75 transition-transform duration-300 hover:scale-90">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button, AI chatbot and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <AIChatbot />
            <div className="scale-75 transition-transform duration-300 hover:scale-90">
              <ThemeToggle />
            </div>
            <button 
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-white/10 dark:hover:bg-white/5",
                "hover:text-gray-900 dark:hover:text-white",
                "hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                "focus:outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10",
                "backdrop-blur-sm"
              )}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-5">
                <Menu 
                  size={18} 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )} 
                />
                <X 
                  size={18} 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-300",
            "bg-black/30 dark:bg-black/50 backdrop-blur-xl",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={toggleMenu}
        />
        
        {/* Menu Content */}
        <div className={cn(
          "absolute top-16 left-4 right-4 transition-all duration-300 ease-out",
          "bg-white/5 dark:bg-black/10 backdrop-blur-2xl backdrop-saturate-200",
          "border border-white/10 dark:border-white/5",
          "rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/40",
          "overflow-hidden",
          isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
        )}>
          {/* Top bar with close button */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/5">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Menu</span>
            <button
              onClick={toggleMenu}
              className={cn(
                "p-2 rounded-xl transition-all duration-200",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-white/10 dark:hover:bg-white/5",
                "hover:text-gray-900 dark:hover:text-white",
                "hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10"
              )}
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-left px-4 py-3 rounded-2xl transition-all duration-200",
                  "hover:bg-white/10 dark:hover:bg-white/5",
                  "hover:translate-x-1 hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                  "backdrop-blur-sm",
                  activeSection === item.id 
                    ? "text-gray-900 dark:text-white bg-white/15 dark:bg-white/10 shadow-sm shadow-white/20 dark:shadow-white/5" 
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                  "animate-in slide-in-from-right duration-200"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* Mobile Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              className={cn(
                "text-left px-4 py-3 rounded-2xl transition-all duration-200",
                "bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-200",
                "border border-pulse-500/30 dark:border-pulse-400/30",
                "hover:bg-pulse-500/10 dark:hover:bg-pulse-400/10",
                "hover:border-pulse-500/50 dark:hover:border-pulse-400/50",
                "hover:text-pulse-600 dark:hover:text-pulse-400",
                "hover:translate-x-1 hover:shadow-lg hover:shadow-pulse-500/20 dark:hover:shadow-pulse-400/20",
                "backdrop-blur-sm flex items-center space-x-2",
                "relative overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-pulse-500/5 before:to-pulse-600/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
                "animate-in slide-in-from-right duration-200"
              )}
              style={{ animationDelay: `${navItems.length * 50}ms` }}
            >
              <Download className="w-5 h-5 relative z-10" />
              <span className="text-lg font-medium relative z-10">Resume</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
