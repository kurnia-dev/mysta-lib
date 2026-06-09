import { ToastPresetOptions } from '@mystaline/mysta-commons/components/toast/Toast.d';
import { getSeverity } from '@mystaline/mysta-commons/utils';

const preset: ToastPresetOptions = {
  root: ({ props }) => {
    const severityClass = props.severity
      ? getSeverity(props.severity, { background: 'medium' })
      : 'bg-white';

    return {
      className: [
        'grid grid-cols-[auto_max-content] items-center gap-x-[15px] p-[15px] rounded-md',

        `${severityClass} text-white shadow-[rgba(135,135,135,0.4)_0px_10px_38px_-10px,_rgba(135,135,135,0.2)_0px_10px_20px_-15px]`,

        "[grid-template-areas:_'toast_description'_'toast_action']",

        'data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_700ms_ease-out]',
      ],
    };
  },
  description: {
    className: [
      'm-0 text-[13px] leading-[1.3] text-slate11 [grid-area:_toast_description]',
    ],
  },
};

export default preset;
