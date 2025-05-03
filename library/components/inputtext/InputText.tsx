import { BaseInput } from '../private/BaseInput';

import { InputTextProps } from './InputText.d';

export const InputText: React.FC<InputTextProps> = (props) => (
  <BaseInput {...props} type="text" />
);
