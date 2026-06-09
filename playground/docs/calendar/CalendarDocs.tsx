import React, { useState } from 'react';

import { Calendar } from '@mystaline/mysta-commons/components';

import DocTitle from '../DocTitle';

const CalendarDocs: React.FC = () => {
  const [date, setDate] = useState<number | null>(new Date().getTime());

  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="Calendar" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Interactive Calendar</h3>
        <p>Selected Timestamp: {date}</p>
        <p>Date: {new Date(date!).toLocaleDateString()}</p>
        <div className="w-full max-w-[350px] border shadow-md rounded-lg p-2 bg-white">
          <Calendar value={date} onChange={setDate} />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">Disabled Calendar</h3>
        <div className="w-full max-w-[350px] border shadow-md rounded-lg p-2 bg-white opacity-60">
          <Calendar disabled value={date} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CalendarDocs;
