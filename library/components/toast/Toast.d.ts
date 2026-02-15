import { FC, ReactNode } from 'react';

import {
  PresetAttributes,
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';

import { Severities } from '../../utils';
import { Icons } from '../icon/Icon.d';

/**
 * Props for the Toast component.
 *
 * @description This defines the props for the Toast component including its field name, label, and event handlers.
 */
export interface ToastProps extends ToastData {
  /** The name of the Toast */
  id?: string;
  onClose: (show: boolean) => void;
}

export interface ToastData {
  message?: string;
  icon?: Icons;
  severity?: Severities;

  action?: {
    label: string;
    command: () => void | Promise<void>;
  };
}

export interface ToastContextType {
  showToast: (data: ToastData) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}

export interface ToastPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'Toast'>>;
  description?: PresetAttributes;
}

/**
 * Toast component for custom section.
 *
 * @component
 */
export const Toast: FC<ToastProps>;
