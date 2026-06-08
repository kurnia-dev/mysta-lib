import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'Slider'>) => ({
    className: ['w-full'],
  }),
  tooltip: (_options: PresetOptions<'Slider'>) => ({
    className: [
      'pointer-events-none absolute -top-9',
      'text-xs font-bold px-2 py-1 rounded-lg',
      'bg-secondary-900 text-white',
      'whitespace-nowrap',
      'opacity-0 transition-opacity duration-150',
    ],
  }),
  ticks: (_options: PresetOptions<'Slider'>) => ({
    className: ['flex justify-between mt-2'],
  }),
};

export default preset;
