import { Toast as RUIToast } from 'radix-ui';
import { forwardRef, useState } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';

import { ToastProps } from './Toast.d';

const ToastBase = (
  props: ToastProps,
  ref: React.ForwardedRef<HTMLLIElement>,
) => {
  const { action, icon, message, severity, onClose } = props;
  const [open, setOpen] = useState<boolean>(true);

  const preset =
    useComponentPreset('Toast', {
      props,
    }) ?? {};

  return (
    <RUIToast.Root
      className={preset.root.className}
      {...{
        open,
        onOpenChange: (e) => {
          setOpen(false);
          if (!open) onClose(e);
        },
      }}
      duration={10000}
      ref={ref}
    >
      <RUIToast.Description className={preset.description.className}>
        <div className="flex gap-1 items-center">
          {icon && <Icon className="text-white" name={icon} />}
          {message}
        </div>
      </RUIToast.Description>
      <RUIToast.Action asChild altText={action.label}>
        <div className="flex gap-1 items-center">
          {action && (
            <Button
              className="brightness-95 ring-secondary-200/50"
              label={action.label}
              severity={severity}
              onClick={action.command}
            />
          )}
          <Button
            className="!ring-0 !rounded-full"
            icon="x"
            severity={severity}
          />
        </div>
      </RUIToast.Action>
    </RUIToast.Root>
  );
};

export const Toast: React.FC<ToastProps> = forwardRef<HTMLElement, ToastProps>(
  ToastBase,
);

Toast.displayName = 'Toast';
