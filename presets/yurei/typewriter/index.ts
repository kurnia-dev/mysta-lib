import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'Typewriter'>) => ({
    className: ['font-mono text-secondary-800 dark:text-secondary-100'],
  }),
  cursor: (_options: PresetOptions<'Typewriter'>) => ({
    className: ['text-primary-500 font-bold'],
  }),
};

export default preset;
