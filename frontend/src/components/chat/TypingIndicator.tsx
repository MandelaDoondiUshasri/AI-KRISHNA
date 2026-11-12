import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1E3E62] to-[#F1B941] p-0.5">
          <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-sm">
            🦚
          </div>
        </div>
        <div className="bg-[#0B192C] border border-[#F1B941]/30 rounded-2xl rounded-tl-none px-4 py-3 flex items-center space-x-2 text-xs text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-[#F1B941] animate-spin" />
          <span>Consulting Bhagavad Gita & synthesizing counsel...</span>
          <div className="flex space-x-1 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F1B941] animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F1B941] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F1B941] animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

