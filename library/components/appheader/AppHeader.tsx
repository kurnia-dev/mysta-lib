import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { AppHeaderProps } from './AppHeader.d';

export const AppHeader = (props: AppHeaderProps): JSX.Element => {
  const {
    title,
    subtitle,
    showBackButton = false,
    onBack,
    actions = [],
    children,
    transparent = false,
    className,
    pt,
  } = props;

  const preset =
    useComponentPreset('AppHeader', {
      props: { transparent },
      context: { hasSubtitle: !!subtitle, hasActions: actions.length > 0 },
    }) ?? {};

  return (
    <header
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { transparent } })?.className,
      )}
    >
      {/* Back Button */}
      {showBackButton && (
        <button
          aria-label="Go back"
          className={clsx(
            preset.backButton?.className,
            pt?.backButton?.({ props: { transparent } })?.className,
          )}
          type="button"
          onClick={onBack}
        >
          <Icon className="text-xl" name="chevron-left" />
        </button>
      )}

      {/* Title / Content */}
      <div
        className={clsx(
          preset.titleContainer?.className,
          pt?.titleContainer?.({ props: { transparent } })?.className,
        )}
      >
        {children || (
          <>
            <h1
              className={clsx(
                preset.title?.className,
                pt?.title?.({ props: { transparent } })?.className,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={clsx(
                  preset.subtitle?.className,
                  pt?.subtitle?.({ props: { transparent } })?.className,
                )}
              >
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div
          className={clsx(
            preset.actions?.className,
            pt?.actions?.({ props: { transparent } })?.className,
          )}
        >
          {actions.map((action) => (
            <button
              aria-label={action.label}
              className={clsx(
                preset.actionButton?.className,
                pt?.actionButton?.({ props: { transparent } })?.className,
              )}
              key={action.id}
              type="button"
              onClick={action.onClick}
            >
              <div className="relative">
                <Icon name={action.icon} />
                {action.badge && action.badge > 0 && (
                  <span
                    className={clsx(
                      preset.badge?.className,
                      pt?.badge?.({ props: { transparent } })?.className,
                    )}
                  >
                    {action.badge > 99 ? '99+' : action.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

AppHeader.displayName = 'AppHeader';
