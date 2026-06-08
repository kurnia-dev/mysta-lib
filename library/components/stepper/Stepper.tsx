import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

export interface StepperStep {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep: string;
  completedSteps?: string[];
  onStepClick?: (id: string) => void;
  className?: string;
}

export function Stepper({
  steps,
  activeStep,
  completedSteps = [],
  onStepClick,
  className,
}: StepperProps): JSX.Element {
  const preset =
    useComponentPreset('Stepper', {
      props: { steps, activeStep, completedSteps },
    }) ?? {};

  return (
    <div
      aria-label="Progress"
      className={clsx(preset.root?.className, className)}
      role="navigation"
    >
      {steps.map((step, i) => {
        const isActive = step.id === activeStep;
        const isCompleted = completedSteps.includes(step.id) && !isActive;
        const isNextCompleted =
          completedSteps.includes(steps[i + 1]?.id) ||
          activeStep === steps[i + 1]?.id;

        const indicatorClass = isActive
          ? preset.activeIndicator?.className
          : isCompleted
            ? preset.completedIndicator?.className
            : preset.pendingIndicator?.className;

        const labelClass = isActive
          ? preset.activeLabel?.className
          : preset.label?.className;

        return (
          <div className={clsx(preset.step?.className)} key={step.id}>
            <button
              aria-current={isActive ? 'step' : undefined}
              className="flex items-center gap-2"
              type="button"
              onClick={() => onStepClick?.(step.id)}
            >
              <span className={clsx(indicatorClass)}>
                {isCompleted ? (
                  <svg fill="none" height="8" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" width="8">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </span>
              <span className={clsx(labelClass)}>
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={clsx(
                  isNextCompleted
                    ? preset.completedConnector?.className
                    : preset.connector?.className,
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
