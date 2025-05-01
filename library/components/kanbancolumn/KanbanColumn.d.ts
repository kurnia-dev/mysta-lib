import { FC, HTMLAttributes } from 'react';
import { CardKanbanProps, KanbanDropEvent } from '../card/Card.d';

export interface SimplifiedCardProps
  extends Omit<
    CardKanbanProps,
    'mode' | 'actionOnDrop' | 'draggable' | 'clickable'
  > {}

/**
 * Props for the KanbanColumn component.
 *
 * @description This defines the props for the KanbanColumn component including its field name, label, and event handlers.
 */
export interface KanbanColumnProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  /** The unique id/name of kanban column */
  groupId?: string;

  data?: SimplifiedCardProps[];

  onDrop?: (e: KanbanDropEvent) => void;
}

/**
 * KanbanColumn component for custom section.
 *
 * @component
 */
export const KanbanColumn: FC<KanbanColumnProps>;
