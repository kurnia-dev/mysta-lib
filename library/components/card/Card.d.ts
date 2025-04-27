import { FC, ReactNode } from 'react';

/**
 * Props for the Card component.
 *
 * @description This defines the props for the Card component including its field name, label, and event handlers.
 */
export interface CardProps {
  /** The header of the card */
  header?: string;
  /** The content of the card */
  content?: string;
  /** The footer of the card */
  footer?: string;

  slots?: Record<keyof CardSlots, JSX.Element>;
}

export interface CardSlots {
  header?: JSX.Element;
  content?: JSX.Element;
  footer?: JSX.Element;
}

/**
 * Card component for custom section.
 *
 * @component
 */
export const Card: FC<CardProps>;
