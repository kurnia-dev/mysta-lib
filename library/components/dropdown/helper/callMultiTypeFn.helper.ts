import { DropdownProps, OptionValue } from '../Dropdown.d';

type Mode = DropdownProps['mode'];

type ModeValueStruct = {
  multi: OptionValue[];
  single: OptionValue;
};

const callMultiTypeFn = <M extends Mode, R = boolean>(
  mode: M,
  fn: ((val: ModeValueStruct[M]) => R) | undefined,
  value: ModeValueStruct[M],
): R => {
  return fn?.(value) as R;
};

export default callMultiTypeFn;
