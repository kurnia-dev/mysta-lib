import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { KeyboardEvent, memo, useMemo } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { TabMenuItem, TabMenuProps } from './TabMenu.d';

interface InternalTabMenuItem extends TabMenuItem {
  id?: string;
}

export const TabMenu = memo((props: TabMenuProps) => {
  const { activeIndex, menus, pt, type = 'pill' } = props;

  const preset =
    useComponentPreset('TabMenu', {
      props: { activeIndex, type },
    }) ?? {};

  const internalMenus = useMemo(() => {
    return menus.map((m: InternalTabMenuItem) => ({
      ...m,
      id: m.id || nanoid(10),
    }));
  }, [menus]);

  return (
    <div
      role="tablist"
      {...preset.root}
      className={clsx(preset.root.className, pt?.root?.({ props })?.className)}
      style={pt?.root?.({ props })?.style}
    >
      {internalMenus.map((each, index) => {
        const isActive = activeIndex.get() === index;
        return (
          <a
            {...preset.item}
            aria-selected={isActive}
            className={clsx(
              preset.item.className,
              isActive ? preset.active.className : preset.inactive.className,
              pt?.item?.({ props })?.className,
              isActive
                ? pt?.active?.({ props })?.className
                : pt?.inactive?.({ props })?.className,
            )}
            key={each.id}
            role="tab"
            style={{
              ...pt?.item?.({ props })?.style,
              ...(isActive
                ? pt?.active?.({ props })?.style
                : pt?.inactive?.({ props })?.style),
            }}
            tabIndex={isActive ? 0 : -1}
            onClick={() => {
              if (index !== activeIndex.get()) activeIndex.set(index);
            }}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activeIndex.set(index);
              }
            }}
          >
            {each.icon && type !== 'pill' && (
              <Icon
                className={clsx(
                  preset.icon.className,
                  pt?.icon?.({ props })?.className,
                )}
                name={each.icon}
                style={pt?.icon?.({ props })?.style}
              />
            )}
            {each.label}
          </a>
        );
      })}
    </div>
  );
});

TabMenu.displayName = 'TabMenu';
