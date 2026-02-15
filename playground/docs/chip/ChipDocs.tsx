import React from 'react';

import { Chip } from 'lib/components';
import { Severities } from 'lib/utils';

import DocTitle from '../DocTitle';

const ChipDocs: React.FC = () => {
  const severities: Severities[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Chip" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Solid Chips</h3>
        <div className="flex flex-wrap gap-2">
          {severities.map((sev) => (
            <Chip key={sev} label={sev} severity={sev} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Outlined Chips</h3>
        <div className="flex flex-wrap gap-2">
          {severities.map((sev) => (
            <Chip key={sev} label={sev} severity={sev} variant="outlined" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Light Chips with Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Chip
            icon="check"
            label="Success"
            severity="success"
            variant="light"
          />
          <Chip
            icon="alert-circle"
            label="Warning"
            severity="warning"
            variant="light"
          />
          <Chip icon="info" label="Info" severity="info" variant="light" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Removable Chips</h3>
        <div className="flex flex-wrap gap-2">
          <Chip
            removable
            label="Removable"
            onRemove={() => console.log('Removed')}
          />
        </div>
      </div>
    </div>
  );
};

export default ChipDocs;
