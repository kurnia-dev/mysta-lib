import React from 'react';

import { FloatingActionButton } from 'lib/components';

import DocTitle from '../DocTitle';

const FloatingActionButtonDocs: React.FC = () => {
  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8 h-[600px] relative">
      <DocTitle name="Floating Action Button" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Static Examples (Not Fixed)</h3>
        <p className="text-sm text-gray-500">
          (Note: In a real app, position is fixed. Here overridden for demo)
        </p>
        <div className="flex gap-4 items-center">
          <div className="relative w-20 h-20 border flex items-center justify-center">
            <FloatingActionButton
              className="!absolute !bottom-2 !right-2" // Override for demo
              icon="plus"
              label="Add"
              size="sm"
            />
          </div>
          <div className="relative w-24 h-24 border flex items-center justify-center">
            <FloatingActionButton
              className="!absolute !bottom-2 !right-2"
              icon="plus"
              label="Add"
              size="md"
            />
          </div>
          <div className="relative w-28 h-28 border flex items-center justify-center">
            <FloatingActionButton
              className="!absolute !bottom-2 !right-2"
              icon="plus"
              label="Add"
              size="lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200 mt-8">
        <h3 className="font-semibold text-lg">Extended FAB (Hover or Focus)</h3>
        <div className="relative w-40 h-24 border flex items-center justify-center">
          <FloatingActionButton
            className="!absolute !bottom-2 !right-2"
            extendedLabel="Create New"
            icon="edit"
            label="Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButtonDocs;
