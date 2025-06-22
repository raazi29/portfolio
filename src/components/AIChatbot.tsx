
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const AIChatbot = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/ai-chat');
  };

  return (
    <button
      onClick={handleChatClick}
      className={cn(
        "relative p-2 rounded-xl transition-all duration-300 group",
        "bg-white/10 dark:bg-black/10 backdrop-blur-sm",
        "border border-white/20 dark:border-white/10",
        "hover:bg-white/20 dark:hover:bg-black/20",
        "hover:border-gray-300/50 dark:hover:border-gray-600/50",
        "hover:scale-110 active:scale-95",
        "shadow-lg hover:shadow-xl"
      )}
      aria-label="AI Assistant"
    >
      <MessageCircle size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" />
    </button>
  );
};

export default AIChatbot;
