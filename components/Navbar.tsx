/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BRAND_NAME } from '../constants';
import { AppView } from '../types';

interface NavbarProps {
  onNavClick: (targetId: string) => void;
  activeView: AppView;
  shopName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeView, shopName }) => {
  const isLanding = activeView === 'landing';
  
  // Define colors for each view for the 3D effect
  const tabConfig: Record<string, { color: string, shadow: string }> = {
    'landing': { color: '#121212', shadow: '#333' }, // Black
    'features': { color: '#6A4FBF', shadow: '#4B368A' }, // Purple
    'pricing': { color: '#E6007A', shadow: '#9D0053' }, // Pink/Magenta
    'scan': { color: '#F97316', shadow: '#C2410C' }, // Orange
    'vault': { color: '#14B8A6', shadow: '#0F766E' }, // Teal
    'crm': { color: '#3B82F6', shadow: '#1D4ED8' }, // Blue
    'my-card': { color: '#EC4899', shadow: '#BE185D' }, // Pink
    'network': { color: '#10B981', shadow: '#059669' }, // Green
    'settings': { color: '#8B5CF6', shadow: '#6D28D9' } // Violet
  };

  const navItems = isLanding 
    ? [
        { name: 'Home', id: 'landing', icon: '🏠' },
        { name: 'Features', id: 'features', icon: '✨' },
        { name: 'Pricing', id: 'pricing', icon: '💎' },
      ]
    : [
        { name: 'Scan', id: 'scan', icon: '📸' },
        { name: 'Vault', id: 'vault', icon: '📇' },
        { name: 'Logs', id: 'crm', icon: '📊' },
        { name: 'Card', id: 'my-card', icon: '👤' },
        { name: 'Stats', id: 'network', icon: '📈' }
      ];

  const getButtonStyle = (itemId: string, isActive: boolean) => {
    if (!isActive) return {};
    const config = tabConfig[itemId] || tabConfig['landing'];
    return {
      backgroundColor: config.color,
      boxShadow: `0 4px 0 ${config.shadow}, 0 8px 15px rgba(0,0,0,0.15)`
    };
  };

  return (
    <>
      {/* Desktop Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-[150] glass-nav transition-all duration-300">
        <nav className="w-full flex items-center justify-between px-6 md:px-12 py-3 max-w-[1600px] mx-auto">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavClick('landing')}>
            <div className="w-10 h-10 bg-[#121212] rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-lg bg-gradient-to-br from-[#2a2a2a] to-black">C</div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#0a0a0a] leading-none">{BRAND_NAME}</span>
              {shopName && <span className="text-xs font-semibold text-gray-500">{shopName}</span>}
            </div>
          </div>

          {/* Center Navigation - The 3D Box */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
             <div className="bg-[#e0e0e0] p-1.5 rounded-full shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] flex gap-2 border border-white/50">
               {navItems.map((item) => {
                 const isActive = activeView === item.id || (isLanding && activeView === 'landing' && item.id === 'landing'); // Simple active check logic
                 // If we are on landing view, we might want to manually highlight sections if we had scroll spy, 
                 // but for now let's just use the button click to set style or default to simple hover if not active
                 
                 // For landing page anchors, 'activeView' might remain 'landing', so we check specific click handling in parent
                 // For this visual design, we will make them all look consistent.
                 
                 return (
                   <button 
                      key={item.id}
                      onClick={() => onNavClick(item.id)} 
                      style={getButtonStyle(item.id, isActive)}
                      className={`
                        px-8 py-2.5 text-sm rounded-full transition-all duration-300 font-bold tracking-wide
                        ${isActive 
                          ? 'btn-3d-active transform -translate-y-0.5' 
                          : 'text-gray-500 hover:text-[#121212] hover:bg-gray-100/50'
                        }
                      `}
                   >
                     {item.name}
                   </button>
                 );
               })}
             </div>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-4">
             {activeView !== 'landing' && (
                <button 
                  onClick={() => onNavClick('settings')}
                  className={`w-10 h-10 hidden md:flex items-center justify-center rounded-full transition-all ${activeView === 'settings' ? 'bg-[#8B5CF6] text-white shadow-[0_4px_0_#6D28D9]' : 'bg-white border border-gray-200 hover:bg-gray-50 text-[#121212] shadow-sm'}`}
                  style={activeView === 'settings' ? { transform: 'translateY(-2px)' } : {}}
                  aria-label="Settings"
                >
                    <span className={`text-xl ${activeView === 'settings' ? 'animate-spin-slow' : ''}`}>⚙️</span>
                </button>
             )}
             <button 
               onClick={() => onNavClick(isLanding ? 'scan' : 'landing')}
               className="px-6 py-3 bg-[#121212] text-white text-sm font-bold rounded-full shadow-[0_4px_0_#333] hover:translate-y-[-2px] hover:shadow-[0_6px_0_#333] active:translate-y-[2px] active:shadow-none transition-all"
             >
               {isLanding ? 'Launch App' : 'Log Out'}
             </button>
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navbar */}
      {!isLanding && (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-2 z-[140] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex justify-around items-center">
            {navItems.map((item) => {
               const isActive = activeView === item.id;
               const color = tabConfig[item.id]?.color || '#000';
               return (
                    <button
                        key={item.id}
                        onClick={() => onNavClick(item.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${isActive ? 'scale-110 -translate-y-2' : 'opacity-70'}`}
                    >
                        <span 
                          className="text-2xl transition-transform drop-shadow-sm"
                          style={isActive ? { filter: `drop-shadow(0 4px 4px ${color}66)` } : {}}
                        >
                          {item.icon}
                        </span>
                        {isActive && (
                          <div 
                            className="w-1 h-1 rounded-full mt-1" 
                            style={{ backgroundColor: color }}
                          ></div>
                        )}
                    </button>
               );
            })}
            <button 
                onClick={() => onNavClick('settings')}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-gray-400 ${activeView === 'settings' ? 'scale-110 -translate-y-2 text-[#8B5CF6] opacity-100' : 'opacity-70'}`}
            >
                 <span className="text-2xl">⚙️</span>
            </button>
        </div>
      )}
    </>
  );
};

export default Navbar;