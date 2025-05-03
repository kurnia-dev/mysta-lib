import React, { useEffect } from 'react';

import { Button } from 'lib/components';
import { Severities } from 'lib/utils';

import DocTitle from '../DocTitle';

const severities = [
  undefined,
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
] as Severities[];

const ButtonDocs: React.FC = () => {
  useEffect(() => {
    console.log('ButtonDocs mounted!');
  }, []);

  return (
    <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
      <DocTitle name="Button" />

      <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
        {severities.map((severity) =>
          ['text', 'outlined', undefined].map((style, index) => (
            <div className="flex gap-1" key={`${severity}-${index}`}>
              <Button
                label={
                  severity
                    ? `${severity[0].toUpperCase()}${severity.slice(1)} ${style}`
                    : `primary ${style}`
                }
                outlined={style === 'outlined'}
                severity={severity}
                text={style === 'text'}
              />
            </div>
          )),
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
        {severities.map((severity) =>
          ['text', 'outlined', undefined].map((style, index) => (
            <div className="flex gap-1" key={`${severity}-${index}`}>
              <Button
                disabled
                label={
                  severity
                    ? `${severity[0].toUpperCase()}${severity.slice(1)} ${style}`
                    : `primary ${style}`
                }
                outlined={style === 'outlined'}
                severity={severity}
                text={style === 'text'}
              />
            </div>
          )),
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Button height={48} label="Button" />
        <Button icon="plus" label="Flex Button" />
        <Button icon="minus" />
      </div>
    </div>
  );
};

export default ButtonDocs;
