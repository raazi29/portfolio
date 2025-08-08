import React, { useEffect, useRef } from "react";
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
  
  // Determine the link destination
  const linkTo = slug === "aarambh" ? "/project/aarambh" : `/project/${slug}`;
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "opacity-0 overflow-hidden group relative cursor-pointer rounded-2xl sm:rounded-3xl",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg",
        "border border-gray-200/60 dark:border-gray-700/40",
        "shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
        "hover:border-gray-300/70 dark:hover:border-gray-600/50",
        "transition-all duration-500 ease-out hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2",
        featured && "ring-1 ring-pulse-500/30 dark:ring-purple-500/40"
      )}
      style={{ animationDelay: `${0.15 * index}s` }}
    >
      {featured && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-gradient-to-r from-pulse-500 to-pulse-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold flex items-center gap-1 sm:gap-2 shadow-lg">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
          <span className="hidden sm:inline">Featured</span>
          <span className="sm:hidden">★</span>
        </div>
      )}
      
      <Link to={linkTo} className="block">
        <div className="relative h-36 sm:h-44 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold flex items-center gap-2 shadow-xl border border-white/20 dark:border-white/10">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm">View Project</span>
            </div>
          </div>
          
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl text-gray-900 dark:text-white p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-white/40 dark:border-gray-700/60 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-3.5 h-3.5" />
              </a>
            )}
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl text-gray-900 dark:text-white p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-white/40 dark:border-gray-700/60 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4 sm:p-6">
        <Link to={linkTo}>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {techStack.slice(0, 3).map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-50/80 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200/60 dark:border-gray-700/60 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100/80 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-medium border border-gray-200/60 dark:border-gray-600/60">
              +{techStack.length - 3}
            </span>
          )}
        </div>

        <Link 
          to={linkTo}
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-all duration-200 group-hover:gap-3"
        >
          Explore Project
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
