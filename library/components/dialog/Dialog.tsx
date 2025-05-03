import clsx from 'clsx';
import { Dialog as RUIDialog } from 'radix-ui';
import { memo } from 'react';

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
  } = props;

  const preset =
    useComponentPreset('dialog', {
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
        <RUIDialog.Overlay {...preset.overlay} />
        <RUIDialog.Content
          className={clsx(preset.container.className, containerClass)}
          onEscapeKeyDown={(e) => {
            if (!closeOnEscape) e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            if (!closeOnBlur) e.preventDefault();
          }}
        >
          <RUIDialog.Title asChild>
            <div className={clsx(preset.header.className, headerClass)}>
              <Slot name="header" slots={slots}>
                <span>{header}</span>
                {useCloseIcon && (
                  <div {...preset.iconContainer}>
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
            <div className={clsx(preset.content.className, contentClass)}>
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
