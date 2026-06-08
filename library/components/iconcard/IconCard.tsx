import clsx from 'clsx';
import { ReactNode } from 'react';

import { useComponentPreset } from 'lib/hooks';

export interface IconCardProps {
  icon: ReactNode;
  label: string;
  detail?: string;
  onClick?: () => void;
  className?: string;
}

export function IconCard({
  icon,
  label,
  detail,
  onClick,
  className,
}: IconCardProps): JSX.Element {
  const clickable = !!onClick;

  const preset =
    useComponentPreset('IconCard', {
      props: { label, detail },
      context: { clickable },
    }) ?? {};

  const Component = clickable ? 'button' : 'div';

  return (
    <Component
      className={clsx(preset.root?.className, className)}
      type={clickable ? 'button' : undefined}
      onClick={onClick}
    >
      <span className={clsx(preset.icon?.className)}>{icon}</span>
      <div className="min-w-0">
        <div className={clsx(preset.label?.className, 'truncate')}>{label}</div>
        {detail && (
          <div className={clsx(preset.detail?.className, 'truncate')}>{detail}</div>
        )}
      </div>
    </Component>
  );
}
