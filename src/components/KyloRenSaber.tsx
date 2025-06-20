import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KyloRenSaberProps {
  isEnabled: boolean;
  color: string;
  size: number;
  position: { x: number; y: number };
  rotation: number;
}

const KyloRenSaber: React.FC<KyloRenSaberProps> = ({
  isEnabled,
  color = "#ff2200",
  size = 1,
  position,
  rotation
}) => {
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number}>>([]);
  
  // Generate random particles
  useEffect(() => {
    if (!isEnabled) return;
    
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random().toString(),
        x: Math.random() * 20 - 10,
        y: Math.random() * getAdjustedBladeLength()
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isEnabled]);
  
  // Helper function to get adjusted blade length
  const getAdjustedBladeLength = () => {
    return 32 * 1.15 * size; // 1.15 is the blade length for Kylo's saber
  };
  
  // Blade thickness
  const bladeThickness = 0.6 * size;
  
  // Glow size
  const glowSize = 0.9 * size;
  
  if (!isEnabled) return null;
  
  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] mix-blend-screen"
      style={{
        x: position.x,
        y: position.y,
        translateX: "-50%",
        translateY: "-95%",
        rotate: `${rotation}deg`,
        willChange: 'transform',
      }}
    >
      {/* Hilt */}
      <div className="relative">
        <div
          className="w-1 h-5 rounded-sm shadow-lg relative"
          style={{
            backgroundColor: "#1a1a1a",
            filter: 'brightness(0.8) contrast(0.9) saturate(0.7)',
          }}
        >
          {/* Top emitter */}
          <div className="w-full h-0.5 bg-gray-400 rounded-t-sm"></div>
          {/* Main body */}
          <div className="w-full h-3 mt-0.5 bg-gray-800"></div>
          {/* Bottom grip */}
          <div className="w-full h-1 mt-0.5 bg-gray-600"></div>
          {/* Activation button */}
          <div className="absolute right-0 top-2 w-0.5 h-0.5 bg-red-500 rounded-full shadow-sm shadow-red-500"></div>
          {/* Side details */}
          <div className="absolute left-0 top-1.5 w-0.5 h-1 bg-gray-700 rounded-sm"></div>
          <div className="absolute right-0 top-1.5 w-0.5 h-1 bg-gray-700 rounded-sm"></div>
        </div>

        {/* Crossguard vents */}
        <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2">
          {/* Left crossguard */}
          <div className="absolute top-0 left-0 transform -translate-x-full">
            <div className="w-0.5 h-0.5 bg-gray-700"></div>
            <div 
              className="w-3 h-0.5 origin-left"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 0 5px #ffffff, 0 0 10px ${color}, 0 0 15px ${color}`,
                animation: "flicker 0.03s ease-in-out infinite alternate, crackedPulse 0.5s ease-in-out infinite"
              }}
            ></div>
          </div>
          
          {/* Right crossguard */}
          <div className="absolute top-0 right-0 transform translate-x-full">
            <div className="w-0.5 h-0.5 bg-gray-700"></div>
            <div 
              className="w-3 h-0.5 origin-right"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 0 5px #ffffff, 0 0 10px ${color}, 0 0 15px ${color}`,
                animation: "flicker 0.03s ease-in-out infinite alternate, crackedPulse 0.5s ease-in-out infinite"
              }}
            ></div>
          </div>
        </div>

        {/* Main Blade */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <AnimatePresence>
            {isEnabled && (
              <motion.div
                className="relative"
                initial={{ scaleY: 0, transformOrigin: "bottom" }}
                animate={{ scaleY: 1, transformOrigin: "bottom" }}
                exit={{ scaleY: 0, transformOrigin: "bottom" }}
                transition={{ duration: 0.15 }}
              >
                {/* Outer glow */}
                <div
                  className="blur-md"
                  style={{
                    width: `${bladeThickness * 2}px`,
                    height: `${getAdjustedBladeLength()}px`,
                    backgroundColor: color,
                    opacity: 0.25,
                    animation: "flicker 0.03s ease-in-out infinite alternate",
                    boxShadow: `0 0 ${glowSize * 4}px ${color}, 0 0 ${glowSize * 8}px ${color}, 0 0 ${glowSize * 12}px ${color}80`,
                    borderRadius: "50% 50% 0 0",
                  }}
                ></div>

                {/* Middle glow with unstable effect */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-sm"
                  style={{
                    width: `${bladeThickness * 1.5}px`,
                    height: `${getAdjustedBladeLength()}px`,
                    backgroundColor: color,
                    opacity: 0.4,
                    animation: "flicker 0.03s ease-in-out infinite alternate, crackedPulse 0.5s ease-in-out infinite",
                    boxShadow: `0 0 ${glowSize * 2.5}px ${color}, 0 0 ${glowSize * 5}px ${color}90`,
                    borderRadius: "50% 50% 0 0",
                    filter: "url(#kyloFilter)"
                  }}
                ></div>

                {/* Core blade with energy pattern */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: `${bladeThickness}px`,
                    height: `${getAdjustedBladeLength()}px`,
                    background: `linear-gradient(90deg, 
                      transparent 0%,
                      ${color}20 25%,
                      ${color}80 50%,
                      ${color}20 75%,
                      transparent 100%
                    )`,
                    backgroundSize: "200% 100%",
                    opacity: 1,
                    animation: "flicker 0.03s ease-in-out infinite alternate, energyPulse 2s ease-in-out infinite, crackedPulse 0.5s ease-in-out infinite",
                    boxShadow: `0 0 ${glowSize * 2}px #ffffff, 0 0 ${glowSize * 3}px ${color}, 0 0 ${glowSize * 5}px ${color}, inset 0 0 ${glowSize * 1}px ${color}`,
                    borderRadius: "50% 50% 0 0",
                  }}
                ></div>

                {/* Crackling energy particles */}
                {particles.map(particle => (
                  <motion.div 
                    key={particle.id}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: "2px",
                      height: "2px",
                      left: `calc(50% + ${particle.x}px)`,
                      top: particle.y,
                      boxShadow: `0 0 5px #ffffff, 0 0 8px ${color}`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                      y: [0, Math.random() * 10 - 5, Math.random() * 20 - 10]
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}

                {/* Tip pointer */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"
                  style={{
                    width: `${bladeThickness * 1.2}px`,
                    height: `${bladeThickness * 1.2}px`,
                    backgroundColor: "#ffffff",
                    boxShadow: `0 0 ${3 * glowSize}px #ffffff, 0 0 ${6 * glowSize}px ${color}, 0 0 ${9 * glowSize}px ${color}80`,
                    opacity: 0.9,
                    animation: "flicker 0.03s ease-in-out infinite alternate",
                    borderRadius: "50% 50% 0 0",
                    pointerEvents: 'none',
                  }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SVG Filters */}
      <svg className="absolute w-0 h-0 overflow-hidden">
        <filter id="kyloFilter" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.3" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite operator="in" in2="SourceGraphic" />
          
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" seed="3" result="lightning">
            <animate attributeName="baseFrequency" values="0.05;0.07;0.05" dur="0.8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="lightning" scale="3" xChannelSelector="R" yChannelSelector="G" />
          <feBlend mode="screen" in2="SourceGraphic" />
        </filter>
      </svg>

      {/* Animations */}
      <style jsx global>{`
        @keyframes flicker {
          0% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes energyPulse {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes crackedPulse {
          0% { opacity: 1; transform: scale(1); }
          10% { opacity: 0.85; transform: scale(0.98) translateX(1px); }
          20% { opacity: 0.9; transform: scale(1.01) translateX(-1px); }
          30% { opacity: 1; transform: scale(1); }
          40% { opacity: 0.8; transform: scale(0.97) translateX(-2px); }
          50% { opacity: 1; transform: scale(1.02); }
          60% { opacity: 0.9; transform: scale(1) translateX(1px); }
          70% { opacity: 1; transform: scale(0.99); }
          80% { opacity: 0.85; transform: scale(1.01) translateX(-1px); }
          90% { opacity: 0.9; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </motion.div>
  );
};

export default KyloRenSaber; 