import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
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
        sectionRef.current && observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const scrollContainer = sectionRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = scrollContainer.querySelectorAll('.parallax-decorator-projects'); 

      elements.forEach(el => {
        const htmlElement = el as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.speed || '0.1');
        const yPos = -(scrollY * speed); 
        htmlElement.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, sectionRef]);

  const projects = [
    {
      title: "Healthcare Analytics Platform",
      description: "Advanced data science project analyzing patient outcomes using machine learning models. Implemented predictive analytics for disease progression, reducing diagnosis time by 40% and improving treatment success rates through personalized medicine recommendations.",
      techStack: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "Jupyter", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
      featured: true,
      slug: "healthcare-analytics",
      githubLink: undefined,
      metrics: {
        impact: "40% faster diagnosis",
        users: "500+ healthcare professionals",
        accuracy: "94% prediction accuracy"
      }
    },
    {
      title: "Edu-Genie Lab: AI-Powered Learning Assistant",
      description: "Developed an AI-driven learning platform offering personalized educational content, study planners, and multilingual support. Integrated AI-powered chatbot for real-time query handling and dynamic resource recommendations.",
      techStack: ["FastAPI", "React.js", "Python", "MongoDB", "Vercel", "AI APIs"],
      liveLink: "https://edu-genie-lab--five.vercel.app",
      image: "https://i.ibb.co/CRkRszY/edugenie.png",
      slug: "edu-genie",
      githubLink: undefined,
      metrics: {
        users: "1,200+ active learners",
        engagement: "85% completion rate",
        languages: "5+ languages supported"
      }
    },
    {
      title: "STEMSense: Assistive Learning Platform",
      description: "Created a FastAPI-based OCR and text-to-speech pipeline improving accessibility for visually impaired users. Deployed a fully accessible web app achieving 97% accessibility compliance with enhanced engagement features.",
      techStack: ["FastAPI", "Python", "OCR", "Accessibility APIs","Flutter","React.js","Dart"],
      liveLink: "https://audio-stem.vercel.app",
      image: "https://i.ibb.co/ynzWR1wL/stem.png",
      slug: "stemsense",
      githubLink: undefined,
      metrics: {
        accessibility: "97% WCAG compliance",
        performance: "300ms response time",
        impact: "60% improved learning outcomes"
      }
    },
    {
      title: "Mood Recognition with Anonymous Chat",
      description: "Advanced audio processing application for Sentiment analysis, mood recognition and AI chatbot ,Anonymous Global chat system .",
      techStack: ["Python", "Machine Learning", "Audio Processing", "React.JS","FastAPI"],
      
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      slug: "audio-stem",
      githubLink: undefined,
      metrics: {
        quality: "AI suggestions based on mood and chat",
        processing: "Real-time processing",
        formats: "15+ Moods"
      }
    },
    {
      title: "Aarambh Platform",
      description: "A comprehensive platform focused on providing innovative solutions and services. Built with modern web technologies for optimal performance and user experience.",
      techStack: ["React.js", "FastAPI", "Python", "Vercel"],
      liveLink: "https://aarambh-red.vercel.app",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      slug: "aarambh",
      githubLink: undefined,
      metrics: {
        performance: "95+ Lighthouse score",
        uptime: "99.9% availability",
        speed: "1.2s load time"
      }
    },
    {
      title: "Vulnerability Detection in Codebases Using AI",
      description: "Developed a Streamlit-based AI web app for detecting Python code vulnerabilities, improving code security by 30%. Utilized NLP transformers for scalable analysis of large codebases.",
      techStack: ["Python", "Machine Learning", "Streamlit", "NLP"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      slug: "vulnerability-detection",
      githubLink: undefined,
      metrics: {
        security: "30% vulnerability reduction",
        detection: "95% accuracy rate",
        coverage: "50K+ lines analyzed"
      }
    }
  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden" id="projects" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="parallax-decorator-projects parallax absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl" 
          data-speed="0.15"
        ></div>
        <div 
          className="parallax-decorator-projects parallax absolute bottom-40 left-20 w-48 h-48 bg-pulse-500 rounded-full blur-3xl" 
          data-speed="0.1"
        ></div>
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Featured Projects
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            A showcase of my work in data science, AI development, and web applications that create real-world impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              liveLink={project.liveLink}
              githubLink={project.githubLink}
              image={project.image}
              index={index}
              featured={project.featured}
              slug={project.slug}
              metrics={project.metrics}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 opacity-0 fade-in-element">
          <p className="text-gray-600 mb-6">Interested in collaborating on data science projects?</p>
          <a 
            href="#contact" 
            className="transparent-glass-button group relative overflow-hidden inline-flex items-center gap-2"
          >
            <div className="transparent-glass-bg"></div>
            <span className="relative z-10 font-medium transition-all duration-300 group-hover:scale-105">
              Let's Connect
            </span>
            <ExternalLink className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:scale-105" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
