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
          >
            {avatar ? (
              <img
                alt=""
                className={clsx(
                  preset.avatar?.className,
                  pt?.avatar?.({ props: { severity, divider } })?.className,
                )}
                src={avatar}
              />
            ) : icon ? (
              <Icon
                className={clsx(
                  preset.icon?.className,
                  pt?.icon?.({ props: { severity, divider } })?.className,
                )}
                name={icon}
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
        >
          <div
            className={clsx(
              preset.primary?.className,
              pt?.primary?.({ props: { severity, divider } })?.className,
            )}
          >
            {primary}
          </div>
          {secondary && (
            <div
              className={clsx(
                preset.secondary?.className,
                pt?.secondary?.({ props: { severity, divider } })?.className,
              )}
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
        />
      )}
    </>
  );
};

ListItem.displayName = 'ListItem';
