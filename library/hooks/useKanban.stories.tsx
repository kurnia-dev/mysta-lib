import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { KanbanBoard } from '../components/kanbanboard/KanbanBoard';
import { KanbanColumn } from '../components/kanbancolumn/KanbanColumn';
import { KanbanProvider, useKanban } from '../context';
import type { DragItem } from '../types/kanban.type';
import type { SimplifiedCardProps } from '../components/kanbancolumn/KanbanColumn.d';

const meta: Meta = {
  title: 'Hooks/useKanban',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**useKanban** provides access to the drag-and-drop state managed by \`KanbanProvider\`. It is the low-level escape hatch for building custom card components or fully custom kanban implementations.

\`\`\`ts
const {
  dragItem,       // DragItem | null — the card currently being dragged
  setDragItem,    // Dispatch<SetStateAction<DragItem | null>>
  cardElements,   // SimplifiedCardProps[] — all registered card data
  setCardElements,// Dispatch<SetStateAction<SimplifiedCardProps[]>>
  onUpdate,       // ((value: DragItem) => void) | undefined
} = useKanban();
\`\`\`

**Architecture:**

| Usage | What to use |
|---|---|
| Standard kanban board | \`<KanbanBoard onUpdate={...}><KanbanColumn .../></KanbanBoard>\` — KanbanBoard self-wraps with KanbanProvider |
| Custom card with access to drag state | \`useKanban()\` inside a card component rendered inside KanbanBoard |
| Fully custom kanban (no KanbanBoard) | \`<KanbanProvider onUpdate={...}>\` manually, then \`useKanban()\` |

> **Note:** \`useKanban\` throws if called outside a \`KanbanProvider\`. Since \`KanbanBoard\` self-wraps, custom card components rendered inside \`KanbanBoard\` can call \`useKanban\` freely.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------
const INITIAL_BACKLOG: SimplifiedCardProps[] = [
  { id: 'card-1', title: 'Implement IAM role-based access control', label: 'Feature', priority: 'high' },
  { id: 'card-2', title: 'Add PeerDB CDC replication for audit logs', label: 'Infrastructure', priority: 'medium' },
  { id: 'card-3', title: 'Migrate legacy asset endpoints to v2', label: 'Refactor', priority: 'low' },
];

const INITIAL_PROGRESS: SimplifiedCardProps[] = [
  { id: 'card-4', title: 'JSONB snapshot storage for approval data', label: 'Feature', priority: 'high' },
  { id: 'card-5', title: 'Write ts-migrations CI/CD pipeline', label: 'DevOps', priority: 'medium' },
];

const INITIAL_DONE: SimplifiedCardProps[] = [
  { id: 'card-6', title: 'AES-256-GCM payload codec in ts-utils', label: 'Security', priority: 'high' },
];

// ---------------------------------------------------------------------------
// Default — standard KanbanBoard with onUpdate callback
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [lastUpdate, setLastUpdate] = useState<DragItem | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Sprint Board</h3>
        {lastUpdate && (
          <div className="px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-xs text-violet-700 dark:text-violet-400">
            Last drag: card <code className="font-mono">{lastUpdate.id}</code> → column <code className="font-mono">{lastUpdate.groupId}</code>
          </div>
        )}
      </div>

      <KanbanBoard
        onUpdate={(dragItem) => setLastUpdate(dragItem)}
        className="flex gap-4"
      >
        <KanbanColumn groupId="backlog" data={INITIAL_BACKLOG}>
          <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Backlog</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">{INITIAL_BACKLOG.length}</span>
          </div>
        </KanbanColumn>
        <KanbanColumn groupId="in-progress" data={INITIAL_PROGRESS}>
          <div className="px-4 py-3 border-b border-yellow-100 dark:border-yellow-900/30 flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/10">
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">In Progress</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-200 dark:bg-yellow-800/50 text-yellow-700 dark:text-yellow-400">{INITIAL_PROGRESS.length}</span>
          </div>
        </KanbanColumn>
        <KanbanColumn groupId="done" data={INITIAL_DONE}>
          <div className="px-4 py-3 border-b border-green-100 dark:border-green-900/30 flex items-center justify-between bg-green-50 dark:bg-green-900/10">
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Done</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-200 dark:bg-green-800/50 text-green-700 dark:text-green-400">{INITIAL_DONE.length}</span>
          </div>
        </KanbanColumn>
      </KanbanBoard>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Drag a card to another column. The <code className="font-mono">onUpdate</code> callback logs the DragItem received.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Standard `KanbanBoard` with three columns. The `onUpdate` callback fires every time a card is dropped, receiving a `DragItem` with `{ id, groupId }`. The last drag event is displayed above the board.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// DirectProviderUsage — using KanbanProvider without KanbanBoard
// ---------------------------------------------------------------------------
function DragStateDisplay() {
  const { dragItem, cardElements } = useKanban();

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 space-y-3">
      <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
        useKanban() state
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">dragItem</span>
          <code className="text-xs font-mono text-violet-600 dark:text-violet-400">
            {dragItem ? JSON.stringify(dragItem) : 'null'}
          </code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">cardElements.length</span>
          <code className="text-xs font-mono text-violet-600 dark:text-violet-400">{cardElements.length}</code>
        </div>
      </div>
    </div>
  );
}

function DirectProviderUsageDemo() {
  const [updateLog, setUpdateLog] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
        This story uses <code className="font-mono">KanbanProvider</code> directly — without <code className="font-mono">KanbanBoard</code>. Only use this pattern for fully custom kanban implementations.
      </div>

      <KanbanProvider
        onUpdate={(item) => {
          const msg = `Card "${item.id}" → column "${item.groupId}"`;
          setUpdateLog((prev) => [msg, ...prev].slice(0, 5));
        }}
      >
        <div className="flex gap-4">
          <KanbanColumn groupId="todo" data={[
            { id: 'p-card-1', title: 'Design system audit', label: 'Design', priority: 'medium' },
            { id: 'p-card-2', title: 'Storybook documentation', label: 'Docs', priority: 'low' },
          ]}>
            <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">To Do</span>
            </div>
          </KanbanColumn>
          <KanbanColumn groupId="doing" data={[
            { id: 'p-card-3', title: 'Hook stories for useKanban', label: 'Feature', priority: 'high' },
          ]}>
            <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Doing</span>
            </div>
          </KanbanColumn>
        </div>

        <DragStateDisplay />
      </KanbanProvider>

      {updateLog.length > 0 && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
            <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">onUpdate log</p>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {updateLog.map((msg, i) => (
              <p key={i} className="px-4 py-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">{msg}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const DirectProviderUsage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Uses `KanbanProvider` directly (without `KanbanBoard`). The `DragStateDisplay` component calls `useKanban()` to read `dragItem` and `cardElements`. Use this pattern only for fully custom kanban UIs.',
      },
    },
  },
  render: () => <DirectProviderUsageDemo />,
};

// ---------------------------------------------------------------------------
// OnUpdate — onUpdate callback receiving drag events
// ---------------------------------------------------------------------------
function OnUpdateDemo() {
  const [events, setEvents] = useState<Array<{ item: DragItem; time: string }>>([]);

  const handleUpdate = (item: DragItem) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEvents((prev) => [{ item, time }, ...prev].slice(0, 6));
  };

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4">
        <KanbanBoard onUpdate={handleUpdate} className="flex gap-4">
          <KanbanColumn
            groupId="planning"
            data={[
              { id: 'ev-card-1', title: 'Database schema design', label: 'Architecture', priority: 'high' },
              { id: 'ev-card-2', title: 'API contract definition', label: 'Design', priority: 'medium' },
            ]}
          >
            <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Planning</span>
            </div>
          </KanbanColumn>
          <KanbanColumn
            groupId="implementation"
            data={[
              { id: 'ev-card-3', title: 'Set up CI/CD pipeline', label: 'DevOps', priority: 'high' },
            ]}
          >
            <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Implementation</span>
            </div>
          </KanbanColumn>
        </KanbanBoard>
      </div>

      <div className="w-64 shrink-0 flex flex-col gap-3">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">onUpdate events</p>
            {events.length > 0 && (
              <button
                onClick={() => setEvents([])}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              >
                clear
              </button>
            )}
          </div>
          {events.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-neutral-300 dark:text-neutral-600 italic">
              Drag a card to see events
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {events.map(({ item, time }, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{time}</span>
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
                    id: <code className="font-mono text-violet-600 dark:text-violet-400">{item.id}</code>
                  </p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
                    groupId: <code className="font-mono text-blue-600 dark:text-blue-400">{item.groupId}</code>
                  </p>
                  {item.index !== undefined && (
                    <p className="text-xs text-neutral-700 dark:text-neutral-300">
                      index: <code className="font-mono text-emerald-600 dark:text-emerald-400">{item.index}</code>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <span className="text-neutral-400">// DragItem shape:</span>
          <br />
          {'{'} id: string,
          <br />
          {'  '}groupId: string,
          <br />
          {'  '}index?: number {'}'}
        </div>
      </div>
    </div>
  );
}

export const OnUpdate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drag cards between columns — every drop fires `onUpdate` with a `DragItem`. The event log on the right shows `id` (the card), `groupId` (the destination column), and `index` (position in the column).',
      },
    },
  },
  render: () => <OnUpdateDemo />,
};
