import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Globe } from "lucide-react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

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
      title: "GitMateAI 🤖",
      description: "Your AI-powered Git companion for intelligent commits, code reviews, and team collaboration. Leverages multiple AI providers to analyze code changes, generate meaningful commit messages, and perform automated code reviews.",
      techStack: ["Node.js", "TypeScript", "AI APIs", "CLI", "Git"],
      liveLink: "https://github.com/raazi29/GitMateAI.git",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      slug: "gitmate-ai",
      githubLink: "https://github.com/raazi29/GitMateAI.git",
      metrics: {
        efficiency: "40% faster commits",
        accuracy: "95% review accuracy",
        adoption: "50+ developers"
      }
    },
      {
        title: "Athletrix - AI-Powered Fitness Coach",
        description: "Revolutionary fitness app combining AI-powered personal coaching with real-time form correction using computer vision. Features personalized workout plans, adaptive training, and injury prevention.",
        techStack: ["Flutter", "Dart",  "TensorFlow.js", "Python", "FastAPI", "Gemini ","AI API's"],
        image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=800&q=80",
        featured: true,
        slug: "athletrix",
        githubLink: "https://github.com/raazi29/Athletrix",
        liveLink: undefined,
        metrics: {
          accuracy: "95%+ pose detection",
          performance: "20 FPS analysis",
          latency: "<2s data updates"
        }
      },
      {
        title: "Fintech Advisory with Blockchain",
        description: "Advanced fintech platform providing AI-powered financial advisory with blockchain integration and comprehensive cybersecurity measures. Features portfolio management, algorithmic trading, and multi-language support.",
        techStack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Web3.py", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
        featured: true,
        slug: "fintech-blockchain",
        githubLink: "https://github.com/raazi29/AI-Advisor.git",
        liveLink: undefined,
        metrics: {
          languages: "11 supported",
          currencies: "9 major currencies",
          security: "Enterprise-grade"
        }
      },
      {
        title: "Subway Surfers AI Agent",
        description: "Autonomous AI agent that masters Subway Surfers using Deep Q-Network reinforcement learning. Features computer vision, real-time decision making, and adaptive learning.",
        techStack: ["Python", "Deep Q-Network", "BlueStacks", "ADB", "Reinforcement Learning"],
        image: "https://images.unsplash.com/photo-1614680376383-4210d4793777?auto=format&fit=crop&w=800&q=80",
        featured: true,
        slug: "subway-ai",
        githubLink: "https://github.com/raazi29/SubwayAI",
        liveLink: undefined,
        metrics: {
          fps: "30-60 FPS",
          memory: "100K experience buffer",
          exploration: "ε-greedy decay"
        }
      },
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
      image: "/img/edugenie.png",
      slug: "edu-genie",
      githubLink: undefined,
      metrics: {
        users: "200+ active learners",
        engagement: "85% completion rate",
        languages: "5+ languages supported"
      }
    },
    {
      title: "STEMSense: Assistive Learning Platform",
      description: "Created a FastAPI-based OCR and text-to-speech pipeline improving accessibility for visually impaired users. Deployed a fully accessible web app achieving 97% accessibility compliance with enhanced engagement features.",
      techStack: ["FastAPI", "Python", "OCR", "Accessibility APIs","Flutter","React.js","Dart"],
      liveLink: "https://audio-stem.vercel.app",
      image: "/img/STEM.png",
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
      techStack: ["Python", "React.JS","Machine Learning", "Audio Processing","FastAPI"],
      
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
      slug: "audio-stem",
      githubLink: "https://github.com/raazi29/mindmate-emotions-flow.git",
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
      image: "/img/Aarambh.png",
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
        coverage: "5K+ lines analyzed"
      }
    }

  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden" id="projects" ref={sectionRef}>
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
        
        {/* Project Cards Grid */}
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="group relative overflow-hidden rounded-3xl bg-white/15 dark:bg-black/20 border border-white/30 dark:border-white/20 shadow-2xl hover:shadow-4xl transition-all duration-700 hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-black/30 hover:border-white/40 dark:hover:border-white/30 opacity-0 fade-in-element"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent rounded-3xl" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pulse-500/20 via-transparent to-pulse-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative group/image mb-4">
                    <a
                      href={project.liveLink || `/projects/${project.slug}`}
                      target={project.liveLink ? "_blank" : "_self"}
                      rel={project.liveLink ? "noopener noreferrer" : undefined}
                      className="block cursor-pointer"
                    >
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-white/20 dark:border-white/10">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80`;
                          }}
                        />
                      </div>
                      {/* Image overlay with glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pulse-500/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover/image:ring-pulse-500/30 transition-all duration-500" />
                    </a>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-pulse-400 transition-colors duration-300 line-clamp-2 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-white/25 to-white/15 dark:from-black/25 dark:to-black/15 text-gray-800 dark:text-gray-200 border border-white/40 dark:border-white/20 backdrop-blur-sm hover:scale-105 hover:bg-gradient-to-r hover:from-pulse-500/20 hover:to-pulse-600/20 hover:text-pulse-700 dark:hover:text-pulse-300 transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-white/25 to-white/15 dark:from-black/25 dark:to-black/15 text-gray-600 dark:text-gray-400 border border-white/40 dark:border-white/20 backdrop-blur-sm">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(project.metrics).slice(0, 3).map(([key, value], metricIndex) => (
                          <div key={metricIndex} className="text-center p-2 rounded-lg bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-black/20 dark:via-black/10 dark:to-black/5 backdrop-blur-sm border border-white/30 dark:border-white/15 hover:border-pulse-500/40 dark:hover:border-pulse-400/40 hover:bg-gradient-to-br hover:from-pulse-500/10 hover:to-pulse-600/5 transition-all duration-300 group/metric">
                            <div className="text-sm font-bold text-pulse-600 dark:text-pulse-400 group-hover/metric:text-pulse-700 dark:group-hover/metric:text-pulse-300 transition-colors duration-300 truncate">
                              {value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 capitalize font-medium mt-1 truncate">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 mt-auto">
                      {project.liveLink ? (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:scale-105 flex-1 justify-center"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <Globe className="w-4 h-4 relative z-10" />
                          <span className="relative z-10 text-xs">Live Demo</span>
                        </a>
                      ) : (
                        <a
                          href={`/projects/${project.slug}`}
                          className="group/btn relative inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm bg-gradient-to-r from-pulse-500/20 to-pulse-600/20 hover:from-pulse-500/30 hover:to-pulse-600/30 border border-pulse-500/30 hover:border-pulse-500/50 text-pulse-600 dark:text-pulse-400 hover:scale-105 flex-1 justify-center"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-pulse-500/10 to-pulse-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <ExternalLink className="w-4 h-4 relative z-10" />
                          <span className="relative z-10 text-xs">View Details</span>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 border border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20 text-gray-800 dark:text-gray-200 hover:scale-105"
                        >
                          <Github className="w-4 h-4 relative z-10" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Corner highlights */}
                  <div className="absolute top-0 left-0 w-6 h-6 rounded-br-3xl bg-gradient-radial from-white/30 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-6 h-6 rounded-bl-3xl bg-gradient-radial from-white/30 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 rounded-tr-3xl bg-gradient-radial from-white/30 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-tl-3xl bg-gradient-radial from-white/30 via-white/10 to-transparent dark:from-white/20 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 opacity-0 fade-in-element">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Interested in collaborating on data science projects?</p>
          <a 
            href="#contact" 
            className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm bg-transparent border border-gray-300/30 dark:border-white/20 hover:border-pulse-500/50 dark:hover:border-pulse-400/50 shadow-lg hover:shadow-xl hover:shadow-pulse-500/20 dark:hover:shadow-pulse-400/20 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-white/2 dark:to-white/5 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative z-10 text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-pulse-400 transition-colors duration-300">
              Let's Connect
            </span>
            <ExternalLink className="w-4 h-4 relative z-10 text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-pulse-400 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-pulse-500/10 dark:bg-pulse-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
