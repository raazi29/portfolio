import React, { useRef } from 'react';
import { Send, Search, Brain, Lightbulb, ChevronDown, ImageIcon, Paperclip, Plus, FileText, File } from 'lucide-react';
import { cn } from '@/lib/util';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ImagePreview from './ImagePreview';
import DragDropZone from './DragDropZone';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  apiKey: string;
  isWebSearch: boolean;
  setIsWebSearch: (value: boolean) => void;
  isDeepThinking: boolean;
  setIsDeepThinking: (value: boolean) => void;
  isCreativeMode: boolean;
  setIsCreativeMode: (value: boolean) => void;
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAttachmentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowModelGrid: () => void;
}

const ChatInput = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  apiKey,
  isWebSearch,
  setIsWebSearch,
  isDeepThinking,
  setIsDeepThinking,
  isCreativeMode,
  setIsCreativeMode,
  selectedImages,
  setSelectedImages,
  onImageUpload,
  onAttachmentUpload,
  onShowModelGrid
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImages([...selectedImages, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon size={16} />;
    if (fileType.includes('pdf')) return <FileText size={16} />;
    return <File size={16} />;
  };

  return (
    <DragDropZone onFileDrop={handleFileDrop}>
      <div className="flex flex-col items-center space-y-3">
        <div className={cn(
          "relative w-full max-w-3xl group",
          "backdrop-blur-3xl bg-gradient-to-br from-white/90 via-white/80 to-white/70",
          "dark:bg-gradient-to-br dark:from-black/90 dark:via-black/80 dark:to-black/70",
          "border-2 border-gray-300/60 dark:border-gray-600/60 rounded-2xl sm:rounded-3xl p-2 sm:p-3",
          "shadow-[0_0_50px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
          "dark:shadow-[0_0_50px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "before:absolute before:inset-[-3px] before:rounded-[calc(1rem+3px)] sm:before:rounded-[calc(1.5rem+3px)]",
          "before:bg-gradient-to-r before:from-gray-400/40 before:via-gray-300/50 before:to-gray-400/40",
          "before:blur-sm before:opacity-60 before:-z-10",
          "hover:before:opacity-80 focus-within:before:opacity-80",
          "before:transition-opacity before:duration-300"
        )}>
          
          <form onSubmit={onSubmit} className="relative">
            <div className={cn(
              "backdrop-blur-xl bg-white/60 dark:bg-black/60 rounded-xl sm:rounded-2xl overflow-hidden",
              "border border-white/30 dark:border-white/20",
              "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)]",
              "dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.3)]"
            )}>
              <div className="flex items-end min-h-[44px] sm:min-h-[52px]">
                <div className="flex-1 flex items-center">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      isWebSearch ? "Search the web..." :
                      isDeepThinking ? "What would you like me to think deeply about?" :
                      isCreativeMode ? "What would you like me to create?" :
                      "Message REI..."
                    }
                    rows={1}
                    className={cn(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent resize-none",
                      "text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400",
                      "focus:outline-none max-h-24 sm:max-h-32 overflow-y-auto",
                      "text-sm leading-relaxed",
                      "scrollbar-hide"
                    )}
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                  />
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                    aria-label="Upload images"
                    title="Upload images"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "p-1 sm:p-1.5 rounded-lg transition-all duration-300",
                      "text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                    aria-label="Upload Images"
                    title="Upload Images"
                  >
                    <ImageIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  
                  <input
                    ref={attachmentInputRef}
                    type="file"
                    multiple
                    accept="image/*,text/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={onAttachmentUpload}
                    className="hidden"
                    aria-label="Attach files"
                    title="Attach files"
                  />
                  <button
                    type="button"
                    onClick={() => attachmentInputRef.current?.click()}
                    className={cn(
                      "p-1 sm:p-1.5 rounded-lg transition-all duration-300",
                      "text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                    aria-label="Attach Files"
                    title="Attach Files"
                  >
                    <Paperclip size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={onShowModelGrid}
                    className={cn(
                      "p-1 sm:p-1.5 rounded-lg transition-all duration-300",
                      "text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                    aria-label="Select AI Model"
                    title="Select AI Model"
                  >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "p-1 sm:p-1.5 rounded-lg transition-all duration-300",
                          "text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
                        )}
                        aria-label="AI Modes"
                        title="AI Modes"
                      >
                        {isWebSearch ? <Search size={16} className="sm:w-[18px] sm:h-[18px]" /> : 
                         isDeepThinking ? <Brain size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                         isCreativeMode ? <Lightbulb size={16} className="sm:w-[18px] sm:h-[18px]" /> :
                         <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className={cn(
                        "backdrop-blur-xl bg-white/95 dark:bg-gray-900/95",
                        "border border-gray-200/50 dark:border-gray-700/50",
                        "shadow-2xl z-50"
                      )}
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setIsWebSearch(!isWebSearch);
                          setIsDeepThinking(false);
                          setIsCreativeMode(false);
                        }}
                        className={cn(
                          "flex items-center space-x-2 cursor-pointer",
                          isWebSearch && "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300"
                        )}
                      >
                        <Search size={16} />
                        <span>Search Mode</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsDeepThinking(!isDeepThinking);
                          setIsWebSearch(false);
                          setIsCreativeMode(false);
                        }}
                        className={cn(
                          "flex items-center space-x-2 cursor-pointer",
                          isDeepThinking && "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
                        )}
                      >
                        <Brain size={16} />
                        <span>Think Mode</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsCreativeMode(!isCreativeMode);
                          setIsWebSearch(false);
                          setIsDeepThinking(false);
                        }}
                        className={cn(
                          "flex items-center space-x-2 cursor-pointer",
                          isCreativeMode && "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300"
                        )}
                      >
                        <Lightbulb size={16} />
                        <span>Create Mode</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    type="submit"
                    disabled={!input.trim() || !apiKey.trim() || isLoading}
                    className={cn(
                      "relative group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-300",
                      "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800",
                      "disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed",
                      "shadow-[0_4px_20px_rgba(75,85,99,0.4)] hover:shadow-[0_6px_30px_rgba(75,85,99,0.6)]",
                      "disabled:scale-100",
                      "border border-gray-500/50"
                    )}
                    aria-label="Send message"
                  >
                    <div className={cn(
                      "flex items-center justify-center transition-all duration-300",
                      "text-white",
                      !input.trim() || !apiKey.trim() || isLoading 
                        ? "text-gray-300" 
                        : ""
                    )}>
                      <Send size={12} className="sm:w-3.5 sm:h-3.5" />
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Display uploaded files below the input area */}
              {selectedImages.length > 0 && (
                <div className="px-3 sm:px-4 py-2 border-t border-gray-200/30 dark:border-gray-700/30">
                  <div className="flex flex-wrap gap-2">
                    {selectedImages.map((img, index) => (
                      <div 
                        key={index}
                        className="relative group flex items-center bg-gray-100/80 dark:bg-gray-800/80 rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="h-8 w-8 flex items-center justify-center bg-gray-200/80 dark:bg-gray-700/80">
                          <ImageIcon size={14} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="px-2 py-1 text-xs truncate max-w-[100px]">
                          Image {index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-0 top-0 bottom-0 bg-gray-200/80 dark:bg-gray-700/80 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
          {!apiKey && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2 text-center px-2">
              Please add your OpenRouter API key in settings to start chatting.
            </p>
          )}
        </div>
        
        {/* Moved image preview outside the input area */}
        {selectedImages.length > 0 && (
          <div className="w-full max-w-3xl hidden">
            <ImagePreview images={selectedImages} onRemove={removeImage} />
          </div>
        )}
      </div>
    </DragDropZone>
  );
};

export default ChatInput;
