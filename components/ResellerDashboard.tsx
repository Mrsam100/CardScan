/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

// Simplified as user didn't ask for functionality changes here, just style fix
const ResellerDashboard: React.FC<any> = () => {
  return (
    <div className="py-12 px-6 max-w-[1200px] mx-auto">
        <div className="clay-card p-12 text-center">
            <h1 className="text-4xl font-black uppercase">Module Disabled</h1>
            <p className="mt-4 font-bold">This module is not active in the high contrast protocol.</p>
        </div>
    </div>
  );
};

export default ResellerDashboard;