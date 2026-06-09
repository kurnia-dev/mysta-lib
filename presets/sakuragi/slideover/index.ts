import type { ResolvedPresetOptions } from '@mystaline/mysta-commons/hooks/useComponentPreset';

const preset = {
  backdrop: (_options: ResolvedPresetOptions<'Slideover'>) => ({
    className: [
      'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
    ],
  }),
  panel: (_options: ResolvedPresetOptions<'Slideover'>) => ({
    className: [
      'fixed top-0 bottom-0 z-50 flex flex-col bg-surface shadow-2xl',
      'transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
    ],
  }),
  closeButton: (_options: ResolvedPresetOptions<'Slideover'>) => ({
    className: [
      'absolute top-4 right-4 p-1.5 rounded-xl hover:bg-secondary-100 transition-colors text-secondary-500',
    ],
  }),
  content: (_options: ResolvedPresetOptions<'Slideover'>) => ({
    className: ['flex-1 overflow-y-auto p-6 pt-12'],
  }),
};

export default preset;
