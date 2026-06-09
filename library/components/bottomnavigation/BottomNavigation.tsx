import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

import { Icon } from '../icon/Icon';

import { BottomNavigationProps } from './BottomNavigation.d';

export const BottomNavigation = (props: BottomNavigationProps): JSX.Element => {
  const { items, activePath, onNavigate, className, pt } = props;

  const preset = useComponentPreset('BottomNavigation', { props }) ?? {};

  return (
    <nav
      {...preset.root}
      aria-label="Bottom navigation"
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props })?.className,
      )}
      role="navigation"
      style={pt?.root?.({ props })?.style}
    >
      {items.map((item) => {
        const isActive = activePath === item.path;

        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            className={clsx(
              preset.item?.className,
              pt?.item?.({ props })?.className,
              isActive && preset.activeItem?.className,
              isActive && pt?.activeItem?.({ props })?.className,
            )}
            key={item.id}
            style={{
              ...pt?.item?.({ props })?.style,
              ...(isActive ? pt?.activeItem?.({ props })?.style : {}),
            }}
            type="button"
            onClick={() => onNavigate(item.path)}
          >
            <div className="relative">
              <Icon
                className={clsx(
                  preset.icon?.className,
                  pt?.icon?.({ props })?.className,
                )}
                name={item.icon}
                style={pt?.icon?.({ props })?.style}
              />
              {item.badge && item.badge > 0 && (
                <span
                  aria-label={`${item.badge} notifications`}
                  className={clsx(
                    preset.badge?.className,
                    pt?.badge?.({ props })?.className,
                  )}
                  style={pt?.badge?.({ props })?.style}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span
              className={clsx(
                preset.label?.className,
                pt?.label?.({ props })?.className,
              )}
              style={pt?.label?.({ props })?.style}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

BottomNavigation.displayName = 'BottomNavigation';
