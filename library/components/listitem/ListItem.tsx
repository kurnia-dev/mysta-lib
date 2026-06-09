import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

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

  const context = { clickable: !!clickable, selected: !!selected, disabled: !!disabled };

  const Component = clickable ? 'button' : 'div';

  return (
    <>
      <Component
        className={clsx(
          preset.root?.className,
          className,
          pt?.root?.({ context, props: { severity, divider } })?.className,
        )}
        disabled={disabled}
        style={pt?.root?.({ context, props: { severity, divider } })?.style}
        type={clickable ? 'button' : undefined}
        onClick={clickable && !disabled ? onClick : undefined}
      >
        {/* Leading: Icon or Avatar */}
        {(icon || avatar) && (
          <div
            className={clsx(
              preset.leading?.className,
              pt?.leading?.({ context, props: { severity, divider } })?.className,
            )}
            style={pt?.leading?.({ context, props: { severity, divider } })?.style}
          >
            {avatar ? (
              <img
                alt=""
                className={clsx(
                  preset.avatar?.className,
                  pt?.avatar?.({ context, props: { severity, divider } })?.className,
                )}
                src={avatar}
                style={pt?.avatar?.({ context, props: { severity, divider } })?.style}
              />
            ) : icon ? (
              <Icon
                className={clsx(
                  preset.icon?.className,
                  pt?.icon?.({ context, props: { severity, divider } })?.className,
                )}
                name={icon}
                style={pt?.icon?.({ context, props: { severity, divider } })?.style}
              />
            ) : null}
          </div>
        )}

        {/* Content: Primary + Secondary */}
        <div
          className={clsx(
            preset.content?.className,
            pt?.content?.({ context, props: { severity, divider } })?.className,
          )}
          style={pt?.content?.({ context, props: { severity, divider } })?.style}
        >
          <div
            className={clsx(
              preset.primary?.className,
              pt?.primary?.({ context, props: { severity, divider } })?.className,
            )}
            style={pt?.primary?.({ context, props: { severity, divider } })?.style}
          >
            {primary}
          </div>
          {secondary && (
            <div
              className={clsx(
                preset.secondary?.className,
                pt?.secondary?.({ context, props: { severity, divider } })?.className,
              )}
              style={pt?.secondary?.({ context, props: { severity, divider } })?.style}
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
              pt?.trailing?.({ context, props: { severity, divider } })?.className,
            )}
            style={pt?.trailing?.({ context, props: { severity, divider } })?.style}
          >
            {trailing ||
              (trailingIcon && (
                <Icon
                  className={clsx(
                    preset.trailingIcon?.className,
                    pt?.trailingIcon?.({ context, props: { severity, divider } })
                      ?.className,
                  )}
                  name={trailingIcon}
                  style={
                    pt?.trailingIcon?.({ context, props: { severity, divider } })?.style
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
            pt?.divider?.({ context, props: { severity, divider } })?.className,
          )}
          style={pt?.divider?.({ context, props: { severity, divider } })?.style}
        />
      )}
    </>
  );
};

ListItem.displayName = 'ListItem';
