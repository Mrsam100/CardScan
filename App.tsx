/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Exchange from './components/Exchange';
import Pricing from './components/Pricing';
import POS from './components/POS'; 
import Inventory from './components/Inventory'; 
import Customers from './components/Customers'; 
import Reports from './components/Reports'; 
import MyCard from './components/MyCard'; 
import SettingsView from './components/SettingsView';
import Footer from './components/Footer';
import { AppView, Contact, IntegrationLog, AppSettings } from './types';
import { INITIAL_CONTACTS, INDUSTRIES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [userName, setUserName] = useState<string>(localStorage.getItem('ss_user_name') || '');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'info'} | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [settings, setSettings] = useState<AppSettings>({
    language: (localStorage.getItem('ss_lang') as any) || 'en',
    currency: '$',
    darkMode: localStorage.getItem('ss_dark') === 'true',
    crmType: (localStorage.getItem('ss_crm') as any) || 'Local Only',
    autoLinkedIn: localStorage.getItem('ss_linkedin') === 'true'
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [logs, setLogs] = useState<IntegrationLog[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [myCard, setMyCard] = useState<Partial<Contact>>(() => {
    const saved = localStorage.getItem('ss_my_card');
    return saved ? JSON.parse(saved) : { name: userName || '' };
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    const savedContacts = localStorage.getItem('ss_contacts');
    const savedLogs = localStorage.getItem('ss_logs');
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(INITIAL_CONTACTS);
      localStorage.setItem('ss_contacts', JSON.stringify(INITIAL_CONTACTS));
    }
    
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const triggerSync = useCallback(() => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  }, []);

  const addContact = (contact: Contact) => {
    const newContacts = [contact, ...contacts];
    setContacts(newContacts);
    localStorage.setItem('ss_contacts', JSON.stringify(newContacts));
    
    const log: IntegrationLog = {
        id: Math.random().toString(36).substr(2, 9),
        contactId: contact.id,
        platform: 'CRM',
        status: 'success',
        timestamp: Date.now(),
        message: `Synced to ${settings.crmType}`
    };
    const newLogs = [log, ...logs];
    setLogs(newLogs);
    localStorage.setItem('ss_logs', JSON.stringify(newLogs));
    
    triggerSync();
    showToast(`Contact saved: ${contact.name}`);
  };

  const handleContactOp = (contact: Contact, op: 'add' | 'edit' | 'delete') => {
    let next;
    if (op === 'add') next = [...contacts, contact];
    else if (op === 'edit') next = contacts.map(c => c.id === contact.id ? contact : c);
    else next = contacts.filter(c => c.id !== contact.id);
    
    setContacts(next);
    localStorage.setItem('ss_contacts', JSON.stringify(next));
    if (op === 'delete') showToast('Contact deleted', 'info');
    triggerSync();
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    const next = { ...settings, ...updates };
    setSettings(next);
    if (updates.language) localStorage.setItem('ss_lang', updates.language);
    if (updates.darkMode !== undefined) localStorage.setItem('ss_dark', String(updates.darkMode));
    if (updates.crmType) localStorage.setItem('ss_crm', updates.crmType);
    if (updates.autoLinkedIn !== undefined) localStorage.setItem('ss_linkedin', String(updates.autoLinkedIn));
    showToast('Settings updated');
  };

  const handleNav = (target: string) => {
    // Handle view switching
    if (['landing', 'scan', 'vault', 'crm', 'network', 'settings', 'my-card'].includes(target)) {
      if (target === 'scan' && !userName) {
        setShowOnboarding(true);
        return;
      }
      
      if (view === target) return;

      setIsTransitioning(true);
      setTimeout(() => {
        setView(target as AppView);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setIsTransitioning(false);
      }, 200);
    } 
    // Handle anchor scrolling (features/protocol/pricing)
    else {
        if (view !== 'landing') {
            setIsTransitioning(true);
            setView('landing');
            setTimeout(() => {
                setIsTransitioning(false);
                setTimeout(() => {
                    const el = document.getElementById(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }, 200);
        } else {
            const el = document.getElementById(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const handleCompleteOnboarding = (name: string) => {
    if (!name.trim()) return;
    setUserName(name);
    localStorage.setItem('ss_user_name', name);
    setShowOnboarding(false);
    
    const initialMyCard = { ...myCard, name };
    setMyCard(initialMyCard);
    localStorage.setItem('ss_my_card', JSON.stringify(initialMyCard));
    
    handleNav('scan');
  };

  const updateMyCard = (details: Partial<Contact>) => {
    const updated = { ...myCard, ...details };
    setMyCard(updated);
    localStorage.setItem('ss_my_card', JSON.stringify(updated));
    showToast('Card updated successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F4F0] transition-opacity duration-500">
          <div className="w-20 h-20 border-8 border-[#121212] border-t-transparent animate-spin rounded-full mb-8"></div>
          <div className="text-[#121212] font-black text-xl animate-pulse tracking-[0.2em] uppercase">Loading Protocol</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F5F4F0] text-[#0a0a0a] font-sans selection:bg-black selection:text-white flex flex-col`}>
      <Navbar onNavClick={handleNav} activeView={view} shopName={userName} />
      
      <main className={`flex-grow pt-24 pb-12 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {showOnboarding && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#F5F4F0]/90 backdrop-blur-xl animate-fade-in-up">
                <div className="clay-card p-12 max-w-md w-full text-center shadow-2xl bg-white border border-white/80">
                    <div className="w-24 h-24 bg-[#121212] text-white rounded-3xl flex items-center justify-center text-4xl font-bold mx-auto mb-8 shadow-2xl">C</div>
                    <h2 className="text-3xl font-black mb-4 text-[#0a0a0a]">Authenticate</h2>
                    <p className="text-gray-500 mb-8 font-medium">Identify yourself to access the secure protocol.</p>
                    <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full mb-6 text-center text-lg p-5 bg-[#FAFAFA] rounded-2xl outline-none focus:ring-2 focus:ring-black/10 font-bold"
                        onKeyDown={(e) => e.key === 'Enter' && handleCompleteOnboarding((e.target as HTMLInputElement).value)}
                        autoFocus
                    />
                    <button 
                        onClick={() => handleCompleteOnboarding((document.querySelector('input') as HTMLInputElement).value)}
                        className="clay-button-primary w-full py-5 text-lg shadow-xl hover:shadow-2xl transition-all"
                    >
                        Access Terminal
                    </button>
                </div>
            </div>
        )}

        {view === 'landing' && (
           <div className="animate-fade-in-up">
              <Hero 
                onStart={() => handleNav('scan')} 
                onDemo={() => handleNav('features')}
              />
              <Exchange />
              <Pricing />
           </div>
        )}

        {view === 'scan' && (
            <POS 
              onCompleteSale={(sale: any) => {
                addContact(sale as any);
              }} 
              shopName={userName} 
            />
        )}

        {view === 'my-card' && (
            <MyCard 
              initialDetails={myCard} 
              onSave={updateMyCard} 
            />
        )}

        {view === 'vault' && (
            <Inventory 
              products={contacts as any} 
              onOp={handleContactOp as any} 
              categories={INDUSTRIES.map(i => i.name)}
            />
        )}

        {view === 'crm' && (
            <Customers 
              customers={contacts as any} 
              sales={logs as any} 
            />
        )}

        {view === 'network' && (
            <Reports sales={logs as any} products={contacts as any} />
        )}

        {view === 'settings' && (
            <SettingsView 
              settings={settings as any} 
              onUpdate={updateSettings as any} 
              shopName={userName} 
              onShopNameChange={(n) => { setUserName(n); localStorage.setItem('ss_user_name', n); }} 
            />
        )}
      </main>

      {view === 'landing' && <Footer onLinkClick={(e, id) => { e.preventDefault(); handleNav(id); }} />}

      {/* Status Bar - Floating at bottom */}
      <div className="fixed bottom-6 right-6 z-[100] hidden md:flex items-center gap-3 bg-[#121212] text-white px-5 py-3 rounded-full shadow-2xl border border-white/10 hover:scale-105 transition-transform cursor-default">
          <div className={`w-2.5 h-2.5 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-green-400'}`}></div>
          <span className="text-[10px] font-bold tracking-widest uppercase">
            {isSyncing ? 'UPLINK ACTIVE...' : 'SYSTEM SECURE'}
          </span>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-[160] animate-bounce-in">
            <div className="clay-card px-8 py-5 bg-[#121212] text-white flex items-center gap-4 shadow-2xl border-none">
                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</div>
                 <span className="font-bold text-sm tracking-wide">{toast.msg}</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;