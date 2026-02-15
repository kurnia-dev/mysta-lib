/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';

// Mobile PWA Components
import {
  AppHeaderContext,
  AppHeaderProps,
} from 'lib/components/appheader/AppHeader.d';
import { BottomNavigationProps } from 'lib/components/bottomnavigation/BottomNavigation.d';
import {
  BottomSheetContext,
  BottomSheetProps,
} from 'lib/components/bottomsheet/BottomSheet.d';
import { CalendarProps } from 'lib/components/calendar/Calendar.d';
import { ChipContext, ChipProps } from 'lib/components/chip/Chip.d';
import {
  FloatingActionButtonContext,
  FloatingActionButtonProps,
} from 'lib/components/floatingactionbutton/FloatingActionButton.d';
import {
  ListItemContext,
  ListItemProps,
} from 'lib/components/listitem/ListItem.d';
import {
  PullToRefreshContext,
  PullToRefreshProps,
} from 'lib/components/pulltorefresh/PullToRefresh.d';
import {
  SearchBarContext,
  SearchBarProps,
} from 'lib/components/searchbar/SearchBar.d';
import {
  StatCardContext,
  StatCardProps,
} from 'lib/components/statcard/StatCard.d';
// Core Components
import { BadgeProps } from 'lib/components/badge/Badge.d';
import { ButtonContext, ButtonProps } from 'lib/components/button/Button.d';
import { CardProps } from 'lib/components/card/Card.d';
import {
  CheckboxContext,
  CheckboxProps,
} from 'lib/components/checkbox/Checkbox.d';
import { DialogContext, DialogProps } from 'lib/components/dialog/Dialog.d';
import {
  DropdownContext,
  DropdownProps,
} from 'lib/components/dropdown/Dropdown.d';
import {
  FieldWrapperContext,
  FieldWrapperProps,
} from 'lib/components/fieldwrapper/FieldWrapper.d';
import { FormProps } from 'lib/components/form/Form.d';
import { BaseInputProps } from 'lib/components/private/BaseInput.d';
import {
  RadioButtonContext,
  RadioButtonProps,
} from 'lib/components/radiobutton/RadioButton.d';
import { SkeletonLoaderProps } from 'lib/components/skeletonloader/SkeletonLoader.d';
import { TabMenuProps } from 'lib/components/tabmenu/TabMenu.d';
import { ToastProps } from 'lib/components/toast/Toast.d';
import {
  ToggleSwitchContext,
  ToggleSwitchProps,
} from 'lib/components/toggleswitch/ToggleSwitch.d';
import { TooltipProps } from 'lib/components/tooltip/Tooltip.d';
import { useMystaLib } from 'lib/context/LibContext';

export type ClassValue = string | Record<string, boolean>;

export interface PresetReturn extends React.HTMLAttributes<HTMLElement> {
  'data-mc-name'?: string;
  'data-mc-section'?: string;
}

interface ComponentPresetMap {
  // Mobile PWA Components
  AppHeader: {
    props: AppHeaderProps;
    context: AppHeaderContext;
  };
  BottomNavigation: {
    props: BottomNavigationProps;
    context: never;
  };
  BottomSheet: {
    props: BottomSheetProps;
    context: BottomSheetContext;
  };
  Calendar: {
    props: CalendarProps;
    context: never;
  };
  Chip: {
    props: ChipProps;
    context: ChipContext;
  };
  FloatingActionButton: {
    props: FloatingActionButtonProps;
    context: FloatingActionButtonContext;
  };
  ListItem: {
    props: ListItemProps;
    context: ListItemContext;
  };
  PullToRefresh: {
    props: PullToRefreshProps;
    context: PullToRefreshContext;
  };
  SearchBar: {
    props: SearchBarProps;
    context: SearchBarContext;
  };
  StatCard: {
    props: StatCardProps;
    context: StatCardContext;
  };
  // Core Components
  Badge: {
    props: BadgeProps;
    context: never;
  };
  Button: {
    props: ButtonProps;
    context: ButtonContext;
  };
  Card: {
    props: CardProps;
    context: never;
  };
  Checkbox: {
    props: CheckboxProps;
    context: CheckboxContext;
  };
  Dialog: {
    props: DialogProps;
    context: DialogContext;
  };
  Dropdown: {
    props: DropdownProps;
    context: DropdownContext;
  };
  FieldWrapper: {
    props: FieldWrapperProps;
    context: FieldWrapperContext;
  };
  Form: {
    props: Partial<FormProps<Record<string, any>>>;
    context: never;
  };
  BaseInput: {
    props: BaseInputProps;
    context: never;
  };
  RadioButton: {
    props: RadioButtonProps;
    context: RadioButtonContext;
  };
  SkeletonLoader: {
    props: SkeletonLoaderProps;
    context: never;
  };
  ToggleSwitch: {
    props: ToggleSwitchProps;
    context: ToggleSwitchContext;
  };
  Tooltip: {
    props: TooltipProps;
    context: never;
  };
  Toast: {
    props: ToastProps;
    context: never;
  };
  TabMenu: {
    props: TabMenuProps;
    context: never;
  };
}

export type PresetOptions<C extends keyof ComponentPresetMap> =
  ComponentPresetMap[C] extends { context: never }
    ? {
        props?: Partial<ComponentPresetMap[C]['props']>;
      }
    : {
        context?: ComponentPresetMap[C]['context'];
        props?: Partial<ComponentPresetMap[C]['props']>;
      };

export interface PresetAttributes {
  className: ClassValue | ClassValue[];
  style?: React.HTMLAttributes<any>['style'];
  [key: string]: unknown;
}

export type PresetMethodAttributes<T> = (
  options: T,
) => PresetAttributes | undefined;

type ComponentPreset<
  C extends keyof ComponentPresetMap,
  T extends PresetOptions<C>,
> = {
  [slotName: string]: PresetMethodAttributes<T> | PresetAttributes;
};

export function useComponentPreset<C extends keyof ComponentPresetMap = 'Card'>(
  componentName: C,
  options?: PresetOptions<C>,
): Record<string, PresetReturn> {
  const { preset } = useMystaLib();
  const componentPreset = preset?.[componentName] as
    | ComponentPreset<C, PresetOptions<C>>
    | undefined;

  if (!componentPreset) return {};

  const result: Record<string, PresetReturn> = {};

  for (const slot in componentPreset) {
    const slotFn = componentPreset[slot];
    const slotAttrs = typeof slotFn === 'function' ? slotFn(options) : slotFn;
    const { className: cls, ...rest } = slotAttrs ?? {};

    result[slot] = {
      'className': clsx(cls),
      'data-mc-section': slot,
      ...rest,
    };

    if (slot === 'root') {
      result[slot]['data-mc-name'] = componentName.toLowerCase();
    }
  }

  return result;
}
