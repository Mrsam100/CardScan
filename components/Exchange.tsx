/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Exchange: React.FC = () => {
  return (
    <div id="features" className="py-24 md:py-32 px-6 bg-white border-t border-b border-gray-100 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-4 block">The Protocol</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a0a0a] mb-6">Automated Intelligence</h2>
            <p className="text-[#404040] max-w-xl mx-auto text-lg leading-relaxed font-medium">
                A seamless pipeline that transforms physical business cards into actionable CRM data in seconds.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                  { n: "01", t: "Capture", d: "High-fidelity optical recognition extracts text instantly.", i: "📸" },
                  { n: "02", t: "Parse", d: "Gemini 2.5 structures data into a valid contact schema.", i: "🧠" },
                  { n: "03", t: "Enrich", d: "AI agents crawl the web for recent company news.", i: "✨" },
                  { n: "04", t: "Sync", d: "Data is pushed to Salesforce or HubSpot automatically.", i: "🔄" }
              ].map((step, idx) => (
                  <div key={step.n} className="clay-card p-8 bg-[#FAFAFA] hover:bg-white transition-all duration-300 group flex flex-col items-start h-full">
                      <div className="flex justify-between items-start w-full mb-8">
                        <div className="icon-3d w-16 h-16 text-3xl group-hover:scale-110 transition-transform duration-300">
                           {step.i}
                        </div>
                        <span className="text-5xl font-extrabold text-gray-100 group-hover:text-gray-50 transition-colors select-none">{step.n}</span>
                      </div>
                      
                      <h4 className="font-bold text-[#0a0a0a] text-xl mb-3">{step.t}</h4>
                      <p className="text-sm text-[#404040] font-medium leading-relaxed">{step.d}</p>
                  </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Exchange;