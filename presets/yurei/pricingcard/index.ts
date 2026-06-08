import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (options: PresetOptions<'PricingCard'>) => {
    const selected = (options as { context?: { selected: boolean } }).context?.selected ?? false;
    return {
      className: selected
        ? [
            'relative rounded-2xl p-5',
            'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
            'bg-primary-600 text-white shadow-lg ring-2 ring-primary-400 scale-[1.02]',
          ]
        : [
            'relative rounded-2xl p-5',
            'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
            'bg-surface border border-secondary-200',
            'hover:shadow-md hover:scale-[1.01]',
          ],
    };
  },
  label: (options: PresetOptions<'PricingCard'>) => {
    const selected = (options as { context?: { selected: boolean } }).context?.selected ?? false;
    return {
      className: selected
        ? ['text-sm font-semibold text-primary-200']
        : ['text-sm font-semibold text-secondary-500'],
    };
  },
  price: (options: PresetOptions<'PricingCard'>) => {
    const selected = (options as { context?: { selected: boolean } }).context?.selected ?? false;
    return {
      className: selected
        ? ['text-3xl font-bold tracking-tight text-white']
        : ['text-3xl font-bold tracking-tight text-secondary-900'],
    };
  },
  description: (options: PresetOptions<'PricingCard'>) => {
    const selected = (options as { context?: { selected: boolean } }).context?.selected ?? false;
    return {
      className: selected
        ? ['text-xs text-primary-200']
        : ['text-xs text-secondary-400'],
    };
  },
  features: (_options: PresetOptions<'PricingCard'>) => ({
    className: ['mt-4 space-y-1'],
  }),
  featureItem: (options: PresetOptions<'PricingCard'>) => {
    const selected = (options as { context?: { selected: boolean } }).context?.selected ?? false;
    return {
      className: selected
        ? ['flex items-center gap-2 text-xs text-primary-100']
        : ['flex items-center gap-2 text-xs text-secondary-600'],
    };
  },
};

export default preset;
