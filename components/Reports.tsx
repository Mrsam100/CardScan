/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Contact, IntegrationLog } from '../types';

interface StatsProps {
  sales: IntegrationLog[];
  products: Contact[];
}

const Reports: React.FC<StatsProps> = ({ sales, products }) => {
  return (
    <div className="py-12 px-6 max-w-[1200px] mx-auto">
      <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#121212] mb-2">Network Analytics</h1>
          <p className="text-gray-500">Insights into your growing professional circle.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="clay-card p-6 bg-[#121212] text-white">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Total Connections</span>
              <div className="text-4xl font-bold mb-4">{products.length}</div>
              <div className="text-xs text-green-400 bg-white/10 inline-block px-2 py-1 rounded">+12% this week</div>
          </div>
          <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Recent Scans</span>
              <div className="text-4xl font-bold text-[#121212] mb-4">12</div>
              <div className="text-xs text-gray-500">Last 24 hours</div>
          </div>
          <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Enrichment Rate</span>
              <div className="text-4xl font-bold text-[#121212] mb-4">98%</div>
              <div className="text-xs text-gray-500">Gemini 2.5 Accuracy</div>
          </div>
          <div className="clay-card p-6 bg-white">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Sync Status</span>
              <div className="text-4xl font-bold text-green-600 mb-4">OK</div>
              <div className="text-xs text-gray-500">All systems operational</div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="clay-card p-10 bg-white">
              <h3 className="text-xl font-bold mb-8 text-[#121212]">Industry Distribution</h3>
              <div className="space-y-6">
                  {[
                      { name: 'Technology', count: 45, color: 'bg-[#121212]' },
                      { name: 'Finance', count: 30, color: 'bg-gray-600' },
                      { name: 'Legal', count: 15, color: 'bg-gray-400' },
                      { name: 'Healthcare', count: 10, color: 'bg-gray-200' }
                  ].map(i => (
                      <div key={i.name}>
                          <div className="flex justify-between text-sm font-semibold mb-2 text-[#121212]">
                              <span>{i.name}</span>
                              <span>{i.count}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#F2F0E9] rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${i.color}`} style={{ width: `${i.count}%` }}></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="clay-card p-10 bg-[#F2F0E9] flex flex-col justify-center text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm mb-6">💡</div>
              <h3 className="text-xl font-bold text-[#121212] mb-2">AI Recommendation</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                  "Your network in Finance is growing. Consider reaching out to Patrick Bateman to consolidate recent leads."
              </p>
              <button className="text-sm font-bold text-[#121212] underline decoration-2 underline-offset-4 hover:text-black">View Insight</button>
          </div>
      </div>
    </div>
  );
};

export default Reports;