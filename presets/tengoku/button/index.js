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

      // Secondary Button
      {
        'text-white':
          !props.link &&
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-grayscale-900':
          !props.link &&
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-grayscale-900':
          !props.link &&
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Secondary Text Button
      {
        'text-grayscale-900':
          props.text && props.severity === 'secondary' && !props.plain,
      },
      // Secondary Outlined Button
      {
        'text-grayscale-900 ring-1 ring-grayscale-900':
          props.outlined && props.severity === 'secondary' && !props.plain,
      },

      // Primary Blue Button
      {
        'text-white':
          (props.severity == null || props.severity === 'primary') &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-primary-500':
          (props.severity == null || props.severity === 'primary') &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-primary-500':
          (props.severity == null || props.severity === 'primary') &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Primary Blue Text Button
      {
        'text-primary-500':
          props.text &&
          (props.severity == null || props.severity === 'primary') &&
          !props.plain,
      },
      // Primary Blue Outlined Button
      {
        'text-primary-500 ring-1 ring-primary-500 hover:bg-primary-500/20':
          props.outlined &&
          (props.severity == null || props.severity === 'primary') &&
          !props.plain,
      },

      // Success Button
      {
        'text-white':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-success-500':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-success-500':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Success Text Button
      {
        'text-success-500':
          props.text && props.severity === 'success' && !props.plain,
      },
      // Success Outlined Button
      {
        'text-success-500 ring-1 ring-success-500 hover:bg-success-300/20':
          props.outlined && props.severity === 'success' && !props.plain,
      },

      // Info Button
      {
        'text-white':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-blue-500':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-blue-500':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Info Text Button
      {
        'text-blue-500':
          props.text && props.severity === 'info' && !props.plain,
      },
      // Info Outlined Button
      {
        'text-blue-500 ring-1 ring-blue-500 hover:bg-blue-300/20 ':
          props.outlined && props.severity === 'info' && !props.plain,
      },

      // Warning Button
      {
        'text-white':
          props.severity === 'warning' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-warning-500':
          props.severity === 'warning' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-warning-500':
          props.severity === 'warning' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Warning Text Button
      {
        'text-warning-500':
          props.text && props.severity === 'warning' && !props.plain,
      },
      // Warning Outlined Button
      {
        'text-warning-500 ring-1 ring-warning-500 hover:bg-warning-300/20':
          props.outlined && props.severity === 'warning' && !props.plain,
      },

      // Help Button
      {
        'text-white':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-purple-500':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-purple-500':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Help Text Button
      {
        'text-purple-500':
          props.text && props.severity === 'help' && !props.plain,
      },
      // Help Outlined Button
      {
        'text-purple-500 ring-1 ring-purple-500 hover:bg-purple-300/20':
          props.outlined && props.severity === 'help' && !props.plain,
      },

      // Danger Button
      {
        'text-white':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-danger-500':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-danger-500':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Danger Text Button
      {
        'text-danger-500':
          props.text && props.severity === 'danger' && !props.plain,
      },
      // Danger Outlined Button
      {
        'text-danger-500 ring-1 ring-danger-500 hover:bg-danger-300/20':
          props.outlined && props.severity === 'danger' && !props.plain,
      },
      // Contrast Button
      {
        'text-white':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'bg-surface-900':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        'ring-1 ring-surface-900':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Contrast Text Button
      {
        'text-surface-900':
          props.text && props.severity === 'contrast' && !props.plain,
      },
      // Contrast Outlined Button
      {
        'text-surface-900 ring-1 ring-surface-900':
          props.outlined && props.severity === 'contrast' && !props.plain,
      },

      // --- Severity Button States ---
      'focus:outline-none focus:outline-offset-0',

      // Link
      { 'focus:ring-grayscale-900': props.link },

      // Plain
      {
        'hover:bg-gray-600 hover:ring-gray-600':
          props.plain && !props.outlined && !props.text,
      },
      // Text & Outlined Button
      {
        'hover:bg-primary-500/20':
          props.plain && (props.text || props.outlined),
      },

      // Secondary
      {
        'hover:bg-grayscale-900/[8%] active:bg-grayscale-900/[12%] ':
          props.severity === 'secondary',
        'hover:shadow-hover active:!shadow-none hover:!bg-grayscale-900/90 active:bg-grayscale-900/90 hover:ring-0':
          !props.link &&
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Primary
      {
        'hover:bg-primary-500/[8%] active:bg-primary-500/[12%] ':
          props.severity == null || props.severity === 'primary',
        'hover:shadow-hover active:!shadow-none hover:!bg-primary-500/90 active:bg-primary-500/90 hover:ring-0':
          !props.link &&
          (props.severity == null || props.severity === 'primary') &&
          !props.text &&
          !props.outlined &&
          !context.disabled &&
          !props.plain,
      },

      // Success
      {
        'hover:bg-success-500/[8%] active:bg-success-500/[12%] ':
          props.severity === 'success',
        'hover:shadow-hover active:!shadow-none hover:!bg-success-500/90 active:bg-success-500/90 hover:ring-0':
          !props.link &&
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Info
      {
        'hover:bg-blue-600 hover:ring-blue-600':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      {
        'focus:ring-blue-400/50': props.severity === 'info',
      },
      // Text & Outlined Button
      {
        'hover:bg-blue-300/20':
          (props.text || props.outlined) &&
          props.severity === 'info' &&
          !props.plain,
      },

      // Warning
      {
        'hover:bg-warning-500/[8%] active:bg-warning-500/[12%] ':
          props.severity === 'warning',

        'hover:shadow-hover active:!shadow-none hover:!bg-warning-500/90 active:bg-warning-500/90 hover:ring-0':
          !props.link &&
          props.severity === 'warning' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Text & Outlined Button
      {
        'hover:bg-warning-300/20':
          (props.text || props.outlined) &&
          props.severity === 'warning' &&
          !props.plain,
      },

      // Help
      {
        'hover:bg-purple-600 hover:ring-purple-600':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      {
        'focus:ring-purple-400/50': props.severity === 'help',
      },
      // Text & Outlined Button
      {
        'hover:bg-purple-300/20':
          (props.text || props.outlined) &&
          props.severity === 'help' &&
          !props.plain,
      },

      // Danger
      {
        'hover:bg-danger-500/[8%] active:bg-danger-500/[12%] ':
          props.severity === 'danger',
        'hover:shadow-hover active:!shadow-none hover:!bg-danger-500/90 active:bg-danger-500/90 hover:ring-0':
          !props.link &&
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Text & Outlined Button
      {
        'hover:bg-danger-300/20':
          (props.text || props.outlined) &&
          props.severity === 'danger' &&
          !props.plain,
      },
      // Contrast
      {
        'hover:bg-surface-800 hover:ring-surface-800':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      {
        'focus:ring-primary-500': props.severity === 'contrast',
      },
      // Text & Outlined Button
      {
        'hover:bg-surface-900/10':
          (props.text || props.outlined) &&
          props.severity === 'contrast' &&
          !props.plain,
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
