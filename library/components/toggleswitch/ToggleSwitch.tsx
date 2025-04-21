import { ToggleSwitchProps } from './ToggleSwitch.d';
import { Checkbox } from '../checkbox/Checkbox';

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  return <Checkbox {...props} role="toggleswitch" />;
};
