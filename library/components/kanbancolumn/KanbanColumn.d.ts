import { FC, HTMLAttributes } from 'react';

import {
  CardKanbanProps,
  KanbanDragStartEvent,
  KanbanDropEvent,
} from '../card/Card.d';

export type SimplifiedCardProps = Omit<
  CardKanbanProps,
  'mode' | 'draggable' | 'clickable'
>;

type OmittedDivAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDrop' | 'onDragStart'
>;

/**
 * Props for the KanbanColumn component.
 *
 * @description This defines the props for the KanbanColumn component including its field name, label, and event handlers.
 */
export interface KanbanColumnProps extends OmittedDivAttributes {
  /** The unique id/name of kanban column */
  groupId?: string;

  data?: SimplifiedCardProps[];

  onDrop?: (e: KanbanDropEvent) => void;
  onDragStart?: (e: KanbanDragStartEvent) => void;
}

/**
 * KanbanColumn component for custom section.
 *
 * @component
 */
export const KanbanColumn: FC<KanbanColumnProps>;
