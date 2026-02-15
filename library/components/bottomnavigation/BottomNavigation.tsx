import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

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
              />
              {item.badge && item.badge > 0 && (
                <span
                  aria-label={`${item.badge} notifications`}
                  className={clsx(
                    preset.badge?.className,
                    pt?.badge?.({ props })?.className,
                  )}
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
