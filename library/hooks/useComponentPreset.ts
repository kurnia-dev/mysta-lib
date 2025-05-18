import clsx from 'clsx';

import { ButtonContext, ButtonProps } from 'lib/components/button/Button.d';
import { CardProps } from 'lib/components/card/Card.d';
import {
  CheckboxContext,
  CheckboxProps,
} from 'lib/components/checkbox/Checkbox.d';
import { DialogContext, DialogProps } from 'lib/components/dialog/Dialog.d';
import { DropdownProps } from 'lib/components/dropdown/Dropdown.d';
import {
  FieldWrapperContext,
  FieldWrapperProps,
} from 'lib/components/fieldwrapper/FieldWrapper.d';
import { BaseInputProps } from 'lib/components/private/BaseInput.d';
import {
  RadioButtonContext,
  RadioButtonProps,
} from 'lib/components/radiobutton/RadioButton.d';
import {
  ToggleSwitchContext,
  ToggleSwitchProps,
} from 'lib/components/toggleswitch/ToggleSwitch.d';
import { TooltipProps } from 'lib/components/tooltip/Tooltip.d';
import { useMystaLib } from 'lib/context/LibContext';

type ClassValue = string | Record<string, boolean>;

interface PresetReturn extends React.HTMLAttributes<HTMLElement> {
  'data-mc-name'?: string;
  'data-mc-section'?: string;
}

interface ComponentPresetMap {
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
    context: never;
  };
  FieldWrapper: {
    props: FieldWrapperProps;
    context: FieldWrapperContext;
  };
  BaseInput: {
    props: BaseInputProps;
    context: never;
  };
  RadioButton: {
    props: RadioButtonProps;
    context: RadioButtonContext;
  };
  ToggleSwitch: {
    props: ToggleSwitchProps;
    context: ToggleSwitchContext;
  };
  Tooltip: {
    props: TooltipProps;
    context: never;
  };
}

export type PresetOptions<C extends keyof ComponentPresetMap = 'Card'> =
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
  [key: string]: unknown;
}

export type PresetMethodAttributes<T> = (options: T) => PresetAttributes;

type ComponentPreset<T extends PresetOptions> = {
  [slotName: string]: PresetMethodAttributes<T> | PresetAttributes;
};

export function useComponentPreset<C extends keyof ComponentPresetMap = 'Card'>(
  componentName: C,
  options?: PresetOptions<C>,
): Record<string, PresetReturn> {
  const { preset } = useMystaLib();
  const componentPreset = preset?.[componentName] as
    | ComponentPreset<PresetOptions<C>>
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
