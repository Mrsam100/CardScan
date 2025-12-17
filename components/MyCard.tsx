/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Contact } from '../types';

interface MyCardProps {
  onSave: (details: Partial<Contact>) => void;
  initialDetails: Partial<Contact>;
}

const MyCard: React.FC<MyCardProps> = ({ onSave, initialDetails }) => {
  const [details, setDetails] = useState<Partial<Contact>>({
    ...initialDetails,
    address: initialDetails.address || '358 Exchange Place, New York, N.Y. 100099',
    fax: initialDetails.fax || '212 555 6390',
    telex: initialDetails.telex || '',
    aiInsights: initialDetails.aiInsights || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  const generateQRCode = () => {
    const contactData = JSON.stringify({
      n: details.name,
      c: details.company,
      e: details.email,
      p: details.phone
    });
    const encodedData = encodeURIComponent(contactData);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=121212&bgcolor=FFFFFF&data=${encodedData}`);
  };

  useEffect(() => {
    generateQRCode();
  }, [details.name, details.company, details.email]);

  const handleSave = () => {
    onSave(details);
    setIsEditing(false);
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${details.name}
ORG:${details.company}
TITLE:${details.jobTitle}
TEL;TYPE=WORK,VOICE:${details.phone}
EMAIL:${details.email}
ADR;TYPE=WORK:;;${details.address}
URL:${details.linkedinUrl}
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${details.name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-6 max-w-[1200px] mx-auto animate-fade-in-up pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
           <h1 className="text-4xl font-black text-[#0a0a0a] tracking-tight">Digital Identity</h1>
           <p className="text-gray-500 mt-2 font-medium">Manage how you appear on the protocol.</p>
        </div>
        <div className="flex gap-3">
            <button 
              onClick={downloadVCard}
              className="px-6 py-3 rounded-full border border-gray-200 bg-white text-[#0a0a0a] font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">⬇</span>
              VCF File
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="clay-button-primary px-8 py-3 text-sm shadow-[0_10px_20px_rgba(236,72,153,0.3)] bg-[#EC4899] hover:bg-[#DB2777]"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Card Preview Area */}
        <div className="space-y-8 order-2 lg:order-1">
            <div className="relative w-full aspect-[1.586/1] bg-white rounded-[32px] p-10 flex flex-col justify-between shadow-2xl overflow-hidden border border-white/60 group transition-transform hover:scale-[1.01] duration-500 ring-1 ring-black/5">
                {/* Pink Decorative Gradient */}
                <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-pink-100 to-pink-50 opacity-80 z-0 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent z-0"></div>

                <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Company</span>
                        <div className="text-xl font-black text-[#0a0a0a] tracking-tight">
                            {details.company || 'YOUR COMPANY'}
                        </div>
                    </div>
                    <div className="w-14 h-14 bg-[#121212] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                        {details.name ? details.name.charAt(0) : 'C'}
                    </div>
                </div>

                <div className="z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] mb-2 tracking-tight leading-none">
                        {details.name || 'Your Name'}
                    </h2>
                    <p className="text-lg font-bold text-pink-500 uppercase tracking-wide">
                        {details.jobTitle || 'Your Position'}
                    </p>
                </div>

                <div className="flex justify-between items-end z-10 border-t border-gray-100 pt-6">
                    <div className="text-sm font-semibold text-gray-600 space-y-1">
                        <div>{details.phone}</div>
                        <div>{details.email}</div>
                    </div>
                    <div className="bg-pink-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                        Verified User
                    </div>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="clay-card p-8 bg-white flex items-center gap-8 hover:shadow-lg transition-all">
                <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <img src={qrUrl} alt="QR Code" className="w-28 h-28 object-contain mix-blend-multiply" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-[#0a0a0a] mb-1">Share Instantly</h3>
                    <p className="text-gray-500 text-sm mb-4 font-medium leading-relaxed">Your unique protocol ID. Allow peers to scan this code to import your verified credentials.</p>
                </div>
            </div>
        </div>

        {/* Edit Form */}
        <div className={`space-y-6 order-1 lg:order-2 transition-all duration-300 ${isEditing ? 'opacity-100 translate-x-0' : 'opacity-60 grayscale'}`}>
             <div className="clay-card p-10 bg-white">
                <h3 className="text-2xl font-black mb-8 text-[#0a0a0a] border-b border-gray-100 pb-4">Profile Details</h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Full Name</label>
                        <input 
                          className="w-full bg-[#FAFAFA] focus:bg-white transition-all border-transparent focus:border-pink-500 rounded-xl p-4 font-bold text-[#0a0a0a] text-lg" 
                          value={details.name} 
                          onChange={e => setDetails({...details, name: e.target.value})} 
                          placeholder="e.g. Jane Doe"
                          disabled={!isEditing}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Role</label>
                            <input 
                              className="w-full bg-[#FAFAFA] focus:bg-white transition-all border-transparent focus:border-pink-500 rounded-xl p-4 font-semibold" 
                              value={details.jobTitle} 
                              onChange={e => setDetails({...details, jobTitle: e.target.value})} 
                              placeholder="e.g. CEO"
                              disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Organization</label>
                            <input 
                              className="w-full bg-[#FAFAFA] focus:bg-white transition-all border-transparent focus:border-pink-500 rounded-xl p-4 font-semibold" 
                              value={details.company} 
                              onChange={e => setDetails({...details, company: e.target.value})} 
                              placeholder="e.g. Acme Corp"
                              disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Direct Line</label>
                        <input 
                          className="w-full bg-[#FAFAFA] focus:bg-white transition-all border-transparent focus:border-pink-500 rounded-xl p-4 font-semibold" 
                          value={details.phone} 
                          onChange={e => setDetails({...details, phone: e.target.value})} 
                          placeholder="+1 (555) 000-0000"
                          disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 mb-2 block tracking-widest">Email Address</label>
                        <input 
                          className="w-full bg-[#FAFAFA] focus:bg-white transition-all border-transparent focus:border-pink-500 rounded-xl p-4 font-semibold" 
                          value={details.email} 
                          onChange={e => setDetails({...details, email: e.target.value})} 
                          placeholder="jane@example.com"
                          disabled={!isEditing}
                        />
                    </div>
                    {isEditing && (
                        <button 
                          onClick={handleSave}
                          className="w-full py-4 rounded-full bg-[#EC4899] text-white font-bold shadow-lg hover:shadow-xl hover:bg-[#DB2777] transition-all mt-4 text-lg"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyCard;