/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Contact } from '../types';

interface VaultProps {
  products: Contact[];
  onOp: (c: Contact, op: 'add' | 'edit' | 'delete') => void;
  categories: string[];
}

const Inventory: React.FC<VaultProps> = ({ products, onOp }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                           c.company.toLowerCase().includes(search.toLowerCase()) ||
                           c.jobTitle.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [products, search]);

  return (
    <div className="py-8 md:py-12 px-4 md:px-6 max-w-[1400px] mx-auto animate-fade-in-up pb-24 md:pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
        <div>
           <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a0a0a] mb-2">Identity Vault</h1>
           <p className="text-[#666] font-medium">{filtered.length} contacts securely stored.</p>
        </div>
        
        <div className="w-full md:w-auto relative group">
            <input 
                type="text" 
                placeholder="Search vault..." 
                className="w-full md:w-[320px] pl-12 pr-6 py-4 rounded-2xl bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-black/5 outline-none transition-all text-[#0a0a0a] font-semibold"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl grayscale opacity-50">🔍</span>
        </div>
      </div>

      {filtered.length === 0 ? (
          <div className="p-12 md:p-24 text-center flex flex-col items-center justify-center bg-white rounded-[32px] border border-dashed border-gray-200 shadow-sm">
              <div className="text-6xl mb-6 opacity-20 grayscale">📇</div>
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Your vault is empty</h3>
              <p className="text-[#666] font-medium">Scan a card or enter details manually to get started.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(c => (
                  <div key={c.id} className="clay-card p-6 md:p-8 flex flex-col hover:border-black/5 group bg-white transition-all hover:shadow-xl hover:-translate-y-1 duration-300 relative overflow-hidden">
                      {/* Top Action Bar */}
                      <div className="flex justify-between items-start mb-6 z-10 relative">
                          <div className="icon-3d w-14 h-14 rounded-2xl text-xl font-bold text-[#0a0a0a]">
                              {c.name.charAt(0)}
                          </div>
                          <button onClick={() => onOp(c, 'delete')} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                              ✕
                          </button>
                      </div>

                      <div className="flex-grow mb-6 z-10 relative">
                          <h3 className="font-extrabold text-2xl text-[#0a0a0a] mb-1 leading-tight group-hover:text-black transition-colors">{c.name}</h3>
                          <p className="text-sm font-bold text-[#666] mb-5 uppercase tracking-wide">{c.company}</p>
                          
                          <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-sm">💼</div>
                                  <span className="text-sm text-[#404040] font-bold">{c.jobTitle}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-sm">📞</div>
                                  <span className="text-sm text-[#404040] font-bold truncate">{c.email || c.phone || 'No contact info'}</span>
                              </div>
                          </div>
                          
                          {c.aiInsights && (
                             <div className="mt-6 p-4 bg-[#FAFAFA] rounded-xl border border-gray-100 relative">
                                <span className="absolute top-4 left-3 text-xs opacity-50">✨</span>
                                <p className="text-xs text-[#555] font-semibold italic leading-relaxed pl-5">"{c.aiInsights}"</p>
                             </div>
                          )}
                      </div>

                      <button 
                        className="w-full py-4 rounded-2xl bg-[#121212] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:bg-black transition-all z-10 relative"
                        onClick={() => window.open(`mailto:${c.email}`)}
                      >
                          Execute Outreach
                      </button>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default Inventory;