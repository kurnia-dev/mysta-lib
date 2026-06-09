import type { ResolvedPresetOptions } from '@mystaline/mysta-commons/hooks/useComponentPreset';

const preset = {
  root: (_options: ResolvedPresetOptions<'StickyNote'>) => ({
    className: [
      'absolute min-h-[120px] p-3 shadow-md select-none touch-none w-48',
    ],
  }),
  text: (_options: ResolvedPresetOptions<'StickyNote'>) => ({
    className: [
      'text-xs text-secondary-700 leading-relaxed whitespace-pre-wrap break-words',
    ],
  }),
};

export default preset;
