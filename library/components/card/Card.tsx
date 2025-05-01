import { useComponentPreset } from 'lib/hooks';
import { Slot } from '../slot/Slot';
import { CardKanbanProps, CardProps } from './Card.d';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Icon } from '../icon/Icon';
import { Popover } from '../popover/Popover';
import { Separator } from '../separator/Separator';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

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

    ...restProps
  } = props as CardKanbanProps;

  const innerRef = useRef<HTMLDivElement>(null);

  const preset =
    useComponentPreset('card', {
      props: { size, orientation, severity },
    }) ?? {};

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable || mode !== 'kanban') return;

    onDragStart({ originalEvent: e, draggedGroupId: groupId, draggedId: id });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable || mode !== 'kanban') return;

    onDrop({
      originalEvent: e,
      destinationGroupId: groupId,
      destinationId: id,
    });
  };

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
  }, [clickable, draggable, mode, handleDragStart, handleDrop, restProps]);

  useImperativeHandle(ref, () => {
    return innerRef.current;
  }, []);
  return (
    <div
      {...preset.root}
      {...restProps}
      {...interactableProps()}
      id={id}
      ref={innerRef}
      className={clsx(preset.root.className, className)}
      draggable={draggable}
    >
      <Slot name="header" slots={slots}>
        {(header || slots?.header) && <div {...preset.header}>{header}</div>}
      </Slot>
      {useSeparator && (
        <Separator
          {...preset.separator}
          orientation={orientation}
          decorative={decorative}
        />
      )}
      <Slot name="content" slots={slots}>
        {(content || slots?.content) && (
          <div {...preset.content}>{content}</div>
        )}
      </Slot>
      <Slot name="footer" slots={slots}>
        {(footer || slots?.footer) && <div {...preset.footer}>{footer}</div>}
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
                  key={stableIconId}
                  name={each.icon}
                  severity={each.severity}
                  className={clsx('cursor-pointer hover:text-white', className)}
                  onClick={() => console.log('clicked edit')}
                />
              );
            })}
        </div>
      );
    };

    const createBaseCard = () => {
      const uniqueId = uuidv4();
      const draggableId = draggable ? 'draggable-' : '';
      const kanbanId = mode === 'kanban' ? 'kanban-' : '';

      return (
        <BaseCard
          {...restProps}
          id={id ?? `${draggableId}${kanbanId}${uniqueId}`}
          ref={ref}
          clickable={clickable || mode === 'kanban'}
          draggable={draggable}
          mode={mode}
          header="triggerOnMouseOver"
          content="Cillum veniam aute elit consectetur officia deserunt sit laborum incididunt in anim ex. Magna nulla mollit ipsum labore incididunt mollit ad laborum velit ea amet pariatur. Ut culpa sunt eiusmod aliquip nulla ut quis est amet eiusmod cillum. Eu amet deserunt velit ad anim occaecat eiusmod."
        />
      );
    };

    return (
      <>
        {mode === 'kanban' ? (
          <Popover
            content={createOverlayElement()}
            triggerOnMouseOver
            alwaysRender
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
