import clsx from 'clsx';
import { ReactNode } from 'react';

import { useComponentPreset } from 'lib/hooks';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export interface ErrorStateProps extends EmptyStateProps {
  message?: string;
  onRetry?: () => void;
}

export function EmptyState({
  title = 'No data',
  description,
  icon,
  action,
  className,
}: EmptyStateProps): JSX.Element {
  const preset = useComponentPreset('EmptyState', { props: { title, description } }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      {icon && (
        <div className={preset.icon?.className}>{icon}</div>
      )}
      <p className={preset.title?.className}>{title}</p>
      {description && (
        <p className={preset.description?.className}>{description}</p>
      )}
      {action && (
        <div className={preset.action?.className}>{action}</div>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  description,
  icon,
  action,
  onRetry,
  className,
}: ErrorStateProps): JSX.Element {
  const defaultIcon = (
    <svg className="text-red-400" fill="none" height="32" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="32">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );

  return (
    <EmptyState
      action={
        action ?? (onRetry && (
          <button
            className="text-xs px-3 py-1.5 rounded-xl border border-secondary-200 hover:bg-secondary-50 transition-colors"
            type="button"
            onClick={onRetry}
          >
            Try again
          </button>
        ))
      }
      className={clsx('text-red-400', className)}
      description={message ?? description}
      icon={icon ?? defaultIcon}
      title={title}
    />
  );
}
