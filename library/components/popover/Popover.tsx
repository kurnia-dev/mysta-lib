import { Popover as RUIPopover } from 'radix-ui';
import { PopoverProps } from './Popover.d';
import { useCallback, useEffect, useState } from 'react';

export const Popover: React.FC<PopoverProps> = (props) => {
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
    if (visibleProps !== null) setVisible(visibleProps);
    if (defaultVisibility !== null) setVisible(defaultVisibility);
    if (alwaysRender) setVisible(alwaysRender);
  }, [visibleProps, setVisible, defaultVisibility, alwaysRender]);

  const handleMouseInOut = useCallback(
    (type: 'in' | 'out') => {
      setVisible(type === 'in');
      onVisibleChange?.(type === 'in');
    },
    [setVisible],
  );

  return (
    <RUIPopover.Root
      defaultOpen={defaultVisibility}
      onOpenChange={setVisible}
      open={visible}
    >
      {triggerOnMouseOver ? (
        <RUIPopover.Trigger
          asChild
          onMouseOver={() => handleMouseInOut('in')}
          onMouseOut={() => handleMouseInOut('out')}
        >
          <div className="group w-max h-max relative m-auto">
            {children}
            <RUIPopover.Content
              forceMount={alwaysRender}
              tabIndex={undefined}
              className="absolute bottom-2 right-2"
              align="end"
              onMouseOver={() => handleMouseInOut('in')}
              onMouseOut={() => handleMouseInOut('out')}
              onFocusOutside={(e) => {
                if (!closeOnBlur) e.preventDefault();
              }}
            >
              {content}
            </RUIPopover.Content>
          </div>
        </RUIPopover.Trigger>
      ) : (
        <>
          <RUIPopover.Trigger asChild>{children}</RUIPopover.Trigger>
          <RUIPopover.Content
            forceMount={alwaysRender}
            tabIndex={undefined}
            className="absolute bottom-2 right-2"
            align="end"
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
