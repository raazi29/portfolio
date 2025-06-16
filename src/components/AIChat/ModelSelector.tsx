
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/util';
import { useToast } from '@/hooks/use-toast';

interface Model {
  id: string;
  name: string;
  context: string;
  hasVision?: boolean;
  category: string;
  description: string;
}

interface ModelSelectorProps {
  showModelGrid: boolean;
  setShowModelGrid: (show: boolean) => void;
  models: Model[];
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

const ModelSelector = ({
  showModelGrid,
  setShowModelGrid,
  models,
  selectedModel,
  onModelSelect
}: ModelSelectorProps) => {
  const { toast } = useToast();

  const handleQuickModelSelect = (modelId: string) => {
    onModelSelect(modelId);
    setShowModelGrid(false);
    toast({
      title: "Model Changed",
      description: `Switched to ${models.find(m => m.id === modelId)?.name}`,
    });
  };

  const groupedModels = models.reduce((acc, model) => {
    const category = model.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, Model[]>);

  if (!showModelGrid) return null;

  return (
    <div className={cn(
      "fixed top-16 sm:top-20 left-3 right-3 sm:left-6 sm:right-6 z-40 max-w-6xl mx-auto max-h-[70vh] overflow-y-auto",
      "backdrop-blur-2xl bg-white/10 dark:bg-black/20",
      "border border-white/20 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-900/10",
      "p-4 sm:p-8 space-y-4 sm:space-y-6"
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Free AI Models ({models.length} available)
        </h3>
        <button
          onClick={() => setShowModelGrid(false)}
          className={cn(
            "p-2 rounded-xl transition-all duration-200",
            "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
            "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          )}
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(groupedModels).map(([category, categoryModels]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200/50 dark:border-gray-700/50 pb-2">
              {category} Models ({categoryModels.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {categoryModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => handleQuickModelSelect(model.id)}
                  className={cn(
                    "p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-300",
                    "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-700/50",
                    "hover:bg-emerald-100 dark:hover:bg-emerald-950/50 hover:shadow-lg shadow-emerald-500/20",
                    selectedModel === model.id && "ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/25"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-200 mb-1">{model.name}</p>
                    {model.hasVision && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-700/50">👁️</span>}
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1 sm:mb-2">{model.context}</p>
                  <p className="text-xs text-emerald-500 dark:text-emerald-400 opacity-75">{model.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
