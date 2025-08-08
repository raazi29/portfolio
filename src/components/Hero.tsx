import React, { useEffect, useRef, useState } from "react";
import { cn } from '@/lib/utils';
import LottieAnimation from "./LottieAnimation";
import KeycapButton from "./KeycapButton";
import { playClickSound } from "@/utils/audioUtils";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  const handleViewProjectsClick = (e: React.MouseEvent) => {
    playClickSound();
    // Let the default behavior continue (navigation to #projects)
  };
  
  return (
    <section 
      className="overflow-hidden relative bg-cover" 
      id="hero" 
      style={{
        backgroundImage: 'url("https://i.ibb.co/v61y9R4z/IMG-20250808-163542.png")',
        backgroundPosition: 'center 30%', 
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="pulse-chip mb-4 sm:mb-8 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-pulse-500 to-purple-600 text-white mr-3 font-bold text-sm">01</span>
              <span className="font-semibold tracking-wide">Data Analyst</span>
            </div>
            
            <h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.3s" }}
            >
              <span className="gradient-text font-extrabold tracking-tight">Mohammed Raazi</span><br className="hidden sm:inline" />
              <span className="text-pulse-600 dark:text-purple-400 font-bold">Data Analyst & AI Developer</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="font-body mt-6 sm:mt-8 mb-6 sm:mb-10 leading-relaxed opacity-0 animate-fade-in text-gray-700 dark:text-gray-200 font-medium text-lg sm:text-xl text-left drop-shadow-lg max-w-2xl"
            >
              Aspiring Data Analyst with expertise in Python, SQL, Machine Learning, and AI-based applications. Passionate about creating data-driven insights and accessible technology solutions.
            </p>
            
            <div 
              className="flex flex-wrap gap-6 justify-center sm:justify-start opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <div onClick={handleViewProjectsClick} className="hover-lift-enhanced">
                <KeycapButton href="#projects" className="lightsaber-interactive shadow-2xl">
                  <span className="font-bold text-base">View My Projects</span>
                </KeycapButton>
              </div>
              <a href="#contact" className="lightsaber-interactive hover-lift-enhanced">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-base font-bold leading-none tracking-tight text-white">
                    Contact Me
                  </span>
                </ShimmerButton>
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {lottieData ? (
              <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <LottieAnimation 
                  animationPath={lottieData} 
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
              </div>
            ) : (
              <>
              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <img 
                  ref={imageRef} 
                  src="/img/robo.png" 
                  alt="Mohammed Raazi Profile" 
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out" 
                  style={{ transformStyle: 'preserve-3d' }} 
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'url("/hero-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.5 }}></div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
