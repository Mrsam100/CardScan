/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (updates: Partial<AppSettings>) => void;
  shopName: string;
  onShopNameChange: (n: string) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ settings, onUpdate, shopName, onShopNameChange }) => {
  return (
    <div className="py-12 px-6 max-w-[800px] mx-auto animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#121212] mb-2">Configuration</h1>
        <p className="text-gray-500">Customize your workspace and integration endpoints.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="clay-card p-8 bg-white transition-all hover:shadow-lg">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 bg-[#121212] rounded-full flex items-center justify-center text-white font-bold text-xl">
                 {shopName ? shopName.charAt(0) : 'U'}
             </div>
             <div>
                 <h3 className="text-lg font-bold text-[#121212]">User Profile</h3>
                 <p className="text-xs text-gray-400">Manage your public display information</p>
             </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-wider">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-[#F9F9F7] p-4 rounded-xl text-[#121212] font-semibold focus:bg-white focus:ring-2 focus:ring-black/5 transition-all outline-none" 
                value={shopName} 
                onChange={e => onShopNameChange(e.target.value)} 
                placeholder="Enter your name"
              />
            </div>
          </div>
        </div>

        {/* System Card */}
        <div className="clay-card p-8 bg-white transition-all hover:shadow-lg">
          <h3 className="text-lg font-bold text-[#121212] mb-6 pb-4 border-b border-gray-100">System Preferences</h3>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-wider">Interface Language</label>
                <div className="relative">
                    <select 
                      className="w-full bg-[#F9F9F7] p-4 rounded-xl text-[#121212] font-medium appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-black/5 outline-none" 
                      value={settings.language} 
                      onChange={e => onUpdate({ language: e.target.value as any })}
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-wider">Target CRM</label>
                <div className="relative">
                    <select 
                      className="w-full bg-[#F9F9F7] p-4 rounded-xl text-[#121212] font-medium appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-black/5 outline-none" 
                      value={settings.crmType} 
                      onChange={e => onUpdate({ crmType: e.target.value as any })}
                    >
                      <option value="Local Only">Local Archive (Offline)</option>
                      <option value="HubSpot">HubSpot</option>
                      <option value="Salesforce">Salesforce</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F9F9F7]">
                <div>
                    <div className="font-bold text-[#121212] text-sm mb-1">AI Context Enrichment</div>
                    <div className="text-xs text-gray-500 max-w-[300px]">Automatically search for company news and funding rounds when a contact is scanned.</div>
                </div>
                <button 
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${settings.autoLinkedIn ? 'bg-[#121212]' : 'bg-gray-300'}`}
                    onClick={() => onUpdate({ autoLinkedIn: !settings.autoLinkedIn })}
                >
                    <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${settings.autoLinkedIn ? 'translate-x-6' : ''}`}></div>
                </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 flex justify-center">
         <div className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Protocol Version 3.1.0 (Stable)
         </div>
      </div>
    </div>
  );
};

export default SettingsView;