import { KanbanProvider } from 'lib/context';
import { KanbanBoardProps } from './KanbanBoard.d';

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  children,
  className,
  onUpdate = () => {},
}) => {
  return (
    <KanbanProvider onUpdate={onUpdate}>
      <div className={className}>{children}</div>
    </KanbanProvider>
  );
};
