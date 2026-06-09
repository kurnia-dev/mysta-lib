import React from 'react';

import { AppHeader } from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const AppHeaderDocs: React.FC = () => {
  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="App Header" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Default Header</h3>
        <div className="relative border rounded h-[60px] overflow-hidden bg-white">
          <AppHeader
            actions={[
              {
                id: '1',
                icon: 'bell',
                label: 'Notifications',
                onClick: () => console.log('Bell clicked'),
                badge: 3,
              },
            ]}
            showBackButton={true}
            subtitle="Overview"
            title="Dashboard"
            onBack={() => console.log('Back clicked')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Transparent Header</h3>
        <div className="relative border rounded h-[60px] overflow-hidden bg-primary-100">
          <AppHeader
            showBackButton={true}
            title="Profile"
            transparent={true}
            onBack={() => console.log('Back clicked')}
          />
        </div>
      </div>
    </div>
  );
};

export default AppHeaderDocs;
