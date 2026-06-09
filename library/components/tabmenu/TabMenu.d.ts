import { FC } from 'react';

import {
  PresetMethodAttributes,
  PresetOptions,
  ResolvedPresetOptions,
} from '../../hooks/useComponentPreset';
import { ModelValue } from '../../hooks/useModelValue';

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
  root?: PresetMethodAttributes<ResolvedPresetOptions<'TabMenu'>>;
  active?: PresetMethodAttributes<ResolvedPresetOptions<'TabMenu'>>;
  inactive?: PresetMethodAttributes<ResolvedPresetOptions<'TabMenu'>>;
  item?: PresetMethodAttributes<ResolvedPresetOptions<'TabMenu'>>;
  icon?: PresetMethodAttributes<ResolvedPresetOptions<'TabMenu'>>;
}

/**
 * TabMenu component for custom section.
 *
 * @component
 */
export const TabMenu: FC<TabMenuProps>;
