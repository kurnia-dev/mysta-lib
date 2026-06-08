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

  const context = { hasSubtitle: !!subtitle, hasActions: actions.length > 0 };

  const preset =
    useComponentPreset('AppHeader', {
      props: { transparent },
      context,
    }) ?? {};

  return (
    <header
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ context, props: { transparent } })?.className,
      )}
      style={pt?.root?.({ context, props: { transparent } })?.style}
    >
      {/* Back Button */}
      {showBackButton && (
        <button
          aria-label="Go back"
          className={clsx(
            preset.backButton?.className,
            pt?.backButton?.({ context, props: { transparent } })?.className,
          )}
          style={pt?.backButton?.({ context, props: { transparent } })?.style}
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
          pt?.titleContainer?.({ context, props: { transparent } })?.className,
        )}
        style={pt?.titleContainer?.({ context, props: { transparent } })?.style}
      >
        {children || (
          <>
            <h1
              className={clsx(
                preset.title?.className,
                pt?.title?.({ context, props: { transparent } })?.className,
              )}
              style={pt?.title?.({ context, props: { transparent } })?.style}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={clsx(
                  preset.subtitle?.className,
                  pt?.subtitle?.({ context, props: { transparent } })?.className,
                )}
                style={pt?.subtitle?.({ context, props: { transparent } })?.style}
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
            pt?.actions?.({ context, props: { transparent } })?.className,
          )}
          style={pt?.actions?.({ context, props: { transparent } })?.style}
        >
          {actions.map((action) => (
            <button
              aria-label={action.label}
              className={clsx(
                preset.actionButton?.className,
                pt?.actionButton?.({ context, props: { transparent } })?.className,
              )}
              key={action.id}
              style={pt?.actionButton?.({ context, props: { transparent } })?.style}
              type="button"
              onClick={action.onClick}
            >
              <div className="relative">
                <Icon name={action.icon} />
                {action.badge && action.badge > 0 && (
                  <span
                    className={clsx(
                      preset.badge?.className,
                      pt?.badge?.({ context, props: { transparent } })?.className,
                    )}
                    style={pt?.badge?.({ context, props: { transparent } })?.style}
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
