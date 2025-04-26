import { BaseInput } from '../private/BaseInput';
import { InputEmailProps } from './InputEmail.d';

export const InputEmail: React.FC<InputEmailProps> = (props) => (
  <BaseInput {...props} type="email" />
);
