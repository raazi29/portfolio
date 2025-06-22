import React from 'react';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
  modelsCount: number;
  onTagClick: (tag: string) => void;
}

const WelcomeScreen = ({ modelsCount, onTagClick }: WelcomeScreenProps) => {
  return (
    <div className="text-center py-8 sm:py-16">
      <div className={cn(
        "inline-flex p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 relative",
        "bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20",
        "border border-purple-200/30 dark:border-purple-800/30"
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-600/5 rounded-2xl sm:rounded-3xl blur-xl"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden relative z-10 border-2 border-purple-400/30 dark:border-purple-300/20">
          <img 
            src="/img/image.png" 
            alt="REI AI Assistant" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-3 sm:mb-4">
        Hi! I'm REI, your AI assistant.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg px-4">
        Choose from {modelsCount}  models !
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
        {['Vision Analysis', 'Deep Reasoning', 'Code Generation', 'Creative Writing'].map((tag) => (
          <button
            key={tag}
            className={cn(
              "px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300",
              "bg-white/80 dark:bg-black/60 text-gray-700 dark:text-gray-300",
              "border border-gray-200/50 dark:border-gray-700/50",
              "hover:bg-gray-50 dark:hover:bg-gray-900/80 hover:shadow-lg shadow-gray-900/5"
            )}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
