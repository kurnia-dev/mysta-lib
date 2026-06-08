import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';
import { useCopyToClipboard } from 'lib/hooks';

export interface CopyButtonProps {
  text: string;
  label?: string;
  successLabel?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = 'Copy',
  successLabel = 'Copied!',
  className,
}: CopyButtonProps): JSX.Element {
  const [copied, copy] = useCopyToClipboard();

  const preset = useComponentPreset('CopyButton', {
    props: { text, label, successLabel },
    context: { copied },
  }) ?? {};

  return (
    <button
      className={clsx(preset.root?.className, className)}
      type="button"
      onClick={() => copy(text)}
    >
      {copied ? (
        <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg fill="none" height="14" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14">
          <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? successLabel : label}
    </button>
  );
}
