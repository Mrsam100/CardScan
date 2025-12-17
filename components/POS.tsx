/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { extractContactFromImage, getEnrichment } from '../services/geminiService';
import { Contact } from '../types';

interface ScannerProps {
  onCompleteSale: (contact: Contact) => void;
  shopName: string;
}

const POS: React.FC<ScannerProps> = ({ onCompleteSale, shopName }) => {
  const [mode, setMode] = useState<'scan' | 'manual'>('scan');
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [formData, setFormData] = useState<Partial<Contact>>({
    company: 'PIERCE & PIERCE',
    address: '358 Exchange Place, New York, N.Y. 100099',
    fax: '212 555 6390',
    telex: '10 4534'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setScanning(true);
    const data = await extractContactFromImage(base64);
    if (data) {
      const enrichment = await getEnrichment(data.name, data.company);
      setFormData(prev => ({ ...prev, ...data, aiInsights: enrichment }));
    }
    setScanning(false);
  };

  const handleSave = () => {
    if (!formData.name) return;
    const newContact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Unknown',
      jobTitle: formData.jobTitle || 'Unknown',
      company: formData.company || 'Unknown',
      email: formData.email || '',
      phone: formData.phone || '',
      linkedinUrl: formData.linkedinUrl || '',
      address: formData.address || '',
      fax: formData.fax || '',
      telex: formData.telex || '',
      aiInsights: formData.aiInsights,
      status: 'active',
      timestamp: Date.now()
    };
    onCompleteSale(newContact);
    setImage(null);
    setFormData({
        company: 'PIERCE & PIERCE',
        address: '358 Exchange Place, New York, N.Y. 100099',
        fax: '212 555 6390',
        telex: '10 4534'
    });
  };

  return (
    <div className="py-8 md:py-12 px-4 md:px-8 max-w-[1200px] mx-auto animate-fade-in-up pb-32">
      {/* Mode Switcher */}
      <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 inline-flex gap-2 w-full md:w-auto max-w-sm">
              <button 
                onClick={() => setMode('scan')}
                className={`flex-1 md:flex-none px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'scan' ? 'bg-[#F97316] text-white shadow-md transform scale-105' : 'text-gray-400 hover:text-[#0a0a0a] hover:bg-gray-50'}`}
              >
                  📸 Optical Scan
              </button>
              <button 
                onClick={() => setMode('manual')}
                className={`flex-1 md:flex-none px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'manual' ? 'bg-[#F97316] text-white shadow-md transform scale-105' : 'text-gray-400 hover:text-[#0a0a0a] hover:bg-gray-50'}`}
              >
                  ✍️ Manual
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Input Area */}
        <div className="space-y-6">
            {mode === 'scan' ? (
                <div 
                    className="clay-card p-8 md:p-12 flex flex-col items-center justify-center min-h-[450px] text-center cursor-pointer hover:border-[#F97316]/30 transition-all relative overflow-hidden group bg-white border-2 border-dashed border-gray-200 shadow-sm hover:shadow-xl"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {!image ? (
                        <div className="z-10 group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-3xl bg-orange-50 text-[#F97316] flex items-center justify-center text-5xl mb-6 shadow-inner">
                                <span className="drop-shadow-sm">📸</span>
                            </div>
                            <h3 className="text-2xl font-black text-[#0a0a0a] mb-2">Upload Card</h3>
                            <p className="text-gray-500 font-medium max-w-xs">Drag & drop or tap to capture high-fidelity image</p>
                        </div>
                    ) : (
                        <div className="w-full h-full absolute inset-0">
                            <img src={image} className="w-full h-full object-cover blur-0 transition-all" alt="Scan" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6">
                                <span className="text-white font-bold px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm">Tap to change</span>
                            </div>
                        </div>
                    )}
                    {scanning && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-20">
                            <div className="w-20 h-20 border-4 border-[#F97316] border-t-transparent animate-spin rounded-full mb-6"></div>
                            <div className="text-[#0a0a0a] font-black text-xl animate-pulse tracking-wide">PROCESSING</div>
                            <div className="text-orange-500 font-medium text-sm mt-2">Extracting Intelligence...</div>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                </div>
            ) : (
                <div className="clay-card p-8 space-y-8 bg-white transition-all hover:shadow-lg">
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-xl text-[#F97316]">📝</div>
                        <div>
                            <h3 className="text-xl font-black text-[#0a0a0a]">Data Entry</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Manual Override</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block tracking-widest group-focus-within:text-[#F97316] transition-colors">Full Name</label>
                            <input 
                                className="w-full bg-[#FAFAFA] text-lg font-bold text-[#0a0a0a] rounded-xl focus:bg-white transition-all p-4 border-transparent focus:border-[#F97316]" 
                                value={formData.name || ''} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                placeholder="Patrick Bateman"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block tracking-widest group-focus-within:text-[#F97316] transition-colors">Role</label>
                                <input 
                                    className="w-full bg-[#FAFAFA] text-base font-semibold text-[#0a0a0a] rounded-xl focus:bg-white transition-all p-4" 
                                    value={formData.jobTitle || ''} 
                                    onChange={e => setFormData({...formData, jobTitle: e.target.value})} 
                                    placeholder="Vice President"
                                />
                            </div>
                            <div className="group">
                                <label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block tracking-widest group-focus-within:text-[#F97316] transition-colors">Organization</label>
                                <input 
                                    className="w-full bg-[#FAFAFA] text-base font-semibold text-[#0a0a0a] rounded-xl focus:bg-white transition-all p-4" 
                                    value={formData.company || ''} 
                                    onChange={e => setFormData({...formData, company: e.target.value})} 
                                    placeholder="Pierce & Pierce"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block tracking-widest group-focus-within:text-[#F97316] transition-colors">Contact Email</label>
                            <input 
                                className="w-full bg-[#FAFAFA] text-base font-semibold text-[#0a0a0a] rounded-xl focus:bg-white transition-all p-4" 
                                value={formData.email || ''} 
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                placeholder="patrick@pierce.com"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Preview & Action Area */}
        <div className="space-y-6 sticky top-24">
            <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-black text-[#0a0a0a]">Vault Preview</h2>
                {formData.name && (
                    <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Ready to Mint</span>
                    </span>
                )}
            </div>

            {/* The Digital Card */}
            <div className="clay-card p-8 bg-white aspect-[1.75/1] flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all hover:scale-[1.02] duration-500 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-50 to-orange-100 rounded-bl-[100px] -z-0 opacity-50 transition-opacity group-hover:opacity-80"></div>
                
                <div className="flex justify-between items-start z-10">
                    <div className="text-sm font-bold text-gray-400 font-mono tracking-tight">{formData.phone || '212 555 6342'}</div>
                    <div className="text-right">
                        <div className="text-lg font-black text-[#0a0a0a] tracking-tight uppercase">
                            {formData.company || 'COMPANY'}
                        </div>
                    </div>
                </div>

                <div className="text-center z-10 flex flex-col items-center py-6">
                    <h2 className="text-3xl md:text-4xl font-black text-[#0a0a0a] mb-2 leading-none tracking-tight">
                        {formData.name || 'NAME'}
                    </h2>
                    <p className="text-sm md:text-base font-bold text-orange-500 uppercase tracking-widest">
                        {formData.jobTitle || 'POSITION'}
                    </p>
                </div>

                <div className="flex justify-center z-10 border-t border-gray-100 pt-4">
                    <div className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">
                        {formData.address || '358 Exchange Place, New York, N.Y. 100099'} 
                    </div>
                </div>
            </div>

            <button 
                disabled={!formData.name}
                onClick={handleSave}
                className="clay-button-primary w-full py-5 text-lg shadow-[0_10px_20px_rgba(249,115,22,0.3)] bg-[#F97316] hover:bg-[#EA580C] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all"
            >
                Secure to Vault
            </button>
        </div>
      </div>
    </div>
  );
};

export default POS;