import { ButtonPresetOptions } from 'lib/components/button/Button.d';

/* eslint-disable eqeqeq */
const preset: ButtonPresetOptions = {
  root: ({ props, context }) => {
    const severityMap = {
      base: {
        primary: 'text-white bg-primary-500 hover:bg-primary-600',
        secondary: 'text-white bg-secondary-500 hover:bg-secondary-600',
        danger: 'text-white bg-danger-500 hover:bg-danger-600',
        success: 'text-white bg-success-500 hover:bg-success-600',
        warning: 'text-white bg-warning-500 hover:bg-warning-600',
        info: 'text-white bg-info-500 hover:bg-info-600',
      },
      outlined: {
        primary: 'text-primary-500 ring-primary-500 hover:bg-primary-50',
        secondary:
          'text-secondary-500 ring-secondary-500 hover:bg-secondary-50',
        danger: 'text-danger-500 ring-danger-500 hover:bg-danger-50',
        success: 'text-success-500 ring-success-500 hover:bg-success-50',
        warning: 'text-warning-500 ring-warning-500 hover:bg-warning-50',
        info: 'text-info-500 ring-info-500 hover:bg-info-50',
      },
      text: {
        primary: 'text-primary-500 ring-transparent hover:bg-primary-50',
        secondary: 'text-secondary-500 ring-transparent hover:bg-secondary-50',
        danger: 'text-danger-500 ring-transparent hover:bg-danger-50',
        success: 'text-success-500 ring-transparent hover:bg-success-50',
        warning: 'text-warning-500 ring-transparent hover:bg-warning-50',
        info: 'text-info-500 ring-transparent hover:bg-info-50',
      },
    };

    const isOutlined = props.outlined ? 'outlined' : 'base';

    // icon-only (no label) → ghost/text style by default unless explicitly outlined/raised
    const iconOnly = !props.label;
    const severityType =
      props.text || (iconOnly && !props.outlined && !props.raised)
        ? 'text'
        : isOutlined;

    const severityClass = severityMap[severityType][props.severity];

    return {
      className: [
        'relative',

        'rounded-full md:w-auto text-xs',
        severityClass,

        // Alignments
        'items-center inline-flex text-center align-bottom justify-center w-max',
        // {
        //   'flex-col':
        //     (props.iconPos === 'top' || props.iconPos === 'bottom') &&
        //     props.label,
        // },

        // props.iconPos,
        // {
        //   'flex-row-reverse': props.iconPos === 'right',
        // },

        // Sizes & Spacing
        'leading-none font-medium',
        {
          '!text-xs py-[5px] px-4 gap-1': !!props.label,
        },

        // Ring
        'ring-inset ring-1',

        // Shapes
        { 'shadow-lg': props.raised },
        {
          'shadow-sm':
            !props.raised && !props.outlined && !props.text,
        },

        // Scale interactions
        'hover:scale-[1.02] active:scale-[0.97]',

        // --- Severity Button States ---
        'focus:outline-none focus:outline-offset-0',

        // Disabled
        {
          'pointer-events-none cursor-default': context.disabled,
          '!text-secondary-300':
            context.disabled && (props.outlined || props.text),
          '!ring-secondary-300': context.disabled && props.outlined,
          '!bg-secondary-300 !text-white !ring-0':
            context.disabled && !props.outlined && !props.text,
        },

        // Transitions
        'transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',

        // Misc
        'cursor-pointer overflow-hidden select-none',

        // Badge
        '[&>[data-pc-name=badge]]:min-w-4 [&>[data-pc-name=badge]]:h-4 [&>[data-pc-name=badge]]:leading-4',
      ],
      style: {
        height:
          typeof props.height === 'number' ? `${props.height}px` : props.height,
        // icon-only: width = height to keep it square; labeled: use width prop
        width: !props.label
          ? (typeof props.height === 'number' ? `${props.height}px` : props.height)
          : (typeof props.width === 'number' ? `${props.width}px` : props.width),
        // icon-only: scale font-size so the icon tracks height (~46% ratio matches text-xs at 26px)
        fontSize: !props.label && typeof props.height === 'number'
          ? `${Math.round(props.height * 0.46)}px`
          : undefined,
      },
    };
  },
  label: ({ props }) => ({
    className: [
      'duration-200',
      'font-medium text-xs',
      'leading-4 tracking-[0.02em]',
      // {
      //   'hover:underline': props.link,
      // },
      { 'flex-1': props.label !== null, 'invisible w-0': props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    className: [
      'shrink-0',
      // filled button → white icon; ghost/text/icon-only → inherit severity color from root
      { 'text-white': !!props.label && !props.text && !props.outlined },
    ],
  }),
  loadingIcon: () => ({
    className: [
      'h-4 w-4',
      'mx-0',
      // {
      //   'mr-2': props.iconPos === 'left' && props.label != null,
      //   'ml-2 order-1': props.iconPos === 'right' && props.label != null,
      //   'mb-2': props.iconPos === 'top' && props.label != null,
      //   'mt-2': props.iconPos === 'bottom' && props.label != null,
      // },
      'animate-spin',
    ],
  }),
  badge: () => ({
    className: [
      // {
      //   'ml-2 w-4 h-4 leading-none flex items-center justify-center':
      //     props.badge,
      // },
    ],
  }),
};

export default preset;
