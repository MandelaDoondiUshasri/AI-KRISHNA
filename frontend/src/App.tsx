import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/layout/AuthModal';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { GitaExplorerPage } from './pages/GitaExplorerPage';
import { DailyWisdomPage } from './pages/DailyWisdomPage';
import { SavedWisdomPage } from './pages/SavedWisdomPage';
import { AdminPage } from './pages/AdminPage';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#081225] flex flex-col font-sans">
      
      {/* Universal Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onStartChat={() => setActiveTab('chat')}
            onExploreGita={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'chat' && <ChatPage />}

        {activeTab === 'explorer' && <GitaExplorerPage />}

        {activeTab === 'daily' && <DailyWisdomPage />}

        {activeTab === 'saved' && (
          <SavedWisdomPage onOpenAuth={() => setAuthModalOpen(true)} />
        )}

        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Universal Footer (omitted on full-height Chat page for optimum conversational ergonomics) */}
      {activeTab !== 'chat' && <Footer setActiveTab={setActiveTab} />}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
