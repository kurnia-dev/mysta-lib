/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogProps } from '../dialog/Dialog.d';
import { FormProps } from '../form/Form.d';

export interface DialogFormProps<T extends Record<string, any>>
  extends Omit<DialogProps, 'slots'>,
    Omit<FormProps<T>, 'slots'> {
  closeOnSubmit?: boolean;
  slots?: Record<keyof DialogFormSlots, JSX.Element>;
}

export interface DialogFormSlots {
  header?: JSX.Element;
  formFooter?: JSX.Element;
}

export declare const DialogForm: <T extends Record<string, any> = any>(
  props: DialogFormProps<T>,
) => JSX.Element;
