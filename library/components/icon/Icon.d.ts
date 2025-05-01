// types/components.d.ts (or you can name it types/icon.d.ts if it's specific)

import { Severities } from 'lib/utils';
import React from 'react';

export type Icons =
  | 'plus'
  | 'minus'
  | 'minus-4'
  | 'info'
  | 'eye-on'
  | 'eye-off'
  | 'check'
  | 'check-4'
  | 'x'
  | 'circle'
  | 'circle-fill'
  | 'edit'
  | 'edit-2'
  | 'edit-3'
  | 'trash'
  | 'trash-2'
  | 'settings'
  | 'settings-2'
  | 'user-circle'
  | 'sort-asc'
  | 'sort-desc';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Icon class like 'plus', 'minus', etc.
   * Should be defined with a `--svg` mask in CSS.
   */
  name: Icons;

  /**
   * Additional Tailwind/utility classes
   */
  className?: string;

  /**
   * Tooltip text
   */
  tooltip?: string;

  /**
   * Tooltip position
   */
  tooltipPos?: 'right' | 'top' | 'bottom' | 'left';

  severity?: Severities;
}
