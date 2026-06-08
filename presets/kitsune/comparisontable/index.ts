import type { PresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = PresetOptions<'ComparisonTable'>;

const preset = {
  root: (_options: Options) => ({
    className: 'overflow-x-auto',
  }),
  table: (_options: Options) => ({
    className: 'w-full text-sm border-collapse',
  }),
  headerCell: (_options: Options) => ({
    className: [
      'text-left text-[0.7rem] font-semibold uppercase tracking-widest',
      'text-secondary-400 py-2 border-b border-secondary-100 pr-4',
    ],
  }),
  row: (_options: Options) => ({
    className: 'border-b border-secondary-50',
  }),
  featureCell: (_options: Options) => ({
    className: 'py-2.5 pr-4 font-light text-secondary-700',
  }),
  valueCell: (_options: Options) => ({
    className: 'py-2.5 text-center',
  }),
};

export default preset;
