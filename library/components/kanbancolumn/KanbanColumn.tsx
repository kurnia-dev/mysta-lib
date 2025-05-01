import { useCallback, useEffect, useMemo } from 'react';
import { KanbanColumnProps } from './KanbanColumn.d';
import { Card } from '../card/Card';
import { v4 as uuidv4 } from 'uuid';
import { KanbanDragStartEvent, KanbanDropEvent } from '../card/Card.d';
import { useKanban } from 'lib/context/KanbanContext';

export const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  const {
    id,
    data = [],
    groupId,
    onDrop = () => {},
    onDragStart = () => {},
    ...restProps
  } = props;

  const { dragItem, setDragItem, cardElements, setCardElements, onUpdate } =
    useKanban();

  const cards = useMemo(
    () =>
      data.map((each) => {
        return {
          ...each,
          id: `draggable-kanban-${each.id ?? uuidv4()}`,
          groupId,
        };
      }),
    [],
  );

  const idsInNewCards = useMemo(() => {
    return new Set(cards.map((each) => each.id));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setCardElements((prev) => {
        const filteredPrev = prev.filter((c) => !idsInNewCards.has(c.id));
        return [...filteredPrev, ...cards];
      });
    }
  }, [cards]);

  const handleDragStart = (e: KanbanDragStartEvent) => {
    const { draggedGroupId, draggedId } = e;
    onDragStart(e);
    setDragItem({ id: draggedId, groupId: draggedGroupId });
  };

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
        newCards.splice(destinationIdx, 0, { ...draggedItem, groupId });
        onUpdate({
          groupId,
          id: dragItem.id,
          index: newCards
            .filter((each) => each.groupId === groupId)
            .findIndex((each) => each.id === dragItem.id),
        });
        return newCards;
      });
    },
    [dragItem, cardElements],
  );

  const handleDropOnContainer = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDrop({
        originalEvent: e,
        destinationGroupId: groupId,
        destinationId: dragItem.id,
      });
      if (!dragItem || dragItem.groupId === groupId) return;
      const matchedCard = cardElements.find((each) => each.id === dragItem.id);

      setCardElements((prevCards) => {
        return [
          ...prevCards.filter((each) => each.id !== matchedCard.id),
          { ...matchedCard, groupId },
        ];
      });

      onUpdate({
        groupId,
        id: dragItem.id,
        index: cardElements.filter((each) => each.groupId === groupId).length,
      });
    },
    [dragItem, cardElements, groupId],
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
      .filter((each) => each.groupId === groupId)
      .map((child) => {
        return (
          <Card
            {...child}
            key={child.id}
            id={child.id}
            groupId={groupId}
            mode="kanban"
            draggable
            clickable
            onDragStart={handleDragStart}
            onDrop={handleDropOnCard}
          />
        );
      });
  }, [cardElements, handleDragStart, handleDropOnCard, groupId]);

  return (
    <div
      {...restProps}
      id={groupId}
      className="grid gap-3 grid-cols-1 m-3 p-3 border border-secondary-800 min-h-[200px]"
      {...interactableProps()}
    >
      {createChildren()}
    </div>
  );
};
