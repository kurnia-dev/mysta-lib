import clsx from 'clsx';
import { useCallback, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useKanban } from 'lib/context';

import { Card } from '../card/Card';
import { KanbanDragStartEvent, KanbanDropEvent } from '../card/Card.d';

import { KanbanColumnProps } from './KanbanColumn.d';

export const KanbanColumn = (props: KanbanColumnProps) => {
  const {
    data = [],
    groupId,
    onDrop = () => {},
    onDragStart = () => {},

    className,
    ...restProps
  } = props;

  const { dragItem, setDragItem, cardElements, setCardElements, onUpdate } =
    useKanban();

  // Narrow groupId: all hooks above run unconditionally; guard here is safe.
  const resolvedGroupId = groupId as string;

  const cards = useMemo(
    () =>
      data.map((each) => {
        return {
          ...each,
          id: each.id ?? uuidv4(),
          groupId: resolvedGroupId,
        };
      }),
    [data, resolvedGroupId],
  );

  useEffect(() => {
    if (!groupId) return;
    if (data.length > 0) {
      const idsInNewCards = new Set(cards.map((each) => each.id));

      setCardElements((prev) => {
        const filteredPrev = prev.filter((c) => !idsInNewCards.has(c.id!));
        return [...filteredPrev, ...cards];
      });
    }
  }, [groupId, cards, data.length, setCardElements]);

  const handleDragStart = useCallback(
    (e: KanbanDragStartEvent) => {
      const { draggedGroupId, draggedId } = e;
      onDragStart(e);
      setDragItem({ id: draggedId!, groupId: draggedGroupId! });
    },
    [onDragStart, setDragItem],
  );

  const handleDropOnCard = useCallback(
    (e: KanbanDropEvent) => {
      e.originalEvent.stopPropagation();
      onDrop(e);
      if (!dragItem || dragItem.id === e.destinationId) return;

      const destinationIdx = cardElements.findIndex(
        (each) => each.id === e.destinationId,
      );
      const draggedIdx = cardElements.findIndex(
        (each) => each.id === dragItem.id,
      );

      setCardElements((prevCards) => {
        if (destinationIdx === -1 || draggedIdx === -1) return prevCards;
        const newCards = [...prevCards];
        const [draggedItem] = newCards.splice(draggedIdx, 1);
        newCards.splice(destinationIdx, 0, { ...draggedItem, groupId: resolvedGroupId });
        onUpdate?.({
          groupId: resolvedGroupId,
          id: dragItem.id,
          index: newCards
            .filter((each) => each.groupId === resolvedGroupId)
            .findIndex((each) => each.id === dragItem.id),
        });
        return newCards;
      });
    },
    [dragItem, cardElements, resolvedGroupId, onDrop, onUpdate, setCardElements],
  );

  const handleDropOnContainer = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!dragItem) return;
      onDrop({
        originalEvent: e,
        destinationGroupId: resolvedGroupId,
        destinationId: dragItem.id,
      });
      if (dragItem.groupId === resolvedGroupId) return;
      const matchedCard = cardElements.find((each) => each.id === dragItem.id);
      if (!matchedCard) return;

      setCardElements((prevCards) => {
        return [
          ...prevCards.filter((each) => each.id !== matchedCard.id),
          { ...matchedCard, groupId: resolvedGroupId },
        ];
      });

      onUpdate?.({
        groupId: resolvedGroupId,
        id: dragItem.id,
        index: cardElements.filter((each) => each.groupId === resolvedGroupId).length,
      });
    },
    [dragItem, cardElements, resolvedGroupId, onDrop, onUpdate, setCardElements],
  );

  const interactableProps = useCallback(() => {
    return {
      tabIndex: 0,
      role: 'button',
      type: 'button',
      onClick: restProps.onClick,
      onKeyDown: restProps.onKeyDown,
      onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
      onDrop: handleDropOnContainer,
    };
  }, [restProps, handleDropOnContainer]);

  const createChildren = useCallback(() => {
    return cardElements
      .filter((each) => each.groupId === resolvedGroupId)
      .map((child) => {
        return (
          <Card
            {...child}
            clickable
            draggable
            groupId={resolvedGroupId}
            id={child.id}
            key={child.id}
            mode="kanban"
            onDragStart={handleDragStart}
            onDrop={handleDropOnCard}
          />
        );
      });
  }, [cardElements, handleDragStart, handleDropOnCard, resolvedGroupId]);

  if (!groupId) return null;

  return (
    <div
      {...restProps}
      className={clsx(
        'flex flex-col h-max gap-3 m-3 p-3 border border-secondary-800 min-h-[200px] min-w-[200px]',
        className,
      )}
      id={resolvedGroupId}
      {...interactableProps()}
    >
      {createChildren()}
    </div>
  );
};
