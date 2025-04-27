import { useComponentPreset } from 'lib/hooks';
import { TooltipProps } from './Tooltip.d';
import { Tooltip as RUITooltip } from 'radix-ui';

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { content, children, hide, className, position } = props;

  const preset =
    useComponentPreset('tooltip', {
      props,
    }) ?? {};

  return (
    <RUITooltip.Root open={hide ? false : undefined} delayDuration={0}>
      <RUITooltip.Trigger className={className} asChild>
        {children}
      </RUITooltip.Trigger>

      <RUITooltip.Portal>
        <RUITooltip.Content side={position} sideOffset={4}>
          <div {...preset.content}>{content}</div>
        </RUITooltip.Content>
      </RUITooltip.Portal>
    </RUITooltip.Root>
  );
};
