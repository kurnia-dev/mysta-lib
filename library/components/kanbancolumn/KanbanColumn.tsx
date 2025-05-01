import { useCallback, useMemo } from 'react';
import { KanbanColumnProps } from './KanbanColumn.d';
import { Card } from '../card/Card';
import { v4 as uuidv4 } from 'uuid';

export const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  const { id, data = [], groupId, onDrop, ...restProps } = props;

  const handleDropOnContainer = (e: React.DragEvent<HTMLDivElement>) => {
    if (
      document
        .getElementById(e.dataTransfer.getData('text'))
        .getAttribute('data-group-id') !== e.currentTarget.id
    ) {
      const draggedElement = document.getElementById(
        e.dataTransfer.getData('text'),
      );
      e.dataTransfer.clearData();
      draggedElement.setAttribute('data-group-id', e.currentTarget.id);
      e.currentTarget.childNodes.length > 0
        ? e.currentTarget.insertBefore(
            draggedElement.parentNode,
            e.currentTarget.firstChild,
          )
        : e.currentTarget.appendChild(draggedElement.parentNode);
    }
  };

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

  const cardsWithStableIds = useMemo(() => {
    return data.map((card) => ({
      ...card,
      id: card.id ?? uuidv4(),
    }));
  }, [data]);

  const createChildren = useCallback(() => {
    return cardsWithStableIds.map((child) => {
      return (
        <Card
          {...child}
          key={child.id}
          id={child.id}
          data-group-id={groupId}
          groupId={groupId}
          actionOnDrop="insert"
          mode="kanban"
          draggable
          clickable
        />
      );
    });
  }, [data]);

  return (
    <div
      {...restProps}
      id={groupId}
      className="grid gap-3 grid-cols-1 m-3 border border-secondary-800 min-h-[200px]"
      {...interactableProps()}
    >
      {createChildren()}
    </div>
  );
};
