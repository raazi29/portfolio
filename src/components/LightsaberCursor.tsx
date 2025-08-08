import React, { useEffect, useRef, useState, useCallback } from "react";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";



interface LightsaberSettings {

  color: string;

  intensity: number;

  flickerSpeed: number;

  bladeLength: number;

  glowSize: number;

  hiltColor: string;

  bladeThickness: number;

  sparkCount: number;

  slashTrailLength: number;

  slashDuration: number;

  tiltSensitivity: number;

  bladeStyle: 'stable' | 'unstable' | 'fiery';

  corePulseSpeed: number;

  tipShape: 'rounded' | 'pointed' | 'flat';

  hasCrossguard: boolean;

  hiltStyle: 'standard' | 'graflex' | 'vader' | 'curved';

  hiltWeathering: number;

  isDoubleBladed: boolean;

  isLightwhip: boolean;

  isShoto: boolean;

  hasBladeGradient: boolean;

  bladePattern: 'solid' | 'striped' | 'spiral' | 'energy' | 'crystal';

}



interface SlashEffect {

  id: string;

  x: number;

  y: number;

  rotation: number;

  direction: { x: number; y: number };

  velocity: number;

}



interface CursorState {

  isSlashing: boolean;

  slashRotation: number;

}



interface LightsaberCursorProps {

  isEnabled: boolean;

  settings: LightsaberSettings;

}



// Audio Pool Management with graceful fallback

const createAudioPool = (src: string, count: number) => {

  const pool: HTMLAudioElement[] = [];

  for (let i = 0; i < count; i++) {

    try {

      const audio = new Audio(src);

      audio.preload = "auto";

      pool.push(audio);

    } catch (error) {

      console.warn(`Failed to create audio for ${src}:`, error);

    }

  }

  let currentIndex = 0;

  return {

    play: (volume: number = 1) => {

      if (pool.length === 0) return;

      const audio = pool[currentIndex];

      audio.volume = volume;

      audio.currentTime = 0;

      audio.play().catch(e => console.warn("Audio play failed:", e));

      currentIndex = (currentIndex + 1) % pool.length;

    },

    stopAll: () => {

      pool.forEach(audio => {

        audio.pause();

        audio.currentTime = 0;

      });

    }

  };

};



const humAudio = typeof Audio !== 'undefined' ? new Audio("/sounds/lightsaber-hum.mp3") : null;

if (humAudio) {

  humAudio.loop = true;

  humAudio.volume = 0.2;

  humAudio.play().catch(e => console.warn("Hum audio play failed:", e));

}



const swingPool = createAudioPool("/sounds/lightsaber-swing.mp3", 3);

const slashPool = createAudioPool("/sounds/lightsaber-slash.mp3", 3);

const ignitionPool = createAudioPool("/sounds/lightsaber-ignition.mp3", 1);

const retractionPool = createAudioPool("/sounds/lightsaber-retraction.mp3", 1);



function LightsaberCursor({

  isEnabled,

  settings,

}: LightsaberCursorProps) {

  const cursorX = useMotionValue(-100);

  const cursorY = useMotionValue(-100);

  const cursorRef = useRef<HTMLDivElement>(null);

  const [slashEffects, setSlashEffects] = useState<SlashEffect[]>([]);

  const lastMousePos = useRef({ x: 0, y: 0 });

  const mouseVelocity = useRef({ x: 0, y: 0 });

  const [cursorState, setCursorState] = useState<CursorState>({

    isSlashing: false,

    slashRotation: 0,

  });

  const [isBladeActive, setIsBladeActive] = useState(false);

  const [isInteractiveHover, setIsInteractiveHover] = useState(false);



  const cursorXSpring = useSpring(cursorX, {

    damping: 25, // Slightly reduced damping for a bit more 'snap'

    stiffness: 400, // Increased stiffness for quicker response

    mass: 0.05,

    restDelta: 0.001

  });

  const cursorYSpring = useSpring(cursorY, {

    damping: 25, // Slightly reduced damping for a bit more 'snap'

    stiffness: 400, // Increased stiffness for quicker response

    mass: 0.05,

    restDelta: 0.001

  });



  // Blade animation and sound effects

  useEffect(() => {

    if (isEnabled) {

      setIsBladeActive(true);

      ignitionPool.play();

      if (humAudio) {

        humAudio.play().catch(e => console.warn("Hum audio play failed:", e));

      }

    } else {

      setIsBladeActive(false);

      retractionPool.play();

      if (humAudio) {

        humAudio.pause();

        humAudio.currentTime = 0;

      }

    }

  }, [isEnabled]);



  useEffect(() => {

    if (isEnabled) {

      document.body.style.cursor = "none";

    } else {

      document.body.style.cursor = "auto";

      return;

    }



    const followMouse = (e: MouseEvent) => {

      // Add small offset for better alignment

      const offsetX = 0;

      const offsetY = -5; // Small offset to align blade with cursor point

      

      const newVelocity = {

        x: e.clientX - lastMousePos.current.x,

        y: e.clientY - lastMousePos.current.y

      };



      mouseVelocity.current = newVelocity;

      lastMousePos.current = { x: e.clientX, y: e.clientY };



      const velocityMagnitude = Math.sqrt(newVelocity.x ** 2 + newVelocity.y ** 2);

      if (velocityMagnitude > 20 && isEnabled) {

        swingPool.play(0.3);

      }



      // Direct position update with offset for better accuracy

      cursorX.set(e.clientX + offsetX);

      cursorY.set(e.clientY + offsetY);

      

      // Force immediate update for more responsive cursor

      if (cursorRef.current) {

        cursorRef.current.style.transform = `translate(${e.clientX + offsetX}px, ${e.clientY + offsetY}px) translateX(-50%) translateY(-90%) rotate(${cursorState.isSlashing ? 15 + cursorState.slashRotation : 15}deg)`;

      }



      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

      setIsInteractiveHover(elementUnderCursor?.classList.contains('lightsaber-interactive') || false);

    };



    const handleClick = (e: MouseEvent) => {

      if (!isEnabled) return;



      slashPool.play(0.6);



      if (navigator.vibrate) {

        navigator.vibrate(30);

      }



      const tipOffsetX = Math.sin(15 * Math.PI / 180) * (settings.bladeLength * 32);

      const tipOffsetY = -Math.cos(15 * Math.PI / 180) * (settings.bladeLength * 32);



      const tipX = e.clientX + tipOffsetX;

      const tipY = e.clientY + tipOffsetY;



      const velocityMagnitude = Math.sqrt(mouseVelocity.current.x ** 2 + mouseVelocity.current.y ** 2);

      const normalizedVelocity = velocityMagnitude > 0 ? {

        x: mouseVelocity.current.x / velocityMagnitude,

        y: mouseVelocity.current.y / velocityMagnitude

      } : { x: 1, y: 0 };



      const slashAngle = Math.atan2(normalizedVelocity.y, normalizedVelocity.x) * (180 / Math.PI);

      const naturalArc = Math.sin(Date.now() * 0.01) * 15;



      const speedFactor = Math.min(velocityMagnitude / 10, 3);

      const slashTilt = slashAngle * settings.tiltSensitivity + naturalArc + (Math.random() - 0.5) * 20;



      const newSlash: SlashEffect = {

        id: Math.random().toString(36).substr(2, 9),

        x: tipX,

        y: tipY,

        rotation: slashAngle + naturalArc,

        direction: normalizedVelocity,

        velocity: Math.max(velocityMagnitude, 8),

      };



      setSlashEffects(prev => [...prev, newSlash]);



      setCursorState({

        isSlashing: true,

        slashRotation: slashTilt * speedFactor,

      });



      const resetDelay = Math.max(120, settings.slashDuration * 300);

      setTimeout(() => {

        setCursorState({

          isSlashing: false,

          slashRotation: 0,

        });

      }, resetDelay);



      setTimeout(() => {

        setSlashEffects(prev => prev.filter(slash => slash.id !== newSlash.id));

      }, settings.slashDuration * 1000);

    };



    window.addEventListener("mousemove", followMouse);

    window.addEventListener("click", handleClick);



    return () => {

      window.removeEventListener("mousemove", followMouse);

      window.removeEventListener("click", handleClick);

      document.body.style.cursor = "auto";

    };

  }, [cursorX, cursorY, isEnabled, settings]);



  if (!isEnabled) return null;



  const bladeFilter = settings.bladeStyle === 'unstable' ? `url(#turbulence)` : 'none';

  

  // Helper function to get border radius based on tip shape

  const getTipBorderRadius = () => {

    switch (settings.tipShape) {

      case 'pointed':

        return '50% 50% 0 0';

      case 'flat':

        return '2px 2px 0 0';

      case 'rounded':

      default:

        return '9999px';

    }

  };



  // Helper function to apply weathering effects

  const getWeatheringStyle = (baseColor: string) => {

    const weathering = settings.hiltWeathering;

    if (weathering === 0) return { backgroundColor: baseColor };

    

    const grayscaleAmount = weathering * 0.3;

    const darkenAmount = weathering * 0.4;

    const scratchOpacity = weathering * 0.6;

    

    return {

      backgroundColor: baseColor,

      filter: `grayscale(${grayscaleAmount}) brightness(${1 - darkenAmount})`,

      backgroundImage: `linear-gradient(45deg, 

        transparent 0%, 

        rgba(0,0,0,${scratchOpacity * 0.3}) 20%, 

        transparent 40%, 

        rgba(0,0,0,${scratchOpacity * 0.2}) 60%, 

        transparent 80%, 

        rgba(0,0,0,${scratchOpacity * 0.4}) 100%)`,

    };

  };



  // Helper function to get blade pattern styles

  const getBladePatternStyle = () => {

    switch (settings.bladePattern) {

      case 'striped':

        return {

          backgroundImage: `repeating-linear-gradient(

            90deg,

            transparent 0px,

            transparent 4px,

            ${settings.color} 4px,

            ${settings.color} 8px

          )`,

        };

      case 'spiral':

        return {

          backgroundImage: `repeating-conic-gradient(

            from 0deg,

            ${settings.color} 0deg,

            transparent 20deg,

            transparent 40deg,

            ${settings.color} 40deg,

            ${settings.color} 60deg

          )`,

        };

      case 'energy':

        return {

          backgroundImage: `linear-gradient(

            90deg,

            transparent 0%,

            ${settings.color}20 25%,

            ${settings.color}80 50%,

            ${settings.color}20 75%,

            transparent 100%

          )`,

          animation: `energyPulse ${settings.flickerSpeed * 2}s ease-in-out infinite`,

        };

      case 'crystal':

        return {

          backgroundImage: `radial-gradient(

            ellipse at center,

            ${settings.color} 0%,

            ${settings.color}80 30%,

            transparent 70%

          )`,

          backgroundSize: '8px 8px',

          animation: `crystalShimmer ${settings.flickerSpeed * 3}s ease-in-out infinite`,

        };

      case 'solid':

      default:

        return { backgroundColor: settings.color };

    }

  };



  // Helper function to get blade width gradient

  const getBladeGradientStyle = () => {

    if (!settings.hasBladeGradient) return {};

    

    return {

      background: `linear-gradient(to top,

        ${settings.color} 0%,

        ${settings.color} 20%,

        ${settings.color}80 50%,

        ${settings.color}60 80%,

        ${settings.color}40 100%

      )`,

      width: `calc(${settings.glowSize * 1.5 * settings.bladeThickness}px * (1 + 0.5 * var(--gradient-pos)))`,

    };

  };



  // Helper function to get adjusted blade length

  const getAdjustedBladeLength = () => {

    let length = settings.bladeLength * 32;

    if (settings.isShoto) {

      length *= 0.6; // Shoto is 60% of normal length

    }

    return length;

  };



  // Helper function to get lightwhip animation

  const getLightwhipStyle = () => {

    if (!settings.isLightwhip) return {};

    

    return {

      animation: `lightwhipWave ${settings.flickerSpeed * 4}s ease-in-out infinite`,

      filter: 'blur(1px)',

      transform: 'scaleY(0.8)',

    };

  };



  // Hilt Components

  const StandardHilt = () => (

    <div

      className="w-1 h-4 rounded-sm shadow-lg"

      style={getWeatheringStyle(`linear-gradient(to bottom, ${settings.hiltColor}dd, ${settings.hiltColor}aa, ${settings.hiltColor}77)`)}

    >

      <div className="w-full h-0.5 bg-gray-200 rounded-t-sm"></div>

      <div className="w-full h-0.5 mt-0.5 shadow-sm"

        style={{

          backgroundColor: settings.color,

          boxShadow: `0 0 2px ${settings.color}`

        }}

      ></div>

      <div className="w-full h-0.5 bg-gray-600 mt-0.5"></div>

      <div className="absolute right-0 top-2 w-0.5 h-0.5 bg-red-500 rounded-full shadow-sm shadow-red-500"></div>

    </div>

  );



  const GraflexHilt = () => (

    <div

      className="w-1 h-5 rounded-sm shadow-lg relative"

      style={getWeatheringStyle(`linear-gradient(to bottom, #c0c0c0dd, #a0a0a0aa, #80808077)`)}

    >

      {/* Top section */}

      <div className="w-full h-1 bg-gray-300 rounded-t-sm"></div>

      {/* Middle grip section */}

      <div className="w-full h-2 mt-0.5 bg-gray-400"></div>

      {/* Bottom section */}

      <div className="w-full h-1 mt-0.5 bg-gray-200"></div>

      {/* Activation button */}

      <div className="absolute right-0 top-1.5 w-0.5 h-0.5 bg-red-500 rounded-full shadow-sm shadow-red-500"></div>

      {/* Side grips */}

      <div className="absolute left-0 top-1.5 w-0.5 h-1 bg-gray-600 rounded-sm"></div>

      <div className="absolute right-0 top-1.5 w-0.5 h-1 bg-gray-600 rounded-sm"></div>

    </div>

  );



  const VaderHilt = () => (

    <div

      className="w-1 h-5 rounded-sm shadow-lg relative"

      style={getWeatheringStyle(`linear-gradient(to bottom, #2c2c2cdd, #1a1a1aaa, #0a0a0a77)`)}

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

  );



  const CurvedHilt = () => (

    <div

      className="w-1 h-4 rounded-sm shadow-lg relative"

      style={getWeatheringStyle(`linear-gradient(to bottom, #d4af37dd, #b8941faa, #8b691477)`)}

    >

      {/* Curved shape simulation */}

      <div className="w-full h-0.5 bg-yellow-300 rounded-t-sm"></div>

      <div className="w-full h-2 mt-0.5 bg-yellow-400"></div>

      <div className="w-full h-0.5 mt-0.5 bg-yellow-300"></div>

      {/* Activation button */}

      <div className="absolute right-0 top-2 w-0.5 h-0.5 bg-red-500 rounded-full shadow-sm shadow-red-500"></div>

      {/* Curved grip details */}

      <div className="absolute left-0 top-1.5 w-0.5 h-1 bg-yellow-500 rounded-sm"></div>

      <div className="absolute right-0 top-1.5 w-0.5 h-1 bg-yellow-500 rounded-sm"></div>

    </div>

  );



  // Function to render the appropriate hilt

  const renderHilt = () => {

    switch (settings.hiltStyle) {

      case 'graflex':

        return <GraflexHilt />;

      case 'vader':

        return <VaderHilt />;

      case 'curved':

        return <CurvedHilt />;

      case 'standard':

      default:

        return <StandardHilt />;

    }

  };



  return (

    <>

      {/* SVG Filters for Unstable Blade */}

      {settings.bladeStyle === 'unstable' && (

        <svg className="absolute w-0 h-0 overflow-hidden">

          <filter id="turbulence" x="0" y="0" width="100%" height="100%">

            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.5" numOctaves="2" result="turbulence" />

            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />

          </filter>

        </svg>

      )}



      {/* Slash Effects */}

      <AnimatePresence>

        {slashEffects.map((slash) => (

          <motion.div

            key={slash.id}

            className="pointer-events-none fixed z-[9998]"

            style={{

              left: slash.x,

              top: slash.y,

              transform: `translate(-50%, -50%) rotate(${slash.rotation}deg)`,

            }}

            initial={{ opacity: 0, scale: 0 }}

            animate={{ opacity: 1, scale: 1 }}

            exit={{ opacity: 0, scale: 0 }}

            transition={{ duration: 0.4, ease: "easeOut" }}

          >

            {/* Simplified Slash Arc */}

            <motion.div

              className="relative"

              initial={{ scaleX: 0, opacity: 0 }}

              animate={{ scaleX: 1, opacity: 1 }}

              exit={{ scaleX: 0, opacity: 0 }}

              transition={{ duration: 0.1, ease: "easeOut" }}

            >

              {/* Primary slash trail - Enhanced glow */}

              <motion.div

                className="absolute"

                style={{

                  width: `${(80 + slash.velocity * 4) * settings.slashTrailLength}px`,

                  height: `${4 * settings.bladeThickness}px`,

                  background: `linear-gradient(90deg, 

                    transparent 0%, 

                    ${settings.color}30 10%, 

                    ${settings.color}90 30%, 

                    #ffffff 50%, 

                    ${settings.color}90 70%, 

                    ${settings.color}30 90%, 

                    transparent 100%)`,

                  borderRadius: `${3 * settings.bladeThickness}px`,

                  boxShadow: `

                    0 0 ${15 * settings.glowSize}px ${settings.color}, 

                    0 0 ${30 * settings.glowSize}px ${settings.color}, 

                    0 0 ${45 * settings.glowSize}px ${settings.color}80,

                    0 0 ${60 * settings.glowSize}px ${settings.color}60,

                    0 0 ${75 * settings.glowSize}px ${settings.color}40

                  `,

                  transformOrigin: 'left center',

                }}

                initial={{ scaleX: 0, opacity: 0 }}

                animate={{ scaleX: 1, opacity: 1 }}

                exit={{ scaleX: 0, opacity: 0 }}

                transition={{ duration: settings.slashDuration * 0.2, ease: "easeOut" }}

              />



              {/* Secondary trail - Outer energy field */}

              <motion.div

                className="absolute"

                style={{

                  width: `${(120 + slash.velocity * 6) * settings.slashTrailLength}px`,

                  height: `${2 * settings.bladeThickness}px`,

                  background: `linear-gradient(90deg, 

                    transparent 0%, 

                    ${settings.color}50 20%, 

                    ${settings.color}80 50%, 

                    ${settings.color}50 80%, 

                    transparent 100%)`,

                  top: `${1 * settings.bladeThickness}px`,

                  transformOrigin: 'left center',

                  borderRadius: `${2 * settings.bladeThickness}px`,

                  boxShadow: `0 0 ${12 * settings.glowSize}px ${settings.color}90`,

                }}

                initial={{ scaleX: 0, opacity: 0 }}

                animate={{ scaleX: 1, opacity: 0.8 }}

                exit={{ scaleX: 0, opacity: 0 }}

                transition={{ duration: settings.slashDuration * 0.3, ease: "easeOut" }}

              />



              {/* Core white-hot trail */}

              <motion.div

                className="absolute"

                style={{

                  width: `${(60 + slash.velocity * 3) * settings.slashTrailLength}px`,

                  height: `${1.5 * settings.bladeThickness}px`,

                  background: `linear-gradient(90deg, 

                    transparent 0%, 

                    #ffffff60 25%, 

                    #ffffff 50%, 

                    #ffffff60 75%, 

                    transparent 100%)`,

                  top: `${1.25 * settings.bladeThickness}px`,

                  transformOrigin: 'left center',

                  borderRadius: `${1.5 * settings.bladeThickness}px`,

                  boxShadow: `0 0 ${8 * settings.glowSize}px #ffffff`,

                }}

                initial={{ scaleX: 0, opacity: 0 }}

                animate={{ scaleX: 1, opacity: 1 }}

                exit={{ scaleX: 0, opacity: 0 }}

                transition={{ duration: settings.slashDuration * 0.15, ease: "easeOut" }}

              />



              {/* Impact flash - Enhanced */}

              <motion.div

                className="absolute"

                style={{

                  width: `${10 * settings.glowSize}px`,

                  height: `${10 * settings.glowSize}px`,

                  background: `radial-gradient(circle, #ffffff, ${settings.color}90, transparent)`,

                  borderRadius: '50%',

                  left: `-${5 * settings.glowSize}px`,

                  top: `-${3 * settings.glowSize}px`,

                  boxShadow: `

                    0 0 ${20 * settings.glowSize}px ${settings.color},

                    0 0 ${40 * settings.glowSize}px ${settings.color}80,

                    0 0 ${60 * settings.glowSize}px ${settings.color}60

                  `,

                }}

                initial={{ scale: 0, opacity: 0 }}

                animate={{ scale: [0, 2.5, 1], opacity: [0, 1, 0] }}

                transition={{ duration: settings.slashDuration * 0.3, ease: "easeOut" }}

              />



              {/* Energy pulse rings */}

              <motion.div

                className="absolute"

                style={{

                  width: `${20 * settings.glowSize}px`,

                  height: `${20 * settings.glowSize}px`,

                  border: `2px solid ${settings.color}`,

                  borderRadius: '50%',

                  left: `-${10 * settings.glowSize}px`,

                  top: `-${8 * settings.glowSize}px`,

                  boxShadow: `0 0 ${15 * settings.glowSize}px ${settings.color}60`,

                }}

                initial={{ scale: 0, opacity: 0 }}

                animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}

                transition={{ duration: settings.slashDuration * 0.4, ease: "easeOut" }}

              />



              <motion.div

                className="absolute"

                style={{

                  width: `${30 * settings.glowSize}px`,

                  height: `${30 * settings.glowSize}px`,

                  border: `1px solid ${settings.color}80`,

                  borderRadius: '50%',

                  left: `-${15 * settings.glowSize}px`,

                  top: `-${13 * settings.glowSize}px`,

                  boxShadow: `0 0 ${10 * settings.glowSize}px ${settings.color}40`,

                }}

                initial={{ scale: 0, opacity: 0 }}

                animate={{ scale: [0, 1.2, 1.8], opacity: [0, 0.6, 0] }}

                transition={{ duration: settings.slashDuration * 0.5, ease: "easeOut" }}

              />

            </motion.div>



            {/* Enhanced Sparks */}

            {[...Array(Math.min(settings.sparkCount, 8))].map((_, i) => {

              const sparkAngle = slash.rotation + (Math.random() - 0.5) * 100;

              const sparkDistance = 40 + Math.random() * 60;

              const sparkX = Math.cos(sparkAngle * Math.PI / 180) * sparkDistance;

              const sparkY = Math.sin(sparkAngle * Math.PI / 180) * sparkDistance;

              const sparkSize = 1.5 + Math.random() * 3;

              const isLargeSpark = Math.random() > 0.6;

              const sparkColor = i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? settings.color : '#ffaa00';



              return (

                <motion.div

                  key={i}

                  className="absolute"

                  style={{

                    width: `${sparkSize * (isLargeSpark ? 1.5 : 1)}px`,

                    height: `${sparkSize * 0.6}px`,

                    backgroundColor: sparkColor,

                    borderRadius: isLargeSpark ? '50%' : '2px',

                    boxShadow: `

                      0 0 ${sparkSize * 4}px ${sparkColor},

                      0 0 ${sparkSize * 8}px ${sparkColor}80,

                      0 0 ${sparkSize * 12}px ${sparkColor}60

                    `,

                  }}

                  initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: Math.random() * 360 }}

                  animate={{

                    x: sparkX + (Math.random() - 0.5) * 20,

                    y: sparkY + Math.random() * 30 + 10,

                    opacity: 0,

                    scale: isLargeSpark ? [1, 1.8, 0] : [1, 0.8, 0],

                    rotate: Math.random() * 720 + 180,

                  }}

                  transition={{

                    duration: (0.4 + Math.random() * 0.3) * settings.slashDuration,

                    delay: i * 0.03,

                    ease: [0.25, 0.46, 0.45, 0.94],

                  }}

                />

              );

            })}



            {/* Additional energy particles */}

            {[...Array(Math.floor(settings.sparkCount / 2))].map((_, i) => {

              const particleAngle = slash.rotation + (Math.random() - 0.5) * 60;

              const particleDistance = 20 + Math.random() * 40;

              const particleX = Math.cos(particleAngle * Math.PI / 180) * particleDistance;

              const particleY = Math.sin(particleAngle * Math.PI / 180) * particleDistance;



              return (

                <motion.div

                  key={`particle-${i}`}

                  className="absolute rounded-full"

                  style={{

                    width: '1px',

                    height: '1px',

                    backgroundColor: settings.color,

                    boxShadow: `0 0 ${6 * settings.glowSize}px ${settings.color}`,

                  }}

                  initial={{

                    x: 0,

                    y: 0,

                    opacity: 0.8,

                    scale: 1,

                  }}

                  animate={{

                    x: particleX * 2,

                    y: particleY * 2 + Math.random() * 20,

                    opacity: 0,

                    scale: [1, 2.5, 0],

                  }}

                  transition={{

                    duration: (0.3 + Math.random() * 0.2) * settings.slashDuration,

                    delay: i * 0.02,

                    ease: "easeOut",

                  }}

                />

              );

            })}

          </motion.div>

        ))}

      </AnimatePresence>



      {/* Main Lightsaber Cursor */}

      <motion.div

        ref={cursorRef}

        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"

        style={{

          x: cursorXSpring,

          y: cursorYSpring,

          translateX: "-50%",

          translateY: "-95%", /* Adjusted for better alignment with cursor point */

          rotate: cursorState.isSlashing ? `${15 + cursorState.slashRotation}deg` : "15deg",

          willChange: 'transform',

          transition: 'none',

        }}

        animate={{

          rotate: cursorState.isSlashing ? 15 + cursorState.slashRotation : 15,

        }}

        transition={{

          rotate: {

            duration: cursorState.isSlashing ? 0.1 : 0.2,

            ease: cursorState.isSlashing ? "easeOut" : "easeInOut",

          }

        }}

      >

        {/* Lightsaber Hilt */}

        <div className="relative">

          {renderHilt()}



          {/* Crossguard Vents */}

          {settings.hasCrossguard && isBladeActive && (

            <>

              {/* Left Crossguard Vent */}

              <div className="absolute top-1 left-0 transform -translate-x-full -translate-y-1/2">

                <AnimatePresence>

                  <motion.div

                    className="relative"

                    initial={{ scaleX: 0, transformOrigin: "right" }}

                    animate={{ scaleX: 1, transformOrigin: "right" }}

                    exit={{ scaleX: 0, transformOrigin: "right" }}

                    transition={{ duration: 0.1 }}

                  >

                    {/* Crossguard outer glow */}

                    <div

                      className="blur-sm"

                      style={{

                        width: `${settings.glowSize * 3}px`,

                        height: `${settings.glowSize * 1.5 * settings.bladeThickness}px`,

                        backgroundColor: settings.color,

                        opacity: settings.intensity * 0.2,

                        animation: `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 3}px ${settings.color}`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                      }}

                    ></div>

                    {/* Crossguard core */}

                    <div

                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

                      style={{

                        width: `${settings.glowSize * 1.5}px`,

                        height: `${settings.glowSize * 0.8 * settings.bladeThickness}px`,

                        backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                        opacity: settings.intensity * 0.8,

                        animation: settings.corePulseSpeed > 0 

                          ? `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate, corePulse ${settings.corePulseSpeed * 0.8}s ease-in-out infinite`

                          : `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 2}px ${settings.color}`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                      }}

                    ></div>

                  </motion.div>

                </AnimatePresence>

              </div>



              {/* Right Crossguard Vent */}

              <div className="absolute top-1 right-0 transform translate-x-full -translate-y-1/2">

                <AnimatePresence>

                  <motion.div

                    className="relative"

                    initial={{ scaleX: 0, transformOrigin: "left" }}

                    animate={{ scaleX: 1, transformOrigin: "left" }}

                    exit={{ scaleX: 0, transformOrigin: "left" }}

                    transition={{ duration: 0.1 }}

                  >

                    {/* Crossguard outer glow */}

                    <div

                      className="blur-sm"

                      style={{

                        width: `${settings.glowSize * 3}px`,

                        height: `${settings.glowSize * 1.5 * settings.bladeThickness}px`,

                        backgroundColor: settings.color,

                        opacity: settings.intensity * 0.2,

                        animation: `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 3}px ${settings.color}`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                      }}

                    ></div>

                    {/* Crossguard core */}

                    <div

                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

                      style={{

                        width: `${settings.glowSize * 1.5}px`,

                        height: `${settings.glowSize * 0.8 * settings.bladeThickness}px`,

                        backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                        opacity: settings.intensity * 0.8,

                        animation: settings.corePulseSpeed > 0 

                          ? `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate, corePulse ${settings.corePulseSpeed * 0.8}s ease-in-out infinite`

                          : `flicker ${settings.flickerSpeed * 1.3}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 2}px ${settings.color}`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                      }}

                    ></div>

                  </motion.div>

                </AnimatePresence>

              </div>

            </>

          )}



          {/* Lightsaber Blade */}

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">

            <AnimatePresence>

              {isBladeActive && (

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

                      width: `${settings.bladeThickness * 2}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.color,

                      opacity: settings.intensity * 0.25 + (isInteractiveHover ? 0.15 : 0),

                      animation: `flicker ${settings.flickerSpeed}s ease-in-out infinite alternate`,

                      boxShadow: `0 0 ${settings.glowSize * 4}px ${settings.color}, 0 0 ${settings.glowSize * 8}px ${settings.color}, 0 0 ${settings.glowSize * 12}px ${settings.color}80`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Fiery layer - only for fiery style */}

                  {settings.bladeStyle === 'fiery' && (

                    <div

                      className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-sm"

                      style={{

                        width: `${settings.glowSize * 1.5}px`,

                        height: `${getAdjustedBladeLength()}px`,

                        background: `linear-gradient(to bottom, #ffaa00, #ff6600, #ff4400)`,

                        opacity: settings.intensity * 0.22 + (isInteractiveHover ? 0.08 : 0),

                        animation: `flicker ${settings.flickerSpeed * 0.6}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 2.5}px #ffaa00, 0 0 ${settings.glowSize * 4}px #ff6600`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                        ...getLightwhipStyle(),

                      }}

                    ></div>

                  )}



                  {/* Middle glow */}

                  <div

                    className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-sm"

                    style={{

                      width: `${settings.bladeThickness * 1.5}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.color,

                      opacity: settings.intensity * 0.4 + (isInteractiveHover ? 0.15 : 0),

                      animation: `flicker ${settings.flickerSpeed * 1.2}s ease-in-out infinite alternate`,

                      boxShadow: `0 0 ${settings.glowSize * 2.5}px ${settings.color}, 0 0 ${settings.glowSize * 5}px ${settings.color}90`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Core blade */}

                  <div

                    className="absolute top-0 left-1/2 transform -translate-x-1/2"

                    style={{

                      width: `${settings.bladeThickness}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                      opacity: settings.intensity + (isInteractiveHover ? 0.15 : 0),

                      animation: settings.corePulseSpeed > 0 

                        ? `flicker ${settings.flickerSpeed * 1.5}s ease-in-out infinite alternate, corePulse ${settings.corePulseSpeed}s ease-in-out infinite`

                        : `flicker ${settings.flickerSpeed * 1.5}s ease-in-out infinite alternate`,

                      boxShadow: settings.bladeStyle === 'fiery' 

                        ? `0 0 ${settings.glowSize * 2}px #ffffaa, 0 0 ${settings.glowSize * 3}px #ffaa00, 0 0 ${settings.glowSize * 4}px ${settings.color}` 

                        : `0 0 ${settings.glowSize * 2}px #ffffff, 0 0 ${settings.glowSize * 3}px ${settings.color}, 0 0 ${settings.glowSize * 4}px ${settings.color}`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getBladePatternStyle(),

                      ...getBladeGradientStyle(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Tip pointer */}

                  <div

                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"

                    style={{

                      width: `${settings.bladeThickness * 1.2}px`,

                      height: `${settings.bladeThickness * 1.2}px`,

                      backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                      boxShadow: settings.bladeStyle === 'fiery'

                        ? `0 0 ${3 * settings.glowSize}px #ffffaa, 0 0 ${6 * settings.glowSize}px #ffaa00, 0 0 ${9 * settings.glowSize}px ${settings.color}`

                        : `0 0 ${3 * settings.glowSize}px #ffffff, 0 0 ${6 * settings.glowSize}px ${settings.color}, 0 0 ${9 * settings.glowSize}px ${settings.color}80`,

                      opacity: settings.intensity * 0.9 + (isInteractiveHover ? 0.2 : 0),

                      animation: `flicker ${settings.flickerSpeed * 2}s ease-in-out infinite alternate`,

                      filter: bladeFilter,

                      borderRadius: settings.tipShape === 'pointed' ? '50% 50% 0 0' : '50%',

                      pointerEvents: 'none',

                    }}

                  ></div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>



          {/* Double-bladed Lightsaber - Second Blade */}

          {settings.isDoubleBladed && isBladeActive && (

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">

              <AnimatePresence>

                <motion.div

                  className="relative"

                  initial={{ scaleY: 0, transformOrigin: "top" }}

                  animate={{ scaleY: 1, transformOrigin: "top" }}

                  exit={{ scaleY: 0, transformOrigin: "top" }}

                  transition={{ duration: 0.15 }}

                >

                  {/* Outer glow */}

                  <div

                    className="blur-md"

                    style={{

                      width: `${settings.bladeThickness * 2}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.color,

                      opacity: settings.intensity * 0.25 + (isInteractiveHover ? 0.15 : 0),

                      animation: `flicker ${settings.flickerSpeed}s ease-in-out infinite alternate`,

                      boxShadow: `0 0 ${settings.glowSize * 4}px ${settings.color}, 0 0 ${settings.glowSize * 8}px ${settings.color}, 0 0 ${settings.glowSize * 12}px ${settings.color}80`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Fiery layer - only for fiery style */}

                  {settings.bladeStyle === 'fiery' && (

                    <div

                      className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-sm"

                      style={{

                        width: `${settings.glowSize * 1.5}px`,

                        height: `${getAdjustedBladeLength()}px`,

                        background: `linear-gradient(to bottom, #ffaa00, #ff6600, #ff4400)`,

                        opacity: settings.intensity * 0.22 + (isInteractiveHover ? 0.08 : 0),

                        animation: `flicker ${settings.flickerSpeed * 0.6}s ease-in-out infinite alternate`,

                        boxShadow: `0 0 ${settings.glowSize * 2.5}px #ffaa00, 0 0 ${settings.glowSize * 4}px #ff6600`,

                        filter: bladeFilter,

                        borderRadius: getTipBorderRadius(),

                        ...getLightwhipStyle(),

                      }}

                    ></div>

                  )}



                  {/* Middle glow */}

                  <div

                    className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-sm"

                    style={{

                      width: `${settings.bladeThickness * 1.5}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.color,

                      opacity: settings.intensity * 0.4 + (isInteractiveHover ? 0.15 : 0),

                      animation: `flicker ${settings.flickerSpeed * 1.2}s ease-in-out infinite alternate`,

                      boxShadow: `0 0 ${settings.glowSize * 2.5}px ${settings.color}, 0 0 ${settings.glowSize * 5}px ${settings.color}90`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Core blade */}

                  <div

                    className="absolute top-0 left-1/2 transform -translate-x-1/2"

                    style={{

                      width: `${settings.bladeThickness}px`,

                      height: `${getAdjustedBladeLength()}px`,

                      backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                      opacity: settings.intensity + (isInteractiveHover ? 0.15 : 0),

                      animation: settings.corePulseSpeed > 0 

                        ? `flicker ${settings.flickerSpeed * 1.5}s ease-in-out infinite alternate, corePulse ${settings.corePulseSpeed}s ease-in-out infinite`

                        : `flicker ${settings.flickerSpeed * 1.5}s ease-in-out infinite alternate`,

                      boxShadow: settings.bladeStyle === 'fiery' 

                        ? `0 0 ${settings.glowSize * 2}px #ffffaa, 0 0 ${settings.glowSize * 3}px #ffaa00, 0 0 ${settings.glowSize * 4}px ${settings.color}` 

                        : `0 0 ${settings.glowSize * 2}px #ffffff, 0 0 ${settings.glowSize * 3}px ${settings.color}, 0 0 ${settings.glowSize * 4}px ${settings.color}`,

                      filter: bladeFilter,

                      borderRadius: getTipBorderRadius(),

                      ...getBladePatternStyle(),

                      ...getBladeGradientStyle(),

                      ...getLightwhipStyle(),

                    }}

                  ></div>



                  {/* Tip pointer */}

                  <div

                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1"

                    style={{

                      width: `${settings.bladeThickness}px`,

                      height: `${settings.bladeThickness}px`,

                      backgroundColor: settings.bladeStyle === 'fiery' ? '#ffffaa' : '#ffffff',

                      boxShadow: settings.bladeStyle === 'fiery'

                        ? `0 0 ${2 * settings.glowSize}px #ffffaa, 0 0 ${4 * settings.glowSize}px #ffaa00`

                        : `0 0 ${2 * settings.glowSize}px ${settings.color}, 0 0 ${4 * settings.glowSize}px #ffffff`,

                      opacity: settings.intensity * 0.8 + (isInteractiveHover ? 0.2 : 0),

                      animation: `flicker ${settings.flickerSpeed * 2}s ease-in-out infinite alternate`,

                      filter: bladeFilter,

                      borderRadius: settings.tipShape === 'pointed' ? '50% 50% 0 0' : '50%',

                      pointerEvents: 'none',

                    }}

                  ></div>

                </motion.div>

              </AnimatePresence>

            </div>

          )}

        </div>

      </motion.div>



      <style>{`

        @keyframes flicker {

          0% { opacity: 0.9; }

          50% { opacity: 1; }

          100% { opacity: 0.95; }

        }

        

        @keyframes corePulse {

          0% { transform: scaleX(0.95); }

          50% { transform: scaleX(1.05); }

          100% { transform: scaleX(0.95); }

        }

      `}</style>

    </>

  );

}



export default LightsaberCursor;