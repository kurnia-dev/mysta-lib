import React, { useState } from 'react';

import { BottomSheet, Button } from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const BottomSheetDocs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  const showSheet = (s: 'sm' | 'md' | 'lg') => {
    setSize(s);
    setVisible(true);
  };

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Bottom Sheet" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Interactive Demo</h3>
        <div className="flex gap-4">
          <Button label="Open Small Sheet" onClick={() => showSheet('sm')} />
          <Button label="Open Medium Sheet" onClick={() => showSheet('md')} />
          <Button label="Open Large Sheet" onClick={() => showSheet('lg')} />
        </div>

        <BottomSheet
          footer={
            <div className="flex justify-end gap-2">
              <Button
                text
                label="Cancel"
                severity="secondary"
                onClick={() => setVisible(false)}
              />
              <Button label="Confirm" onClick={() => setVisible(false)} />
            </div>
          }
          header={<h2 className="text-xl font-bold">Sheet Title</h2>}
          size={size}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="p-4">
            <p className="mb-4">
              This is the content of the bottom sheet. It can contain any
              elements, forms, or text.
            </p>
            <p>
              Current size: <strong>{size}</strong>
            </p>
          </div>
        </BottomSheet>
      </div>
    </div>
  );
};

export default BottomSheetDocs;
