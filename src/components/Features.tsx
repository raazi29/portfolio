import React, { useEffect, useRef } from "react";
import { cn } from '@/lib/util';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
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
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card opacity-0 p-8 rounded-3xl",
        "bg-white/40 backdrop-blur-xl border border-white/20",
        "hover:bg-white/60 hover:border-white/30",
        "dark:bg-black/60 dark:backdrop-blur-xl dark:border-white/10",
        "dark:hover:bg-black/80 dark:hover:border-white/20",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
        "dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        "transition-all duration-700 ease-out hover:translate-y-[-12px]",
        "group relative overflow-hidden",
        "shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
        "dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      )}
      style={{ 
        animationDelay: `${0.15 * index}s`,
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-pulse-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl dark:from-white/5 dark:to-pulse-500/10"></div>
      
      {/* Animated light reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl dark:from-white/10"></div>
      
      <div className="relative z-10">
        <div className="rounded-2xl bg-gradient-to-br from-pulse-100/80 to-pulse-200/80 backdrop-blur-sm w-16 h-16 flex items-center justify-center text-pulse-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg border border-white/20 dark:from-pulse-900/50 dark:to-pulse-800/50 dark:text-pulse-400 dark:border-white/10">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-pulse-600 transition-colors duration-500 tracking-tight dark:text-gray-100 dark:group-hover:text-pulse-400">{title}</h3>
        <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-500 dark:text-gray-300 dark:group-hover:text-gray-200">{description}</p>
      </div>
      
      {/* Subtle inner border glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/40 transition-all duration-700 dark:group-hover:border-white/20"></div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-black relative overflow-hidden" id="features" ref={sectionRef}>
      {/* Enhanced background with glass morphism */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pulse-200/20 to-pulse-300/10 rounded-full blur-3xl animate-float dark:from-pulse-500/10 dark:to-pulse-600/5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-200/15 to-blue-200/10 rounded-full blur-3xl animate-float dark:from-purple-500/8 dark:to-blue-500/5" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse-slow dark:from-orange-500/5 dark:to-pink-500/5"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <div className="pulse-chip mx-auto mb-6 opacity-0 fade-in-element bg-white/60 backdrop-blur-sm border-white/30 shadow-lg dark:bg-black/40 dark:border-white/10">
            <span className="bg-gradient-to-r from-pulse-600 to-purple-600 bg-clip-text text-transparent font-semibold">Technical Skills</span>
          </div>
          <h2 className="section-title mb-6 opacity-0 fade-in-element bg-gradient-to-r from-gray-900 via-pulse-600 to-purple-600 bg-clip-text text-transparent leading-tight dark:from-gray-100 dark:via-pulse-400 dark:to-purple-400">
            Expertise in Data Science <br className="hidden sm:block" />& AI Development
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element text-gray-600 max-w-4xl leading-relaxed dark:text-gray-300">
            Proficient in modern technologies and frameworks for data analysis, machine learning, and web development with a passion for innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}
            title="Programming Languages"
            description="Python, SQL, Java, C - Strong foundation in multiple programming languages for diverse applications and problem-solving."
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path><path d="M12 8a4 4 0 1 0 4 4"></path><circle cx="12" cy="12" r="1"></circle></svg>}
            title="Machine Learning & AI"
            description="AI APIs, NLP, Computer Vision, OCR - Experienced in developing intelligent systems and accessibility solutions."
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="16.5 14.6 16.5 19.79 21 12"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg>}
            title="Data Analysis & Visualization"
            description="Pandas, NumPy, Power BI, Tableau, MS Excel - Transforming raw data into actionable insights and compelling visualizations."
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>}
            title="Web Development"
            description="FastAPI, Streamlit, React.js, HTML, CSS - Full-stack development with modern frameworks and responsive design."
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7"></path><ellipse cx="12" cy="7" rx="8" ry="4"></ellipse></svg>}
            title="Database Management"
            description="MongoDB, Vercel, Git - Efficient data storage, version control, and cloud deployment solutions."
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M16 6H3v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><line x1="12" x2="12" y1="11" y2="15"></line><line x1="10" x2="14" y1="13" y2="13"></line></svg>}
            title="Soft Skills"
            description="Teamwork, Time Management, Adaptability, Self-learning - Essential skills for collaborative and innovative work environments."
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
