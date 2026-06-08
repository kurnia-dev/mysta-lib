import { ReactNode } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';

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

  fullHeight?: boolean;

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

  pt?: DialogPresetOptions;
}

export interface DialogSlots {
  header?: JSX.Element;
  content?: JSX.Element;
  footer?: JSX.Element;
}

export interface DialogContext {
  open?: boolean;
  fullHeight: boolean;
}

export interface DialogPresetOptions {
  overlay?: PresetMethodAttributes<ResolvedPresetOptions<'Dialog'>>;
  iconContainer?: PresetMethodAttributes<ResolvedPresetOptions<'Dialog'>>;
  container?: PresetMethodAttributes<ResolvedPresetOptions<'Dialog'>>;
  header?: PresetMethodAttributes<ResolvedPresetOptions<'Dialog'>>;
  content?: PresetMethodAttributes<ResolvedPresetOptions<'Dialog'>>;
}

export declare const Dialog: (props: DialogProps) => JSX.Element;
