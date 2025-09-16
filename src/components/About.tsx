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
              Hello, I'm Mohammed Raazi, a passionate Data Analyst based in Bangalore, India. I began studying 
              data science and AI development in 2022. After working on various projects and building my expertise, 
              I'm now focused on creating data-driven solutions that make a real impact. I specialize in machine learning 
              implementations, data visualization, and AI-powered applications.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              I focus on transforming complex data into actionable insights and building intelligent systems that 
              solve real-world problems. My approach combines technical expertise with creative problem-solving 
              to deliver solutions that are both effective and user-friendly.
            </p>
          </motion.div>

          {/* What is Important Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              What is important
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Data integrity and ethical AI come first. High-quality insights depend on both technical precision 
              and responsible data practices. I believe in transparent methodologies, collaborative problem-solving, 
              and creating solutions that benefit users while respecting privacy and fairness.
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
              className="inline-flex items-center px-8 py-4 bg-pulse-500 hover:bg-pulse-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;