import { Popover as RUIPopover } from 'radix-ui';
import { useCallback, useEffect, useState } from 'react';

import { PopoverProps } from './Popover.d';

export const Popover = (props: PopoverProps) => {
  const {
    children,
    closeOnBlur,
    content,
    triggerOnMouseOver = false,
    alwaysRender,
    defaultVisibility = alwaysRender,

    visible: visibleProps,
    onVisibleChange,
  } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visibleProps !== null && visibleProps !== undefined) setVisible(visibleProps as boolean);
    if (defaultVisibility !== null && defaultVisibility !== undefined) setVisible(defaultVisibility as boolean);
    if (alwaysRender !== undefined) setVisible(alwaysRender as boolean);
  }, [visibleProps, setVisible, defaultVisibility, alwaysRender]);

  const handleMouseInOut = useCallback(
    (type: 'in' | 'out') => {
      setVisible(type === 'in');
      onVisibleChange?.(type === 'in');
    },
    [setVisible, onVisibleChange],
  );

  return (
    <RUIPopover.Root
      defaultOpen={defaultVisibility}
      open={visible}
      onOpenChange={setVisible}
    >
      {triggerOnMouseOver ? (
        <RUIPopover.Trigger
          asChild
          onMouseOut={() => handleMouseInOut('out')}
          onMouseOver={() => handleMouseInOut('in')}
        >
          <div className="group w-max h-max relative m-auto">
            {children}
            <RUIPopover.Content
              align="end"
              className="absolute bottom-2 right-2"
              forceMount={alwaysRender}
              tabIndex={undefined}
              onFocusOutside={(e) => {
                if (!closeOnBlur) e.preventDefault();
              }}
              onMouseOut={() => handleMouseInOut('out')}
              onMouseOver={() => handleMouseInOut('in')}
            >
              {content}
            </RUIPopover.Content>
          </div>
        </RUIPopover.Trigger>
      ) : (
        <>
          <RUIPopover.Trigger asChild>{children}</RUIPopover.Trigger>
          <RUIPopover.Content
            align="end"
            className="absolute bottom-2 right-2"
            forceMount={alwaysRender}
            tabIndex={undefined}
            onFocusOutside={(e) => {
              if (!closeOnBlur) e.preventDefault();
            }}
          >
            {content}
          </RUIPopover.Content>
        </>
      )}
    </RUIPopover.Root>
  );
};
