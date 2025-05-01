import { ReactNode } from 'react';

export interface PopoverProps {
  /**
   * Popover children
   */
  children?: ReactNode;
  content?: string | JSX.Element;

  visible?: boolean;

  closeOnBlur?: boolean;

  /**
   * Keep this props true if you want this popover always rendered (in case you want to give transition/animation)
   * Please take a note that this will cause Popover to lost its native behavior of visibility (you need to give your own visibility styling behavior; e.g: opacity)
   *
   * @default undefined
   */
  alwaysRender?: true;

  defaultVisibility?: boolean;

  triggerOnMouseOver?: boolean;

  onVisibleChange?: (e: boolean) => void;
}

export declare const Popover: (props: PopoverProps) => JSX.Element;
