import { ReactNode } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';

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

  slots?: Partial<Record<keyof DialogSlots, JSX.Element>>;

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

export interface DialogContext {
  open?: boolean;
}

export interface DialogPresetOptions {
  overlay: PresetMethodAttributes<PresetOptions<'Dialog'>>;
  iconContainer: PresetMethodAttributes<PresetOptions<'Dialog'>>;
  container: PresetMethodAttributes<PresetOptions<'Dialog'>>;
  header: PresetAttributes;
  content: PresetAttributes;
}

export declare const Dialog: (props: DialogProps) => JSX.Element;
