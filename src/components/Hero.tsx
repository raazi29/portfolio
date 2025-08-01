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
        backgroundImage: 'url("https://i.ibb.co/jvFZ4w3m/Whats-App-Image-2025-06-12-at-17-28-08-8c84e376.jpg")',
        backgroundPosition: 'center 30%', 
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col gap-6 lg:gap-12 items-center">
          <div className="w-full text-center">
            <div 
              className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in inline-flex"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">01</span>
              <span>Data Analyst</span>
            </div>
            
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in font-orbitron" 
              style={{ animationDelay: "0.3s" }}
            >
              <span className="shimmer-text font-extrabold">Mohammed Raazi   </span><br className="hidden sm:inline" />
              <span className="text-pulse-500 font-bold">Data Analyst & AI Developer</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-white font-medium text-base sm:text-lg text-center drop-shadow-lg max-w-4xl mx-auto"
            >
              Aspiring Data Analyst with expertise in Python, SQL, Machine Learning, and AI-based applications. Passionate about creating data-driven insights and accessible technology solutions.
            </p>
            
            <div 
              className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <div onClick={handleViewProjectsClick}>
                <KeycapButton href="#projects" className="lightsaber-interactive">
                  View My Projects
                </KeycapButton>
              </div>
              <a href="#contact" className="lightsaber-interactive">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    Contact Me
                  </span>
                </ShimmerButton>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
