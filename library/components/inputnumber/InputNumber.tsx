import { BaseInput } from '../private/BaseInput';

import { InputNumberProps } from './InputNumber.d';

export const InputNumber: React.FC<InputNumberProps> = (props) => (
  <BaseInput {...props} type="number" />
);
