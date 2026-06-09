import { CalendarPresetOptions } from '@mystaline/mysta-commons/components/calendar/Calendar.d';

const preset: CalendarPresetOptions = {
  root: () => ({
    className: [
      'flex flex-col gap-4',
      'w-full max-w-sm mx-auto',
      'p-4',
      'bg-white rounded-2xl shadow-sm border border-secondary-100',
    ],
  }),
  header: () => ({
    className: ['flex items-center justify-between', 'mb-2'],
  }),
  title: () => ({
    className: ['text-lg font-semibold text-secondary-900'],
  }),
  navButton: () => ({
    className: [
      'p-2',
      'rounded-full',
      'text-secondary-500 hover:bg-secondary-100 hover:text-secondary-900',
      'transition-colors duration-200',
      'disabled:opacity-30 disabled:cursor-not-allowed',
    ],
  }),
  table: () => ({
    className: ['w-full', 'border-collapse'],
  }),
  thead: () => ({
    className: [],
  }),
  headCell: () => ({
    className: [
      'text-xs font-medium text-secondary-400 uppercase tracking-wider',
      'pb-2',
      'w-10 h-10', // Fixed width for alignment
    ],
  }),
  tbody: () => ({
    className: [],
  }),
  row: () => ({
    className: [],
  }),
  cell: () => ({
    className: [
      'p-0', // Remove padding to let button fill cell
      'text-center',
    ],
  }),
  day: () => ({
    className: [
      // Layout
      'w-10 h-10',
      'rounded-full',
      'flex items-center justify-center',
      'mx-auto',

      // text
      'text-sm font-medium text-secondary-700',

      // Interactive
      'hover:bg-secondary-100',
      'hover:scale-105',
      'active:scale-95',
      'transition-all duration-200 [cubic-bezier(0.34,1.56,0.64,1)]',

      // States via data attributes

      // Selected
      'data-[selected=true]:bg-primary-600',
      'data-[selected=true]:text-white',
      'data-[selected=true]:shadow-md',
      'data-[selected=true]:hover:bg-primary-700',

      // Today (if not selected)
      'data-[today=true]:text-primary-600',
      'data-[today=true]:font-bold',
      'data-[today=true]:bg-primary-50',
      // If selected AND today, selected wins (CSS specificity or order)

      // Disabled
      'data-[disabled=true]:opacity-30',
      'data-[disabled=true]:cursor-not-allowed',
      'data-[disabled=true]:hover:bg-transparent',

      // Other month
      'data-[other-month=true]:text-secondary-300',
      'data-[other-month=true]:hover:bg-transparent',
    ],
  }),
};

export default preset;
