export default {
  root: ({ props }) => ({
    'className': [
      // Alignment
      'inline-flex items-center',

      // Size
      'p-1',

      // Shape
      'rounded-lg	',

      // Color
      {
        'text-general-400 bg-general-100': props.disabled,
        'text-success-500 bg-success-100':
          !props.disabled && props.severity == 'success',
        'text-primary-500 bg-primary-50':
          !props.disabled &&
          (props.severity == null || props.severity == 'primary'),
        'text-grayscale-800 bg-grayscale-200':
          !props.disabled && props.severity == 'dark',
        'text-warning-600 bg-warning-100':
          !props.disabled && props.severity == 'warning',
        'text-danger-600 bg-danger-100':
          !props.disabled && props.severity == 'danger',
      },
    ],
    'data-wv-name': 'badge',
    'data-wv-section': 'root',
  }),
  input: ({ props, context }) => ({
    className: [
      'text-nowrap whitespace-nowrap font-semibold text-[9px] leading-3 tracking-[0.02em]',
      {
        'caret-primary-700': props.editable,
        'cursor-default': !!context.badgeTooltip,
      },
    ],
  }),
  removebutton: ({ props }) => ({
    'className': [
      '!p-0 !w-[10px] !h-[10px] ml-1',
      {
        'text-primary-500':
          !props.disabled &&
          (!props.badgeSeverity || props.badgeSeverity === 'primary'),
        'text-success-500':
          !props.disabled && props.badgeSeverity === 'success',
        'text-danger-600': !props.disabled && props.badgeSeverity === 'danger',
        'text-warning-600':
          !props.disabled && props.badgeSeverity === 'warning',
        'text-grayscale-800 hover:bg-grayscale-300':
          !props.disabled && props.badgeSeverity === 'dark',
        'text-general-400': props.disabled,
      },
    ],
    'icon-className': 'w-[10px] h-[10px] !text-[10px]',
    'data-wv-section': 'removebutton',
  }),
};
