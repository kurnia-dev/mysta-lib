import { SeparatorProps } from './Separator.d';
import { Separator as RUISeparator } from 'radix-ui';

export const Separator: React.FC<SeparatorProps> = (props) => {
  return <RUISeparator.Root {...props} />;
};
