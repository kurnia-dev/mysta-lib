export default {
  root: ({ props, context }) => ({
    className: [
      'relative',

      // Alignments
      'items-center inline-flex text-center align-bottom justify-center w-max',
      {
        'flex-col':
          (props.iconPos === 'top' || props.iconPos === 'bottom') &&
          props.label,
      },

      props.iconPos,
      {
        'flex-row-reverse': props.iconPos === 'right',
      },

      // Sizes & Spacing
      'leading-none font-medium rounded',
      {
        '!text-xs px-3 py-[5px]': props.size === null && props.label,
        '!text-xs !p-0.5': props.size === 'small',
        'text-xl py-3 px-4': props.size === 'large',
      },
      { 'gap-1': props.label !== null },

      {
        'p-[5px] w-max':
          props.label === null && props.icon && props.size === null,
      },
      {
        '!p-0.5 !h-4 !w-4':
          props.label === null && props.icon && props.size === 'small',
      },

      // Ring
      'ring-inset ring-1 ',

      // Shapes
      { 'shadow-lg': props.raised },

      // Link Button
      {
        'text-grayscale-900-600 bg-transparent ring-transparent': props.link,
      },

      // Plain Button
      {
        'text-white bg-gray-500 ring-1 ring-gray-500':
          props.plain && !props.outlined && !props.text,
      },
      // Plain Text Button
      { 'text-primary-500': props.plain && props.text },
      // Plain Outlined Button
      {
        'text-primary-500 ring-1 ring-gray-500': props.plain && props.outlined,
      },

      // Text Button
      { 'bg-transparent ring-transparent': props.text && !props.plain },

      // Outlined Button
      { 'bg-transparent ring-1': props.outlined && !props.plain },

      // --- Severity Buttons ---

      // --- Severity Button States ---
      'focus:outline-none focus:outline-offset-0',

      // Link
      { 'focus:ring-grayscale-900': props.link },

      // Plain
      {
        'hover:bg-gray-600 hover:ring-gray-600':
          props.plain && !props.outlined && !props.text,
      },

      // Disabled
      {
        'pointer-events-none cursor-default': context.disabled,
        '!text-general-300': context.disabled && (props.outlined || props.text),
        '!ring-secondary-300': context.disabled && props.outlined,
        '!bg-general-300 !text-white !ring-0':
          context.disabled && !props.outlined && !props.text,
      },

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer overflow-hidden select-none',

      // Badge
      '[&>[data-pc-name=badge]]:min-w-4 [&>[data-pc-name=badge]]:h-4 [&>[data-pc-name=badge]]:leading-4',
    ],
  }),
  label: ({ props }) => ({
    className: [
      'duration-200',
      'font-medium text-xs',
      'leading-4 tracking-[0.02em]',
      {
        'hover:underline': props.link,
      },
      { 'flex-1': props.label !== null, 'invisible w-0': props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    className: ['shrink-0', { '!h-3 !w-3': props.size === 'small' }],
  }),
  loadingIcon: ({ props }) => ({
    className: [
      'h-4 w-4',
      'mx-0',
      {
        'mr-2': props.iconPos === 'left' && props.label != null,
        'ml-2 order-1': props.iconPos === 'right' && props.label != null,
        'mb-2': props.iconPos === 'top' && props.label != null,
        'mt-2': props.iconPos === 'bottom' && props.label != null,
      },
      'animate-spin',
    ],
  }),
  badge: ({ props }) => ({
    className: [
      {
        'ml-2 w-4 h-4 leading-none flex items-center justify-center':
          props.badge,
      },
    ],
  }),
};
