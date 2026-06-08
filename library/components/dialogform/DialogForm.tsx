/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, Ref } from 'react';

import { Dialog, Form } from 'lib/components';

import { DialogProps } from '../dialog/Dialog.d';
import { FormHandle, FormProps } from '../form/Form.d';

import { DialogFormProps } from './DialogForm.d';

const DialogFormContainer = <T extends Record<string, any>>(
  props: DialogFormProps<T>,
  ref: Ref<FormHandle<T>>,
) => {
  const {
    children,

    defaultVisibility = false,
    visible = false,
    onVisibleChange,

    header,
    size = 'lg',

    modal = true,
    closeOnBlur = true,
    closeOnEscape = true,
    closeOnSubmit = true,
    useCloseIcon = true,

    containerClass,
    headerClass,
    contentClass,

    slots,
    pt,

    defaultValues,
    onError,
    onSubmit,
    resetOnSubmit,
    buttonsConfig,
  } = props;

  const dialogProps: DialogProps = {
    visible,
    onVisibleChange,
    defaultVisibility,

    header,
    size,

    modal,
    closeOnBlur,
    closeOnEscape,
    useCloseIcon,

    containerClass,
    contentClass,
    headerClass,

    slots: {
      header: slots?.['header'],
    },
  };

  const formProps: FormProps<T> = {
    defaultValues,
    onError,
    onSubmit,
    resetOnSubmit,
    buttonsConfig,

    slots: slots?.['formFooter'] ? { footer: slots['formFooter']! } : undefined,
  };

  const handleSubmit: FormProps<T>['onSubmit'] = (e) => {
    onSubmit?.(e);
    if (closeOnSubmit) onVisibleChange?.(false);
  };

  return (
    <Dialog {...dialogProps} pt={pt?.dialog}>
      <Form {...formProps} pt={pt?.form} ref={ref} onSubmit={handleSubmit}>
        {children}
      </Form>
    </Dialog>
  );
};

export const DialogForm = forwardRef(DialogFormContainer) as <
  T extends Record<string, any> = any,
>(
  props: DialogFormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;
