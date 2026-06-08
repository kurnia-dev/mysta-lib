import clsx from 'clsx';
import { useComponentPreset } from 'lib/hooks';

export interface TerminalEmbedProps {
  /** The command string shown after the prompt */
  command: string;
  /** Output lines. String = one line. Array = multiple lines. */
  output?: string | string[];
  /** Window title shown in the title bar */
  title?: string;
  /** Shell prompt character. Default: '$' */
  prompt?: string;
  className?: string;
}

export function TerminalEmbed({
  command,
  output,
  title = 'terminal',
  prompt = '$',
  className,
}: TerminalEmbedProps): JSX.Element {
  const preset = useComponentPreset('TerminalEmbed', { props: { command, title } }) ?? {};
  const lines = output ? (Array.isArray(output) ? output : [output]) : [];

  return (
    <div className={clsx(preset.root?.className, className)}>
      {/* Title bar */}
      <div className={preset.titleBar?.className}>
        <div className={preset.dots?.className}>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className={preset.title?.className}>{title}</span>
        <div className="w-12" />
      </div>
      {/* Body */}
      <div className={preset.body?.className}>
        <div className={preset.commandLine?.className}>
          <span className={preset.prompt?.className}>{prompt}</span>
          <span className={preset.command?.className}>{command}</span>
        </div>
        {lines.map((line, i) => (
          <div className={preset.outputLine?.className} key={i}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

TerminalEmbed.displayName = 'TerminalEmbed';
