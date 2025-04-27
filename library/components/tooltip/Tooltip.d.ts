import { FC, ReactNode } from 'react';

/**
 * Props for the Tooltip component.
 *
 * @description This defines the props for the Tooltip component including its field name, label, and event handlers.
 */
export interface TooltipProps {
  hide?: boolean;
  className?: string;

  /**
   * Tooltip position
   */
  position?: 'right' | 'top' | 'bottom' | 'left';

  content?: string | JSX.Element;
  children?: ReactNode;
}

/**
 * Tooltip component for custom section.
 *
 * @component
 */
export const Tooltip: FC<TooltipProps>;
