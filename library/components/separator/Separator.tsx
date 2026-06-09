import clsx from 'clsx';
import { Separator as RUISeparator } from 'radix-ui';

import { useComponentPreset } from '../../hooks';

import { SeparatorProps } from './Separator.d';

export const Separator: React.FC<SeparatorProps> = (props) => {
  const preset = useComponentPreset('Separator', { props }) ?? {};
  return (
    <RUISeparator.Root
      {...props}
      className={clsx(preset.root?.className, props.className)}
    />
  );
};
