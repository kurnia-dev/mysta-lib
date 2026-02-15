import React from 'react';

import { StatCard } from 'lib/components';

import DocTitle from '../DocTitle';

const StatCardDocs: React.FC = () => {
  return (
    <div className="bg-white flex flex-col gap-8 p-4 rounded-xl md:p-16">
      <DocTitle name="Stat Card" />

      <div className="bg-gray-50 border-gray-200 border flex flex-col gap-4 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Grid Layout</h3>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            trendUp
            icon="dollar"
            label="Revenue"
            severity="success"
            trend="12%"
            value="$45,231"
          />
          <StatCard
            icon="users"
            label="Active Users"
            severity="info"
            subtitle="Last 30 days"
            value="1,204"
          />
          <StatCard
            icon="shopping-bag"
            label="Orders"
            severity="warning"
            trend="2.4%"
            trendUp={false}
            value="89"
          />
          <StatCard
            clickable
            icon="alert-circle"
            label="Issues"
            severity="danger"
            value="3"
            onClick={() => alert('Clicked issues')}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCardDocs;
