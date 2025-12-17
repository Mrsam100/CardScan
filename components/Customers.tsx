/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { IntegrationLog, Contact } from '../types';

interface CRMProps {
  customers: Contact[];
  sales: IntegrationLog[];
}

export default function Customers({ customers, sales }: CRMProps) {
  return (
    <div className="py-12 px-6 max-w-[1200px] mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#121212] mb-2">Integration Logs</h1>
        <p className="text-gray-500">Real-time sync activity with your CRM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
              {sales.length === 0 ? (
                  <div className="clay-card p-12 text-center text-gray-400">No activity recorded yet.</div>
              ) : (
                sales.map(log => {
                    const contact = customers.find(c => c.id === log.contactId);
                    return (
                        <div key={log.id} className="clay-card p-5 flex items-center justify-between hover:shadow-md transition-shadow bg-white">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${log.platform === 'CRM' ? 'bg-[#121212]' : 'bg-blue-600'}`}>
                                    {log.platform.substring(0,2)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#121212] text-sm">{log.message}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{contact?.name || 'Unknown Identity'} • {new Date(log.timestamp).toLocaleTimeString()}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-xs font-bold text-green-700">Success</span>
                            </div>
                        </div>
                    );
                })
              )}
          </div>

          <div className="space-y-6">
              <div className="clay-card p-8 bg-[#121212] text-white">
                  <h4 className="text-lg font-bold mb-4">Secure Protocol</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    Data is encrypted at rest and in transit. Your vault is your own. We do not sell data.
                  </p>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50">End-to-End Encryption</div>
              </div>
              
              <div className="clay-card p-8 bg-white">
                  <h4 className="text-lg font-bold text-[#121212] mb-6">Active Integrations</h4>
                  <div className="space-y-4">
                      {['LinkedIn', 'HubSpot', 'Salesforce', 'Outlook'].map(p => (
                          <div key={p} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#F2F0E9] flex items-center justify-center text-xs">🔗</div>
                                  <span className="text-sm font-semibold text-[#121212]">{p}</span>
                              </div>
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}