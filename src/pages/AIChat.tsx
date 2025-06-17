import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageSquare } from 'lucide-react';
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
import SessionManager from '@/components/AIChat/SessionManager';
import '../styles/glow-effects.css';

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

// New interface for chat sessions
interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  modelId: string;
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
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  
  // Add conversation management state
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatSessionId, setActiveChatSessionId] = useState<string | null>(null);
  const [showSessionsMenu, setShowSessionsMenu] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");

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
    
    // Load saved chat sessions
    const savedSessions = localStorage.getItem('chat-sessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        
        // Transform the sessions to ensure dates are properly converted from strings
        const sessions = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })) as ChatSession[];
        
        setChatSessions(sessions);
        
        // Load active session if there is one
        const activeSessionId = localStorage.getItem('active-chat-session-id');
        if (activeSessionId) {
          setActiveChatSessionId(activeSessionId);
          const activeSession = sessions.find(s => s.id === activeSessionId);
          if (activeSession) {
            setMessages(activeSession.messages);
            setSelectedModel(activeSession.modelId);
          }
        }
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
        // Clear corrupted data
        localStorage.removeItem('chat-sessions');
        localStorage.removeItem('active-chat-session-id');
        setChatSessions([]);
        setActiveChatSessionId(null);
      }
    }
  };

  const saveChatHistory = (messages: Message[]) => {
    const history = messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
    const existing = JSON.parse(localStorage.getItem('chat-history') || '[]');
    const updated = [history, ...existing.slice(0, 9)];
    localStorage.setItem('chat-history', JSON.stringify(updated));
    setChatHistory(updated);
    
    // If there's an active session, update it
    if (activeChatSessionId) {
      const updatedSessions = chatSessions.map(session => {
        if (session.id === activeChatSessionId) {
          return {
            ...session,
            messages,
            updatedAt: new Date(),
            modelId: selectedModel
          };
        }
        return session;
      });
      
      setChatSessions(updatedSessions);
      localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    }
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
      } else if (file.type === 'application/pdf' || 
                file.type === 'text/plain' || 
                file.type.includes('document') || 
                file.type.includes('spreadsheet') ||
                file.type.includes('presentation')) {
        // For PDFs and other document types
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          // For text files, we can extract content directly
          if (typeof result === 'string' && file.type === 'text/plain') {
            setInput(prev => {
              const newInput = prev ? `${prev}\n\nContent from ${file.name}:\n${result}` : `Content from ${file.name}:\n${result}`;
              return newInput.length > 8000 ? newInput.substring(0, 8000) + "... (content truncated)" : newInput;
            });
            toast({
              title: "Text File Loaded",
              description: `Content from ${file.name} added to input`,
            });
      } else {
            // For binary files like PDFs, we'll just mention them
            setInput(prev => 
              prev ? `${prev}\n\nAnalyze the attached file: ${file.name}` : `Analyze the attached file: ${file.name}`
            );
            
            // For PDFs, we could add them as base64 images if the model supports vision
            if (file.type === 'application/pdf') {
              const visionModel = models.find(m => m.hasVision);
              if (visionModel) {
                setSelectedModel(visionModel.id);
        toast({
                  title: "PDF Document Added",
                  description: `Using ${visionModel.name} to analyze PDF document`,
                });
                
                // Add the first page as an image if it's a PDF
                if (typeof result === 'string') {
                  // Check PDF size - large PDFs may cause API errors
                  if (result.length > 500000) {
                    toast({
                      title: "Large PDF Detected",
                      description: "This PDF is large and may not be fully processed by the AI",
          variant: "destructive"
        });
      }
                  setSelectedImages(prev => [...prev, result]);
                }
              } else {
                toast({
                  title: "PDF Document Added",
                  description: "PDF added for analysis",
                });
              }
            } else {
              toast({
                title: "File Added",
                description: `${file.name} added for analysis`,
              });
            }
          }
        };
        
        if (file.type === 'text/plain') {
          reader.readAsText(file);
        } else {
          // For PDFs, check file size first
          if (file.type === 'application/pdf' && file.size > 1000000) {
            toast({
              title: "Large PDF",
              description: "This PDF is large and may not be fully analyzed",
              variant: "default"
            });
          }
          reader.readAsDataURL(file);
        }
      } else {
        toast({
          title: "File type not fully supported",
          description: "This file type may not be analyzed completely",
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
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid date";
    }
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleMessageAction = (action: 'copy' | 'edit' | 'regenerate', message: Message) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(message.content);
        toast({
          title: "Copied!",
          description: "Message copied to clipboard",
        });
        break;
      case 'edit':
        if (message.role === 'user') {
          setIsEditing(message.id);
          setEditContent(message.content);
        }
        break;
      case 'regenerate':
        // Remove this message and all subsequent messages
        const messageIndex = messages.findIndex(m => m.id === message.id);
        if (messageIndex >= 0) {
          setMessages(prev => prev.slice(0, messageIndex));
          
          // If this was an assistant message, resubmit the previous user message
          if (message.role === 'assistant' && messageIndex > 0) {
            const prevUserMessage = messages[messageIndex - 1];
            if (prevUserMessage.role === 'user') {
              setInput(prevUserMessage.content);
              // If there were images, restore them too
              if (prevUserMessage.images && prevUserMessage.images.length > 0) {
                setSelectedImages(prevUserMessage.images);
              }
            }
          }
        }
        break;
    }
  };

  const handleEditSubmit = () => {
    if (!isEditing || !editContent.trim()) return;
    
    const editedMessageIndex = messages.findIndex(m => m.id === isEditing);
    if (editedMessageIndex >= 0) {
      const editedMessage = {...messages[editedMessageIndex], content: editContent.trim()};
      
      // Replace the message and remove all subsequent messages
      setMessages(prev => [...prev.slice(0, editedMessageIndex), editedMessage]);
      
      // Clear editing state
      setIsEditing(null);
      setEditContent("");
    }
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
        
        // Filter out PDF files that might be causing issues
        const safeImages = userMessage.images.filter(img => {
          // Skip PDFs that are too large or might cause issues
          if (img.startsWith('data:application/pdf') && img.length > 500000) {
            console.log('Skipping large PDF in API request');
            return false;
          }
          return true;
        });
        
        apiMessages.push({
          role: 'user',
          content: [
            { 
              type: 'text', 
              text: userMessage.content + (
                safeImages.length < userMessage.images.length 
                  ? "\n\nNote: Some PDF files were too large to process directly and have been omitted from the request."
                  : ""
              )
            },
            ...safeImages.map(img => ({
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

      // Create a placeholder streaming message
      const streamingId = (Date.now() + 1).toString();
      setStreamingMessageId(streamingId);
      
      const streamingMessage: Message = {
        id: streamingId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        model: selectedModel,
        isStreaming: true
      };
      
      setMessages(prev => [...prev, streamingMessage]);
      scrollToBottom();

      // Set up streaming fetch
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
          stream: true // Enable streaming
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
            
            // Try again with the fallback model
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
                stream: true // Keep streaming enabled
              })
            });
            
            if (retryResponse.ok) {
              // Process the stream for the retry response
              const reader = retryResponse.body?.getReader();
              const decoder = new TextDecoder();
              let responseText = '';
              
              if (reader) {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  
                  const chunk = decoder.decode(value, { stream: true });
                  // Process SSE data
                  const lines = chunk.split('\n');
                  for (const line of lines) {
                    if (line.startsWith('data: ')) {
                      const data = line.slice(6);
                      if (data === '[DONE]') continue;
                      
                      try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content || '';
                        if (content) {
                          responseText += content;
                          setMessages(prev => 
                            prev.map(msg => 
                              msg.id === streamingId ? { ...msg, content: responseText, model: nextModel.id } : msg
                            )
                          );
                          scrollToBottom();
                        }
                      } catch (e) {
                        console.error('Error parsing streaming data:', e);
                      }
                    }
                  }
                }
              }
              
              // Finalize the message when done
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === streamingId ? { ...msg, isStreaming: false, model: nextModel.id } : msg
                )
              );
              setStreamingMessageId(null);
              saveChatHistory([...messages, { 
                ...streamingMessage, 
                content: responseText, 
                isStreaming: false,
                model: nextModel.id 
              }]);
              return;
            }
          }
        }
        
        let errorMessage = `API Error: ${response.status}`;
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
        
        // Update the streaming message to show the error
        setMessages(prev => 
          prev.map(msg => 
            msg.id === streamingId ? { ...msg, content: errorMessage, isStreaming: false } : msg
          )
        );
        setStreamingMessageId(null);
        
        throw new Error(errorMessage);
      }

      // Process the stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let responseText = '';
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          // Process SSE data
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content || '';
                if (content) {
                  responseText += content;
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === streamingId ? { ...msg, content: responseText } : msg
                    )
                  );
                  scrollToBottom();
                }
              } catch (e) {
                console.error('Error parsing streaming data:', e);
              }
            }
          }
        }
      }
      
      // Finalize the message when done
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingId ? { ...msg, isStreaming: false } : msg
        )
      );
      setStreamingMessageId(null);
      saveChatHistory([...messages, { ...streamingMessage, content: responseText, isStreaming: false }]);
      
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

      // Update the streaming message to show the error or create a new error message
      if (streamingMessageId) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === streamingMessageId ? { ...msg, content: errorMessage, isStreaming: false } : msg
          )
        );
        setStreamingMessageId(null);
      } else {
      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessageObj]);
      }
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

  const createNewSession = () => {
    const name = newSessionName.trim() || `Chat ${chatSessions.length + 1}`;
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      modelId: selectedModel
    };
    
    const updatedSessions = [newSession, ...chatSessions];
    setChatSessions(updatedSessions);
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    
    // Set as active session
    setActiveChatSessionId(newSession.id);
    localStorage.setItem('active-chat-session-id', newSession.id);
    
    // Clear current messages
    setMessages([]);
    setNewSessionName("");
    
    toast({
      title: "New Chat Created",
      description: `Started new chat: ${name}`
    });
  };
  
  const switchSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveChatSessionId(sessionId);
      localStorage.setItem('active-chat-session-id', sessionId);
      setMessages(session.messages);
      setSelectedModel(session.modelId);
      
      toast({
        title: "Chat Switched",
        description: `Switched to: ${session.name}`
      });
    }
  };
  
  const deleteSession = (sessionId: string) => {
    const updatedSessions = chatSessions.filter(s => s.id !== sessionId);
    setChatSessions(updatedSessions);
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    
    // If the active session was deleted, reset
    if (activeChatSessionId === sessionId) {
      setActiveChatSessionId(null);
      localStorage.removeItem('active-chat-session-id');
      setMessages([]);
    }
    
    toast({
      title: "Chat Deleted",
      description: "Chat session has been deleted"
    });
  };
  
  const renameSession = (sessionId: string, newName: string) => {
    if (!newName.trim()) return;
    
    const updatedSessions = chatSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          name: newName,
          updatedAt: new Date()
        };
      }
      return session;
    });
    
    setChatSessions(updatedSessions);
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    
    toast({
      title: "Chat Renamed",
      description: `Chat renamed to: ${newName}`
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white/5 dark:bg-black/5">
      <ChatHeader
        isScrolled={isScrolled}
        messagesLength={messages.length}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        chatSessions={chatSessions}
        activeChatSessionId={activeChatSessionId}
        onSwitchSession={switchSession}
        onCreateSession={createNewSession}
        onDeleteSession={deleteSession}
        onRenameSession={renameSession}
        newSessionName={newSessionName}
        setNewSessionName={setNewSessionName}
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

      <div className="flex-1 flex flex-col pb-4 sm:pb-6 max-w-4xl mx-auto w-full min-h-0 relative">
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto space-y-6 sm:space-y-8 pr-1 sm:pr-2 scroll-smooth custom-scrollbar"
        >
          {isDeepThinking && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
              <div className="brain-icon-watermark animate-pulse-slow">
                <Brain className="w-64 h-64 sm:w-96 sm:h-96 text-gray-100" />
              </div>
            </div>
          )}
          <div className="px-3 sm:px-6 pt-24 sm:pt-28">
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
                      "relative group max-w-[90%] sm:max-w-[85%] rounded-2xl sm:rounded-3xl",
                    message.role === 'user'
                        ? "px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 dark:from-blue-400/20 dark:to-indigo-500/20 text-gray-800 dark:text-gray-200 border border-blue-300/30 dark:border-blue-400/30 shadow-xl shadow-blue-500/10 dark:shadow-blue-400/20"
                      : "space-y-4"
                  )}>
                      {/* Message hover actions */}
                      <div className={cn(
                        "absolute right-2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50",
                        "flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-1",
                        "border border-gray-200/60 dark:border-gray-700/60"
                      )}>
                        <button 
                          onClick={() => handleMessageAction('copy', message)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          aria-label="Copy message"
                          title="Copy message"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        
                        {message.role === 'user' && (
                          <button 
                            onClick={() => handleMessageAction('edit', message)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            aria-label="Edit message"
                            title="Edit & resubmit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        
                        {message.role === 'assistant' && (
                          <button 
                            onClick={() => handleMessageAction('regenerate', message)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            aria-label="Regenerate response"
                            title="Regenerate response"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      {/* Edit mode UI */}
                      {isEditing === message.id ? (
                        <div className="w-full">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button 
                              onClick={() => setIsEditing(null)}
                              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={handleEditSubmit}
                              className="px-3 py-1 rounded bg-blue-600 text-white"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      ) : message.role === 'user' ? (
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
                          <div className="text-right text-[10px] opacity-60 font-normal mt-1.5 text-blue-400/80 dark:text-blue-400/60">
                            {formatTimestamp(message.timestamp)}
                          </div>
                      </>
                    ) : (
                      <>
                        {textParts.map((textPart, index) => {
                          const codeBlockIndex = codeBlockIndices[Math.floor(index / 2)];
                            const isLastTextPart = !files[codeBlockIndex] && index === textParts.length - 1;
                          
                          return (
                            <React.Fragment key={index}>
                              {textPart.trim() && (
                                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 text-gray-800 dark:text-gray-200 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-xl shadow-gray-500/10 dark:shadow-gray-900/30 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
                                    <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                                      {textPart}
                                      {message.isStreaming && index === textParts.length - 1 && (
                                        <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse"></span>
                                      )}
                                    </p>
                                    {isLastTextPart && (
                                      <div className="text-right text-[10px] opacity-60 font-normal mt-1.5 text-gray-500 dark:text-gray-400">
                                        {formatTimestamp(message.timestamp)}
                                      </div>
                                    )}
                                </div>
                              )}
                              
                              {codeBlockIndex !== undefined && files[codeBlockIndex] && (
                                  <>
                                <CodeBlock 
                                  files={[files[codeBlockIndex]]} 
                                  className="w-full"
                                />
                                    <div className="text-right text-[10px] opacity-60 font-normal mt-1.5 pr-2 text-gray-500 dark:text-gray-400">
                                      {formatTimestamp(message.timestamp)}
                                    </div>
                                  </>
                              )}
                            </React.Fragment>
                          );
                        })}
                        
                          {hasCode && files.length > 1 && !textParts.some(p => p.trim()) && (
                            <>
                          <CodeBlock files={files} className="w-full" />
                               <div className="text-right text-[10px] opacity-60 font-normal mt-1.5 pr-2 text-gray-500 dark:text-gray-400">
                                {formatTimestamp(message.timestamp)}
                              </div>
                            </>
                        )}
                      </>
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
        </div>

        <div className="px-3 sm:px-6">
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
            onShowModelGrid={() => setShowModelGrid(true)}
        />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
