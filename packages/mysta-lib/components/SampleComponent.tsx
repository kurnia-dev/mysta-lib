import React from 'react';

export interface SampleComponentProps {
  message?: string;
}

export const SampleComponent: React.FC<SampleComponentProps> = ({ message = 'Hello from mysta-lib!' }) => {
  return (
    <div className="p-4 border rounded shadow bg-white text-gray-800">
      <p className="font-semibold">{message}</p>
    </div>
  );
};
