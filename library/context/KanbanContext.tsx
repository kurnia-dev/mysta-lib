import { createContext, useContext, useMemo, useState } from 'react';

import { SimplifiedCardProps } from 'lib/components/kanbancolumn/KanbanColumn.d';
import {
  DragItem,
  KanbanContextType,
  KanbanProviderProps,
} from 'lib/types/kanban.type';

const KanbanContext = createContext<KanbanContextType | null>(null);

export const KanbanProvider = ({ children, onUpdate }: KanbanProviderProps) => {
  const [dragItem, setDragItem] = useState<DragItem>(null);
  const [cardElements, setCardElements] = useState<SimplifiedCardProps[]>([]);

  const controller = useMemo(
    () => ({ dragItem, setDragItem, cardElements, setCardElements, onUpdate }),
    [dragItem, setDragItem, cardElements, setCardElements, onUpdate],
  );

  return (
    <KanbanContext.Provider value={controller}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};
