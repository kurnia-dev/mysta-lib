/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';

// Mobile PWA Components
import type {
  AppHeaderContext,
  AppHeaderProps,
} from 'lib/components/appheader/AppHeader.d';
import type { BottomNavigationProps } from 'lib/components/bottomnavigation/BottomNavigation.d';
import type {
  BottomSheetContext,
  BottomSheetProps,
} from 'lib/components/bottomsheet/BottomSheet.d';
import type { CalendarProps } from 'lib/components/calendar/Calendar.d';
import type { ChipContext, ChipProps } from 'lib/components/chip/Chip.d';
import type {
  FloatingActionButtonContext,
  FloatingActionButtonProps,
} from 'lib/components/floatingactionbutton/FloatingActionButton.d';
import type {
  ListItemContext,
  ListItemProps,
} from 'lib/components/listitem/ListItem.d';
import type {
  PullToRefreshContext,
  PullToRefreshProps,
} from 'lib/components/pulltorefresh/PullToRefresh.d';
import type {
  SearchBarContext,
  SearchBarProps,
} from 'lib/components/searchbar/SearchBar.d';
import type {
  StatCardContext,
  StatCardProps,
} from 'lib/components/statcard/StatCard.d';
// Phase D — previously unregistered components
import type { StampBadgeProps } from 'lib/components/stampbadge/StampBadge';
import type { TerminalEmbedProps } from 'lib/components/terminalembed/TerminalEmbed';
import type { SpinnerProps } from 'lib/components/spinner/Spinner';
import type { EmptyStateProps } from 'lib/components/emptystate/EmptyState';
import type { ProgressBarProps } from 'lib/components/progressbar/ProgressBar';
import type { HPBarProps } from 'lib/components/hpbar/HPBar';
import type { MultiPhaseToastProps } from 'lib/components/multiphasetoast/MultiPhaseToast';
import type { MobileActionBarProps } from 'lib/components/mobileactionbar/MobileActionBar';
import type { PaginationProps } from 'lib/components/paginationbar/Pagination';
import type { StepperProps } from 'lib/components/stepper/Stepper';
import type { TimelineProps } from 'lib/components/timeline/Timeline';
import type { ComparisonTableProps } from 'lib/components/comparisontable/ComparisonTable';
import type { ThemeSwitcherProps } from 'lib/components/themeswitcher/ThemeSwitcher';
import type { IconCardProps } from 'lib/components/iconcard/IconCard';
import type { PricingCardProps } from 'lib/components/pricingcard/PricingCard';
import type { NumberStepperProps } from 'lib/components/numberstepper/NumberStepper';
import type { SliderProps } from 'lib/components/slider/Slider';
import type { CopyButtonProps } from 'lib/components/copybutton/CopyButton';
import type { SlideoverProps } from 'lib/components/slideover/Slideover';
import type { KeyboardHelpProps } from 'lib/components/keyboardhelp/KeyboardHelp';
import type { CommandPaletteProps } from 'lib/components/commandpalette/CommandPalette';
import type { PolaroidCardProps } from 'lib/components/polaroidcard/PolaroidCard';
import type { PinnedPaperProps } from 'lib/components/pinnedpaper/PinnedPaper';
import type { StickyNoteProps } from 'lib/components/stickynote/StickyNote';
import type { SeparatorProps } from 'lib/components/separator/Separator.d';
import type { TypewriterProps } from 'lib/components/typewriter/Typewriter';
// Core Components
import type { BadgeProps } from 'lib/components/badge/Badge.d';
import type { ButtonContext, ButtonProps } from 'lib/components/button/Button.d';
import type { CardProps } from 'lib/components/card/Card.d';
import type {
  CheckboxContext,
  CheckboxProps,
} from 'lib/components/checkbox/Checkbox.d';
import type { DialogContext, DialogProps } from 'lib/components/dialog/Dialog.d';
import type {
  DropdownContext,
  DropdownProps,
} from 'lib/components/dropdown/Dropdown.d';
import type {
  FieldWrapperContext,
  FieldWrapperProps,
} from 'lib/components/fieldwrapper/FieldWrapper.d';
import type { FormProps } from 'lib/components/form/Form.d';
import type { BaseInputProps } from 'lib/components/private/BaseInput.d';
import type {
  RadioButtonContext,
  RadioButtonProps,
} from 'lib/components/radiobutton/RadioButton.d';
import type { SkeletonLoaderProps } from 'lib/components/skeletonloader/SkeletonLoader.d';
import type { TableProps } from 'lib/components/table/Table.d';
import type { TabMenuProps } from 'lib/components/tabmenu/TabMenu.d';
import type { ToastProps } from 'lib/components/toast/Toast.d';
import type {
  ToggleSwitchContext,
  ToggleSwitchProps,
} from 'lib/components/toggleswitch/ToggleSwitch.d';
import type { TooltipProps } from 'lib/components/tooltip/Tooltip.d';
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
  Table: {
    props: Partial<TableProps<any>>;
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
  // Phase D — newly registered components
  Spinner: {
    props: SpinnerProps;
    context: never;
  };
  EmptyState: {
    props: EmptyStateProps;
    context: never;
  };
  ProgressBar: {
    props: ProgressBarProps;
    context: never;
  };
  HPBar: {
    props: HPBarProps;
    context: never;
  };
  MultiPhaseToast: {
    props: MultiPhaseToastProps;
    context: { isDone: boolean };
  };
  MobileActionBar: {
    props: MobileActionBarProps;
    context: never;
  };
  Pagination: {
    props: PaginationProps;
    context: { isFirst: boolean; isLast: boolean };
  };
  Stepper: {
    props: StepperProps;
    context: never;
  };
  Timeline: {
    props: TimelineProps;
    context: never;
  };
  ComparisonTable: {
    props: ComparisonTableProps;
    context: never;
  };
  ThemeSwitcher: {
    props: ThemeSwitcherProps;
    context: never;
  };
  IconCard: {
    props: IconCardProps;
    context: { clickable: boolean };
  };
  PricingCard: {
    props: PricingCardProps;
    context: { selected: boolean };
  };
  NumberStepper: {
    props: NumberStepperProps;
    context: { canDecrement: boolean; canIncrement: boolean };
  };
  Slider: {
    props: SliderProps;
    context: { disabled: boolean };
  };
  CopyButton: {
    props: CopyButtonProps;
    context: { copied: boolean };
  };
  Slideover: {
    props: SlideoverProps;
    context: { open: boolean };
  };
  KeyboardHelp: {
    props: KeyboardHelpProps;
    context: never;
  };
  CommandPalette: {
    props: CommandPaletteProps;
    context: { open: boolean };
  };
  PolaroidCard: {
    props: PolaroidCardProps;
    context: { dragging: boolean };
  };
  PinnedPaper: {
    props: PinnedPaperProps;
    context: { dragging: boolean };
  };
  StickyNote: {
    props: StickyNoteProps;
    context: { dragging: boolean };
  };
  Separator: {
    props: SeparatorProps;
    context: never;
  };
  StampBadge: {
    props: StampBadgeProps;
    context: never;
  };
  TerminalEmbed: {
    props: TerminalEmbedProps;
    context: never;
  };
  Typewriter: {
    props: TypewriterProps;
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

export type ResolvedPresetOptions<C extends keyof ComponentPresetMap> =
  ComponentPresetMap[C] extends { context: never }
    ? { props: Partial<ComponentPresetMap[C]['props']> }
    : {
        context: ComponentPresetMap[C]['context'];
        props: Partial<ComponentPresetMap[C]['props']>;
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
  options: PresetOptions<C>,
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
