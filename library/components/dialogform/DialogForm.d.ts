import { ReactNode } from 'react';
import { DialogProps } from '../dialog/Dialog.d';
import { FormProps } from '../form/Form.d';
import {
  UseFormGetValues,
  UseFormReset,
  UseFormResetField,
} from 'react-hook-form';

export interface DialogFormProps<T extends Record<string, any>>
  extends DialogProps,
    FormProps<T> {
  closeOnSubmit?: boolean;
}

export interface DialogFormSlots {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

export declare const DialogForm: <T extends Record<string, any> = any>(
  props: DialogFormProps<T>,
) => JSX.Element;
