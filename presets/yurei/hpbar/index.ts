import type { PresetOptions } from '@mystaline/mysta-commons/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'HPBar'>) => ({
    className: ['w-full'],
  }),
  track: (_options: PresetOptions<'HPBar'>) => ({
    className: [
      'relative w-full h-3',
      'bg-secondary-100 rounded-full overflow-hidden',
    ],
  }),
  label: (_options: PresetOptions<'HPBar'>) => ({
    className: ['flex items-center justify-between mb-1'],
  }),
  value: (_options: PresetOptions<'HPBar'>) => ({
    className: ['text-xs font-mono text-secondary-500'],
  }),
};

export default preset;
