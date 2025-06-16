import React, { useState, useRef, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/util';
import { useToast } from '@/hooks/use-toast';
import CodeBlock from '@/components/CodeBlock';
import { parseCodeBlocks, renderMessageWithCodeBlocks } from '@/utils/codeBlockParser';
import ChatHeader from '@/components/AIChat/ChatHeader';
import SettingsPanel from '@/components/AIChat/SettingsPanel';
import ModelSelector from '@/components/AIChat/ModelSelector';
import ChatHistory from '@/components/AIChat/ChatHistory';
import ChatInput from '@/components/AIChat/ChatInput';
import WelcomeScreen from '@/components/AIChat/WelcomeScreen';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  thinking?: string;
  model?: string;
  images?: string[];
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openrouter-api-key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTimestamps, setShowTimestamps] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-r1-distill-qwen-32b:free');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false);
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showModelGrid, setShowModelGrid] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const models = [
    { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', context: '1M tokens', hasVision: true, category: 'Vision', description: 'Latest Google model with vision' },
    { id: 'meta-llama/llama-3.2-11b-vision-instruct:free', name: 'Llama 3.2 11B Vision', context: '131K tokens', hasVision: true, category: 'Vision', description: 'Meta vision model' },
    { id: 'qwen/qwen-2.5-vl-7b-instruct:free', name: 'Qwen 2.5 VL 7B', context: '32K tokens', hasVision: true, category: 'Vision', description: 'Qwen vision model' },
    { id: 'qwen/qwen2.5-vl-3b-instruct:free', name: 'Qwen 2.5 VL 3B', context: '64K tokens', hasVision: true, category: 'Vision', description: 'Compact vision model' },
    { id: 'opengvlab/internvl3-14b:free', name: 'InternVL3 14B', context: '12K tokens', hasVision: true, category: 'Vision', description: 'Advanced vision model' },
    { id: 'opengvlab/internvl3-2b:free', name: 'InternVL3 2B', context: '12K tokens', hasVision: true, category: 'Vision', description: 'Compact vision model' },
    { id: 'deepseek/deepseek-r1-distill-qwen-32b:free', name: 'DeepSeek R1 32B', context: '16K tokens', hasVision: false, category: 'Reasoning', description: 'Advanced reasoning model' },
    { id: 'deepseek/deepseek-r1-distill-qwen-14b:free', name: 'DeepSeek R1 14B', context: '64K tokens', hasVision: false, category: 'Reasoning', description: 'Reasoning specialist' },
    { id: 'deepseek/deepseek-r1-zero:free', name: 'DeepSeek R1 Zero', context: '163K tokens', hasVision: false, category: 'Reasoning', description: 'Zero-shot reasoning' },
    { id: 'microsoft/phi-4-reasoning-plus:free', name: 'Phi 4 Reasoning+', context: '32K tokens', hasVision: false, category: 'Reasoning', description: 'Microsoft reasoning model' },
    { id: 'microsoft/phi-4-reasoning:free', name: 'Phi 4 Reasoning', context: '32K tokens', hasVision: false, category: 'Reasoning', description: 'Compact reasoning' },
    { id: 'qwen/qwq-32b:free', name: 'QwQ 32B', context: '40K tokens', hasVision: false, category: 'Reasoning', description: 'Question reasoning model' },
    { id: 'deepseek/deepseek-prover-v2:free', name: 'DeepSeek Prover V2', context: '163K tokens', hasVision: false, category: 'Reasoning', description: 'Mathematical proving' },
    { id: 'meta-llama/llama-4-scout:free', name: 'Llama 4 Scout', context: '200K tokens', hasVision: false, category: 'Latest', description: 'Latest Llama 4 model' },
    { id: 'meta-llama/llama-4-maverick:free', name: 'Llama 4 Maverick', context: '128K tokens', hasVision: false, category: 'Latest', description: 'Llama 4 variant' },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B', context: '131K tokens', hasVision: false, category: 'Latest', description: 'Large Llama model' },
    { id: 'meta-llama/llama-3.3-8b-instruct:free', name: 'Llama 3.3 8B', context: '128K tokens', hasVision: false, category: 'Latest', description: 'Mid-size Llama' },
    { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', context: '20K tokens', hasVision: false, category: 'Latest', description: 'Compact Llama' },
    { id: 'meta-llama/llama-3.2-1b-instruct:free', name: 'Llama 3.2 1B', context: '131K tokens', hasVision: false, category: 'Latest', description: 'Smallest Llama' },
    { id: 'qwen/qwen3-30b-a3b:free', name: 'Qwen3 30B A3B', context: '40K tokens', hasVision: false, category: 'Qwen', description: 'Large Qwen model' },
    { id: 'qwen/qwen3-14b:free', name: 'Qwen3 14B', context: '40K tokens', hasVision: false, category: 'Qwen', description: 'Mid Qwen model' },
    { id: 'qwen/qwen3-8b:free', name: 'Qwen3 8B', context: '40K tokens', hasVision: false, category: 'Qwen', description: 'Compact Qwen' },
    { id: 'qwen/qwen-2.5-7b-instruct:free', name: 'Qwen 2.5 7B', context: '32K tokens', hasVision: false, category: 'Qwen', description: 'Qwen instruct model' },
    { id: 'deepseek/deepseek-r1-0528-qwen3-8b:free', name: 'DeepSeek R1 Qwen3 8B', context: '131K tokens', hasVision: false, category: 'Qwen', description: 'DeepSeek Qwen hybrid' },
    { id: 'mistralai/devstral-small:free', name: 'Devstral Small', context: '131K tokens', hasVision: false, category: 'Coding', description: 'Coding specialist' },
    { id: 'agentica-org/deepcoder-14b-preview:free', name: 'DeepCoder 14B', context: '96K tokens', hasVision: false, category: 'Coding', description: 'Advanced coding model' },
    { id: 'open-r1/olympiccoder-32b:free', name: 'OlympicCoder 32B', context: '32K tokens', hasVision: false, category: 'Coding', description: 'Competition coding' },
    { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1 24B', context: '96K tokens', hasVision: false, category: 'Mistral', description: 'Latest Mistral' },
    { id: 'mistralai/mistral-small-24b-instruct-2501:free', name: 'Mistral Small 3', context: '32K tokens', hasVision: false, category: 'Mistral', description: 'Mistral Small 3' },
    { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', context: '32K tokens', hasVision: false, category: 'Mistral', description: 'Base Mistral model' },
    { id: 'google/gemma-3-4b-it:free', name: 'Gemma 3 4B', context: '96K tokens', hasVision: false, category: 'Google', description: 'Mid Gemma model' },
    { id: 'google/gemma-3-1b-it:free', name: 'Gemma 3 1B', context: '32K tokens', hasVision: false, category: 'Google', description: 'Compact Gemma' },
    { id: 'nousresearch/deephermes-3-mistral-24b-preview:free', name: 'DeepHermes 3 Mistral 24B', context: '32K tokens', hasVision: false, category: 'Specialized', description: 'Hermes reasoning' },
    { id: 'nousresearch/deephermes-3-llama-3-8b-preview:free', name: 'DeepHermes 3 Llama 8B', context: '131K tokens', hasVision: false, category: 'Specialized', description: 'Hermes Llama' },
    { id: 'cognitivecomputations/dolphin3.0-mistral-24b:free', name: 'Dolphin 3.0 Mistral 24B', context: '32K tokens', hasVision: false, category: 'Specialized', description: 'Dolphin model' },
    { id: 'cognitivecomputations/dolphin3.0-r1-mistral-24b:free', name: 'Dolphin 3.0 R1 24B', context: '32K tokens', hasVision: false, category: 'Specialized', description: 'Dolphin reasoning' },
    { id: 'rekaai/reka-flash-3:free', name: 'Reka Flash 3', context: '32K tokens', hasVision: false, category: 'Specialized', description: 'Fast Reka model' },
    { id: 'sarvamai/sarvam-m:free', name: 'Sarvam-M', context: '32K tokens', hasVision: false, category: 'Specialized', description: 'Sarvam AI model' },
    { id: 'deepseek/deepseek-v3-base:free', name: 'DeepSeek V3 Base', context: '163K tokens', hasVision: false, category: 'Specialized', description: 'DeepSeek V3 base' }
  ];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadChatHistory = () => {
    const saved = localStorage.getItem('chat-history');
    if (saved) {
      setChatHistory(JSON.parse(saved));
    }
  };

  const saveChatHistory = (messages: Message[]) => {
    const history = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
    const existing = JSON.parse(localStorage.getItem('chat-history') || '[]');
    const updated = [history, ...existing.slice(0, 9)];
    localStorage.setItem('chat-history', JSON.stringify(updated));
    setChatHistory(updated);
  };

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been cleared"
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImages(prev => [...prev, result]);
          const visionModel = models.find(m => m.hasVision);
          if (visionModel && selectedModel !== visionModel.id) {
            setSelectedModel(visionModel.id);
            toast({
              title: "Switched to Vision Model",
              description: `Switched to ${visionModel.name} for image analysis`,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImages(prev => [...prev, result]);
          const visionModel = models.find(m => m.hasVision);
          if (visionModel && selectedModel !== visionModel.id) {
            setSelectedModel(visionModel.id);
            toast({
              title: "Switched to Vision Model",
              description: `Switched to ${visionModel.name} for image analysis`,
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "File type not supported",
          description: "Currently only image files are supported",
          variant: "destructive"
        });
      }
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuickModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelGrid(false);
    toast({
      title: "Model Changed",
      description: `Switched to ${models.find(m => m.id === modelId)?.name}`,
    });
  };

  const getSystemPrompt = () => {
    let prompt = 'You are REI, a helpful AI assistant for a developer portfolio website. Your name is REI and you should introduce yourself as such when appropriate. Be concise, friendly, and helpful. Focus on answering questions about web development, programming, and general assistance.';
    
    if (isDeepThinking) {
      prompt += ' Use deep reasoning and provide comprehensive analysis. Think through problems step by step and provide detailed explanations with your reasoning process.';
    }
    
    if (isWebSearch) {
      prompt += ' Use web search capabilities to find the most up-to-date information when relevant.';
    }
    
    if (isCreativeMode) {
      prompt += ' Be creative and innovative in your responses. Think outside the box and provide unique perspectives.';
    }
    
    if (selectedImages.length > 0) {
      prompt += ' You can see and analyze images provided by the user. Describe what you see and help with any visual questions.';
    }
    
    return prompt;
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey.trim()) {
      if (!apiKey.trim()) {
        toast({
          title: "API Key Required",
          description: "Please add your OpenRouter API key in settings",
          variant: "destructive"
        });
      }
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
      images: selectedImages.length > 0 ? [...selectedImages] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImages([]);
    setIsLoading(true);

    try {
      console.log('Sending request to OpenRouter with model:', selectedModel);
      
      const currentModel = models.find(m => m.id === selectedModel);
      console.log('Current model supports vision:', currentModel?.hasVision);
      
      const apiMessages = [
        {
          role: 'system',
          content: getSystemPrompt()
        },
        ...messages.slice(-10).map(msg => {
          if (msg.images && msg.images.length > 0 && currentModel?.hasVision) {
            return {
              role: msg.role,
              content: [
                { type: 'text', text: msg.content },
                ...msg.images.map(img => ({
                  type: 'image_url',
                  image_url: { url: img }
                }))
              ]
            };
          }
          return {
            role: msg.role,
            content: msg.content
          };
        })
      ];

      if (userMessage.images && userMessage.images.length > 0 && currentModel?.hasVision) {
        console.log('Adding images to request, count:', userMessage.images.length);
        apiMessages.push({
          role: 'user',
          content: [
            { type: 'text', text: userMessage.content },
            ...userMessage.images.map(img => ({
              type: 'image_url',
              image_url: { url: img }
            }))
          ]
        });
      } else if (userMessage.images && userMessage.images.length > 0 && !currentModel?.hasVision) {
        const visionModel = models.find(m => m.hasVision);
        if (visionModel) {
          setSelectedModel(visionModel.id);
          toast({
            title: "Switched to Vision Model",
            description: `Switched to ${visionModel.name} for image analysis`,
          });
          apiMessages.push({
            role: 'user',
            content: [
              { type: 'text', text: userMessage.content },
              ...userMessage.images.map(img => ({
                type: 'image_url',
                image_url: { url: img }
              }))
            ]
          });
        } else {
          apiMessages.push({
            role: 'user',
            content: userMessage.content
          });
        }
      } else {
        apiMessages.push({
          role: 'user',
          content: userMessage.content
        });
      }

      console.log('Final API messages:', JSON.stringify(apiMessages, null, 2));

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Portfolio AI Assistant'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: apiMessages,
          temperature: isDeepThinking ? 0.3 : 0.7,
          max_tokens: isDeepThinking ? 4000 : 2000,
          stream: false
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        
        if (response.status === 429 || response.status === 404 || response.status === 503) {
          const fallbackModels = models.filter(m => m.id !== selectedModel);
          if (fallbackModels.length > 0) {
            const nextModel = fallbackModels[0];
            setSelectedModel(nextModel.id);
            toast({
              title: "Switching Models",
              description: `${currentModel?.name || 'Current model'} is unavailable. Trying ${nextModel.name}...`,
            });
            
            const retryResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.href,
                'X-Title': 'Portfolio AI Assistant'
              },
              body: JSON.stringify({
                model: nextModel.id,
                messages: apiMessages,
                temperature: isDeepThinking ? 0.3 : 0.7,
                max_tokens: isDeepThinking ? 4000 : 2000,
                stream: false
              })
            });
            
            if (retryResponse.ok) {
              const retryData = await retryResponse.json();
              const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: retryData.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
                role: 'assistant',
                timestamp: new Date(),
                model: nextModel.id
              };

              setMessages(prev => {
                const updated = [...prev, assistantMessage];
                saveChatHistory(updated);
                return updated;
              });
              return;
            }
          }
        }
        
        let errorMessage = `API Error: ${response.status}`;
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
        role: 'assistant',
        timestamp: new Date(),
        model: selectedModel
      };

      setMessages(prev => {
        const updated = [...prev, assistantMessage];
        saveChatHistory(updated);
        return updated;
      });
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Sorry, there was an error processing your request.';
      if (error instanceof Error) {
        if (error.message.includes('No endpoints found') || error.message.includes('404')) {
          errorMessage = 'The selected model is not available. Please try a different model.';
        } else if (error.message.includes('401')) {
          errorMessage = 'Invalid API key. Please check your OpenRouter API key.';
        } else if (error.message.includes('429')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedModels = models.reduce((acc, model) => {
    const category = model.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, typeof models>);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white/5 dark:bg-black/5">
      <ChatHeader
        isScrolled={isScrolled}
        messagesLength={messages.length}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showTimestamps={showTimestamps}
        setShowTimestamps={setShowTimestamps}
      />

      <SettingsPanel
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        apiKey={apiKey}
        setApiKey={setApiKey}
        selectedModel={selectedModel}
        models={models}
      />

      <ModelSelector
        showModelGrid={showModelGrid}
        setShowModelGrid={setShowModelGrid}
        models={models}
        selectedModel={selectedModel}
        onModelSelect={setSelectedModel}
      />

      <ChatHistory
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        chatHistory={chatHistory}
      />

      <div className="flex-1 flex flex-col pt-16 sm:pt-20 pb-4 sm:pb-6 px-3 sm:px-6 max-w-4xl mx-auto w-full min-h-0">
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto space-y-6 sm:space-y-8 pr-1 sm:pr-2 scroll-smooth"
        >
          {messages.length === 0 && (
            <WelcomeScreen
              modelsCount={models.length}
              onTagClick={setInput}
            />
          )}
          
          {messages.map((message) => {
            const { hasCode, files, textContent } = parseCodeBlocks(message.content);
            const { textParts, codeBlockIndices } = renderMessageWithCodeBlocks(textContent, files);
            
            return (
              <div key={message.id} className="space-y-3 sm:space-y-4 animate-fade-in">
                <div className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[90%] sm:max-w-[85%] rounded-2xl sm:rounded-3xl",
                    message.role === 'user'
                      ? "px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 dark:from-blue-400/20 dark:to-indigo-500/20 text-gray-800 dark:text-gray-200 border-2 border-blue-300/30 dark:border-blue-400/30 shadow-xl shadow-blue-500/10 dark:shadow-blue-400/20"
                      : "space-y-4"
                  )}>
                    {message.role === 'user' ? (
                      <>
                        <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base font-medium">{message.content}</p>
                        
                        {message.images && message.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
                            {message.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Uploaded ${index + 1}`}
                                className="rounded-xl sm:rounded-2xl max-w-full h-auto border-2 border-blue-300/30 dark:border-blue-400/30 shadow-lg"
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {textParts.map((textPart, index) => {
                          const codeBlockIndex = codeBlockIndices[Math.floor(index / 2)];
                          
                          return (
                            <React.Fragment key={index}>
                              {textPart.trim() && (
                                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 text-gray-800 dark:text-gray-200 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-xl shadow-gray-500/10 dark:shadow-gray-900/30 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
                                  <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{textPart}</p>
                                </div>
                              )}
                              
                              {codeBlockIndex !== undefined && files[codeBlockIndex] && (
                                <CodeBlock 
                                  files={[files[codeBlockIndex]]} 
                                  className="w-full"
                                />
                              )}
                            </React.Fragment>
                          );
                        })}
                        
                        {hasCode && files.length > 1 && (
                          <CodeBlock files={files} className="w-full" />
                        )}
                      </>
                    )}
                    
                    {showTimestamps && (
                      <div className={cn(
                        "text-xs opacity-50 font-normal mt-1.5 px-1",
                        message.role === 'user' ? "text-right text-blue-600 dark:text-blue-400" : "text-left text-gray-500 dark:text-gray-400"
                      )}>
                        {formatTimestamp(message.timestamp)}
                      </div>
                    )}
                    
                    {message.model && message.role === 'assistant' && (
                      <div className="flex justify-start">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2">
                          <p className="text-xs opacity-60 font-medium text-gray-600 dark:text-gray-400">
                            {models.find(m => m.id === message.model)?.name || message.model}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {message.thinking && (
                  <div className="flex justify-start">
                    <div className={cn(
                      "max-w-[90%] sm:max-w-[85%] px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl",
                      "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
                      "border border-blue-200/50 dark:border-blue-800/50 shadow-lg shadow-blue-500/10"
                    )}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-1 sm:p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <Brain size={14} className="sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">AI Reasoning</span>
                      </div>
                      <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-200 whitespace-pre-wrap max-h-32 sm:max-h-40 overflow-y-auto leading-relaxed">
                        {message.thinking}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 border-2 border-gray-200/50 dark:border-gray-600/50 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-500/10 dark:shadow-gray-900/30 backdrop-blur-sm">
                <div className="flex space-x-1.5 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiKey={apiKey}
          isWebSearch={isWebSearch}
          setIsWebSearch={setIsWebSearch}
          isDeepThinking={isDeepThinking}
          setIsDeepThinking={setIsDeepThinking}
          isCreativeMode={isCreativeMode}
          setIsCreativeMode={setIsCreativeMode}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          onImageUpload={handleImageUpload}
          onAttachmentUpload={handleAttachmentUpload}
          onShowModelGrid={() => setShowModelGrid(!showModelGrid)}
        />
      </div>
    </div>
  );
};

export default AIChat;
