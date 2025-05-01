import { SimplifiedCardProps } from 'lib/components/kanbancolumn/KanbanColumn.d';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface DragItem {
  id: string;
  groupId: string;
  index?: number;
}

export interface KanbanContextType {
  dragItem: DragItem;
  setDragItem: Dispatch<SetStateAction<DragItem>>;
  cardElements: SimplifiedCardProps[];
  setCardElements: Dispatch<SetStateAction<SimplifiedCardProps[]>>;
  onUpdate?: (value: DragItem) => void;
}

export interface KanbanProviderProps {
  children: ReactNode;
  onUpdate?: (value: DragItem) => void;
}
