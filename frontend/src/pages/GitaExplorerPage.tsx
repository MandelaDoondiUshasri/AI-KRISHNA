import React, { useState, useEffect } from 'react';
import { Search, Compass, BookOpen, Filter, Sparkles, ArrowLeft } from 'lucide-react';
import { Chapter, Verse, LifeSituation } from '../types';
import { gitaService } from '../services/gitaService';
import { ChapterCard } from '../components/gita/ChapterCard';
import { VerseCard } from '../components/gita/VerseCard';
import { VerseModal } from '../components/gita/VerseModal';
import { useLanguage } from '../context/LanguageContext';

export const GitaExplorerPage: React.FC = () => {
  const { t } = useLanguage();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [situations, setSituations] = useState<LifeSituation[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSituation, setSelectedSituation] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Verse[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Modal
  const [modalVerse, setModalVerse] = useState<Verse | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [chList, sitList] = await Promise.all([
        gitaService.getChapters(),
        gitaService.getSituations()
      ]);
      setChapters(chList);
      setSituations(sitList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectChapter = async (chNum: number) => {
    setSelectedChapter(chNum);
    try {
      const res = await gitaService.getChapterDetail(chNum);
      setChapterVerses(res.verses);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim() && !selectedSituation) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const res = await gitaService.searchVerses(
        searchQuery || undefined,
        selectedSituation || undefined
      );
      setSearchResults(res.results);
    } catch (e) {
      console.error(e);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedSituation('');
    setIsSearching(false);
    setSearchResults([]);
  };

  const currentChapterObj = chapters.find(c => c.chapter_number === selectedChapter);

  return (
    <div className="min-h-screen bg-[#081225] py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Bhagavad Gita Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2 leading-tight">
            Explore All 18 Chapters & 700 Verses
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Search timeless scripture by life situation, keyword, or browse each chapter's analytical knowledge.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="krishna-card rounded-2xl p-4 sm:p-5 mb-8 border border-[#F1B941]/30 shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search keyword, concept, or verse (e.g. 'karma', 'overthinking', '2.47')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#081225] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-[#F1B941] focus:outline-none truncate"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={selectedSituation}
                onChange={(e) => {
                  setSelectedSituation(e.target.value);
                  if (e.target.value) {
                    setIsSearching(true);
                    gitaService.searchVerses(searchQuery || undefined, e.target.value).then(res => {
                      setSearchResults(res.results);
                    });
                  }
                }}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-[#081225] border border-slate-700 text-xs text-slate-200 focus:border-[#F1B941] focus:outline-none shrink-0"
              >
                <option value="">Filter by Life Situation</option>
                {situations.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#F1B941] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-[#F1B941]/20 whitespace-nowrap shrink-0"
              >
                Search
              </button>

              {isSearching && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors whitespace-nowrap shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

          </form>

          {/* Quick Situation Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-400 mr-1 whitespace-nowrap shrink-0">
              Popular tags:
            </span>
            {situations.slice(0, 6).map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSituation(s.id);
                  setIsSearching(true);
                  gitaService.searchVerses(undefined, s.id).then(res => {
                    setSearchResults(res.results);
                  });
                }}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                  selectedSituation === s.id
                    ? 'bg-[#F1B941] text-[#081225] font-semibold border-[#F1B941]'
                    : 'bg-[#081225] text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH RESULTS VIEW */}
        {isSearching ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-white">
                Search Results ({searchResults.length} verses found)
              </h2>
              <button
                onClick={clearSearch}
                className="text-xs text-[#F1B941] hover:underline"
              >
                Return to All Chapters
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 krishna-card rounded-2xl">
                <Compass className="w-10 h-10 mx-auto text-slate-500 mb-3" />
                <p className="text-sm text-slate-300 font-medium">No direct verses found for this query.</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for broader keywords like 'karma', 'mind', 'duty', or 'fear'.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(verse => (
                  <VerseCard
                    key={verse.id}
                    verse={verse}
                    onOpenDetail={(v) => setModalVerse(v)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : selectedChapter ? (
          /* SINGLE CHAPTER DRILLDOWN VIEW */
          <div>
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center space-x-2 text-xs font-semibold text-[#F1B941] hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All 18 Chapters</span>
            </button>

            {currentChapterObj && (
              <div className="krishna-card rounded-2xl p-6 mb-8 border border-[#F1B941]/30">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#F1B941]/20 text-[#F1B941] border border-[#F1B941]/40 mb-2 inline-block">
                  Chapter {currentChapterObj.chapter_number}
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {currentChapterObj.name_transliteration} ({currentChapterObj.name_sanskrit})
                </h2>
                <p className="text-sm font-semibold text-sky-300 mb-3">
                  {currentChapterObj.name_english} • {currentChapterObj.verses_count} Verses
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {currentChapterObj.summary_en}
                </p>
              </div>
            )}

            <h3 className="text-lg font-serif font-bold text-slate-200 mb-4">
              Verses in this Chapter ({chapterVerses.length})
            </h3>

            {chapterVerses.length === 0 ? (
              <div className="text-center py-12 krishna-card rounded-2xl">
                <p className="text-xs text-slate-400">Loading chapter verses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapterVerses.map(verse => (
                  <VerseCard
                    key={verse.id}
                    verse={verse}
                    onOpenDetail={(v) => setModalVerse(v)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 18 CHAPTERS OVERVIEW */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-white">
                All 18 Chapters of the Bhagavad Gita
              </h2>
              <span className="text-xs text-slate-400">Total 700 Verses</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map(ch => (
                <ChapterCard
                  key={ch.id}
                  chapter={ch}
                  onSelect={(num) => handleSelectChapter(num)}
                />
              ))}
            </div>
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

