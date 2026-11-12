import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Share2, Sparkles, User as UserIcon } from 'lucide-react';
import { Message } from '../../types';
import { ContextBridgeCard } from './ContextBridgeCard';

interface ChatMessageProps {
  message: Message;
  isLastKrishna?: boolean;
  onRegenerate?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastKrishna, onRegenerate }) => {
  const isKrishna = message.sender === 'krishna';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isKrishna) {
    return (
      <div className="flex justify-end mb-6 animate-fade-in">
        <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] flex-row-reverse space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0 text-slate-300">
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="bg-[#1E3E62] border border-sky-600/30 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-md">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            <span className="text-[10px] text-sky-300/70 block mt-1 text-right">
              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Krishna Response
  return (
    <div className="flex justify-start mb-8 animate-fade-in">
      <div className="flex items-start space-x-3 max-w-[95%] sm:max-w-[85%]">
        
        {/* Krishna Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-0.5 shadow-md shadow-[#F1B941]/20 flex-shrink-0 mt-1">
          <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-lg">
            🦚
          </div>
        </div>

        {/* Response Bubble / Card */}
        <div className="flex-1 krishna-card rounded-2xl rounded-tl-none p-5 sm:p-6 shadow-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F1B941]/20">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-sm text-[#F1B941] tracking-wide">
                Sri Krishna's Counsel
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
                Gita Wisdom
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleCopy}
                title="Copy response"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {isLastKrishna && onRegenerate && (
                <button
                  onClick={onRegenerate}
                  title="Regenerate guidance"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#F1B941] hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Structured 6-Part Card OR Plain Text Greeting */}
          {message.structured_data ? (
            <ContextBridgeCard data={message.structured_data} />
          ) : (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-slate-100 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          )}

          <div className="pt-3 mt-3 border-t border-slate-800/80 text-right">
            <span className="text-[10px] text-slate-400">
              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

