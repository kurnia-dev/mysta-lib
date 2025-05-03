import React, { useEffect } from 'react';

import { Icon } from 'lib/components';
import { IconProps } from 'lib/components/icon/Icon.d';

import DocTitle from '../DocTitle';

const icons = [
  'plus',
  'minus',
  'info',
  'eye-on',
  'eye-off',
  'check',
  'x',
  'circle',
  'circle-fill',
  'edit',
  'edit-2',
  'edit-3',
  'trash',
  'trash-2',
  'settings',
  'settings-2',
  'user-circle',
  'sort-asc',
  'sort-desc',
] as IconProps['name'][];

const IconDocs: React.FC = () => {
  useEffect(() => {
    console.log('IconDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="Icon" />

      <div className="flex gap-2 p-4 relative rounded-[5px] border border-primary-600">
        {icons.map((icon) => (
          <div className="flex flex-col gap-1 items-center" key={icon}>
            <Icon className="scale-150" name={icon} />
            <span>{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconDocs;
