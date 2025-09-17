import React from "react";
import { motion, Variants } from "framer-motion";

const About = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const awards = [
    { platform: "Kaggle", achievement: "Competition Participant", count: "3+" },
    { platform: "GitHub", achievement: "Open Source Contributions", count: "50+" },
    { platform: "Coursera", achievement: "Data Science Certificates", count: "5+" },
    { platform: "HackerRank", achievement: "Python & SQL Badges", count: "10+" }
  ];

  return (
    <section id="about" className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About
            </h1>
          </motion.div>

          {/* Main Introduction */}
          <motion.div variants={itemVariants} className="space-y-6">
  <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
    Hi, I'm Mohammed Raazi — an AI Engineer and Data Analyst based in Bangalore, India. 
    Since 2022, I’ve been passionate about turning data into intelligent, real-world solutions. 
    With hands-on experience in machine learning, cloud systems, and LLM-powered applications, 
    I specialize in building AI-driven tools across web and mobile platforms.
  </p>
  <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
    My work spans from developing scalable infrastructure monitoring platforms 
    to creating interactive data visualizations and autonomous AI agents. 
    I focus on transforming complex problems into actionable insights and deploying 
    production-ready systems that are reliable, secure, and user-friendly.
  </p>
  <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
    Beyond technical expertise, I’m driven by the impact AI can make — 
    whether it’s reducing downtime, enabling smarter decisions, or delivering 
    innovative user experiences that scale to hundreds of active users.
  </p>
</motion.div>


          {/* What is Important Section */}
          <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
    Core Values
  </h2>
  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
    I prioritize data integrity and ethical AI above everything else. 
    Reliable insights come not only from technical precision but also from responsible data practices. 
    In my work, I follow transparent processes, encourage collaboration, and design solutions 
    that are fair, privacy-conscious, and genuinely valuable for users.
  </p>
          </motion.div>

          {/* Scope of Work Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Scope of work
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Data Analysis",
                "Machine Learning",
                "AI Development", 
                "Data Visualization",
                "Python Development",
                "SQL & Databases",
                "App Devolopment",
                "Web Development"
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          
          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <motion.a
              href="#projects"
              className="group relative inline-flex items-center px-8 py-4 font-semibold rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm bg-transparent border border-gray-300/30 dark:border-white/20 hover:border-pulse-500/50 dark:hover:border-pulse-400/50 shadow-lg hover:shadow-xl hover:shadow-pulse-500/20 dark:hover:shadow-pulse-400/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glass background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-white/2 dark:to-white/5 opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              
              {/* Corner highlights */}
              <div className="absolute top-0 left-0 w-4 h-4 rounded-br-2xl bg-gradient-radial from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 rounded-bl-2xl bg-gradient-radial from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 rounded-tr-2xl bg-gradient-radial from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-tl-2xl bg-gradient-radial from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button text */}
              <span className="relative z-10 text-gray-900 dark:text-white group-hover:text-pulse-600 dark:group-hover:text-pulse-400 transition-colors duration-300">
                View My Projects
              </span>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-pulse-500/10 dark:bg-pulse-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;