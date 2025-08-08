import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Star, ArrowRight, Eye } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  image: string;
  index: number;
  featured?: boolean;
  slug: string;
  metrics?: {
    [key: string]: string;
  };
}

const ProjectCard = ({ 
  title, 
  description, 
  techStack, 
  liveLink, 
  githubLink, 
  image, 
  index, 
  featured = false, 
  slug,
  metrics
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        cardRef.current && observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.02, 1.02, 1.02)
      translateZ(20px)
    `;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale3d(1, 1, 1)
        translateZ(0px)
      `;
    }
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Determine the link destination
  const linkTo = slug === "aarambh" ? "/project/aarambh" : `/project/${slug}`;
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "opacity-0 overflow-hidden group relative cursor-pointer rounded-2xl sm:rounded-3xl",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg",
        "border border-gray-200/60 dark:border-gray-700/40",
        "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
        "hover:border-pulse-300/50 dark:hover:border-purple-500/30",
        "transition-all duration-700 ease-out",
        "transform-gpu will-change-transform",
        featured && "ring-2 ring-pulse-500/40 dark:ring-purple-500/50 shadow-pulse-500/20"
      )}
      style={{ animationDelay: `${0.15 * index}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Enhanced Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pulse-500 to-purple-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-pulse-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl border border-white/20">
              <Star className="w-4 h-4 fill-current animate-spin-slow" />
              <span className="hidden sm:inline font-semibold tracking-wide">Featured</span>
              <span className="sm:hidden">★</span>
            </div>
          </div>
        </div>
      )}
      
      <Link to={linkTo} className="block">
        <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          {/* Lazy Loading with Blur Placeholder */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800",
            "transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-600/50 dark:to-gray-700/50 animate-pulse"></div>
          </div>
          
          <img 
            src={image} 
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              "group-hover:scale-110 group-hover:rotate-1",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
          
          {/* Enhanced Project Preview Overlay */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="bg-white/25 dark:bg-black/25 backdrop-blur-xl text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl border border-white/30 dark:border-white/20 transform scale-95 group-hover:scale-100 transition-transform duration-300">
              <ArrowRight className="w-5 h-5" />
              <span className="text-base tracking-wide">View Project</span>
            </div>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className={cn(
            "absolute top-4 right-4 flex gap-3 transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}>
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl text-gray-900 dark:text-white p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-white/40 dark:border-gray-700/60 shadow-xl hover:shadow-2xl hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-4 h-4" />
              </a>
            )}
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl text-gray-900 dark:text-white p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-white/40 dark:border-gray-700/60 shadow-xl hover:shadow-2xl hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-6 sm:p-8">
        <Link to={linkTo}>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-purple-400 transition-colors duration-500 leading-tight line-clamp-2 tracking-tight">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-base leading-relaxed line-clamp-3 sm:line-clamp-4 font-medium">
          {description}
        </p>
        
        {/* Enhanced Tech Stack */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {techStack.slice(0, 4).map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-3 py-2 bg-gradient-to-r from-pulse-50 to-purple-50 dark:from-pulse-900/30 dark:to-purple-900/30 text-pulse-700 dark:text-purple-300 rounded-xl text-sm font-semibold border border-pulse-200/60 dark:border-purple-700/60 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-3 py-2 bg-gray-100/80 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 rounded-xl text-sm font-semibold border border-gray-200/60 dark:border-gray-600/60">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Enhanced CTA Link */}
        <Link 
          to={linkTo}
          className="inline-flex items-center gap-3 text-pulse-600 dark:text-purple-400 hover:text-pulse-700 dark:hover:text-purple-300 font-bold text-base transition-all duration-500 group-hover:gap-4 tracking-wide"
        >
          <span className="relative">
            Explore Project
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pulse-600 to-purple-600 transition-all duration-500 group-hover:w-full"></span>
          </span>
          <ArrowRight className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
