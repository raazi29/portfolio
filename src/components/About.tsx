import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";

const ParallaxText = ({ children, progress, range }) => {
  const gap = range[1] - range[0];
  const inputRange = [range[0], range[0] + gap * 0.2, range[1] - gap * 0.2, range[1]];

  const opacity = useTransform(progress, inputRange, [0.15, 1, 1, 0.15]);
  const filter = useTransform(
    progress,
    inputRange,
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
  );
  
  return (
    <motion.span
      style={{ opacity, filter }}
      className="block text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-center text-gray-800 dark:text-gray-200 tracking-tight"
    >
      {children}
    </motion.span>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const [contentHeight, setContentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
      setWindowHeight(window.innerHeight);
    };
    
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(contentHeight > windowHeight ? contentHeight - windowHeight : 0)]
  );

  const aboutContent = [
    "I'm Mohammed Raazi",
    "An aspiring Data Analyst",
    "Studying AI & Data Science.",
    " ",
    "My expertise includes",
    "AI & Machine Learning",
    "Data Analytics",
    "AI Development",
    "and Full-Stack Development.",
    " ",
    "Based in Bangalore, India",
    "I'm available for remote work",
    "and open to new opportunities.",
  ];

  const totalLines = aboutContent.length;
  const gap = 1 / totalLines;

  const navigate = useNavigate();

  return (
    <div id="about" ref={sectionRef} className="relative h-[800vh] bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-[#111] dark:via-[#111] dark:to-black">
      <ParticlesBackground />
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={contentRef} style={{ y }} className="flex flex-col gap-8 items-center justify-center px-4 py-[50vh]">
          {aboutContent.map((text, i) => {
            const start = i * gap;
            const end = start + gap;

            if (i === aboutContent.length - 1) {
              const textOpacity = useTransform(scrollYProgress, [end - 0.05, end], [1, 0]);
              const buttonOpacity = useTransform(scrollYProgress, [end - 0.05, end], [0, 1]);
              const buttonScale = useTransform(scrollYProgress, [end - 0.05, end], [0.8, 1]);

              return (
                <div key={i} className="relative">
                  <ParallaxText progress={scrollYProgress} range={[start, end]}>
                    <motion.span style={{ opacity: textOpacity }}>{text}</motion.span>
                  </ParallaxText>
                  <motion.button
                    style={{ opacity: buttonOpacity, scale: buttonScale }}
                    className="absolute inset-0 w-full h-full text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight"
                    onClick={() => navigate("/#projects")}
                  >
                    View My Work
                  </motion.button>
                </div>
              );
            }

            if (text === " ") {
              return <div key={i} className="h-16 md:h-24"></div>;
            }
            return (
              <ParallaxText key={i} progress={scrollYProgress} range={[start, end]}>
                {text}
              </ParallaxText>
            );
          })}
        </motion.div>
        </div>
      </div>
  );
};

export default About;