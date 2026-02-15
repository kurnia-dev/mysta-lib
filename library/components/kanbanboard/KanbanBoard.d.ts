import { FC, HTMLAttributes } from 'react';

import { DragItem } from '../../types/kanban.type';

/**
 * Props for the KanbanBoard component.
 *
 * @description This defines the props for the KanbanBoard component including its field name, label, and event handlers.
 */
export interface KanbanBoardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onDragStart'> {
  onUpdate?: (e: DragItem) => void;
}

/**
 * KanbanBoard component for custom section.
 *
 * @component
 */
export const KanbanBoard: FC<KanbanBoardProps>;
