import { CheckboxProps, CheckboxValue } from '../Checkbox.d';

type Mode = CheckboxProps['mode'];

type ModeValueStruct = {
  value: CheckboxValue;
  binary: boolean;
  tristate: boolean | null;
};

const callMultiTypeFn = <M extends Mode, R = boolean>(
  mode: M,
  fn: ((val: ModeValueStruct[M]) => R) | undefined,
  value: ModeValueStruct[M],
): R => {
  return fn?.(value) as R;
};

export default callMultiTypeFn;
