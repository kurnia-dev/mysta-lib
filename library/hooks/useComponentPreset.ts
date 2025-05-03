/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';

import { useMystaLib } from 'lib/context/LibContext';

interface PresetAttributes extends React.HTMLAttributes<HTMLElement> {
  'data-mc-section'?: string;
}

type ClassValue =
  | string
  | undefined
  | null
  | false
  | ClassValue[]
  | Record<string, boolean>;

interface SlotReturn {
  className?: ClassValue;
  [key: string]: any;
}

type SlotFunction<T> = (options: T) => SlotReturn;

type ComponentPreset<T> = {
  [slotName: string]: SlotFunction<T>;
};

export function useComponentPreset<T = Record<string, any>>(
  componentName: string,
  options?: T,
): Record<string, PresetAttributes> {
  const { preset } = useMystaLib();
  const componentPreset = preset?.[componentName] as
    | ComponentPreset<T>
    | undefined;

  if (!componentPreset) return {};

  const result: Record<string, PresetAttributes> = {};

  for (const slot in componentPreset) {
    const slotFn = componentPreset[slot];
    if (typeof slotFn === 'function') {
      const slotAttrs = slotFn(options);
      const { className: cls, ...rest } = slotAttrs ?? {};

      result[slot] = {
        'data-mc-section': slot,
        'className': clsx(cls),
        ...rest,
      };
    } else {
      result[slot] = slotFn;
    }
  }

  return result;
}
