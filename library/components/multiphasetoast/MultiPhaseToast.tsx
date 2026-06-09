import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

import { ProgressBar } from '../progressbar/ProgressBar';

export interface MultiPhaseToastProps {
  phases: string[];
  currentPhase: number;
  open: boolean;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export function MultiPhaseToast({
  phases,
  currentPhase,
  open,
  title,
  onClose,
  className,
}: MultiPhaseToastProps): JSX.Element | null {
  if (!open) return null;

  const total = phases.length;
  const isDone = currentPhase >= total;
  const pct = isDone ? 100 : (currentPhase / total) * 100;
  const activeLabel = isDone ? phases[total - 1] : phases[currentPhase];

  const preset = useComponentPreset('MultiPhaseToast', {
    props: { phases, currentPhase, open, title, onClose },
    context: { isDone },
  }) ?? {};

  return (
    <div
      className={clsx(preset.root?.className, className)}
      role="status"
    >
      <div className={clsx(preset.header?.className)}>
        <div>
          {title && (
            <div className={clsx(preset.title?.className, 'mb-0.5')}>{title}</div>
          )}
          <div className={clsx(preset.phaseLabel?.className)}>{activeLabel}</div>
        </div>
        {onClose && (
          <button
            aria-label="Close"
            className={clsx(preset.closeButton?.className, 'shrink-0 leading-none')}
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        )}
      </div>

      <ProgressBar animated={!isDone} value={pct} />

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {phases.map((_, i) => (
            <span
              className={clsx(
                'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                i < currentPhase
                  ? 'bg-primary-500'
                  : i === currentPhase
                    ? 'bg-primary-300 animate-pulse'
                    : 'bg-secondary-200',
              )}
              key={i}
            />
          ))}
        </div>
        <span className="text-[0.65rem] tabular-nums text-secondary-400">
          {Math.min(currentPhase, total)}/{total}
        </span>
      </div>
    </div>
  );
}
