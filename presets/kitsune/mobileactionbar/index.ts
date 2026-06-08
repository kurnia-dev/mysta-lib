import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'MobileActionBar'>) => ({
    className: [
      'fixed bottom-0 left-0 right-0 z-40',
      'flex items-center justify-between gap-4 px-4 py-3',
      'bg-surface border-t border-secondary-200',
      'shadow-lg',
    ],
  }),
  info: (_options: PresetOptions<'MobileActionBar'>) => ({
    className: ['flex-1 min-w-0'],
  }),
  action: (_options: PresetOptions<'MobileActionBar'>) => ({
    className: ['shrink-0'],
  }),
};

export default preset;
