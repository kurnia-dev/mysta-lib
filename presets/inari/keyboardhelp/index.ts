import type { ResolvedPresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  backdrop: (_options: ResolvedPresetOptions<'KeyboardHelp'>) => ({
    className: ['fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'],
  }),
  panel: (_options: ResolvedPresetOptions<'KeyboardHelp'>) => ({
    className: [
      'bg-surface rounded-2xl shadow-2xl border border-secondary-200',
      'w-full max-w-sm max-h-[80vh] overflow-y-auto p-5 space-y-5 pointer-events-auto',
    ],
  }),
  sectionTitle: (_options: ResolvedPresetOptions<'KeyboardHelp'>) => ({
    className: [
      'text-[0.65rem] font-semibold uppercase tracking-widest text-secondary-400 mb-2',
    ],
  }),
  keyBadge: (_options: ResolvedPresetOptions<'KeyboardHelp'>) => ({
    className: [
      'inline-flex items-center px-1.5 py-0.5 text-[0.7rem] font-mono',
      'bg-secondary-100 border border-secondary-200 rounded text-secondary-700',
    ],
  }),
  shortcutLabel: (_options: ResolvedPresetOptions<'KeyboardHelp'>) => ({
    className: ['text-xs text-secondary-600'],
  }),
};

export default preset;
