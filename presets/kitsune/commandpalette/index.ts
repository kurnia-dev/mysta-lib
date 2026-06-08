import type { ResolvedPresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  backdrop: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: [
      'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
    ],
  }),
  panel: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: [
      'bg-surface rounded-2xl border border-secondary-200 shadow-2xl',
      'w-full max-w-lg overflow-hidden',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
    ],
  }),
  input: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: [
      'w-full px-4 py-3 text-sm bg-transparent border-b border-secondary-200',
      'text-secondary-800 placeholder:text-secondary-400 outline-none',
    ],
  }),
  results: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: ['max-h-72 overflow-y-auto py-1'],
  }),
  result: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: [
      'w-full flex items-center justify-between px-4 py-2.5 text-sm',
      'text-secondary-700 hover:bg-secondary-50 transition-colors',
    ],
  }),
  activeResult: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: ['bg-primary-50 text-primary-800'],
  }),
  resultHint: (_options: ResolvedPresetOptions<'CommandPalette'>) => ({
    className: ['text-[0.7rem] text-secondary-400'],
  }),
};

export default preset;
