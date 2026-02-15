import clsx from 'clsx';
import { Tooltip as RUITooltip } from 'radix-ui';

import { useComponentPreset } from 'lib/hooks';

import { TooltipProps } from './Tooltip.d';

export const Tooltip = (props: TooltipProps) => {
  const { content, children, hide, className, position, pt } = props;

  const preset =
    useComponentPreset('Tooltip', {
      props,
    }) ?? {};

  return (
    <RUITooltip.Root delayDuration={0} open={hide ? false : undefined}>
      <RUITooltip.Trigger asChild className={className}>
        {children}
      </RUITooltip.Trigger>

      <RUITooltip.Portal>
        <RUITooltip.Content side={position} sideOffset={4}>
          <div
            {...preset.content}
            className={clsx(preset.content.className, pt?.content?.className)}
          >
            {content}
          </div>
        </RUITooltip.Content>
      </RUITooltip.Portal>
    </RUITooltip.Root>
  );
};
