import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
};

export function Spinner({ size = 'md', className }: SpinnerProps): JSX.Element {
  const preset = useComponentPreset('Spinner', { props: { size } }) ?? {};

  return (
    <span
      aria-label="Loading"
      className={clsx(
        'inline-block rounded-full',
        preset.root?.className,
        sizes[size],
        className,
      )}
      role="status"
    />
  );
}
