// types/components.d.ts (or you can name it types/icon.d.ts if it's specific)

import React, { FC } from 'react';

import { Severities } from '../../utils';

/**
 * Extendable icon set — you can augment this type to include more icons from your app
 *
 * Example (in your app):
 *
 * ```file-name.d.ts
 * import 'mysta-lib/components/icon/Icon.d';
 *
 * declare module 'mysta-lib/components/icon/Icon.d' {
 *   interface IconMap {
 *     github: true;
 *     customDashboardIcon: true;
 *   }
 * }
 * ```
 *
 * ```icons.css or main.css
 * .ic-github {
 *   --svg: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xNSAyMnYtNGE0LjggNC44IDAgMCAwLTEtMy41YzMgMCA2LTIgNi01LjVjLjA4LTEuMjUtLjI3LTIuNDgtMS0zLjVjLjI4LTEuMTUuMjgtMi4zNSAwLTMuNWMwIDAtMSAwLTMgMS41Yy0yLjY0LS41LTUuMzYtLjUtOCAwQzYgMiA1IDIgNSAyYy0uMyAxLjE1LS4zIDIuMzUgMCAzLjVBNS40IDUuNCAwIDAgMCA0IDljMCAzLjUgMyA1LjUgNiA1LjVjLS4zOS40OS0uNjggMS4wNS0uODUgMS42NVM4LjkzIDE3LjM4IDkgMTh2NCIvPjxwYXRoIGQ9Ik05IDE4Yy00LjUxIDItNS0yLTctMiIvPjwvZz48L3N2Zz4=');
 * }
 * ```
 *
 * Icon component will now accept `name="github"` or `name="customDashboardIcon"` with full type safety and autocompletion.
 */
export interface IconMap {
  'plus': true;
  'minus': true;
  'minus-4': true;
  'info': true;
  'eye-on': true;
  'eye-off': true;
  'check': true;
  'check-4': true;
  'x': true;
  'circle': true;
  'circle-fill': true;
  'edit': true;
  'edit-2': true;
  'edit-3': true;
  'trash': true;
  'trash-2': true;
  'settings': true;
  'settings-2': true;
  'user-circle': true;
  'sort-asc': true;
  'sort-desc': true;
  'chevron-down': true;
  'chevron-up': true;
  'menu': true;
  'users-round': true;
  'message-square-text': true;
  'double-check': true;
  'image': true;
  'users': true;
  'ban': true;
  'leave': true;
  'send': true;
  'unsend': true;
  'user-add': true;
  'user-remove': true;
  'user-check': true;
  'user-x': true;
  'user-pen': true;
  'copy': true;
  'search': true;
  'chevron-left': true;
  'chevron-right': true;
  'home': true;
  'list': true;
  'dollar': true;
  'bell': true;
  'user': true;
  'calendar': true;
  'filter': true;
  'refresh-cw': true;
  'alert-circle': true;
  'alert-triangle': true;
  'shopping-bag': true;
  'check-circle': true;
  'clock': true;
}

export type Icons = keyof IconMap;

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
   * Additional Tailwind/utility classes
   */
  tooltipClassName?: string;

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

/**
 * Icon component for custom section.
 *
 * @component
 */
export const Icon: FC<IconProps>;
