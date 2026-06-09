import type { PresetOptions } from '@mystaline/mysta-commons/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'EmptyState'>) => ({
    className: [
      'flex flex-col items-center justify-center gap-3 py-12 text-center',
    ],
  }),
  icon: (_options: PresetOptions<'EmptyState'>) => ({
    className: ['text-secondary-300 mb-1'],
  }),
  title: (_options: PresetOptions<'EmptyState'>) => ({
    className: ['text-sm font-medium text-secondary-600'],
  }),
  description: (_options: PresetOptions<'EmptyState'>) => ({
    className: ['text-xs text-secondary-400 max-w-xs'],
  }),
  action: (_options: PresetOptions<'EmptyState'>) => ({
    className: ['mt-2'],
  }),
};

export default preset;
