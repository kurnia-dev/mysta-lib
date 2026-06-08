import type { PresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = PresetOptions<'Timeline'>;

const preset = {
  root: (_options: Options) => ({
    className: 'flex flex-col gap-4',
  }),
  item: (_options: Options) => ({
    className: 'flex gap-3',
  }),
  dotCurrent: (_options: Options) => ({
    className: [
      'w-2.5 h-2.5 rounded-full shrink-0 mt-1',
      'bg-success-500 ring-2 ring-success-200',
    ],
  }),
  dotPast: (_options: Options) => ({
    className: [
      'w-2.5 h-2.5 rounded-full shrink-0 mt-1',
      'bg-secondary-300',
    ],
  }),
  connector: (_options: Options) => ({
    className: 'w-px flex-1 bg-secondary-200 mt-1',
  }),
  period: (_options: Options) => ({
    className: 'text-[0.65rem] font-mono text-secondary-400 mb-0.5',
  }),
  role: (_options: Options) => ({
    className: 'text-sm font-medium text-secondary-800',
  }),
  description: (_options: Options) => ({
    className: 'text-xs text-secondary-400 mt-1',
  }),
  bullet: (_options: Options) => ({
    className: 'text-xs text-secondary-400',
  }),
  tag: (_options: Options) => ({
    className: 'text-[0.6rem] font-medium px-1.5 py-0.5 rounded-full bg-secondary-100 text-secondary-500',
  }),
};

export default preset;
