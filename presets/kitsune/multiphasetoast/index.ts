import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'MultiPhaseToast'>) => ({
    className: [
      'w-full max-w-xs rounded-2xl shadow-xl',
      'border border-secondary-200 bg-surface',
      'p-4 space-y-3',
    ],
  }),
  header: (_options: PresetOptions<'MultiPhaseToast'>) => ({
    className: ['flex items-start justify-between gap-2'],
  }),
  title: (_options: PresetOptions<'MultiPhaseToast'>) => ({
    className: ['text-sm font-semibold text-secondary-800'],
  }),
  closeButton: (_options: PresetOptions<'MultiPhaseToast'>) => ({
    className: [
      'p-0.5 rounded-lg',
      'hover:bg-secondary-100 transition-colors',
      'text-secondary-400',
    ],
  }),
  phaseLabel: (_options: PresetOptions<'MultiPhaseToast'>) => ({
    className: ['text-xs text-secondary-500'],
  }),
};

export default preset;
