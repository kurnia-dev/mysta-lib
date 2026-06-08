import { CheckboxProps, ValueModeType } from '../Checkbox.d';

export type Mode = CheckboxProps['mode'];

export type ModeValue<M extends Mode> = M extends 'value'
  ? ValueModeType
  : M extends 'tristate'
    ? boolean | null
    : boolean;

const callMultiTypeFn = <M extends Mode, R = boolean>(
  _: M,
  fn: ((val: ModeValue<M>) => R) | undefined,
  value: ModeValue<M>,
): R => {
  return fn?.(value) as R;
};

export default callMultiTypeFn;
