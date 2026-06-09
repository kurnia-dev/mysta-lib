import clsx from 'clsx';
import { ReactNode } from 'react';

import { useComponentPreset } from '../../hooks';

export interface MobileActionBarProps {
  info?: ReactNode;
  action: ReactNode;
  className?: string;
}

export function MobileActionBar({ info, action, className }: MobileActionBarProps): JSX.Element {
  const preset = useComponentPreset('MobileActionBar', { props: { action } }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      {info && <div className={preset.info?.className}>{info}</div>}
      <div className={preset.action?.className}>{action}</div>
    </div>
  );
}
