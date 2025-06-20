// Add sound functionality to the lightsaber utils

interface LightsaberSounds {
  ignition: HTMLAudioElement | null;
  hum: HTMLAudioElement | null;
  swing: HTMLAudioElement | null;
  clash: HTMLAudioElement | null;
  ambient: HTMLAudioElement | null;
}

// Sound cache to prevent reloading
const soundCache: Record<string, HTMLAudioElement> = {};

// Load a sound with caching
const loadSound = (path: string): HTMLAudioElement => {
  if (soundCache[path]) {
    return soundCache[path];
  }
  
  try {
    const audio = new Audio(path);
    audio.load();
    soundCache[path] = audio;
    return audio;
  } catch (error) {
    console.error("Error loading lightsaber sound:", error);
    return new Audio(); // Return empty audio element on error
  }
};

// Get sound paths based on selected sound font
export const getSoundPaths = (soundFont: string = 'standard') => {
  const basePath = '/sounds/lightsaber';
  
  switch (soundFont) {
    case 'vader':
      return {
        ignition: `${basePath}/vader-ignition.mp3`,
        hum: `${basePath}/vader-hum.mp3`,
        swing: `${basePath}/vader-swing.mp3`,
        clash: `${basePath}/vader-clash.mp3`,
        ambient: `/sounds/ambient/imperial-march-subtle.mp3`
      };
    case 'luke':
      return {
        ignition: `${basePath}/luke-ignition.mp3`,
        hum: `${basePath}/luke-hum.mp3`,
        swing: `${basePath}/luke-swing.mp3`,
        clash: `${basePath}/luke-clash.mp3`,
        ambient: `/sounds/ambient/force-theme-subtle.mp3`
      };
    case 'obiwan':
      return {
        ignition: `${basePath}/obiwan-ignition.mp3`,
        hum: `${basePath}/obiwan-hum.mp3`,
        swing: `${basePath}/obiwan-swing.mp3`,
        clash: `${basePath}/obiwan-clash.mp3`,
        ambient: `/sounds/ambient/binary-sunset-subtle.mp3`
      };
    case 'kylo':
      return {
        ignition: `${basePath}/kylo-ignition.mp3`,
        hum: `${basePath}/kylo-hum.mp3`,
        swing: `${basePath}/kylo-swing.mp3`,
        clash: `${basePath}/kylo-clash.mp3`,
        ambient: `/sounds/ambient/kylo-theme-subtle.mp3`
      };
    case 'standard':
    default:
      return {
        ignition: `${basePath}/standard-ignition.mp3`,
        hum: `${basePath}/standard-hum.mp3`,
        swing: `${basePath}/standard-swing.mp3`,
        clash: `${basePath}/standard-clash.mp3`,
        ambient: `/sounds/ambient/star-wars-subtle.mp3`
      };
  }
};

// Initialize sounds for a lightsaber
export const initLightsaberSounds = (soundFont: string = 'standard'): LightsaberSounds => {
  const paths = getSoundPaths(soundFont);
  
  return {
    ignition: loadSound(paths.ignition),
    hum: loadSound(paths.hum),
    swing: loadSound(paths.swing),
    clash: loadSound(paths.clash),
    ambient: loadSound(paths.ambient)
  };
};

// Play lightsaber ignition sound
export const playIgnition = (sounds: LightsaberSounds) => {
  if (!sounds.ignition) return;
  
  sounds.ignition.currentTime = 0;
  sounds.ignition.volume = 0.7;
  sounds.ignition.play().catch(err => console.error("Error playing ignition sound:", err));
  
  // Start the hum sound after ignition
  if (sounds.hum) {
    sounds.hum.loop = true;
    sounds.hum.volume = 0.3;
    setTimeout(() => {
      sounds.hum.play().catch(err => console.error("Error playing hum sound:", err));
    }, 300);
  }
};

// Play lightsaber swing sound
export const playSwing = (sounds: LightsaberSounds) => {
  if (!sounds.swing) return;
  
  sounds.swing.currentTime = 0;
  sounds.swing.volume = 0.5;
  sounds.swing.play().catch(err => console.error("Error playing swing sound:", err));
};

// Play lightsaber clash sound
export const playClash = (sounds: LightsaberSounds) => {
  if (!sounds.clash) return;
  
  sounds.clash.currentTime = 0;
  sounds.clash.volume = 0.6;
  sounds.clash.play().catch(err => console.error("Error playing clash sound:", err));
};

// Stop all lightsaber sounds
export const stopLightsaberSounds = (sounds: LightsaberSounds) => {
  if (sounds.ignition) {
    sounds.ignition.pause();
    sounds.ignition.currentTime = 0;
  }
  
  if (sounds.hum) {
    sounds.hum.pause();
    sounds.hum.currentTime = 0;
  }
  
  if (sounds.swing) {
    sounds.swing.pause();
    sounds.swing.currentTime = 0;
  }
  
  if (sounds.clash) {
    sounds.clash.pause();
    sounds.clash.currentTime = 0;
  }
};

// Control ambient sounds
export const toggleAmbientSounds = (sounds: LightsaberSounds, play: boolean) => {
  if (!sounds.ambient) return;
  
  if (play) {
    sounds.ambient.loop = true;
    sounds.ambient.volume = 0.15;
    sounds.ambient.play().catch(err => console.error("Error playing ambient sound:", err));
  } else {
    sounds.ambient.pause();
    sounds.ambient.currentTime = 0;
  }
};

// Export existing functions
export * from './lightsaberUtils';
