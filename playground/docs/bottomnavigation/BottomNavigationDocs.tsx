import React, { useState } from 'react';

import { BottomNavigation } from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const BottomNavigationDocs: React.FC = () => {
  const [activePath, setActivePath] = useState('/home');

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Bottom Navigation" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Standard Navigation</h3>
        <div className="relative border rounded h-[200px] overflow-hidden bg-white flex flex-col justify-end">
          <div className="flex-1 p-4 flex items-center justify-center text-gray-400">
            Content Area
          </div>
          <BottomNavigation
            activePath={activePath}
            items={[
              { id: '1', label: 'Home', icon: 'home', path: '/home' },
              {
                id: '2',
                label: 'Search',
                icon: 'search',
                path: '/search',
              },
              {
                id: '3',
                label: 'Alerts',
                icon: 'bell',
                path: '/alerts',
                badge: 5,
              },
              { id: '4', label: 'Profile', icon: 'user', path: '/profile' },
            ]}
            onNavigate={setActivePath}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationDocs;
