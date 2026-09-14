import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  Loader2, 
  Building2, 
  ShieldCheck,
  Minimize2,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Zap,
  HelpCircle,
  Cpu,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  Volume2,
  Mic,
  MicOff,
  Plus,
  Compass,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  Challenge, 
  ProjectWorkspace, 
  IndustryOpportunity, 
  ImpactStory, 
  UserRole 
} from '../types';
import { 
  generateCopilotResponse, 
  CopilotAction, 
  DEFAULT_SUGGESTED_QUESTIONS,
  CopilotContext,
  getContextualQuickActions 
} from '../services/copilotService';

export interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  challenges: Challenge[];
  selectedChallenge?: Challenge | null;
  workspaces?: ProjectWorkspace[];
  selectedWorkspace?: ProjectWorkspace | null;
  opportunities?: IndustryOpportunity[];
  stories?: ImpactStory[];
  activePage?: string;
  currentRole?: UserRole;
  onSelectChallenge: (challenge: Challenge) => void;
  onSelectWorkspace?: (workspace: ProjectWorkspace) => void;
  onNavigatePage: (page: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  badges?: { label: string; color: string }[];
  actions?: CopilotAction[];
  followUps?: string[];
  sourceTrust?: string;
  isStreaming?: boolean;
}

const STORAGE_KEY = 'samadhansetu_copilot_history_v3';

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  challenges,
  selectedChallenge = null,
  workspaces = [],
  selectedWorkspace = null,
  opportunities = [],
  stories = [],
  activePage = 'explore',
  currentRole = 'Citizen' as UserRole,
  onSelectChallenge,
  onSelectWorkspace,
  onNavigatePage
}) => {
  // Window minimize state
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Reset minimize state when opened
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);
  
  // Voice recording state
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Thinking step state for short realistic AI loader
  const [thinkingStep, setThinkingStep] = useState<string>('Analyzing challenge data...');

  // Get time-aware greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning.';
    if (hour < 17) return 'Good afternoon.';
    return 'Good evening.';
  };

  // Get page-specific contextual prompt suggestions for welcome state
  const getPagePromptSuggestions = useCallback((): string[] => {
    if (selectedChallenge || activePage === 'details') {
      return [
        "Analyze this challenge",
        "Why is this challenge priority 94?",
        "Find similar challenges",
        "Which university is best for this challenge?",
        "Suggest technology for this challenge"
      ];
    }
    if (selectedWorkspace || activePage === 'workspace') {
      return [
        "Summarize this project's progress.",
        "What is blocking the project?",
        "What should the team do next?"
      ];
    }
    switch (activePage) {
      case 'government':
        return [
          "What problems are increasing fastest?",
          "Show critical challenges awaiting validation.",
          "Which districts need attention?"
        ];
      case 'university':
        return [
          "Which challenges best match our expertise?",
          "Why is this challenge a 94% match?",
          "Show projects needing student teams."
        ];
      case 'industry':
        return [
          "Which projects need IoT support?",
          "Show projects needing funding.",
          "Where can our company contribute?"
        ];
      case 'impact':
        return [
          "Which projects have the highest impact?",
          "Show impact by district.",
          "Which outcomes are verified?"
        ];
      case 'report':
        return [
          "How do I describe a problem clearly?",
          "What evidence helps universities most?",
          "How is priority calculated?"
        ];
      case 'explore':
      default:
        return [
          "What are the biggest challenges in Ranchi?",
          "Show high-priority water problems.",
          "Which challenges need university support?"
        ];
    }
  }, [activePage, selectedChallenge, selectedWorkspace]);

  // Initial welcome message factory
  const getInitialMessage = useCallback((): ChatMessage => {
    const greeting = getTimeGreeting();
    const suggestions = getPagePromptSuggestions();

    const welcomeText = `${greeting}

I'm SAMADHAN AI.

I can help you understand challenges, discover opportunities and move projects forward.

*Based on the current SAMADHANSETU demo dataset across Jharkhand's 24 districts.*`;

    return {
      id: 'm-welcome',
      sender: 'ai',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badges: [
        { label: "AI Assistant", color: "bg-emerald-50 text-emerald-800 border border-emerald-200" },
        { label: `Page: ${activePage.toUpperCase()}`, color: "bg-stone-100 text-stone-700 border border-stone-200" }
      ],
      followUps: suggestions,
      sourceTrust: "Based on: SAMADHANSETU demo dataset • Current project information • AI analysis"
    };
  }, [activePage, getPagePromptSuggestions]);

  // Messages with session persistence
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return [getInitialMessage()];
  });

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [streamingFullText, setStreamingFullText] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimerRef = useRef<any>(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading, streamingMessageId]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

  // Web Speech API Voice Recognition
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputVal(prev => (prev ? `${prev} ${transcript}` : transcript));
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        return;
      } catch {
        // Fallback to simulation
      }
    }

    // Fallback simulation for unsupported environments
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInputVal("What are the biggest challenges in Ranchi?");
    }, 2000);
  };

  // Handler for "New Conversation"
  const handleNewConversation = () => {
    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    setStreamingMessageId(null);
    setIsLoading(false);
    const initial = [getInitialMessage()];
    setMessages(initial);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {}
  };

  // Copy message text to clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Fast forward / Skip streaming
  const handleSkipStreaming = () => {
    if (streamingTimerRef.current && streamingMessageId) {
      clearInterval(streamingTimerRef.current);
      setMessages(prev => prev.map(m => m.id === streamingMessageId ? { ...m, text: streamingFullText, isStreaming: false } : m));
      setStreamingMessageId(null);
      setStreamingFullText('');
    }
  };

  // Trigger Action Pill
  const handleExecuteAction = (action: CopilotAction) => {
    if (action.type === 'navigate') {
      onNavigatePage(action.target);
    } else if (action.type === 'select_challenge') {
      const found = challenges.find(c => c.id === action.target);
      if (found) {
        onSelectChallenge(found);
      } else {
        onNavigatePage('explore');
      }
    } else if (action.type === 'select_workspace') {
      const foundWs = workspaces.find(w => w.id === action.target || w.challengeId === action.target);
      if (foundWs && onSelectWorkspace) {
        onSelectWorkspace(foundWs);
      } else {
        onNavigatePage('workspace');
      }
    }
  };

  // Core Send Logic
  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputVal).trim();
    if (!q || isLoading || streamingMessageId) return;

    if (!queryText) setInputVal('');

    // Append User Message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Dynamic short thinking stages
    const thinkingStages = [
      'Analyzing challenge data...',
      'Checking university expertise...',
      'Preparing recommendation...'
    ];
    let stepIndex = 0;
    setThinkingStep(thinkingStages[0]);
    const thinkingInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % thinkingStages.length;
      setThinkingStep(thinkingStages[stepIndex]);
    }, 400);

    const copilotContext: CopilotContext = {
      activePage,
      currentRole,
      selectedChallenge,
      selectedWorkspace,
      challenges,
      workspaces,
      opportunities,
      stories
    };

    let answerText = '';
    let answerActions: CopilotAction[] | undefined;
    let answerBadges: { label: string; color: string }[] | undefined;
    let answerFollowUps: string[] | undefined;
    let sourceTrust: string | undefined = "Based on: SAMADHANSETU demo dataset • Current project information • AI analysis";

    // Attempt Server API Call with graceful fallback
    try {
      const res = await fetch('/api/gemini/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          context: {
            activePage,
            currentChallengeTitle: selectedChallenge?.title,
            currentDistrict: selectedChallenge?.location?.district || 'West Singhbhum',
            totalChallenges: challenges.length
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer || data.response) {
          answerText = data.answer || data.response;
        }
      }
    } catch {
      // Fall through to local smart knowledge engine
    }

    clearInterval(thinkingInterval);

    // Always prefer specialized structured local knowledge for the prompt's core questions
    const localResult = generateCopilotResponse(q, copilotContext);
    if (!answerText || localResult.text.includes('### TOP CHALLENGE AREAS') || localResult.text.includes('### BEST MATCH') || localResult.text.includes('### PROJECT STATUS') || localResult.text.includes('### PROJECT BLOCKERS') || localResult.text.includes('### RECOMMENDED TECHNOLOGY') || localResult.text.includes('### WHY THIS PRIORITY?') || localResult.text.includes('### SIMILARITY ANALYSIS') || localResult.text.includes('### TOP IMPACT PROJECTS') || localResult.text.includes('### RECOMMENDED ACTIONS FOR YOUR CONTEXT')) {
      answerText = localResult.text;
    }

    answerActions = localResult.actions;
    answerBadges = localResult.badges;
    answerFollowUps = localResult.followUps;
    sourceTrust = localResult.sourceTrust || sourceTrust;

    // Simulate Realistic Fast Typing Animation
    setIsLoading(false);
    const aiMsgId = `ai-${Date.now()}`;
    const targetFullText = answerText;
    setStreamingFullText(targetFullText);
    setStreamingMessageId(aiMsgId);

    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badges: answerBadges,
      actions: answerActions,
      followUps: answerFollowUps,
      sourceTrust,
      isStreaming: true
    };

    setMessages(prev => [...prev, initialAiMsg]);

    // Stream characters progressively
    let charIndex = 0;
    const chunkSize = 5;
    const speedMs = 12;

    streamingTimerRef.current = setInterval(() => {
      charIndex += chunkSize;
      if (charIndex >= targetFullText.length) {
        clearInterval(streamingTimerRef.current);
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: targetFullText, isStreaming: false } : m));
        setStreamingMessageId(null);
        setStreamingFullText('');
      } else {
        const partial = targetFullText.slice(0, charIndex);
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: partial } : m));
      }
    }, speedMs);
  };

  // Helper to render formatted text with headers, numbered items, and clean spacing
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          // Header 3 (Main Sections)
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-xs text-stone-900 uppercase tracking-wider mt-2.5 pt-1 border-b border-stone-100 pb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>{trimmed.replace('### ', '')}</span>
              </h4>
            );
          }

          // Header 4
          if (trimmed.startsWith('#### ')) {
            return (
              <h5 key={idx} className="font-bold text-xs text-stone-800 uppercase tracking-wider mt-2 text-stone-900">
                {trimmed.replace('#### ', '')}
              </h5>
            );
          }

          // Numbered list item
          if (/^\d+\.\s/.test(trimmed)) {
            const num = trimmed.match(/^(\d+)\.\s/)?.[1] || '•';
            const content = trimmed.replace(/^\d+\.\s/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-0.5 pt-0.5">
                <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                  {num}
                </span>
                <span className="text-stone-800">{formatInlineBold(content)}</span>
              </div>
            );
          }

          // Bullet list item
          if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
            const content = trimmed.replace(/^[-•*]\s/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-orange-600 font-bold shrink-0 mt-0.5">›</span>
                <span className="text-stone-700">{formatInlineBold(content)}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-stone-800">
              {formatInlineBold(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper for bold strings like **text**
  const formatInlineBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-stone-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Get current contextual quick actions
  const quickActions = getContextualQuickActions(activePage, selectedChallenge, selectedWorkspace);

  // Minimized Compact Dock Trigger
  if (isOpen && isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
        <button
          onClick={() => setIsMinimized(false)}
          className="px-4 py-3 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs shadow-xl shadow-black/20 flex items-center gap-2.5 cursor-pointer transition-all border border-stone-700"
          title="Restore SAMADHAN AI Copilot"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-orange-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <span className="font-heading font-semibold">SAMADHAN AI</span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-stone-300">Active</span>
        </button>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-white rounded-3xl shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 w-[94vw] sm:w-[420px] h-[640px] max-h-[88vh]"
    >
      
      {/* ==================================================
          COPILOT HEADER
      ================================================== */}
      <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between shrink-0 border-b border-stone-800">
        
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-stone-800 flex items-center justify-center border border-stone-700 shadow-inner">
              <Bot className="w-5 h-5 text-orange-500" />
            </div>
            {/* Subtle active status indicator */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0F172A]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm font-heading tracking-tight text-white truncate">
                SAMADHAN AI
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.2 rounded font-medium flex items-center gap-1 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                <span>AI Assistant</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-400 truncate mt-0.5">
              Societal Innovation Copilot
            </p>
          </div>
        </div>

        {/* Window Controls: New Conversation, Minimize, Close */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleNewConversation}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-colors"
            title="New Conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-colors"
            title="Minimize"
          >
            <span className="text-xs font-mono font-bold leading-none px-0.5">_</span>
          </button>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer transition-colors ml-0.5"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Context Awareness Pill Strip */}
      <div className="px-3.5 py-1.5 bg-stone-50 border-b border-stone-200/80 text-[11px] text-stone-600 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          <Layers className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="font-medium text-stone-500">Context:</span>
          <span className="font-bold truncate text-stone-900">
            {selectedChallenge ? `Challenge: ${selectedChallenge.title}` : selectedWorkspace ? `Workspace: ${selectedWorkspace.title}` : `Page: ${activePage}`}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-md shrink-0">
          Demo Dataset
        </span>
      </div>

      {/* ==================================================
          CHAT MESSAGES STREAM
      ================================================== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[#FAFAF9]">
        {messages.map((m) => {
          const isAI = m.sender === 'ai';
          return (
            <div 
              key={m.id} 
              className={`flex gap-2.5 ${isAI ? 'justify-start' : 'justify-end'} group animate-in fade-in duration-200`}
            >
              {isAI && (
                <div className="w-7 h-7 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-orange-500" />
                </div>
              )}

              <div className="max-w-[88%] sm:max-w-[84%] space-y-2">
                
                {/* Message Bubble */}
                <div 
                  className={`p-3.5 rounded-2xl shadow-2xs relative ${
                    isAI 
                      ? 'bg-white border border-stone-200/90 text-stone-800 rounded-tl-sm' 
                      : 'bg-stone-900 text-white rounded-tr-sm'
                  }`}
                >
                  {/* AI Badges */}
                  {isAI && m.badges && m.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2 pb-1.5 border-b border-stone-100">
                      {m.badges.map((b, bIdx) => (
                        <span 
                          key={bIdx} 
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${b.color}`}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Formatted Text Content */}
                  {isAI ? (
                    renderFormattedText(m.text)
                  ) : (
                    <div className="whitespace-pre-line leading-relaxed font-medium">
                      {m.text}
                    </div>
                  )}

                  {/* Streaming Cursor */}
                  {m.isStreaming && (
                    <div className="inline-flex items-center gap-1.5 ml-1 mt-1 text-orange-600 font-mono text-xs">
                      <span className="w-1.5 h-3.5 bg-orange-600 animate-pulse inline-block align-middle" />
                      <button
                        onClick={handleSkipStreaming}
                        className="text-[10px] font-bold uppercase tracking-wider text-stone-400 hover:text-orange-600 ml-2 cursor-pointer bg-stone-100 px-1.5 py-0.5 rounded"
                      >
                        Skip ⏩
                      </button>
                    </div>
                  )}

                  {/* Source Trust Indicator */}
                  {isAI && m.sourceTrust && !m.isStreaming && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                      <span className="truncate">{m.sourceTrust}</span>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <button
                          onClick={() => handleCopyText(m.text, m.id)}
                          className="hover:text-stone-700 cursor-pointer flex items-center gap-1 transition-colors"
                          title="Copy Answer"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Action Buttons Attached to Answer */}
                {isAI && m.actions && m.actions.length > 0 && !m.isStreaming && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {m.actions.map((act) => (
                      <button
                        key={act.id}
                        onClick={() => handleExecuteAction(act)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer hover:border-orange-300"
                      >
                        <ArrowRight className="w-3 h-3 text-orange-600" />
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Contextual Follow-up Suggestions */}
                {isAI && m.followUps && m.followUps.length > 0 && !m.isStreaming && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-stone-400" />
                      <span>Suggested Follow-Ups</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.followUps.map((fu, fuIdx) => (
                        <button
                          key={fuIdx}
                          onClick={() => handleSend(fu)}
                          className="text-left px-2.5 py-1 rounded-xl bg-white hover:bg-stone-50 hover:text-stone-900 text-stone-700 text-[11px] font-medium transition-colors border border-stone-200 shadow-2xs cursor-pointer"
                        >
                          {fu}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Short Refined AI Thinking State */}
        {isLoading && (
          <div className="flex gap-2.5 items-center text-stone-500 text-xs animate-in fade-in duration-150">
            <div className="w-7 h-7 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="bg-white border border-stone-200 p-3 rounded-2xl flex items-center gap-2.5 shadow-2xs text-stone-700">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />
              <span className="font-medium text-xs">{thinkingStep}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ==================================================
          CONTEXTUAL QUICK ACTIONS BAR (Above Input)
      ================================================== */}
      <div className="p-2.5 bg-stone-50 border-t border-stone-200/80 shrink-0">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
            <Zap className="w-3 h-3 text-orange-600" />
            Quick Context Actions
          </span>
          <span className="text-[10px] text-stone-400">Click to ask</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
          {quickActions.map((qa, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qa.query)}
              disabled={isLoading || !!streamingMessageId}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200/90 hover:border-orange-300 whitespace-nowrap font-medium cursor-pointer shadow-2xs transition-all shrink-0 flex items-center gap-1 disabled:opacity-50"
            >
              <span>{qa.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ==================================================
          INPUT FIELD & TRIGGER
      ================================================== */}
      <div className="p-3 bg-white border-t border-stone-200 shrink-0">
        <div className="flex items-center gap-2">
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading || !!streamingMessageId}
            placeholder="Ask SAMADHAN AI about challenges, universities, impact..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-hidden font-medium placeholder:text-stone-400 disabled:opacity-50 text-stone-900"
          />

          {/* Voice Microphone Control */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
            title={isListening ? "Listening... click to stop" : "Voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isLoading || !!streamingMessageId}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white cursor-pointer shadow-sm transition-all"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 px-1">
          <span>SAMADHANSETU Intelligence Layer</span>
          <span className="font-mono">Press Enter ↵</span>
        </div>
      </div>

    </div>
  );
};
