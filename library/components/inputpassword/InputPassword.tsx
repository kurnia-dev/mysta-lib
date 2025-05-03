import { BaseInput } from '../private/BaseInput';

import { InputPasswordProps } from './InputPassword.d';

export const InputPassword: React.FC<InputPasswordProps> = (props) => (
  <BaseInput {...props} type="password" />
);
