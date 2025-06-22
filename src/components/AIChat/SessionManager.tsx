import React, { useState } from 'react';
import { 
  MessageSquare,
  PlusCircle,
  Save,
  Edit,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  thinking?: string;
  model?: string;
  images?: string[];
  isStreaming?: boolean;
  isPartial?: boolean;
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  modelId: string;
}

interface SessionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  chatSessions: ChatSession[];
  activeChatSessionId: string | null;
  onSwitchSession: (sessionId: string) => void;
  onCreateSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onRenameSession: (sessionId: string, newName: string) => void;
  newSessionName: string;
  setNewSessionName: (value: string) => void;
}

const SessionManager = ({
  isOpen,
  onClose,
  chatSessions,
  activeChatSessionId,
  onSwitchSession,
  onCreateSession,
  onDeleteSession,
  onRenameSession,
  newSessionName,
  setNewSessionName
}: SessionManagerProps) => {
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editSessionName, setEditSessionName] = useState("");

  const handleRenameSession = (sessionId: string) => {
    onRenameSession(sessionId, editSessionName);
    setEditingSessionId(null);
    setEditSessionName("");
  };

  const startEditSession = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditSessionName(session.name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute left-4 sm:left-8 top-16 sm:top-20 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Chat Sessions</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="New chat name..."
              className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={onCreateSession}
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Create new chat"
            >
              <PlusCircle size={18} />
            </button>
          </div>
        </div>
        
        <div className="max-h-[50vh] overflow-y-auto">
          {chatSessions.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No saved chats. Create a new one!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {chatSessions.map(session => (
                <li 
                  key={session.id}
                  className={cn(
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    activeChatSessionId === session.id && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  {editingSessionId === session.id ? (
                    <div className="flex items-center space-x-2 p-2">
                      <input
                        type="text"
                        value={editSessionName}
                        onChange={(e) => setEditSessionName(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSession(session.id);
                          if (e.key === 'Escape') setEditingSessionId(null);
                        }}
                      />
                      <button
                        onClick={() => handleRenameSession(session.id)}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md"
                        aria-label="Save"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => setEditingSessionId(null)}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                        aria-label="Cancel"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2">
                      <button
                        onClick={() => onSwitchSession(session.id)}
                        className="flex-1 flex items-center space-x-2 py-1 px-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <MessageSquare size={16} className="text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {session.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                          {session.messages.length > 0 ? `${session.messages.length} msgs` : 'Empty'}
                        </span>
                      </button>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={() => startEditSession(session)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                          aria-label="Rename session"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => onDeleteSession(session.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md"
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
    </div>
  );
};

export default SessionManager; 
