import { BadgePresetOptions } from 'lib/components/badge/Badge.d';
import { getSeverity } from 'lib/utils';

const preset: BadgePresetOptions = {
  root: ({ props }) => {
    const filledClass = getSeverity(props.severity, { background: 'medium' });
    const outlinedClass = getSeverity(props.severity, {
      ring: 'medium',
      background: 'light',
      text: 'medium',
    });
    return {
      className: [
        'relative',

        'rounded-full md:w-auto text-xs',

        // Alignments
        'items-center inline-flex gap-1 text-center align-bottom justify-center w-max',
        // {
        //   'flex-col':
        //     (props.iconPos === 'top' || props.iconPos === 'bottom') &&
        //     props.label,
        // },

        {
          'flex-row-reverse': props.iconPos === 'left',
        },

        // Sizes & Spacing
        'leading-none font-medium',

        // --- Severity Badge States ---
        'focus:outline-none focus:outline-offset-0',

        // Transitions
        'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',

        // Misc
        'cursor-auto overflow-hidden select-text',

        { 'ring-2': props.type === 'outlined' },

        // Badge
        '[&>[data-pc-name=badge]]:min-w-4 [&>[data-pc-name=badge]]:h-4 [&>[data-pc-name=badge]]:leading-4',

        {
          '!bg-secondary-800': props.type === 'dot',
          [filledClass]: props.type === 'filled',
          [outlinedClass]: props.type === 'outlined',
          '': props.type === 'outlined',
        },

        { 'px-2 py-1 gap-1': ['filled', 'outlined'].includes(props.type) },
        { 'px-2 py-2 gap-2': props.type === 'dot' },
        'flex items-center',

        { 'flex-row-reverse': props.iconPos === 'left' },
      ],
    };
  },
  label: ({ props }) => {
    const outlinedColor = getSeverity(props.severity, {
      outline: 'medium',
      text: 'medium',
      background: 'light',
    });
    return {
      className: [
        'duration-200',
        'font-medium text-xs',
        'leading-4 tracking-[0.02em]',
        { 'text-white': ['dot', 'filled'].includes(props.type) },
        { [outlinedColor]: props.type === 'outlined' },
      ],
    };
  },
  iconContainer: ({ props }) => {
    const bgColor = getSeverity(props.severity, {
      hoverBackground: 'dark',
    });
    return {
      className: ['!rounded-full', { [bgColor]: props.type === 'outlined' }],
    };
  },
  icon: ({ props }) => {
    const iconColor = getSeverity(props.severity, {
      text: 'dark',
      hoverText: 'light',
    });
    const dotColor = getSeverity(props.severity, {
      text: 'medium',
      hoverText: 'dark',
    });
    return {
      className: [
        'shrink-0 cursor-default rounded-full',
        {
          [iconColor]: ['filled', 'outlined'].includes(props.type),
          [dotColor]: props.type === 'dot',
        },
        // { 'brightness-75': props.type === 'filled' },
        {
          // 'hover:!brightness-200': ['filled', 'outlined'].includes(props.type),
        },
        { '!w-2 !h-2': props.type === 'dot' },
      ],
    };
  },
};

export default preset;
