import React, { useEffect } from 'react';

import { Badge } from 'lib/components';
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

const BadgeDocs: React.FC = () => {
  useEffect(() => {
    console.log('BadgeDocs mounted!');
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <DocTitle name="Badge" />
      <div className="grid grid-cols-2 gap-3">
        <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) => (
              <div className="flex gap-1" key={`${severity}`}>
                <Badge
                  label={
                    severity
                      ? `${severity[0].toUpperCase()}${severity.slice(1)}`
                      : `primary`
                  }
                  severity={severity}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) =>
              ['left', 'right', undefined].map((pos, index) => (
                <div className="flex gap-1" key={`${severity}-${index}`}>
                  <Badge
                    icon="x"
                    iconPos={pos}
                    label={
                      severity
                        ? `${severity[0].toUpperCase()}${severity.slice(1)} ${pos}`
                        : `primary ${pos}`
                    }
                    severity={severity}
                  />
                </div>
              )),
            )}
          </div>
        </div>
        <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) => (
              <div className="flex gap-1" key={`${severity}`}>
                <Badge
                  label={
                    severity
                      ? `${severity[0].toUpperCase()}${severity.slice(1)}`
                      : `primary`
                  }
                  severity={severity}
                  type="filled"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) =>
              ['left', 'right', undefined].map((pos, index) => (
                <div className="flex gap-1" key={`${severity}-${index}`}>
                  <Badge
                    icon="x"
                    iconPos={pos}
                    label={
                      severity
                        ? `${severity[0].toUpperCase()}${severity.slice(1)} ${pos}`
                        : `primary ${pos}`
                    }
                    severity={severity}
                    type="filled"
                  />
                </div>
              )),
            )}
          </div>
        </div>
        <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) => (
              <div className="flex gap-1" key={`${severity}`}>
                <Badge
                  label={
                    severity
                      ? `${severity[0].toUpperCase()}${severity.slice(1)}`
                      : `primary`
                  }
                  severity={severity}
                  type="outlined"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 p-4 relative rounded-[5px] border border-primary-600">
            {severities.map((severity) =>
              ['left', 'right', undefined].map((pos, index) => (
                <div className="flex gap-1" key={`${severity}-${index}`}>
                  <Badge
                    icon="x"
                    iconPos={pos}
                    label={
                      severity
                        ? `${severity[0].toUpperCase()}${severity.slice(1)} ${pos}`
                        : `primary ${pos}`
                    }
                    severity={severity}
                    type="outlined"
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDocs;
