import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (_options: PresetOptions<'Table'>) => ({
    className: ['w-full overflow-hidden rounded-2xl border border-secondary-200 bg-surface'],
  }),
  table: (_options: PresetOptions<'Table'>) => ({
    className: ['w-full border-collapse text-sm'],
  }),
  header: (_options: PresetOptions<'Table'>) => ({
    className: ['bg-secondary-50 dark:bg-secondary-900'],
  }),
  headerRow: (_options: PresetOptions<'Table'>) => ({
    className: [],
  }),
  headerCell: (_options: PresetOptions<'Table'>) => ({
    className: [
      'px-4 py-3 text-left text-xs font-semibold text-secondary-500 uppercase tracking-wide',
      'border-b border-secondary-200',
    ],
  }),
  body: (_options: PresetOptions<'Table'>) => ({
    className: [],
  }),
  bodyRow: (_options: PresetOptions<'Table'>) => ({
    className: [
      'border-b border-secondary-100 last:border-0',
      'transition-colors duration-150 hover:bg-secondary-50 dark:hover:bg-secondary-800',
    ],
  }),
  bodyCell: (_options: PresetOptions<'Table'>) => ({
    className: ['px-4 py-3 text-secondary-700 dark:text-secondary-200'],
  }),
};

export default preset;
