import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  className,
}: NumberStepperProps): JSX.Element {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  const context = {
    canDecrement: !disabled && value > min,
    canIncrement: !disabled && value < max,
  };

  const preset = useComponentPreset('NumberStepper', {
    props: { value, min, max, step, disabled },
    context,
  }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      <button
        aria-label="Decrease"
        className={clsx(preset.decrementButton?.className)}
        disabled={disabled || value <= min}
        type="button"
        onClick={dec}
      >
        −
      </button>
      <span className={clsx(preset.value?.className)}>
        {value}
      </span>
      <button
        aria-label="Increase"
        className={clsx(preset.incrementButton?.className)}
        disabled={disabled || value >= max}
        type="button"
        onClick={inc}
      >
        +
      </button>
    </div>
  );
}
