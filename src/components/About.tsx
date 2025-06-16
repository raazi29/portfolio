
import React, { useEffect, useRef } from "react";
import { cn } from '@/lib/util';
import { GraduationCap, MapPin, Code, Database, Brain, TrendingUp } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const elements = entry.target.querySelectorAll<HTMLElement>(".fade-in-element");
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

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const highlights = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Advanced knowledge in AI algorithms and ML implementations",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-purple-100",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
      iconBg: "bg-purple-500",
      textColor: "text-purple-700 dark:text-purple-300"
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Expert in data visualization and statistical analysis",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-blue-100",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      iconBg: "bg-blue-500",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in modern web technologies and frameworks",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-green-100",
      darkBgGradient: "from-green-900/20 to-emerald-900/20",
      iconBg: "bg-green-500",
      textColor: "text-green-700 dark:text-green-300"
    },
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Transforming data into actionable business insights",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-orange-100",
      darkBgGradient: "from-orange-900/20 to-red-900/20",
      iconBg: "bg-orange-500",
      textColor: "text-orange-700 dark:text-orange-300"
    }
  ];

  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      id="about"
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pulse-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pulse-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="section-container relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/80 dark:bg-white/10 backdrop-blur-xl text-pulse-700 dark:text-pulse-300 border border-pulse-200/30 dark:border-white/20 shadow-lg opacity-0 fade-in-element mx-auto w-fit mb-6">
              <span>About Me</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight bg-gradient-to-r from-gray-900 via-pulse-600 to-gray-900 dark:from-gray-100 dark:via-pulse-400 dark:to-gray-100 bg-clip-text text-transparent opacity-0 fade-in-element text-center mb-8">
              Passionate about Data-Driven Innovation
            </h2>

            <div className="max-w-4xl mx-auto opacity-0 fade-in-element">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6 font-medium">
                I'm Mohammed Raazi, an aspiring Data Analyst pursuing B.E. in Artificial Intelligence & Data Science.
                      With a strong foundation in Python, SQL, Machine Learning,
                and AI-based applications, I'm passionate about transforming data into actionable insights.
              </p>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                Currently focused on healthcare and accessibility analytics, I bring hands-on experience in FastAPI,
                Python,SQL and React, with a strong enthusiasm for contributing to impactful, data-driven projects.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 opacity-0 fade-in-element">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-8 text-center transition-all duration-300",
                  "bg-white dark:bg-gray-800/90 backdrop-blur-xl",
                  "border border-gray-200/50 dark:border-gray-700/50",
                  "hover:shadow-lg hover:-translate-y-2 transform-gpu",
                  "shadow-sm"
                )}
              >
                <div className="relative z-10">
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                    highlight.iconBg,
                    "group-hover:scale-110 transform-gpu",
                    "shadow-sm"
                  )}>
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-3 text-lg transition-all duration-300">
                    {highlight.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 leading-relaxed font-medium">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 fade-in-element max-w-5xl mx-auto">
            <div className="group relative overflow-hidden bg-white dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-10 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 transform-gpu shadow-sm">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-pulse-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-sm transform-gpu">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-xl transition-all duration-300">
                  Education
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">B.E. in AI & Data Science</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Don Bosco Institute of Technology</p>
                <p className="text-gray-500 dark:text-gray-500 font-medium">Bangalore, India</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-10 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 transform-gpu shadow-sm">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-white-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-sm transform-gpu">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-xl transition-all duration-300">
                  Location & Availability
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">Bangalore, India</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">Available for Remote Work</p>
                <div className="inline-flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium rounded-full border border-emerald-200 dark:border-emerald-500/30 shadow-sm transition-all duration-300">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                  Open to Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
