
import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { slug } = useParams();
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

  // Project data - in a real app, this would come from an API or database
  const projectData = {
    "healthcare-analytics": {
      title: "Healthcare Analytics Platform",
      description: "Advanced data science project analyzing patient outcomes using machine learning models. Implemented predictive analytics for disease progression, reducing diagnosis time by 40% and improving treatment success rates through personalized medicine recommendations.",
      fullDescription: "This comprehensive healthcare analytics platform represents a significant advancement in medical data science. By leveraging machine learning algorithms and predictive analytics, we've created a system that not only analyzes patient outcomes but also provides actionable insights for healthcare professionals.",
      techStack: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "Jupyter", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
      ],
      challenge: "Healthcare institutions were struggling with lengthy diagnosis times and inconsistent treatment outcomes due to the complexity of patient data analysis.",
      solution: "We developed a machine learning pipeline that processes patient data in real-time, identifies patterns, and provides predictive insights for disease progression.",
      impact: "40% reduction in diagnosis time, 25% improvement in treatment success rates, and enhanced personalized medicine recommendations.",
      timeline: "24 hours",
      team: "2 developers",
      featured: true,
      liveLink: undefined,
      githubLink: undefined
    },
    "edu-genie": {
      title: "Edu-Genie Lab: AI-Powered Learning Assistant",
      description: "Developed an AI-driven learning platform offering personalized educational content, study planners, and multilingual support. Integrated AI-powered chatbot for real-time query handling and dynamic resource recommendations.",
      fullDescription: "Edu-Genie Lab transforms the educational landscape by providing personalized learning experiences powered by artificial intelligence. The platform adapts to individual learning styles and provides customized content recommendations.",
      techStack: ["FastAPI", "React.js", "Python", "MongoDB", "Vercel", "AI APIs"],
      image: "/public/img/edugenie.png",
      images: [
        "/public/img/edugenie.png",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      ],
      challenge: "Students needed personalized learning experiences that could adapt to their individual pace and learning style.",
      solution: "An AI-powered platform that analyzes learning patterns and provides customized educational content with real-time assistance.",
      impact: "Improved learning outcomes by 60%, reduced study time by 30%, and increased student engagement significantly.",
      timeline: "24 hours",
      team: "2 developers",
      featured: false,
      liveLink: "https://edu-genie-lab--five.vercel.app",
      githubLink: undefined
    }
    // Add more projects as needed
  };

  const project = projectData[slug as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h1>
          <Link to="/" className="text-pulse-500 hover:text-pulse-600 dark:text-purple-400 dark:hover:text-purple-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" ref={sectionRef}>
          <div className="section-container">
            <div className="mb-8 opacity-0 fade-in-element">
              <Link 
                to="/#projects" 
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pulse-500 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="pulse-chip mb-4 opacity-0 fade-in-element">
                  <span>Case Study</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 opacity-0 fade-in-element text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 opacity-0 fade-in-element">
                  {project.fullDescription}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8 opacity-0 fade-in-element">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="liquid-button-primary group"
                    >
                      <div className="liquid-button-bg-primary"></div>
                      <span className="relative z-10">View Live Project</span>
                      <ExternalLink className="w-4 h-4 relative z-10" />
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transparent-glass-button group"
                    >
                      <div className="transparent-glass-bg"></div>
                      <Github className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">View Code</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="opacity-0 fade-in-element">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="rounded-2xl shadow-elegant w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Project Info */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">The Challenge</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Solution</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Impact & Results</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {project.impact}
                  </p>
                  
                  {project.images && project.images.length > 1 && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.images.slice(1).map((img, index) => (
                        <img 
                          key={index}
                          src={img} 
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="rounded-xl shadow-md w-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="glass-card p-6 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Timeline</p>
                        <p className="font-medium text-gray-900 dark:text-white">{project.timeline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Team</p>
                        <p className="font-medium text-gray-900 dark:text-white">{project.team}</p>
                      </div>
                    </div>
                    {project.featured && (
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                          <p className="font-medium text-gray-900 dark:text-white">Featured Project</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass-card p-6 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-pulse-50 to-orange-50 dark:from-purple-900/30 dark:to-orange-900/30 text-pulse-600 dark:text-purple-300 rounded-full text-sm font-medium border border-pulse-200/50 dark:border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-pulse-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Interested in Similar Work?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on challenging projects that make a real impact. 
              Let's discuss how we can bring your ideas to life.
            </p>
            <Link 
              to="/#contact" 
              className="liquid-button-primary group inline-flex items-center gap-2"
            >
              <div className="liquid-button-bg-primary"></div>
              <span className="relative z-10">Get In Touch</span>
              <ExternalLink className="w-4 h-4 relative z-10" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
