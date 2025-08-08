import React from "react";
import { cn } from '@/lib/utils';
import { Settings, X, Palette, Zap, Ruler, Sparkles, Volume2 } from "lucide-react";

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
  bladeStyle: 'stable' | 'unstable' | 'fiery' | 'cracked' | 'darksaber';
  corePulseSpeed: number;
  tipShape: 'rounded' | 'pointed' | 'flat';
  hasCrossguard: boolean;
  hiltStyle: 'standard' | 'graflex' | 'vader' | 'curved' | 'obiwan' | 'luke' | 'windu';
  hiltWeathering: number;
  isDoubleBladed: boolean;
  isLightwhip: boolean;
  isShoto: boolean;
  hasBladeGradient: boolean;
  bladePattern: 'solid' | 'striped' | 'spiral' | 'energy' | 'crystal';
  hiltMaterial: 'standard' | 'chrome' | 'matte' | 'gold';
  soundFont: 'standard' | 'vader' | 'luke' | 'obiwan' | 'kylo';
  playAmbientSounds: boolean;
}

interface LightsaberSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: LightsaberSettings;
  onSettingsChange: (settings: LightsaberSettings) => void;
}

const PRESETS: Record<string, LightsaberSettings> = {
  jedi: { 
    color: '#00ff00', 
    intensity: 0.9, 
    flickerSpeed: 0.1, 
    bladeLength: 1, 
    glowSize: 0.7,
    hiltColor: '#c0c0c0', 
    bladeThickness: 0.5,
    sparkCount: 8, 
    slashTrailLength: 1, 
    slashDuration: 0.6, 
    tiltSensitivity: 1, 
    bladeStyle: 'stable',
    corePulseSpeed: 0,
    tipShape: 'rounded',
    hasCrossguard: false,
    hiltStyle: 'standard',
    hiltWeathering: 0,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: false,
    bladePattern: 'solid',
    hiltMaterial: 'standard',
    soundFont: 'standard',
    playAmbientSounds: false
  },
  sith: { 
    color: '#ff0000', 
    intensity: 1, 
    flickerSpeed: 0.08, 
    bladeLength: 1.2, 
    glowSize: 0.7,
    hiltColor: '#2c2c2c', 
    bladeThickness: 0.5,
    sparkCount: 12, 
    slashTrailLength: 1.3, 
    slashDuration: 0.8, 
    tiltSensitivity: 1.5, 
    bladeStyle: 'stable',
    corePulseSpeed: 0.5,
    tipShape: 'pointed',
    hasCrossguard: false,
    hiltStyle: 'vader',
    hiltWeathering: 0.3,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: false,
    bladePattern: 'solid',
    hiltMaterial: 'matte',
    soundFont: 'vader',
    playAmbientSounds: true
  },
  mace: { 
    color: '#8b00ff', 
    intensity: 0.95, 
    flickerSpeed: 0.12, 
    bladeLength: 1, 
    glowSize: 0.7,
    hiltColor: '#4a4a4a', 
    bladeThickness: 0.5,
    sparkCount: 10, 
    slashTrailLength: 1.1, 
    slashDuration: 0.7, 
    tiltSensitivity: 1.2, 
    bladeStyle: 'stable',
    corePulseSpeed: 0.3,
    tipShape: 'rounded',
    hasCrossguard: false,
    hiltStyle: 'windu',
    hiltWeathering: 0.1,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: false,
    bladePattern: 'solid',
    hiltMaterial: 'chrome',
    soundFont: 'standard',
    playAmbientSounds: false
  },
  kylo: { 
    color: '#ff2200', 
    intensity: 1, 
    flickerSpeed: 0.03, 
    bladeLength: 1.15, 
    glowSize: 0.9,
    hiltColor: '#1a1a1a', 
    bladeThickness: 0.6,
    sparkCount: 20, 
    slashTrailLength: 1.6, 
    slashDuration: 1.0, 
    tiltSensitivity: 2.5, 
    bladeStyle: 'cracked',
    corePulseSpeed: 0.5,
    tipShape: 'pointed',
    hasCrossguard: true,
    hiltStyle: 'standard',
    hiltWeathering: 0.8,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: true,
    bladePattern: 'energy',
    hiltMaterial: 'matte',
    soundFont: 'kylo',
    playAmbientSounds: true
  },
  ahsoka: { 
    color: '#ffffff', 
    intensity: 0.85, 
    flickerSpeed: 0.15, 
    bladeLength: 0.9, 
    glowSize: 0.7,
    hiltColor: '#e0e0e0', 
    bladeThickness: 0.5,
    sparkCount: 6, 
    slashTrailLength: 0.8, 
    slashDuration: 0.5, 
    tiltSensitivity: 0.8, 
    bladeStyle: 'stable',
    corePulseSpeed: 0.2,
    tipShape: 'rounded',
    hasCrossguard: false,
    hiltStyle: 'curved',
    hiltWeathering: 0.2,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: true,
    hasBladeGradient: false,
    bladePattern: 'solid',
    hiltMaterial: 'standard',
    soundFont: 'standard',
    playAmbientSounds: false
  },
  darksaber: {
    color: '#000000',
    intensity: 0.9,
    flickerSpeed: 0.1,
    bladeLength: 0.9,
    glowSize: 1.2,
    hiltColor: '#1a1a1a',
    bladeThickness: 0.7,
    sparkCount: 10,
    slashTrailLength: 1.2,
    slashDuration: 0.7,
    tiltSensitivity: 1.2,
    bladeStyle: 'darksaber',
    corePulseSpeed: 0.2,
    tipShape: 'pointed',
    hasCrossguard: false,
    hiltStyle: 'standard',
    hiltWeathering: 0.5,
    isDoubleBladed: false,
    isLightwhip: false,
    isShoto: false,
    hasBladeGradient: true,
    bladePattern: 'solid',
    hiltMaterial: 'matte',
    soundFont: 'standard',
    playAmbientSounds: true
  }
};

const LightsaberSettingsPanel: React.FC<LightsaberSettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9997] bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className={cn(
        "fixed top-20 right-4 z-[9998] w-80 max-h-[80vh] overflow-y-auto",
        "bg-white/10 dark:bg-black/10 backdrop-blur-2xl",
        "border border-white/20 dark:border-white/10",
        "rounded-2xl shadow-2xl",
        "transition-all duration-300 ease-out",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Lightsaber Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
            aria-label="Close settings panel"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(PRESETS).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => onSettingsChange(preset)}
                  className={cn(
                    "px-3 py-2 text-xs rounded-lg transition-all duration-200",
                    "bg-white/10 dark:bg-white/5",
                    "hover:bg-white/20 dark:hover:bg-white/10",
                    "border border-white/20 dark:border-white/10",
                    "text-gray-700 dark:text-gray-300",
                    "capitalize font-medium"
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Blade Style */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blade Style
            </label>
            <select
              value={settings.bladeStyle}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                bladeStyle: e.target.value as 'stable' | 'unstable' | 'fiery' | 'cracked' | 'darksaber'
              })}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-lg",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
                "text-gray-700 dark:text-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              )}
              aria-label="Select blade style"
            >
              <option value="stable">Stable</option>
              <option value="unstable">Unstable (Kylo Ren)</option>
              <option value="fiery">Fiery</option>
              <option value="cracked">Cracked Kyber Crystal</option>
              <option value="darksaber">Darksaber</option>
            </select>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Palette className="w-3 h-3 inline mr-1" />
                Blade Color
              </label>
              <input
                type="color"
                value={settings.color}
                onChange={(e) => onSettingsChange({ ...settings, color: e.target.value })}
                className="w-full h-8 rounded-lg border border-white/20 dark:border-white/10 bg-transparent"
                aria-label="Select blade color"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hilt Color
              </label>
              <input
                type="color"
                value={settings.hiltColor}
                onChange={(e) => onSettingsChange({ ...settings, hiltColor: e.target.value })}
                className="w-full h-8 rounded-lg border border-white/20 dark:border-white/10 bg-transparent"
                aria-label="Select hilt color"
              />
            </div>
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Zap className="w-3 h-3 inline mr-1" />
              Intensity: {Math.round(settings.intensity * 100)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={settings.intensity}
              onChange={(e) => onSettingsChange({ ...settings, intensity: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust blade intensity"
            />
          </div>

          {/* Flicker Speed */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flicker Speed: {settings.flickerSpeed.toFixed(2)}s
            </label>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={settings.flickerSpeed}
              onChange={(e) => onSettingsChange({ ...settings, flickerSpeed: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust flicker speed"
            />
          </div>

          {/* Blade Length */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Ruler className="w-3 h-3 inline mr-1" />
              Length: {Math.round(settings.bladeLength * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={settings.bladeLength}
              onChange={(e) => onSettingsChange({ ...settings, bladeLength: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust blade length"
            />
          </div>

          {/* Glow Size */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Glow Size: {Math.round(settings.glowSize * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.glowSize}
              onChange={(e) => onSettingsChange({ ...settings, glowSize: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust glow size"
            />
          </div>

          {/* Blade Thickness */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thickness: {Math.round(settings.bladeThickness * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.bladeThickness}
              onChange={(e) => onSettingsChange({ ...settings, bladeThickness: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust blade thickness"
            />
          </div>

          {/* Spark Count */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Sparks: {settings.sparkCount}
            </label>
            <input
              type="range"
              min="4"
              max="20"
              step="1"
              value={settings.sparkCount}
              onChange={(e) => onSettingsChange({ ...settings, sparkCount: parseInt(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust spark count"
            />
          </div>

          {/* Slash Trail Length */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trail Length: {Math.round(settings.slashTrailLength * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.slashTrailLength}
              onChange={(e) => onSettingsChange({ ...settings, slashTrailLength: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust slash trail length"
            />
          </div>

          {/* Slash Duration */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slash Duration: {settings.slashDuration.toFixed(1)}s
            </label>
            <input
              type="range"
              min="0.3"
              max="1.5"
              step="0.1"
              value={settings.slashDuration}
              onChange={(e) => onSettingsChange({ ...settings, slashDuration: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust slash duration"
            />
          </div>

          {/* Tilt Sensitivity */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tilt Sensitivity: {Math.round(settings.tiltSensitivity * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={settings.tiltSensitivity}
              onChange={(e) => onSettingsChange({ ...settings, tiltSensitivity: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust tilt sensitivity"
            />
          </div>

          {/* Core Pulse Speed */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Zap className="w-3 h-3 inline mr-1" />
              Core Pulse Speed: {settings.corePulseSpeed === 0 ? 'Off' : settings.corePulseSpeed.toFixed(1) + 's'}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.corePulseSpeed}
              onChange={(e) => onSettingsChange({ ...settings, corePulseSpeed: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust core pulse speed"
            />
          </div>

          {/* Tip Shape */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tip Shape
            </label>
            <select
              value={settings.tipShape}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                tipShape: e.target.value as 'rounded' | 'pointed' | 'flat' 
              })}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-lg",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
                "text-gray-700 dark:text-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              )}
              aria-label="Select tip shape"
            >
              <option value="rounded">Rounded</option>
              <option value="pointed">Pointed</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          {/* Crossguard Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Crossguard Vents</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">(Kylo Ren Style)</span>
            </div>
            <button
              onClick={() => onSettingsChange({ ...settings, hasCrossguard: !settings.hasCrossguard })}
              className={cn(
                "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                settings.hasCrossguard ? 'bg-blue-600' : 'bg-gray-400'
              )}
              aria-label="Toggle crossguard vents"
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                  settings.hasCrossguard ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          {/* Hilt Style */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hilt Style
            </label>
            <select
              value={settings.hiltStyle}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                hiltStyle: e.target.value as 'standard' | 'graflex' | 'vader' | 'curved' | 'obiwan' | 'luke' | 'windu'
              })}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-lg",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
                "text-gray-700 dark:text-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              )}
              aria-label="Select hilt style"
            >
              <option value="standard">Standard</option>
              <option value="graflex">Graflex (Luke Skywalker)</option>
              <option value="vader">Vader</option>
              <option value="curved">Curved (Count Dooku)</option>
              <option value="obiwan">Obi-Wan Kenobi</option>
              <option value="luke">Luke Skywalker (ROTJ)</option>
              <option value="windu">Mace Windu</option>
            </select>
          </div>

          {/* Hilt Weathering */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hilt Weathering: {settings.hiltWeathering === 0 ? 'Pristine' : settings.hiltWeathering === 1 ? 'Ancient' : Math.round(settings.hiltWeathering * 100) + '%'}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.hiltWeathering}
              onChange={(e) => onSettingsChange({ ...settings, hiltWeathering: parseFloat(e.target.value) })}
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Adjust hilt weathering"
            />
          </div>

          {/* Blade Variants Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-white/10 pb-1">
              Blade Variants
            </h4>

            {/* Double-bladed Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Double-bladed</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(Darth Maul Style)</span>
              </div>
              <button
                onClick={() => onSettingsChange({ ...settings, isDoubleBladed: !settings.isDoubleBladed })}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                  settings.isDoubleBladed ? 'bg-blue-600' : 'bg-gray-400'
                )}
                aria-label="Toggle double-bladed lightsaber"
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                    settings.isDoubleBladed ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Lightwhip Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Lightwhip</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(Flexible Blade)</span>
              </div>
              <button
                onClick={() => onSettingsChange({ ...settings, isLightwhip: !settings.isLightwhip })}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                  settings.isLightwhip ? 'bg-blue-600' : 'bg-gray-400'
                )}
                aria-label="Toggle lightwhip mode"
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                    settings.isLightwhip ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Shoto Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Shoto</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(Short Blade)</span>
              </div>
              <button
                onClick={() => onSettingsChange({ ...settings, isShoto: !settings.isShoto })}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                  settings.isShoto ? 'bg-blue-600' : 'bg-gray-400'
                )}
                aria-label="Toggle shoto variant"
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                    settings.isShoto ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>

            {/* Blade Gradient Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Blade Gradient</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(Thick Base, Thin Tip)</span>
              </div>
              <button
                onClick={() => onSettingsChange({ ...settings, hasBladeGradient: !settings.hasBladeGradient })}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                  settings.hasBladeGradient ? 'bg-blue-600' : 'bg-gray-400'
                )}
                aria-label="Toggle blade width gradient"
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                    settings.hasBladeGradient ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Blade Pattern */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blade Pattern
            </label>
            <select
              value={settings.bladePattern}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                bladePattern: e.target.value as 'solid' | 'striped' | 'spiral' | 'energy' | 'crystal' 
              })}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-lg",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
                "text-gray-700 dark:text-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              )}
              aria-label="Select blade pattern"
            >
              <option value="solid">Solid</option>
              <option value="striped">Striped</option>
              <option value="spiral">Spiral</option>
              <option value="energy">Energy</option>
              <option value="crystal">Crystal</option>
            </select>
          </div>

          {/* Hilt Material */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hilt Material
            </label>
            <select
              value={settings.hiltMaterial || 'standard'}
              onChange={(e) => onSettingsChange({ 
                ...settings, 
                hiltMaterial: e.target.value as 'standard' | 'chrome' | 'matte' | 'gold'
              })}
              className={cn(
                "w-full px-3 py-2 text-sm rounded-lg",
                "bg-white/10 dark:bg-white/5",
                "border border-white/20 dark:border-white/10",
                "text-gray-700 dark:text-gray-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              )}
              aria-label="Select hilt material"
            >
              <option value="standard">Standard</option>
              <option value="chrome">Chrome</option>
              <option value="matte">Matte Black</option>
              <option value="gold">Gold Accents</option>
            </select>
          </div>

          {/* Sound Options Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-white/10 pb-1">
              Sound Options
            </h4>

            {/* Sound Font */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Volume2 className="w-3 h-3 inline mr-1" />
                Sound Font
              </label>
              <select
                value={settings.soundFont || 'standard'}
                onChange={(e) => onSettingsChange({ 
                  ...settings, 
                  soundFont: e.target.value as 'standard' | 'vader' | 'luke' | 'obiwan' | 'kylo'
                })}
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-lg",
                  "bg-white/10 dark:bg-white/5",
                  "border border-white/20 dark:border-white/10",
                  "text-gray-700 dark:text-gray-300",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                )}
                aria-label="Select sound font"
              >
                <option value="standard">Standard</option>
                <option value="vader">Darth Vader</option>
                <option value="luke">Luke Skywalker</option>
                <option value="obiwan">Obi-Wan Kenobi</option>
                <option value="kylo">Kylo Ren</option>
              </select>
            </div>

            {/* Ambient Sounds Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Ambient Sounds</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(Star Wars Atmosphere)</span>
              </div>
              <button
                onClick={() => onSettingsChange({ ...settings, playAmbientSounds: !settings.playAmbientSounds })}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ease-in-out",
                  settings.playAmbientSounds ? 'bg-blue-600' : 'bg-gray-400'
                )}
                aria-label="Toggle ambient sounds"
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out",
                    settings.playAmbientSounds ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.8);
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .slider::-moz-range-thumb {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.8);
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
        `}</style>
      </div>
    </>
  );
};

export default LightsaberSettingsPanel; 
