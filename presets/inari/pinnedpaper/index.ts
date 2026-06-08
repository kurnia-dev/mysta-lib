import type { ResolvedPresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: ResolvedPresetOptions<'PinnedPaper'>) => ({
    className: ['absolute shadow-md select-none touch-none p-5 bg-amber-50'],
  }),
  pin: (_options: ResolvedPresetOptions<'PinnedPaper'>) => ({
    className: [
      'absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-sm ring-2 ring-red-300',
    ],
  }),
  title: (_options: ResolvedPresetOptions<'PinnedPaper'>) => ({
    className: [
      'text-xs font-semibold uppercase tracking-widest text-secondary-500 mb-3',
    ],
  }),
  content: (_options: ResolvedPresetOptions<'PinnedPaper'>) => ({
    className: ['text-xs text-secondary-700 leading-relaxed'],
  }),
};

export default preset;
