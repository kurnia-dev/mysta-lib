import { RadioButtonProps } from '../RadioButton.d';

const callMultiTypeFn = <
  T extends RadioButtonProps['optionValue'],
  R = boolean,
>(
  mode: T,
  fn: ((val: RadioButtonProps['optionValue']) => R) | undefined,
  value: RadioButtonProps['optionValue'],
): R => {
  return fn?.(value) as R;
};

export default callMultiTypeFn;
