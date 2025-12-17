/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="py-16 px-6 bg-[#121212] text-white mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
             <div className="text-center md:text-left">
                 <h2 className="text-2xl font-bold tracking-tight mb-4">CardScan</h2>
                 <p className="text-gray-400 text-sm max-w-xs">
                    The premium protocol for digital networking. 
                    Built for professionals who value clarity and speed.
                 </p>
             </div>
             
             <div className="flex gap-8">
                 <button onClick={(e) => onLinkClick(e, 'landing')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</button>
                 <button onClick={(e) => onLinkClick(e, 'features')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Protocol</button>
                 <button onClick={(e) => onLinkClick(e, 'scan')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Scanner</button>
                 <button onClick={(e) => onLinkClick(e, 'settings')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Settings</button>
             </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-xs text-gray-600 font-medium">
                 © 2025 CardScan Corp. All rights reserved.
             </div>
             <div className="flex gap-4">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 <span className="text-xs text-gray-400 font-medium">Systems Operational</span>
             </div>
        </div>
    </footer>
  );
};

export default Footer;