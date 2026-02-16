import React from 'react';

interface Props {
  category?: string;
  name: string;
}

const ComponentHeader: React.FC<Props> = ({
  category = 'COMPONENTS',
  name,
}) => {
  return (
    <div className="flex-col justify-start items-start gap-1 flex mb-4">
      <div className="text-[#6e7191] text-xs font-bold font-['Plus Jakarta Sans'] leading-3">
        {category}
      </div>
      <div className="w-[342px] text-[#262627] text-3xl font-bold font-['Plus Jakarta Sans']">
        {name}
      </div>
    </div>
  );
};

export default ComponentHeader;
