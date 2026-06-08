import { DropdownProps, OptionValue } from '../Dropdown.d';

type Mode = NonNullable<DropdownProps['mode']>;

type ModeValueStruct = {
  multi: OptionValue[];
  single: OptionValue;
};

const callMultiTypeFn = <M extends Mode, R = boolean>(
  mode: M,
  fn: ((val: ModeValueStruct[M]) => R) | undefined,
  value: ModeValueStruct[M],
): R => {
  void mode;
  return (fn as ((val: unknown) => R) | undefined)?.(value) as R;
};

export default callMultiTypeFn;
