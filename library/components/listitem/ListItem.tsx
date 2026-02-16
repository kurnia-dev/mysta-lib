import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { ListItemProps } from './ListItem.d';

export const ListItem = (props: ListItemProps): JSX.Element => {
  const {
    primary,
    secondary,
    icon,
    avatar,
    trailing,
    trailingIcon,
    divider = true,
    clickable = false,
    onClick,
    selected = false,
    severity = 'secondary',
    disabled = false,
    className,
    pt,
  } = props;

  const preset =
    useComponentPreset('ListItem', {
      props: { severity, divider },
      context: { clickable, selected, disabled },
    }) ?? {};

  const Component = clickable ? 'button' : 'div';

  return (
    <>
      <Component
        className={clsx(
          preset.root?.className,
          className,
          pt?.root?.({ props: { severity, divider } })?.className,
        )}
        disabled={disabled}
        style={pt?.root?.({ props: { severity, divider } })?.style}
        type={clickable ? 'button' : undefined}
        onClick={clickable && !disabled ? onClick : undefined}
      >
        {/* Leading: Icon or Avatar */}
        {(icon || avatar) && (
          <div
            className={clsx(
              preset.leading?.className,
              pt?.leading?.({ props: { severity, divider } })?.className,
            )}
            style={pt?.leading?.({ props: { severity, divider } })?.style}
          >
            {avatar ? (
              <img
                alt=""
                className={clsx(
                  preset.avatar?.className,
                  pt?.avatar?.({ props: { severity, divider } })?.className,
                )}
                src={avatar}
                style={pt?.avatar?.({ props: { severity, divider } })?.style}
              />
            ) : icon ? (
              <Icon
                className={clsx(
                  preset.icon?.className,
                  pt?.icon?.({ props: { severity, divider } })?.className,
                )}
                name={icon}
                style={pt?.icon?.({ props: { severity, divider } })?.style}
              />
            ) : null}
          </div>
        )}

        {/* Content: Primary + Secondary */}
        <div
          className={clsx(
            preset.content?.className,
            pt?.content?.({ props: { severity, divider } })?.className,
          )}
          style={pt?.content?.({ props: { severity, divider } })?.style}
        >
          <div
            className={clsx(
              preset.primary?.className,
              pt?.primary?.({ props: { severity, divider } })?.className,
            )}
            style={pt?.primary?.({ props: { severity, divider } })?.style}
          >
            {primary}
          </div>
          {secondary && (
            <div
              className={clsx(
                preset.secondary?.className,
                pt?.secondary?.({ props: { severity, divider } })?.className,
              )}
              style={pt?.secondary?.({ props: { severity, divider } })?.style}
            >
              {secondary}
            </div>
          )}
        </div>

        {/* Trailing: Custom content or icon */}
        {(trailing || trailingIcon) && (
          <div
            className={clsx(
              preset.trailing?.className,
              pt?.trailing?.({ props: { severity, divider } })?.className,
            )}
            style={pt?.trailing?.({ props: { severity, divider } })?.style}
          >
            {trailing ||
              (trailingIcon && (
                <Icon
                  className={clsx(
                    preset.trailingIcon?.className,
                    pt?.trailingIcon?.({ props: { severity, divider } })
                      ?.className,
                  )}
                  name={trailingIcon}
                  style={
                    pt?.trailingIcon?.({ props: { severity, divider } })?.style
                  }
                />
              ))}
          </div>
        )}
      </Component>

      {/* Divider */}
      {divider && (
        <div
          className={clsx(
            preset.divider?.className,
            pt?.divider?.({ props: { severity, divider } })?.className,
          )}
          style={pt?.divider?.({ props: { severity, divider } })?.style}
        />
      )}
    </>
  );
};

ListItem.displayName = 'ListItem';
