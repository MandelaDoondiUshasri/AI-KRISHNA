import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, BookOpen, Sparkles, LogIn } from 'lucide-react';
import { Favorite, Verse } from '../types';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { VerseModal } from '../components/gita/VerseModal';

interface SavedWisdomPageProps {
  onOpenAuth: () => void;
}

export const SavedWisdomPage: React.FC<SavedWisdomPageProps> = ({ onOpenAuth }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVerse, setModalVerse] = useState<Verse | null>(null);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const data = await userService.getFavorites();
      setFavorites(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userService.deleteFavorite(id);
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="krishna-card rounded-3xl p-8 max-w-md text-center border border-[#F1B941]/40 shadow-2xl">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1E3E62] flex items-center justify-center text-[#F1B941]">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-white mb-2">
            Your Personal Spiritual Sanctuary
          </h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Please sign in to save your favorite Bhagavad Gita verses, personalized Krishna dialogues, and daily reflections.
          </p>
          <button
            onClick={onOpenAuth}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In or Register</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081225] py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#F1B941] font-semibold uppercase tracking-wider mb-1">
              <Bookmark className="w-4 h-4 fill-[#F1B941]" />
              <span>Personal Treasury</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Saved Verses & Insights
            </h1>
          </div>
          <span className="text-xs text-slate-400">
            {favorites.length} Saved {favorites.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xs text-slate-400">Loading your saved wisdom...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 krishna-card rounded-2xl border border-slate-800">
            <Bookmark className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="text-sm text-slate-300 font-medium">No saved verses yet.</p>
            <p className="text-xs text-slate-400 mt-1">
              As you chat with AI Krishna or explore the Gita, click the bookmark icon to collect wisdom here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="krishna-card rounded-2xl p-5 border border-slate-800 hover:border-[#F1B941]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-[#F1B941]">
                      {fav.title || 'Saved Wisdom'}
                    </span>
                    <button
                      onClick={() => handleDelete(fav.id)}
                      title="Remove from favorites"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {fav.verse && (
                    <div className="mb-4">
                      <p className="font-serif text-sm text-amber-200 line-clamp-2 leading-relaxed mb-2 font-medium">
                        {fav.verse.slok_sanskrit}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {fav.verse.translation_en}
                      </p>
                    </div>
                  )}

                  {fav.notes && (
                    <div className="p-3 rounded-xl bg-[#081225] border border-slate-800 text-xs text-slate-400 italic">
                      "{fav.notes}"
                    </div>
                  )}
                </div>

                {fav.verse && (
                  <div className="pt-3 mt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(fav.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setModalVerse(fav.verse || null)}
                      className="text-[#F1B941] hover:underline font-semibold"
                    >
                      Read Complete Purport →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Verse Detail Modal */}
        <VerseModal
          verse={modalVerse}
          onClose={() => setModalVerse(null)}
        />

      </div>
    </div>
  );
};

