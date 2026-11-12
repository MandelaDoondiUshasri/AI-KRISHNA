import React from 'react';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { Conversation } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface HistorySidebarProps {
  conversations: Conversation[];
  currentConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: number) => void;
  onCloseMobile?: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onCloseMobile
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full sm:w-72 bg-[#060E1A] border-r border-[#F1B941]/20 flex flex-col h-full text-slate-200">
      
      {/* Header & New Chat button */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={onNewConversation}
          className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1E3E62] to-[#0A1A2F] hover:from-[#28527A] hover:to-[#132B45] text-[#F1B941] border border-[#F1B941]/40 text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#F1B941]/10"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newChatBtn}</span>
        </button>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="sm:hidden ml-2 p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 px-4">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p>{t.noDialogues}</p>
            <p className="mt-1 text-[11px] text-slate-400">{t.askToBegin}</p>
          </div>
        ) : (
          conversations.map((c) => {
            const isSelected = c.id === currentConversationId;
            return (
              <div
                key={c.id}
                onClick={() => onSelectConversation(c.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                  isSelected
                    ? 'bg-[#1E3E62] text-[#F1B941] border border-[#F1B941]/40 font-medium'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                  <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#F1B941]' : 'text-slate-400'}`} />
                  <span className="truncate">{c.title || t.newChatBtn}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(c.id);
                  }}
                  title="Delete dialogue"
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-500 rounded transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        <span>{t.confidentialSpace}</span>
      </div>

    </div>
  );
};

