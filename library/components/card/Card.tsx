import clsx from 'clsx';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';
import { Popover } from '../popover/Popover';
import { Separator } from '../separator/Separator';
import { Slot } from '../slot/Slot';

import { CardKanbanProps, CardProps } from './Card.d';

const BaseCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    // General div attributes
    header,
    content,
    footer,
    slots,
    size = 'xs',
    clickable = false,
    draggable = false,
    className,
    severity,

    // Kanban attributes
    groupId,
    onDrop = () => {},
    onDragStart = () => {},
    id,

    mode,

    // Separator attributes
    orientation = 'horizontal',
    decorative = false,
    useSeparator = true,

    pt,

    ...restProps
  } = props as CardKanbanProps;

  const innerRef = useRef<HTMLDivElement>(null);

  const preset =
    useComponentPreset('Card', {
      props: { size, orientation, severity },
    }) ?? {};

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!draggable || mode !== 'kanban') return;

      onDragStart({ originalEvent: e, draggedGroupId: groupId, draggedId: id });
    },
    [draggable, mode, groupId, id, onDragStart],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!draggable || mode !== 'kanban') return;

      onDrop({
        originalEvent: e,
        destinationGroupId: groupId,
        destinationId: id,
      });
    },
    [draggable, mode, groupId, id, onDrop],
  );

  const interactableProps = useCallback(() => {
    return {
      tabIndex: clickable ? 0 : undefined,
      role: clickable ? 'button' : undefined,
      type: clickable ? 'button' : undefined,
      onClick: clickable ? restProps.onClick : undefined,
      onKeyDown: clickable ? restProps.onKeyDown : undefined,
      onDragStart: handleDragStart,
      onDrop: handleDrop,
      onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    };
  }, [clickable, handleDragStart, handleDrop, restProps]);

  useImperativeHandle(ref, () => {
    return innerRef.current;
  }, []);
  return (
    <div
      {...preset.root}
      {...restProps}
      {...interactableProps()}
      className={clsx(
        preset.root.className,
        className,
        pt?.root?.({ props })?.className,
      )}
      draggable={draggable}
      id={id}
      ref={innerRef}
    >
      <Slot name="header" slots={slots}>
        {(header || slots?.header) && (
          <div
            {...preset.header}
            className={clsx(preset.header, pt?.header?.className)}
          >
            {header}
          </div>
        )}
      </Slot>
      {useSeparator && (
        <Separator
          {...preset.separator}
          className={clsx(
            preset.separator,
            pt?.separator?.({ props })?.className,
          )}
          decorative={decorative}
          orientation={orientation}
        />
      )}
      <Slot name="content" slots={slots}>
        {(content || slots?.content) && (
          <div
            {...preset.content}
            className={clsx(preset.content, pt?.content?.className)}
          >
            {content}
          </div>
        )}
      </Slot>
      <Slot name="footer" slots={slots}>
        {(footer || slots?.footer) && (
          <div
            {...preset.footer}
            className={clsx(preset.footer, pt?.footer?.className)}
          >
            {footer}
          </div>
        )}
      </Slot>
    </div>
  );
});

export const Card: React.FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      mode = 'container',
      clickable,
      draggable,
      className,
      id,
      ...restProps
    } = props;

    const createOverlayElement = () => {
      return (
        <div className="flex gap-1 items-center translate-x-8 translate-y-1 !w-0 group-hover:!w-full group-hover:translate-x-2.5 group-hover:translate-y-1 transition-all duration-300 ease-in-out">
          {mode === 'kanban' &&
            (restProps as CardKanbanProps).menus.map((each) => {
              const stableIconId = uuidv4();
              return (
                <Icon
                  className={clsx('cursor-pointer hover:text-white', className)}
                  key={stableIconId}
                  name={each.icon}
                  severity={each.severity}
                  onClick={(e) => {
                    each.command({
                      originalEvent: e,
                      cardId: id,
                      groupId: (restProps as CardKanbanProps).groupId,
                    });
                  }}
                />
              );
            })}
        </div>
      );
    };

    const createBaseCard = () => {
      return (
        <BaseCard
          {...restProps}
          clickable={clickable || mode === 'kanban'}
          content="Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod."
          draggable={draggable}
          header="triggerOnMouseOver"
          id={id ?? uuidv4()}
          mode={mode}
          ref={ref}
        />
      );
    };

    return (
      <>
        {mode === 'kanban' ? (
          <Popover
            alwaysRender
            triggerOnMouseOver
            content={createOverlayElement()}
          >
            {createBaseCard()}
          </Popover>
        ) : (
          <>{createBaseCard()}</>
        )}
      </>
    );
  },
);

BaseCard.displayName = 'BaseCard';
Card.displayName = 'Card';
