import React from 'react';
import { ArrowLeft, History, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/util';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

interface ChatHeaderProps {
  isScrolled: boolean;
  messagesLength: number;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showTimestamps: boolean;
  setShowTimestamps: (show: boolean) => void;
}

const ChatHeader = ({
  isScrolled,
  messagesLength,
  showHistory,
  setShowHistory,
  showSettings,
  setShowSettings,
  showTimestamps,
  setShowTimestamps
}: ChatHeaderProps) => {
  return (
    <header className={cn(
      "fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out",
      isScrolled && "top-1 sm:top-3",
      messagesLength === 0 ? "w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-4xl" : "w-auto",
      messagesLength > 0 && "scale-90 sm:scale-95"
    )}>
      <div className={cn(
        "flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 space-x-2 sm:space-x-3 rounded-xl sm:rounded-2xl",
        "backdrop-blur-xl bg-white/10 dark:bg-black/10",
        "border border-white/20 dark:border-white/10",
        "shadow-2xl shadow-black/5 dark:shadow-white/5"
      )}>
        {/* Left side - Back button and logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className={cn(
              "group flex items-center transition-all duration-300",
              "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            )}
          >
            <div className={cn(
              "w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300",
              "backdrop-blur-md bg-white/10 dark:bg-black/10",
              "border border-white/20 dark:border-white/10",
              "group-hover:bg-white/20 dark:group-hover:bg-black/20",
              "group-hover:border-white/30 dark:group-hover:border-white/20"
            )}>
              <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            </div>
          </Link>

          {/* Logo with anime avatar and REI text */}
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden transition-all duration-300",
              "bg-gradient-to-br from-purple-500/20 to-blue-600/20",
              "border border-purple-400/30 dark:border-purple-300/20",
              "backdrop-blur-sm shadow-lg"
            )}>
              <img 
                src="/portfolio/public/img/image.png" 
                alt="REI AI Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              REI
            </span>
          </div>
        </div>

        {/* Center - Only show when no messages */}
        {messagesLength === 0 && (
          <div className="flex-1 flex justify-center">
            {/* Empty space for center alignment */}
          </div>
        )}

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setShowTimestamps(!showTimestamps)}
            aria-label="Toggle timestamps"
            className={cn(
              "p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300",
              "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
              "backdrop-blur-md bg-white/10 dark:bg-black/10",
              "border border-white/20 dark:border-white/10",
              "hover:bg-white/20 dark:hover:bg-black/20",
              showTimestamps && "bg-white/20 dark:bg-black/20"
            )}
            title="Toggle Timestamps"
          >
            <Clock size={14} className="sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Show chat history"
            className={cn(
              "p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300",
              "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
              "backdrop-blur-md bg-white/10 dark:bg-black/10",
              "border border-white/20 dark:border-white/10",
              "hover:bg-white/20 dark:hover:bg-black/20"
            )}
          >
            <History size={14} className="sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Open settings"
            className={cn(
              "p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300",
              "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
              "backdrop-blur-md bg-white/10 dark:bg-black/10",
              "border border-white/20 dark:border-white/10",
              "hover:bg-white/20 dark:hover:bg-black/20"
            )}
          >
            <Settings size={14} className="sm:w-4 sm:h-4" />
          </button>

          <div className="scale-75">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
