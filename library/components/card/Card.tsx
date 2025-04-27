import { useComponentPreset } from 'lib/hooks';
import { Slot } from '../slot/Slot';
import { CardProps } from './Card.d';

export const Card: React.FC<CardProps> = (props) => {
  const { header, content, footer, slots } = props;

  const preset =
    useComponentPreset('card', {
      props,
    }) ?? {};
  return (
    <div {...preset.root}>
      <Slot name="header" slots={slots}>
        <div {...preset.header}>{header}</div>
      </Slot>
      <Slot name="content" slots={slots}>
        <div {...preset.content}>{content}</div>
      </Slot>
      <Slot name="footer" slots={slots}>
        <div {...preset.footer}>{footer}</div>
      </Slot>
    </div>
  );
};
