
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe, Users, Zap, Clock, Award, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from '@/lib/utils';

const AarambhProject = () => {
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

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Performance",
      description: "Optimized for speed with 95+ Lighthouse scores and sub-2 second load times."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Built to handle thousands of concurrent users with modern cloud infrastructure."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Accessibility",
      description: "99.9% uptime with worldwide CDN distribution for optimal user experience."
    }
  ];

  const techStack = [
    "React.js", "FastAPI", "Python", "Vercel", "TypeScript", "Tailwind CSS", 
    "PostgreSQL", "Redis", "Docker", "AWS", "Nginx"
  ];

  const achievements = [
    "95+ Lighthouse Performance Score",
    "99.9% Uptime Reliability",
    "1.2s Average Load Time",
    "SOC 2 Type II Compliant",
    "ISO 27001 Certified"
  ];

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
                  <span>Featured Platform</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 opacity-0 fade-in-element text-gray-900 dark:text-white">
                  Aarambh Platform
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 opacity-0 fade-in-element">
                  A comprehensive digital platform that revolutionizes how businesses approach innovation and service delivery. 
                  Built with cutting-edge technology to provide scalable, reliable, and high-performance solutions for modern enterprises.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8 opacity-0 fade-in-element">
                  <a 
                    href="https://aarambh-red.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="liquid-button-primary group"
                  >
                    <div className="liquid-button-bg-primary"></div>
                    <span className="relative z-10">Visit Platform</span>
                    <ExternalLink className="w-4 h-4 relative z-10" />
                  </a>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 opacity-0 fade-in-element">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pulse-600 dark:text-purple-400">95+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lighthouse Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pulse-600 dark:text-purple-400">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pulse-600 dark:text-purple-400">1.2s</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
                  </div>
                </div>
              </div>

              <div className="opacity-0 fade-in-element">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                    alt="Aarambh Platform"
                    className="rounded-2xl shadow-elegant w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Platform Capabilities</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover the powerful features that make Aarambh Platform the preferred choice for innovative businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-pulse-500 dark:text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Technical Stack */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Technical Excellence</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Built with modern web technologies and best practices to ensure scalability, performance, and maintainability.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
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

              {/* Achievements */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-pulse-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border border-pulse-200/30 dark:border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-pulse-500 dark:text-purple-400" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Enterprise Ready</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fully compliant with enterprise security standards and ready for large-scale deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Info Sidebar */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project Overview</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p>
                    The Aarambh Platform represents a significant leap forward in digital platform development, 
                    combining innovative design with robust functionality to deliver exceptional user experiences.
                  </p>
                  <p>
                    Our development approach focused on creating a scalable architecture that can grow with business needs 
                    while maintaining optimal performance across all devices and network conditions.
                  </p>
                  <p>
                    The platform leverages modern web technologies including React.js for the frontend, FastAPI for the backend, 
                    and is deployed on Vercel for optimal global distribution and performance.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Development Time</p>
                        <p className="font-medium text-gray-900 dark:text-white">24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Team Size</p>
                        <p className="font-medium text-gray-900 dark:text-white">3 developers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-pulse-500 dark:text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className="font-medium text-gray-900 dark:text-white">Live & Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-pulse-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Experience the Platform</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to see what Aarambh Platform can do for your business? Explore the live platform and discover 
              the possibilities for your next project.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://aarambh-red.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="liquid-button-primary group inline-flex items-center gap-2"
              >
                <div className="liquid-button-bg-primary"></div>
                <span className="relative z-10">Visit Platform</span>
                <ExternalLink className="w-4 h-4 relative z-10" />
              </a>
              <Link 
                to="/#contact" 
                className="transparent-glass-button group inline-flex items-center gap-2"
              >
                <div className="transparent-glass-bg"></div>
                <span className="relative z-10">Discuss Your Project</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AarambhProject;
