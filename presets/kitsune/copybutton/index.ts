import type { ResolvedPresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (options: ResolvedPresetOptions<'CopyButton'>) => ({
    className: [
      'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-xl',
      'border border-secondary-200',
      'hover:bg-secondary-50',
      'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
      'hover:scale-[1.02] active:scale-[0.97]',
      {
        'text-success-600 border-success-300': options.context.copied,
      },
    ],
  }),
  icon: (_options: ResolvedPresetOptions<'CopyButton'>) => ({
    className: ['shrink-0'],
  }),
};

export default preset;
