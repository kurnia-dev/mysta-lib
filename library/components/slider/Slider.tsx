import clsx from 'clsx';
import { useCallback, useId, useRef } from 'react';

import { useComponentPreset } from 'lib/hooks';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  showTooltip?: boolean;
  ticks?: string[];
  formatTooltip?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showTooltip = false,
  ticks,
  formatTooltip,
  disabled = false,
  className,
}: SliderProps): JSX.Element {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  const tooltipLabel = formatTooltip ? formatTooltip(value) : String(value);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
      if (inputRef.current) {
        inputRef.current.style.setProperty('--slider-pct', `${((Number(e.target.value) - min) / (max - min)) * 100}%`);
      }
    },
    [onChange, min, max],
  );

  const preset = useComponentPreset('Slider', {
    props: { value, min, max, step, disabled, showTooltip, ticks, formatTooltip },
    context: { disabled },
  }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      <div className="slider-wrap relative">
        {showTooltip && (
          <div
            aria-hidden
            className={clsx('slider-tooltip', preset.tooltip?.className)}
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          >
            {tooltipLabel}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary-900" />
          </div>
        )}
        <input
          className="w-full h-1 rounded-full outline-none cursor-pointer appearance-none bg-transparent"
          disabled={disabled}
          id={id}
          max={max}
          min={min}
          ref={inputRef}
          step={step}
          style={
            {
              '--slider-pct': `${pct}%`,
              background: `linear-gradient(to right, currentColor ${pct}%, rgb(229 231 235) ${pct}%)`,
            } as React.CSSProperties
          }
          type="range"
          value={value}
          onChange={handleChange}
        />
      </div>
      {ticks && ticks.length > 0 && (
        <div className={clsx(preset.ticks?.className)}>
          {ticks.map((tick) => (
            <span className="text-xs text-secondary-400" key={tick}>
              {tick}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
