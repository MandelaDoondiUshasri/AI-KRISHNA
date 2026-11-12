import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, MessageSquare, BookOpen, Cpu, Settings, Check, 
  AlertCircle, TrendingUp, Sparkles, RefreshCw, Key
} from 'lucide-react';
import { AdminMetrics, AIConfig } from '../types';
import { adminService } from '../services/adminService';
import { useAuth } from '../context/AuthContext';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [config, setConfig] = useState<AIConfig | null>(null);
  const [userList, setUserList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit config state
  const [selectedProvider, setSelectedProvider] = useState<string>('builtin');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [openaiKey, setOpenaiKey] = useState<string>('');
  const [modelName, setModelName] = useState<string>('gemini-1.5-flash');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [m, c, u] = await Promise.all([
        adminService.getMetrics(),
        adminService.getConfig(),
        adminService.getUsers()
      ]);
      setMetrics(m);
      setConfig(c);
      setUserList(u);
      setSelectedProvider(c.provider);
      setModelName(c.current_model);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    try {
      const updated = await adminService.updateConfig(
        selectedProvider,
        geminiKey || undefined,
        openaiKey || undefined,
        modelName
      );
      setConfig(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to update AI configuration');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="krishna-card rounded-2xl p-8 max-w-md text-center border border-red-500/40">
          <Shield className="w-12 h-12 mx-auto text-red-400 mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-xs text-slate-400">
            You must be signed in as an administrator (e.g. admin@aikrishna.life) to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081225] py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#F1B941] font-semibold uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Platform Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              AI Krishna Control Tower & Analytics
            </h1>
          </div>

          <button
            onClick={loadDashboardData}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Stats</span>
          </button>
        </div>

        {/* METRICS KPI CARDS */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="krishna-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Total Registered</span>
                <Users className="w-4 h-4 text-sky-400" />
              </div>
              <span className="text-2xl font-serif font-bold text-white block">
                {metrics.total_users}
              </span>
              <span className="text-[10px] text-emerald-400">100% active</span>
            </div>

            <div className="krishna-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Dialogues</span>
                <MessageSquare className="w-4 h-4 text-[#F1B941]" />
              </div>
              <span className="text-2xl font-serif font-bold text-white block">
                {metrics.total_conversations}
              </span>
              <span className="text-[10px] text-slate-400">Total threads</span>
            </div>

            <div className="krishna-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Messages Exchanged</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-serif font-bold text-white block">
                {metrics.total_messages}
              </span>
              <span className="text-[10px] text-slate-400">Conversations</span>
            </div>

            <div className="krishna-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Active Engine</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-base font-serif font-bold text-purple-300 block uppercase">
                {config?.provider || 'Built-in'}
              </span>
              <span className="text-[10px] text-slate-400">Context Bridge</span>
            </div>

            <div className="krishna-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Gita Corpus</span>
                <BookOpen className="w-4 h-4 text-[#F1B941]" />
              </div>
              <span className="text-2xl font-serif font-bold text-[#F1B941] block">
                18 Ch / 700 V
              </span>
              <span className="text-[10px] text-slate-400">Vector Indexed</span>
            </div>

          </div>
        )}

        {/* TWO COLUMN GRID: TOP SITUATIONS & MOST REFERENCED VERSES */}
        {metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Life Situations / Emotions */}
            <div className="krishna-card rounded-2xl p-6 border border-slate-800">
              <h3 className="font-serif font-bold text-base text-slate-100 mb-4 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#F1B941]" />
                <span>Most Frequent Life Predicaments Consulted</span>
              </h3>
              <div className="space-y-3">
                {metrics.popular_situations.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#081225] border border-slate-800">
                    <span className="text-xs font-medium text-slate-200">{item.emotion}</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1E3E62] text-sky-300">
                      {item.count} queries
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Referenced Gita Verses */}
            <div className="krishna-card rounded-2xl p-6 border border-slate-800">
              <h3 className="font-serif font-bold text-base text-slate-100 mb-4 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#F1B941]" />
                <span>Most Referenced Bhagavad Gita Verses</span>
              </h3>
              <div className="space-y-3">
                {metrics.most_referenced_verses.map((v, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#081225] border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#F1B941] block">{v.reference}</span>
                      <p className="text-[11px] font-serif italic text-slate-400 truncate max-w-xs">{v.transliteration}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {v.count} citations
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* AI PROVIDER CONFIGURATION PANEL */}
        <div className="krishna-card rounded-2xl p-6 sm:p-8 border border-[#F1B941]/30">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#F1B941] font-semibold uppercase tracking-wider mb-1">
                <Settings className="w-4 h-4" />
                <span>AI Orchestration</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                AI Engine & Provider Configuration
              </h2>
            </div>
            
            {saveSuccess && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>Settings Saved</span>
              </div>
            )}
          </div>

          {saveError && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
              {saveError}
            </div>
          )}

          <form onSubmit={handleSaveConfig} className="space-y-6">
            
            {/* Provider Switcher */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Active Intelligence Provider
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'builtin', name: 'Built-in Wisdom Engine', desc: 'Runs 100% locally with high-precision Gita vector matching & zero API key requirement.' },
                  { id: 'gemini', name: 'Google Gemini AI', desc: 'Connects to Gemini 1.5 Flash / Pro via API key for ultra-responsive generative synthesis.' },
                  { id: 'openai', name: 'OpenAI GPT-4o', desc: 'Connects to OpenAI API key for advanced contextual philosophical completions.' }
                ].map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedProvider === p.id
                        ? 'bg-[#1E3E62] border-[#F1B941] shadow-lg shadow-[#F1B941]/10'
                        : 'bg-[#081225] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selectedProvider === p.id ? 'bg-[#F1B941] border-[#F1B941]' : 'border-slate-600'
                      }`}>
                        {selectedProvider === p.id && <div className="w-1.5 h-1.5 bg-[#081225] rounded-full"></div>}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider API Keys if selected */}
            {selectedProvider === 'gemini' && (
              <div className="space-y-3 p-4 rounded-xl bg-[#081225] border border-slate-800">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Google Gemini API Key
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder={config?.gemini_configured ? "•••••••••••••••••••••••• (Configured)" : "Enter AIzaSy... API key"}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#0B192C] border border-slate-700 focus:border-[#F1B941] text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="gemini-1.5-flash"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B192C] border border-slate-700 focus:border-[#F1B941] text-white"
                  />
                </div>
              </div>
            )}

            {selectedProvider === 'openai' && (
              <div className="space-y-3 p-4 rounded-xl bg-[#081225] border border-slate-800">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder={config?.openai_configured ? "•••••••••••••••••••••••• (Configured)" : "Enter sk-... API key"}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#0B192C] border border-slate-700 focus:border-[#F1B941] text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="gpt-4o-mini"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0B192C] border border-slate-700 focus:border-[#F1B941] text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all"
            >
              Apply AI Engine Settings
            </button>
          </form>
        </div>

        {/* REGISTERED USERS MANAGEMENT TABLE */}
        <div className="krishna-card rounded-2xl p-6 border border-slate-800">
          <h2 className="text-lg font-serif font-bold text-white mb-4">
            Registered Seekers & User Accounts ({userList.length})
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#081225] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Dialogues</th>
                  <th className="py-3 px-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {userList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{u.full_name || 'Anonymous Seeker'}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-4 uppercase font-mono text-[#F1B941]">
                      {u.preferred_language}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        u.role === 'admin' ? 'bg-[#F1B941]/20 text-[#F1B941]' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {u.conversations_count}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

