import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, Trash2, RotateCcw, Menu, X, Globe, MessageSquare, 
  HelpCircle, ArrowDown 
} from 'lucide-react';
import { Conversation, Message, Language } from '../types';
import { chatService } from '../services/chatService';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../components/chat/ChatMessage';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { SuggestedQuestions } from '../components/chat/SuggestedQuestions';
import { HistorySidebar } from '../components/chat/HistorySidebar';

export const ChatPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadConversations();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const loadConversations = async () => {
    try {
      const list = await chatService.listConversations();
      setConversations(list);
      if (list.length > 0 && !currentConversationId) {
        setCurrentConversationId(list[0].id);
        setMessages(list[0].messages || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectConversation = async (id: number) => {
    try {
      const conv = await chatService.getConversation(id);
      setCurrentConversationId(conv.id);
      setMessages(conv.messages || []);
      setSidebarOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewConversation = async () => {
    try {
      const newConv = await chatService.createConversation('Spiritual Dialogue', language);
      setConversations([newConv, ...conversations]);
      setCurrentConversationId(newConv.id);
      setMessages([]);
      setSidebarOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteConversation = async (id: number) => {
    try {
      await chatService.deleteConversation(id);
      const updated = conversations.filter(c => c.id !== id);
      setConversations(updated);
      if (currentConversationId === id) {
        if (updated.length > 0) {
          handleSelectConversation(updated[0].id);
        } else {
          setCurrentConversationId(null);
          setMessages([]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearCurrent = () => {
    setMessages([]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    setInputText('');
    setIsLoading(true);

    // Optimistic user message preview
    const tempUserMsg: Message = {
      id: Date.now(),
      conversation_id: currentConversationId || 0,
      sender: 'user',
      content: text,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await chatService.sendMessage(text, currentConversationId || undefined, language);
      
      setCurrentConversationId(res.conversation_id);

      // Refresh messages with verified backend output
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempUserMsg.id);
        return [...filtered, res.user_message, res.krishna_message];
      });

      // Update sidebar title if this was a new conversation
      loadConversations();
    } catch (err: any) {
      console.error(err);
      // Fallback message
      const errorMsg: Message = {
        id: Date.now() + 1,
        conversation_id: currentConversationId || 0,
        sender: 'krishna',
        content: "I am always here with you. Please check your network or try again in a moment.",
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!currentConversationId || isLoading) return;
    setIsLoading(true);

    try {
      const res = await chatService.regenerateMessage(currentConversationId, language);
      setMessages(prev => [...prev, res.krishna_message]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#081225]">
      
      {/* Sidebar for Desktop & Mobile Drawer */}
      <div className={`fixed inset-y-16 left-0 z-30 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:relative sm:inset-y-0 sm:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <HistorySidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          onCloseMobile={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Conversation Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Control Bar */}
        <div className="h-14 border-b border-slate-800 bg-[#0B192C]/80 backdrop-blur-md px-4 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-xl">🦚</span>
              <div>
                <h2 className="text-xs font-serif font-bold text-slate-100">
                  {t.chatTitle}
                </h2>
                <span className="text-[10px] text-[#F1B941]">
                  {t.chatSubtitle}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="flex bg-[#081225] rounded-lg p-0.5 border border-slate-700 text-xs">
              {(['en', 'hi', 'te'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === l ? 'bg-[#F1B941] text-[#081225] font-semibold' : 'text-slate-400'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {/* Clear Chat */}
            {messages.length > 0 && (
              <button
                onClick={handleClearCurrent}
                title="Clear current screen"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
          
          {/* Welcome Card if no messages */}
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto my-6 animate-fade-in">
              <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/40 text-center shadow-2xl">
                
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-0.5 shadow-xl shadow-[#F1B941]/20">
                  <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-3xl">
                    🦚
                  </div>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl gold-gradient-text mb-3">
                  {t.welcomeTitle}
                </h3>

                <p className="font-serif text-sm sm:text-base text-slate-200 leading-relaxed italic max-w-lg mx-auto mb-6">
                  "{t.welcomeMessage}"
                </p>

                <div className="pt-4 border-t border-slate-700/60 text-left">
                  <SuggestedQuestions onSelect={(q) => handleSendMessage(q)} />
                </div>

              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id || idx}
                  message={msg}
                  isLastKrishna={msg.sender === 'krishna' && idx === messages.length - 1}
                  onRegenerate={handleRegenerate}
                />
              ))}

              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0B192C]/90 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  disabled={isLoading}
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-[#081225] border border-slate-700 focus:border-[#F1B941] focus:outline-none text-sm text-white placeholder-slate-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1.5"
              >
                <span>{t.sendBtn}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>{t.chatHelperText}</span>
              <span className="text-[#F1B941]">{t.confidentialDialogue}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

