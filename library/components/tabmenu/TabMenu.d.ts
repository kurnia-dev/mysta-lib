import { FC } from 'react';

import {
  PresetMethodAttributes,
  PresetOptions,
} from 'lib/hooks/useComponentPreset';
import { ModelValue } from 'lib/hooks/useModelValue';

import { Icons } from '../icon/Icon.d';

export interface TabMenuItem {
  label: string;
  route?: string;
  icon?: Icons;
}

/**
 * Props for the TabMenu component.
 *
 * @description This defines the props for the TabMenu component including its field name, label, and event handlers.
 */
export interface TabMenuProps {
  activeIndex: ModelValue;
  menus?: TabMenuItem[];
  pt?: TabMenuPresetOptions;
  type?: 'pill' | 'box' | 'thin-underline' | 'bold-underline' | 'segmented';
}

export interface TabMenuPresetOptions {
  root?: PresetMethodAttributes<PresetOptions<'TabMenu'>>;
  active?: PresetMethodAttributes<PresetOptions<'TabMenu'>>;
  inactive?: PresetMethodAttributes<PresetOptions<'TabMenu'>>;
  item?: PresetMethodAttributes<PresetOptions<'TabMenu'>>;
  icon?: PresetMethodAttributes<PresetOptions<'TabMenu'>>;
}

/**
 * TabMenu component for custom section.
 *
 * @component
 */
export const TabMenu: FC<TabMenuProps>;
