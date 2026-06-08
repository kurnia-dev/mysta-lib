import type { PresetOptions } from '../../../library/hooks/useComponentPreset';

type Options = PresetOptions<'Stepper'>;

const preset = {
  root: (_options: Options) => ({
    className: 'flex items-center gap-0',
  }),
  step: (_options: Options) => ({
    className: 'flex items-center',
  }),
  activeIndicator: (_options: Options) => ({
    className: [
      'w-5 h-5 rounded-full flex items-center justify-center',
      'text-[0.65rem] font-bold shrink-0',
      'transition-all duration-300',
      'bg-primary-600 text-white scale-110',
    ],
  }),
  completedIndicator: (_options: Options) => ({
    className: [
      'w-5 h-5 rounded-full flex items-center justify-center',
      'text-[0.65rem] font-bold shrink-0',
      'transition-all duration-300',
      'bg-success-500 text-white',
    ],
  }),
  pendingIndicator: (_options: Options) => ({
    className: [
      'w-5 h-5 rounded-full flex items-center justify-center',
      'text-[0.65rem] font-bold shrink-0',
      'transition-all duration-300',
      'bg-secondary-100 text-secondary-400',
    ],
  }),
  label: (_options: Options) => ({
    className: [
      'text-xs font-medium transition-colors duration-200 hidden sm:block',
      'text-secondary-400',
    ],
  }),
  activeLabel: (_options: Options) => ({
    className: [
      'text-xs font-medium transition-colors duration-200 hidden sm:block',
      'text-secondary-900',
    ],
  }),
  connector: (_options: Options) => ({
    className: [
      'w-6 sm:w-10 h-px mx-2 shrink-0 transition-colors duration-300',
      'bg-secondary-200',
    ],
  }),
  completedConnector: (_options: Options) => ({
    className: [
      'w-6 sm:w-10 h-px mx-2 shrink-0 transition-colors duration-300',
      'bg-success-500/40',
    ],
  }),
};

export default preset;
