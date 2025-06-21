import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/contexts/ThemeContext";

const ParticlesBackground = () => {
  const { theme } = useTheme();

  const options = useMemo(() => {
    const particleColor = theme === 'dark' ? "#ffffff" : "#374151";
    const linkColor = theme === 'dark' ? "#ffffff" : "#4b5563";

    return {
      autoPlay: true,
      background: {
        color: {
          value: "transparent"
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5
            }
          },
        }
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: linkColor,
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1
        },
        collisions: {
          enable: false
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out"
          },
          random: true,
          speed: 0.2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 1200
          },
          value: 40
        },
        opacity: {
          value: 0.15
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 2 }
        }
      },
      detectRetina: true
    };
  }, [theme]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
      />
    </div>
  );
};

export default ParticlesBackground; 