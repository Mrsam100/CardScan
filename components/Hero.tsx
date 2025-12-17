/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HeroProps {
  onStart: () => void;
  onDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onDemo }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
         <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-purple-200/20 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '8s'}}></div>
         <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] bg-orange-100/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center z-10 animate-fade-in-up">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 border border-white/60 hover:scale-105 transition-transform cursor-default select-none ring-1 ring-black/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#555]">Protocol V3.1 Live</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0a0a0a] leading-[1.05] mb-8 tracking-tight text-balance">
           Networking,<br/> 
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a0a0a] via-[#555] to-[#0a0a0a]">Reimagined.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-[#666] font-medium mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
            The premium optical standard for business. Capture cards, enrich data, and sync with your CRM in milliseconds.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
            <button 
                onClick={onStart}
                className="clay-button-primary text-lg w-full sm:w-auto min-w-[200px]"
            >
                Launch App
            </button>
            <button 
                onClick={onDemo}
                className="px-10 py-4 text-lg font-bold text-[#121212] bg-white rounded-full border-2 border-transparent hover:border-gray-100 shadow-[0_4px_0_#e5e5e5] hover:shadow-[0_6px_0_#e5e5e5] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all duration-200 w-full sm:w-auto min-w-[200px]"
            >
                Protocol Specs
            </button>
        </div>

        {/* 3D Card Stack Preview */}
        <div className="relative mx-auto w-full max-w-[340px] md:max-w-[420px] group cursor-default perspective-1000 h-[280px]">
             
             {/* Back Card (Decorative) */}
             <div className="absolute top-4 left-4 w-full h-full bg-white rounded-[40px] shadow-lg border border-gray-100 opacity-60 transform scale-90 -rotate-6 transition-all duration-700 group-hover:-rotate-12 group-hover:-translate-x-8"></div>
             
             {/* Middle Card (Decorative) */}
             <div className="absolute top-2 left-2 w-full h-full bg-white rounded-[40px] shadow-xl border border-gray-100 opacity-80 transform scale-95 -rotate-3 transition-all duration-700 group-hover:-rotate-6 group-hover:-translate-x-4"></div>

             {/* Main Front Card */}
             <div className="absolute inset-0 bg-white rounded-[40px] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60 ring-1 ring-black/5 flex flex-col justify-between overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                  {/* Gloss Effect */}
                  <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rotate-45"></div>

                  <div className="flex justify-between items-start z-10">
                      <div className="text-left">
                          <h3 className="text-3xl font-black text-[#0a0a0a] tracking-tight">Patrick Bateman</h3>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                             <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Vice President</p>
                          </div>
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-br from-[#f8f8f8] to-[#e0e0e0] rounded-2xl flex items-center justify-center font-bold text-[#121212] border border-white shadow-inner text-xl">PB</div>
                  </div>
                  
                  <div className="z-10 space-y-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                      <div className="flex justify-between items-end">
                          <div className="text-left">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Organization</p>
                              <p className="text-lg font-bold text-[#0a0a0a]">Pierce & Pierce</p>
                          </div>
                          <div className="bg-[#121212] text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest">Mergers & Acq</span>
                          </div>
                      </div>
                  </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;