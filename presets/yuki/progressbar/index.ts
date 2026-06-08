import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'ProgressBar'>) => ({
    className: ['w-full'],
  }),
  track: (_options: PresetOptions<'ProgressBar'>) => ({
    className: ['w-full h-2 bg-secondary-100 rounded-full overflow-hidden'],
  }),
  fill: (_options: PresetOptions<'ProgressBar'>) => ({
    className: [
      'h-full rounded-full',
      'bg-primary-500',
      'transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
    ],
  }),
  label: (_options: PresetOptions<'ProgressBar'>) => ({
    className: ['flex justify-between mb-1'],
  }),
  labelText: (_options: PresetOptions<'ProgressBar'>) => ({
    className: ['text-xs text-secondary-500'],
  }),
  labelValue: (_options: PresetOptions<'ProgressBar'>) => ({
    className: ['text-xs text-secondary-500'],
  }),
};

export default preset;
