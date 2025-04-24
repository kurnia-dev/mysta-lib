import { ReactNode } from 'react';

export interface DialogProps {
  /**
   * Dialog children
   */
  children?: ReactNode;

  visible?: boolean;

  useCloseIcon?: boolean;
  closeOnEscape?: boolean;
  closeOnBlur?: boolean;

  defaultVisibility?: boolean;

  header: string;

  modal?: boolean;

  slots?: Record<keyof DialogSlots, JSX.Element>;

  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';

  containerClass?: string;
  headerClass?: string;
  contentClass?: string;

  onVisibleChange?: (e: boolean) => void;
}

export interface DialogSlots {
  header?: JSX.Element;
  content?: JSX.Element;
  footer?: JSX.Element;
}

export declare const Dialog: (props: DialogProps) => JSX.Element;
