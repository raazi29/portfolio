import React, { useState, useEffect } from "react";
import { cn } from '@/lib/util';
import { Menu, X, Download, Zap, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AIChatbot from "./AIChatbot";
import LightsaberCursor from "./LightsaberCursor";
import LightsaberSettingsPanel from "./LightsaberSettings";

interface LightsaberSettings {
  color: string;
  intensity: number;
  flickerSpeed: number;
  bladeLength: number;
  glowSize: number;
  hiltColor: string;
  bladeThickness: number;
  sparkCount: number;
  slashTrailLength: number;
  slashDuration: number;
  tiltSensitivity: number;
  bladeStyle: 'stable' | 'unstable' | 'fiery';
  corePulseSpeed: number;
  tipShape: 'rounded' | 'pointed' | 'flat';
  hasCrossguard: boolean;
  hiltStyle: 'standard' | 'graflex' | 'vader' | 'curved';
  hiltWeathering: number;
  isDoubleBladed: boolean;
  isLightwhip: boolean;
  isShoto: boolean;
  hasBladeGradient: boolean;
  bladePattern: 'solid' | 'striped' | 'spiral' | 'energy' | 'crystal';
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isLightsaberEnabled, setIsLightsaberEnabled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lightsaberSettings, setLightsaberSettings] = useState<LightsaberSettings>({
    color: '#00ff00',
    intensity: 0.9,
    flickerSpeed: 0.1,
    bladeLength: 1,
    glowSize: 1,
    hiltColor: '#c0c0c0',
    bladeThickness: 1,
    sparkCount: 8,
    slashTrailLength: 1,
    slashDuration: 0.6,
    tiltSensitivity: 1,
    bladeStyle: 'stable',
    corePulseSpeed: 0,
    tipShape: 'rounded',
    hasCrossguard: false,
    hiltStyle: 'standard',
    hiltWeathering: 0,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: false,
    bladePattern: 'solid'
  });

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
      
      // Set hero as active if at top
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enable lightsaber by default in dark mode
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsLightsaberEnabled(isDarkMode);
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

  const handleNavClick = async (sectionId: string) => {
    console.log('Nav click:', sectionId, 'isMenuOpen:', isMenuOpen); // Debug log
    setIsLoading(true);
    
    // Close mobile menu first
    if (isMenuOpen) {
      console.log('Closing mobile menu'); // Debug log
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
    
    try {
      // Add a small delay to ensure menu closes before scrolling
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (sectionId === 'hero') {
        console.log('Scrolling to top'); // Debug log
        scrollToTop();
      } else {
        const element = document.getElementById(sectionId);
        console.log('Element found:', element, 'for section:', sectionId); // Debug log
        if (element) {
          console.log('Using scrollIntoView for section:', sectionId); // Debug log
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        } else {
          console.log('Element not found for section:', sectionId); // Debug log
        }
      }
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleResumeDownload = async () => {
    setIsLoading(true);
    
    try {
      // Create a dummy resume download - replace with your actual resume file
      const link = document.createElement('a');
      link.href = '/public/resume/Resume.pdf'; // Replace with your actual resume file path
      link.download = 'Mohammed_Raazi_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
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
        "relative overflow-hidden rounded-[24px] px-4 py-2.5 transition-all duration-300",
        "bg-transparent",
        "backdrop-blur-sm backdrop-saturate-[1.2]",
        "apple-glass-effect",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:via-white/2 before:to-white/5 before:opacity-30 dark:before:from-white/3 dark:before:via-white/1 dark:before:to-white/3 dark:before:opacity-20",
        "shadow-sm shadow-black/5 dark:shadow-black/10"
      )}>
        {/* Fish-eye refraction corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 rounded-br-[24px] bg-gradient-radial from-white/10 via-white/5 to-transparent opacity-40 dark:from-white/8 dark:via-white/4 dark:to-transparent blur-[1px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-[24px] bg-gradient-radial from-white/10 via-white/5 to-transparent opacity-40 dark:from-white/8 dark:via-white/4 dark:to-transparent blur-[1px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-[24px] bg-gradient-radial from-white/10 via-white/5 to-transparent opacity-40 dark:from-white/8 dark:via-white/4 dark:to-transparent blur-[1px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-[24px] bg-gradient-radial from-white/10 via-white/5 to-transparent opacity-40 dark:from-white/8 dark:via-white/4 dark:to-transparent blur-[1px] pointer-events-none"></div>
        
        <div className="relative flex items-center justify-between">
          {/* Logo with R */}
          <button 
            onClick={() => handleNavClick('hero')}
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
            {/* Lightsaber Settings Button - Only visible when lightsaber is enabled */}

            <button
              onClick={() => setIsLightsaberEnabled(!isLightsaberEnabled)}
              className={cn(
                "relative px-2 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                "hover:bg-white/10 dark:hover:bg-white/15",
                "hover:backdrop-blur-sm hover:scale-105",
                "hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/15",
                isLightsaberEnabled 
                  ? "text-green-500 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10" 
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              )}
              aria-label={isLightsaberEnabled ? "Disable lightsaber cursor" : "Enable lightsaber cursor"}
            >
              <span className="relative z-10 flex items-center space-x-1">
                <Zap size={9} />
            
              </span>
              {isLightsaberEnabled && (
                <div className="absolute inset-0 bg-white/5 dark:bg-white/5 rounded-xl backdrop-blur-sm" />
              )}
            </button>
            {isLightsaberEnabled && (
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={cn(
                  "relative p-1.5 rounded-xl transition-all duration-300",
                  "text-gray-700 dark:text-gray-300",
                  "hover:bg-white/10 dark:hover:bg-white/5",
                  "hover:text-gray-900 dark:hover:text-white",
                  "hover:scale-110 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10",
                  "backdrop-blur-sm"
                )}
                aria-label="Lightsaber settings"
              >
                <Settings size={14} />
              </button>
            )}

            <AIChatbot />
            <div className="scale-75 transition-transform duration-300 hover:scale-90">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-1.5 md:hidden">
            <div className="scale-75 transition-transform duration-300 hover:scale-90">
              <ThemeToggle />
            </div>
            <AIChatbot />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "relative ml-0.5 p-1.5 rounded-xl transition-all duration-300",
                "text-gray-700 dark:text-gray-300",
                "bg-white/10 dark:bg-white/5",
                "border border-white/10 dark:border-white/5",
                "hover:bg-white/15 dark:hover:bg-white/10",
                "hover:text-gray-900 dark:hover:text-white",
                "hover:scale-105 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-white/10",
                "backdrop-blur-sm"
              )}
              aria-label="Toggle menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-[9999] md:hidden transition-all duration-300 ease-out pointer-events-auto",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-300",
            "bg-black/35 dark:bg-black/60 backdrop-blur-xl backdrop-saturate-[1.5]",
            "shadow-inner shadow-white/5 dark:shadow-white/10",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={toggleMenu}
        />
        
        {/* Menu Content */}
        <div className={cn(
          "absolute top-0 left-0 right-0 transition-all duration-300 ease-out",
          "bg-white/5 dark:bg-black/10 backdrop-blur-2xl backdrop-saturate-200",
          "apple-glass-effect",
          "shadow-2xl shadow-black/20 dark:shadow-black/40",
          "rounded-b-3xl rounded-t-3xl",
          "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:bg-gradient-to-br before:from-white/30 before:to-transparent before:opacity-40 before:blur-sm",
          "pointer-events-auto",
          isMenuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
        )}>
          {/* Top bar with close button */}
          <div className="flex items-center justify-between p-3 border-b border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/5 backdrop-blur-md z-10 rounded-t-3xl">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-7 h-7 rounded-xl flex items-center justify-center",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
              )}>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  R
                </span>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Navigation</span>
            </div>
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
          <nav className="flex flex-col p-3 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  console.log('Mobile menu click:', item.id);
                  handleNavClick(item.id);
                }}
                disabled={isLoading}
                className={cn(
                  "text-left px-3 py-2.5 rounded-2xl transition-all duration-200",
                  "flex items-center justify-between",
                  "hover:bg-white/10 dark:hover:bg-white/5",
                  "hover:translate-x-1 hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                  "backdrop-blur-sm",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "pointer-events-auto",
                  activeSection === item.id 
                    ? "text-gray-900 dark:text-white bg-white/15 dark:bg-white/10 shadow-[0_0_12px_2px_rgba(255,255,255,0.18)] dark:shadow-[0_0_16px_2px_rgba(255,255,255,0.10)]" 
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                  "animate-in slide-in-from-right duration-200"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium">{item.label}</span>
                {isLoading && (
                  <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                )}
              </button>
            ))}
            
            {/* Lightsaber Toggle Button */}
            <button
              onClick={() => setIsLightsaberEnabled(!isLightsaberEnabled)}
              disabled={isLoading}
              className={cn(
                "text-left px-3 py-2.5 rounded-2xl transition-all duration-200",
                "flex items-center justify-between",
                "hover:bg-white/10 dark:hover:bg-white/5",
                "hover:translate-x-1 hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                "backdrop-blur-sm",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isLightsaberEnabled 
                  ? "text-green-500 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10" 
                  : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                "animate-in slide-in-from-right duration-200"
              )}
              style={{ animationDelay: `${navItems.length * 50}ms` }}
              aria-label={isLightsaberEnabled ? "Disable lightsaber cursor" : "Enable lightsaber cursor"}
            >
              <div className="flex items-center space-x-2">
                <Zap size={14} className="relative z-10" />
                <span className="text-sm font-medium">Saber</span>
              </div>
              {isLoading && (
                <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
              )}
            </button>
            
            <div className="h-px bg-white/10 dark:bg-white/5 my-1"></div>
            
            {/* Resume Download Button */}
            <button
              onClick={handleResumeDownload}
              disabled={isLoading}
              className={cn(
                "text-left px-3 py-2.5 rounded-2xl transition-all duration-200",
                "bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-200",
                "border border-pulse-500/30 dark:border-pulse-400/30",
                "hover:bg-pulse-500/10 dark:hover:bg-pulse-400/10",
                "hover:border-pulse-500/50 dark:hover:border-pulse-400/50",
                "hover:text-pulse-600 dark:hover:text-pulse-400",
                "hover:translate-x-1 hover:shadow-lg hover:shadow-pulse-500/20 dark:hover:shadow-pulse-400/20",
                "backdrop-blur-sm flex items-center space-x-3",
                "relative overflow-hidden",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-pulse-500/5 before:to-pulse-600/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
                "animate-in slide-in-from-right duration-200"
              )}
              style={{ animationDelay: `${(navItems.length + 1) * 50}ms` }}
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
              ) : (
                <Download className="w-4 h-4 relative z-10" />
              )}
              <span className="text-sm font-medium relative z-10">
                {isLoading ? "Downloading..." : "Download Resume"}
              </span>
            </button>
            
            {/* Settings Section */}
            <div className="bg-white/5 dark:bg-white/5 rounded-2xl p-3 space-y-2 animate-in slide-in-from-right duration-200" 
                 style={{ animationDelay: `${(navItems.length + 2) * 50}ms` }}>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800 dark:text-gray-200">Theme</span>
                <div className="scale-75">
                  <ThemeToggle />
                </div>
              </div>
              
              {/* Lightsaber Settings Button - Only visible when lightsaber is enabled */}
              {isLightsaberEnabled && (
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-2xl transition-all duration-200",
                    "flex items-center space-x-2",
                    "backdrop-blur-sm",
                    "text-gray-800 dark:text-gray-200",
                    "bg-white/10 dark:bg-white/5",
                    "hover:bg-white/15 dark:hover:bg-white/10",
                    "hover:shadow-sm hover:shadow-white/10 dark:hover:shadow-white/5",
                    "hover:text-gray-900 dark:hover:text-white",
                  )}
                  aria-label="Lightsaber settings"
                >
                  <Settings className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">Customize Lightsaber</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Lightsaber Cursor */}
      <LightsaberCursor 
        isEnabled={isLightsaberEnabled} 
        settings={lightsaberSettings} 
      />

      {/* Lightsaber Settings Panel */}
      <LightsaberSettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={lightsaberSettings}
        onSettingsChange={setLightsaberSettings}
      />
    </header>
  );
};

export default Navbar;
