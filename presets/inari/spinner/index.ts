import type { PresetOptions } from '@mystaline/mysta-commons/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'Spinner'>) => ({
    className: [
      'border-primary-500 border-t-transparent',
      'animate-spin',
    ],
  }),
};

export default preset;
