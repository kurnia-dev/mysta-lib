import React, { useState } from 'react';

import { ListItem, PullToRefresh } from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const PullToRefreshDocs: React.FC = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const handleRefresh = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setItems((prev) => [prev.length + 1, ...prev]);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Pull To Refresh" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200 h-[400px]">
        <h3 className="font-semibold text-lg">
          Pull down within the box to refresh
        </h3>
        <div className="border rounded overflow-hidden flex-1 relative bg-white">
          <PullToRefresh onRefresh={handleRefresh}>
            <div className="divide-y">
              {items.map((i) => (
                <ListItem
                  key={i}
                  primary={`Item ${i}`}
                  secondary="Pull down to add more"
                />
              ))}
              <div className="p-4 text-center text-gray-400 text-sm">
                End of list
              </div>
            </div>
          </PullToRefresh>
        </div>
      </div>
    </div>
  );
};

export default PullToRefreshDocs;
