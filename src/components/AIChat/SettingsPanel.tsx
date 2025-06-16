
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/util';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedModel: string;
  models: Array<{
    id: string;
    name: string;
    description: string;
    context: string;
    hasVision?: boolean;
  }>;
}

const SettingsPanel = ({
  showSettings,
  setShowSettings,
  apiKey,
  setApiKey,
  selectedModel,
  models
}: SettingsPanelProps) => {
  const { toast } = useToast();

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('openrouter-api-key', apiKey);
    toast({
      title: "Success",
      description: "API key saved successfully!"
    });
  };

  if (!showSettings) return null;

  return (
    <div className={cn(
      "fixed top-16 sm:top-20 left-3 right-3 sm:left-6 sm:right-6 z-40 max-w-lg mx-auto",
      "backdrop-blur-2xl bg-white/10 dark:bg-black/20",
      "border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-900/10",
      "p-4 sm:p-8 space-y-4 sm:space-y-6"
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Settings
        </h3>
        <button
          onClick={() => setShowSettings(false)}
          className={cn(
            "p-2 rounded-xl transition-all duration-200",
            "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
            "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          )}
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            OpenRouter API Key
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className={cn(
                "flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm",
                "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500",
                "transition-all duration-200"
              )}
            />
            <button
              onClick={saveApiKey}
              className={cn(
                "relative group flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300",
                "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                "border border-gray-500/50",
                "text-white text-sm font-medium",
                "hover:scale-105 active:scale-95"
              )}
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">OpenRouter</a>
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Current Model: {models.find(m => m.id === selectedModel)?.name}
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {models.find(m => m.id === selectedModel)?.description} • {models.find(m => m.id === selectedModel)?.context}
            {models.find(m => m.id === selectedModel)?.hasVision && ' • Vision Capable'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
