import { KanbanProvider } from '../../context';

import { KanbanBoardProps } from './KanbanBoard.d';

export const KanbanBoard = ({
  children,
  className,
  onUpdate = () => {},
}: KanbanBoardProps) => {
  return (
    <KanbanProvider onUpdate={onUpdate}>
      <div className={className}>{children}</div>
    </KanbanProvider>
  );
};
