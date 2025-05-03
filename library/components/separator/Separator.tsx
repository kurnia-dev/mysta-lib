import { Separator as RUISeparator } from 'radix-ui';

import { SeparatorProps } from './Separator.d';

export const Separator: React.FC<SeparatorProps> = (props) => {
  return <RUISeparator.Root {...props} />;
};
