

export const playClickSound = () => {
    // Create audio context for better browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a mechanical keyboard click sound using Web Audio API
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure the sound to mimic a mechanical keyboard click with sharper attack
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.008);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.025);
    
    // Set volume envelope for a very sharp mechanical click
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);
    
    // Play the sound with shorter duration for crispness
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.04);
  };
  
  
