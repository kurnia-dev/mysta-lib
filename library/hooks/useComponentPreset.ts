import clsx from 'clsx';
import { useMystaLib } from 'lib/context/LibContext';

interface PresetAttributes extends React.HTMLAttributes<HTMLElement> {
  'data-pc-section'?: string;
}

type ClassValue =
  | string
  | undefined
  | null
  | false
  | ClassValue[]
  | Record<string, boolean>;

interface SlotReturn {
  class?: ClassValue;
  [key: string]: any;
}

type SlotFunction = (options: any) => SlotReturn;

type ComponentPreset = {
  [slotName: string]: SlotFunction;
};

export function useComponentPreset<T = any>(
  componentName: string,
  options?: T,
): Record<string, PresetAttributes> {
  const { preset } = useMystaLib();
  const componentPreset = preset?.[componentName] as
    | ComponentPreset
    | undefined;

  if (!componentPreset) return {};

  const result: Record<string, PresetAttributes> = {};

  for (const slot in componentPreset) {
    const slotFn = componentPreset[slot];
    if (typeof slotFn === 'function') {
      const slotAttrs = slotFn(options);
      const { className: cls, ...rest } = slotAttrs ?? {};

      result[slot] = {
        'data-pc-section': slot,
        'className': clsx(cls),
        ...rest,
      };
    } else {
      result[slot] = slotFn;
    }
  }

  return result;
}
