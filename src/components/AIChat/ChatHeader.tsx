import React, { useState } from 'react';
import { 
  History, 
  Settings, 
  Plus,
  MessageSquare,
  ArrowLeft,
  X,
  PlusCircle,
  Save,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/util';
import ThemeToggle from '@/components/ThemeToggle';

interface ChatSession {
  id: string;
  name: string;
  messages: any[];
  createdAt: Date;
  updatedAt: Date;
  modelId: string;
}

interface ChatHeaderProps {
  isScrolled: boolean;
  messagesLength: number;
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
  chatSessions?: ChatSession[];
  activeChatSessionId?: string | null;
  onSwitchSession?: (sessionId: string) => void;
  onCreateSession?: () => void;
  onDeleteSession?: (sessionId: string) => void;
  onRenameSession?: (sessionId: string, newName: string) => void;
  newSessionName?: string;
  setNewSessionName?: (value: string) => void;
}

const ChatHeader = ({
  isScrolled,
  messagesLength,
  showHistory,
  setShowHistory,
  showSettings,
  setShowSettings,
  chatSessions = [],
  activeChatSessionId = null,
  onSwitchSession = () => {},
  onCreateSession = () => {},
  onDeleteSession = () => {},
  onRenameSession = () => {},
  newSessionName = "",
  setNewSessionName = () => {}
}: ChatHeaderProps) => {
  const [showSessionsMenu, setShowSessionsMenu] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editSessionName, setEditSessionName] = useState("");
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const handleRenameSession = (sessionId: string) => {
    onRenameSession(sessionId, editSessionName);
    setEditingSessionId(null);
    setEditSessionName("");
  };

  const startEditSession = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditSessionName(session.name);
  };

  const hasMessages = messagesLength > 0;

  return (
    <header 
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out group",
        hasMessages ? 'w-auto' : 'w-[calc(100%-2rem)] max-w-3xl'
      )}
      onMouseEnter={() => hasMessages && setIsHeaderExpanded(true)}
      onMouseLeave={() => hasMessages && setIsHeaderExpanded(false)}
    >
      <div className={cn(
        "relative overflow-hidden rounded-full transition-all duration-300",
        "bg-transparent",
        "backdrop-blur-2xl backdrop-saturate-200",
        "border border-white/10 dark:border-white/5",
        "shadow-2xl shadow-black/5 dark:shadow-black/30",
        hasMessages && !isHeaderExpanded 
          ? 'px-2 py-2' 
          : 'px-4 py-2.5'
      )}>
        <div className={cn(
          "relative flex items-center justify-between",
          hasMessages && !isHeaderExpanded ? 'w-auto' : 'w-full min-w-[300px]'
        )}>
          <div className={cn(
            "flex items-center transition-all duration-300",
            hasMessages && !isHeaderExpanded ? 'space-x-1' : 'space-x-1 sm:space-x-2'
          )}>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center transition-all duration-300 hover:scale-110 p-1"
              aria-label="Back"
            >
               <ArrowLeft size={18} className="text-gray-700 dark:text-gray-200" />
            </button>
            <img src="/img/image.png" alt="Logo" className={cn("w-8 h-8 rounded-full transition-all duration-300", hasMessages && !isHeaderExpanded && "w-7 h-7")} />

            <div className={cn(
              "flex items-center transition-all duration-300 overflow-hidden",
               hasMessages && !isHeaderExpanded ? 'w-0 scale-0 opacity-0' : 'w-auto scale-100 opacity-100 ml-1 sm:ml-2'
            )}>
              <button
                onClick={() => setShowSessionsMenu(!showSessionsMenu)}
                className="relative p-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                aria-label="Chat Sessions"
                title="Chat Sessions"
              >
                <MessageSquare size={16} />
              </button>
              
              <button
                onClick={onCreateSession}
                className="relative p-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                aria-label="New Chat"
                title="Start a new chat"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

            <div className={cn(
            "flex-1 text-center transition-all duration-300",
            hasMessages && !isHeaderExpanded ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100 w-auto'
          )}>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {chatSessions.find(s => s.id === activeChatSessionId)?.name || "Current Chat"}
            </span>
        </div>

          <div className="flex items-center space-x-0.5 sm:space-x-1">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={cn(
                "p-1.5 sm:p-2 rounded-xl transition-all duration-300",
                showHistory 
                  ? "bg-purple-100/80 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300"
                  : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
              )}
              aria-label="Chat History"
            >
              <History size={16} className="sm:size-[18px]" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
                "p-1.5 sm:p-2 rounded-xl transition-all duration-300",
                showSettings 
                  ? "bg-green-100/80 dark:bg-green-900/40 text-green-600 dark:text-green-300"
                  : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
              )}
              aria-label="Settings"
            >
              <Settings size={16} className="sm:size-[18px]" />
          </button>

            <div className="scale-75 transition-transform duration-300 hover:scale-90">
            <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {showSessionsMenu && (
        <div className={cn(
          "absolute left-2 sm:left-4 top-14 sm:top-16 w-72 sm:w-80 z-50",
          "backdrop-blur-2xl bg-white/10 dark:bg-black/20",
          "border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl",
          "overflow-hidden"
        )}>
          <div className="p-3 sm:p-4 border-b border-white/20 dark:border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base sm:text-lg">Chat Sessions</h3>
            <button 
              onClick={() => setShowSessionsMenu(false)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="p-3 sm:p-4 border-b border-white/20 dark:border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSessionName}
                onChange={(e) => setNewSessionName?.(e.target.value)}
                placeholder="New chat name..."
                className={cn(
                  "flex-1 px-3 py-1.5 text-sm rounded-lg",
                  "bg-gray-50/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700",
                  "focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                )}
              />
              <button
                onClick={onCreateSession}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {chatSessions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No saved chats.
              </div>
            ) : (
              <ul className="divide-y divide-white/20 dark:divide-white/10">
                {chatSessions.map(session => (
                  <li 
                    key={session.id}
                    className={cn(
                      "p-2.5 sm:p-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50",
                      "transition-colors duration-200",
                      activeChatSessionId === session.id && "bg-blue-500/10 dark:bg-blue-500/20"
                    )}
                  >
                    {editingSessionId === session.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editSessionName}
                          onChange={(e) => setEditSessionName(e.target.value)}
                          className="flex-1 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                          autoFocus
                        />
                        <button
                          onClick={() => handleRenameSession(session.id)}
                          className="p-1.5 text-blue-600 dark:text-blue-400"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingSessionId(null)}
                          className="p-1.5 text-gray-600 dark:text-gray-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => onSwitchSession(session.id)}
                          className="flex-1 flex items-center space-x-2.5 py-1 px-2 text-left rounded-md"
                        >
                          <MessageSquare size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                            {session.name}
                          </span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => startEditSession(session)}
                            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                            aria-label="Rename session"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteSession(session.id)}
                            className="p-1.5 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
                            aria-label="Delete session"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
