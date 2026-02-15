import clsx from 'clsx';
import { Dialog as RUIDialog } from 'radix-ui';
import { memo, useMemo } from 'react';

import { Icon, Slot } from 'lib/components';
import { useComponentPreset } from 'lib/hooks';

import { DialogProps } from './Dialog.d';

export const Dialog = memo((props: DialogProps) => {
  const {
    children,

    defaultVisibility = false,
    visible = false,
    onVisibleChange,

    header,
    size = 'sm',

    modal = true,
    closeOnBlur = true,
    closeOnEscape = true,
    useCloseIcon = true,

    containerClass,
    headerClass,
    contentClass,

    slots,

    pt,
  } = props;

  const context = useMemo(() => ({ open: visible }), [visible]);

  const preset =
    useComponentPreset('Dialog', {
      props: { size },
      context: { open: visible },
    }) ?? {};

  return (
    <RUIDialog.Root
      defaultOpen={defaultVisibility}
      modal={modal}
      open={visible}
      onOpenChange={onVisibleChange}
    >
      <RUIDialog.Portal>
        <RUIDialog.Overlay
          {...preset.overlay}
          className={clsx(
            preset.overlay.className,
            pt?.overlay?.({ props, context })?.className,
          )}
        />
        <RUIDialog.Content
          className={clsx(
            preset.container.className,
            containerClass,
            pt?.container?.({ context, props })?.className,
          )}
          onEscapeKeyDown={(e) => {
            if (!closeOnEscape) e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            if (!closeOnBlur) e.preventDefault();
          }}
        >
          <RUIDialog.Title asChild>
            <div
              className={clsx(
                preset.header.className,
                headerClass,
                pt?.header?.className,
              )}
            >
              <Slot name="header" slots={slots}>
                <span>{header}</span>
                {useCloseIcon && (
                  <div
                    {...preset.iconContainer}
                    className={clsx(
                      preset.iconContainer.className,
                      pt?.iconContainer?.({ context, props })?.className,
                    )}
                  >
                    <Icon
                      className="cursor-pointer"
                      name="x"
                      onClick={() => onVisibleChange(false)}
                    />
                  </div>
                )}
              </Slot>
            </div>
          </RUIDialog.Title>
          <Slot name="content" slots={slots}>
            <div
              className={clsx(
                preset.content.className,
                contentClass,
                pt?.content?.className,
              )}
            >
              {children}
            </div>
          </Slot>
          <Slot name="footer" slots={slots} />
        </RUIDialog.Content>
      </RUIDialog.Portal>
    </RUIDialog.Root>
  );
});

Dialog.displayName = 'Dialog';
