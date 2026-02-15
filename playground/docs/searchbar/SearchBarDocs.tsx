import React, { useState } from 'react';

import { SearchBar } from 'lib/components';

import DocTitle from '../DocTitle';

const SearchBarDocs: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Search Bar" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Basic Usage</h3>
        <SearchBar
          autoFocus={false}
          placeholder="Search items..."
          value={query}
          onChange={setQuery}
          onClear={() => console.log('Cleared')}
        />
        <p className="text-sm text-gray-500">Current Value: {query}</p>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">With Cancel Button</h3>
        <SearchBar
          showCancel
          value={query}
          onCancel={() => {
            setQuery('');
            console.log('Cancelled');
          }}
          onChange={setQuery}
        />
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Disabled</h3>
        <SearchBar disabled value="Cannot edit this" onChange={() => {}} />
      </div>
    </div>
  );
};

export default SearchBarDocs;
