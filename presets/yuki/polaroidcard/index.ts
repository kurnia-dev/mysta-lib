import type { ResolvedPresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: ['absolute shadow-md select-none touch-none bg-surface'],
  }),
  tape: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: [
      'absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-yellow-100/80 rotate-[-3deg] opacity-70',
    ],
  }),
  photo: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: ['w-full aspect-square bg-secondary-100 overflow-hidden relative'],
  }),
  caption: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: ['mt-2 text-xs font-semibold text-secondary-800 truncate'],
  }),
  tagline: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: ['text-[0.6rem] text-secondary-400 truncate'],
  }),
  openButton: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: [
      'mt-1 text-[0.6rem] uppercase tracking-widest text-primary-500 font-mono hover:underline',
    ],
  }),
  stamp: (_options: ResolvedPresetOptions<'PolaroidCard'>) => ({
    className: [
      'absolute top-2 right-2 text-[0.55rem] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border-2 rotate-[-12deg] opacity-90',
    ],
  }),
};

export default preset;
