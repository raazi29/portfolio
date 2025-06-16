import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/util';

interface ChatHistoryProps {
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  chatHistory: string[];
}

const ChatHistory = ({ showHistory, setShowHistory, chatHistory }: ChatHistoryProps) => {
  if (!showHistory) return null;

  return (
    <div className={cn(
      "fixed top-16 sm:top-20 right-3 sm:right-6 z-40 w-72 sm:w-80",
      "backdrop-blur-2xl bg-white/10 dark:bg-black/20",
      "border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-900/10",
      "p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto"
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Chat History
        </h3>
        <button
          onClick={() => setShowHistory(false)}
          aria-label="Close chat history"
          className={cn(
            "p-1.5 rounded-xl transition-all duration-200",
            "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
            "text-gray-600 dark:text-gray-400"
          )}
        >
          <X size={16} />
        </button>
      </div>
      {chatHistory.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8">No chat history yet</p>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={cn(
                "p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300",
                "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-lg shadow-gray-900/5"
              )}
              onClick={() => {
                console.log('Load chat:', index);
              }}
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {chat.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
