/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref } from 'react';

import { DialogPresetOptions, DialogProps } from '../dialog/Dialog.d';
import { FormHandle, FormPresetOptions, FormProps } from '../form/Form.d';

export interface DialogFormProps<T extends Record<string, any>>
  extends Omit<DialogProps, 'slots' | 'pt'>,
    Omit<FormProps<T>, 'slots' | 'pt'> {
  closeOnSubmit?: boolean;
  slots?: Partial<Record<keyof DialogFormSlots, JSX.Element>>;
  pt?: {
    dialog?: DialogPresetOptions;
    form?: FormPresetOptions;
  };
}

export interface DialogFormSlots {
  header?: JSX.Element;
  formFooter?: JSX.Element;
}

export declare const DialogForm: <T extends Record<string, any> = any>(
  props: DialogFormProps<T> & { ref?: Ref<FormHandle<T>> },
) => JSX.Element;
