import { FC, ReactNode } from 'react';

/**
 * Props for the Slot component.
 *
 * @description This defines the props for the Slot component including its field name, label, and event handlers.
 */
export interface SlotProps {
  /** The name of the slot */
  name?: string;

  /** The slot content */
  slots?: Record<string, ReactNode>;

  children?: ReactNode;
}

/**
 * Slot component for custom section.
 *
 * @component
 */
export const Slot: FC<SlotProps>;
