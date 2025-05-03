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
      content: slots['content'],
      footer: slots['footer'],
      header: slots['header'],
    },
  };

  const formProps: FormProps<T> = {
    defaultValues,
    onError,
    onSubmit,
    resetOnSubmit,
    buttonsConfig,

    slots: { footer: slots['formFooter'] },
  };

  const handleSubmit: FormProps<T>['onSubmit'] = (e) => {
    onSubmit(e);
    if (closeOnSubmit) onVisibleChange(false);
  };

  return (
    <Dialog {...dialogProps}>
      <Form {...formProps} ref={ref} onSubmit={handleSubmit}>
        {children}
      </Form>
    </Dialog>
  );
};

export const DialogForm = forwardRef(DialogFormContainer) as <
  T extends Record<string, any> = any,
>(
  props: DialogFormProps<T>,
) => JSX.Element;
