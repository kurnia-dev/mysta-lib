import type { Meta, StoryObj } from '@storybook/react';

import type { KanbanDragStartEvent, KanbanDropEvent } from '../card/Card.d';
import { KanbanBoard } from '../kanbanboard/KanbanBoard';
import { KanbanColumn } from './KanbanColumn';
import type { SimplifiedCardProps } from './KanbanColumn.d';

const meta: Meta<typeof KanbanColumn> = {
  title: 'Preset/KanbanColumn',
  component: KanbanColumn,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**KanbanColumn** renders a vertical swimlane of draggable cards inside a \`KanbanBoard\`. It accepts a \`data\` array of card descriptors (\`id\`, \`header\`, \`content\`, \`footer\`, etc.) and renders each as a draggable Kanban card automatically.

The \`groupId\` prop gives the column a logical identity used during drag-and-drop: the \`KanbanBoard\` context reads it to determine which column a card was dragged from or dropped into. Always provide a unique \`groupId\` per column in a multi-column layout.

\`KanbanBoard\` self-wraps with \`KanbanProvider\`, so you must **always** wrap \`KanbanColumn\` inside \`KanbanBoard\`. Never add \`KanbanProvider\` manually in stories or app code.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof KanbanColumn>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface BugTicket extends SimplifiedCardProps {
  id: string;
  header: string;
  content?: string;
  footer?: string;
}

const BACKLOG_TICKETS: BugTicket[] = [
  {
    id: 'BUG-1041',
    header: 'Login page flickers on Safari 17',
    content: 'Reported by QA — intermittent white flash after OAuth redirect.',
    footer: 'BUG-1041 · P2',
  },
  {
    id: 'BUG-1044',
    header: 'CSV export omits rows > 10 000',
    content: 'Export truncates at 10 k rows without warning. Must fix before month-end.',
    footer: 'BUG-1044 · P1',
  },
  {
    id: 'BUG-1051',
    header: 'Avatar upload crops at wrong aspect ratio',
    content: 'Profile photos are cropped to 1:1 but uploaded as 4:3.',
    footer: 'BUG-1051 · P3',
  },
];

const IN_REVIEW_TICKETS: BugTicket[] = [
  {
    id: 'BUG-1029',
    header: 'Pagination resets on filter change',
    content: 'Switching any filter should keep the user on page 1, but current behaviour jumps randomly.',
    footer: 'BUG-1029 · P2',
  },
  {
    id: 'BUG-1037',
    header: 'Dark mode contrast fails WCAG AA on badge text',
    content: 'Text contrast ratio measured at 2.8:1. Target is 4.5:1.',
    footer: 'BUG-1037 · P2',
  },
];

const DONE_TICKETS: BugTicket[] = [
  {
    id: 'BUG-1008',
    header: 'Session expires silently without redirect',
    footer: 'BUG-1008 · P1 · Closed',
  },
  {
    id: 'BUG-1013',
    header: 'Duplicate toast notifications on slow connections',
    footer: 'BUG-1013 · P2 · Closed',
  },
  {
    id: 'BUG-1021',
    header: 'Number field accepts non-numeric paste',
    footer: 'BUG-1021 · P3 · Closed',
  },
];

// ---------------------------------------------------------------------------
// Default — single column with 3 cards
// ---------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A single column wrapped in KanbanBoard. The three cards are draggable — within this single column they reorder, but no cross-column drop target exists.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="w-72">
      <KanbanColumn
        groupId="backlog"
        data={[
          { id: 'BUG-1041', header: 'Login page flickers on Safari 17', content: 'Intermittent white flash after OAuth redirect.' },
          { id: 'BUG-1044', header: 'CSV export omits rows > 10 000', content: 'Export truncates without user warning.' },
          { id: 'BUG-1051', header: 'Avatar upload crops at wrong ratio' },
        ]}
      />
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// EmptyColumn — column with no data
// ---------------------------------------------------------------------------
export const EmptyColumn: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `data={[]}` (or `data` is omitted) the column renders its container with no cards. This is the expected state for "Done" or "Backlog" columns at the start of a new sprint.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="w-72">
      <KanbanColumn groupId="empty-sprint" data={[]} />
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// ManyCards — 8+ cards to illustrate scrollable overflow
// ---------------------------------------------------------------------------
export const ManyCards: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A column with 9 cards shows how the column handles vertical overflow. The KanbanBoard/KanbanColumn should allow the column to scroll independently without affecting sibling columns.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="w-72">
      <KanbanColumn
        groupId="long-backlog"
        data={[
          { id: 'T-01', header: 'Implement OAuth 2.0 PKCE flow', content: 'Replace implicit grant.' },
          { id: 'T-02', header: 'Add cursor-based pagination to /invoices' },
          { id: 'T-03', header: 'Migrate Redis session store to Valkey' },
          { id: 'T-04', header: 'Enable brotli compression on static assets' },
          { id: 'T-05', header: 'Write E2E tests for checkout flow', content: 'Cover happy path + card decline.' },
          { id: 'T-06', header: 'Add Open Graph meta tags to public pages' },
          { id: 'T-07', header: 'Enforce rate limiting on /api/auth/* endpoints' },
          { id: 'T-08', header: 'Create Slack alert for P1 error spike' },
          { id: 'T-09', header: 'Document internal API conventions in Confluence' },
        ]}
      />
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// WithDragHandlers — onDrop and onDragStart wired to console callbacks
// ---------------------------------------------------------------------------
export const WithDragHandlers: Story = {
  parameters: {
    docs: {
      description: {
        story: `Wire \`onDrop\` and \`onDragStart\` to observe the event shape. Open the browser console and drag a card to see the logged payloads.

**onDragStart** event shape:
\`\`\`ts
{
  originalEvent: DragEvent<HTMLDivElement>;
  draggedId?: string;     // id of the card being dragged
  draggedGroupId?: string; // groupId of the source column
}
\`\`\`

**onDrop** event shape:
\`\`\`ts
{
  originalEvent: DragEvent<HTMLDivElement>;
  destinationId?: string;      // id of the drop target card
  destinationGroupId?: string; // groupId of the target column
}
\`\`\``,
      },
    },
  },
  render: () => {
    const handleDragStart = (e: KanbanDragStartEvent) => {
      console.log('[KanbanColumn] onDragStart:', {
        draggedId: e.draggedId,
        draggedGroupId: e.draggedGroupId,
      });
    };

    const handleDrop = (e: KanbanDropEvent) => {
      console.log('[KanbanColumn] onDrop:', {
        destinationId: e.destinationId,
        destinationGroupId: e.destinationGroupId,
      });
    };

    return (
      <KanbanBoard className="w-72">
        <KanbanColumn
          groupId="sprint-active"
          data={[
            { id: 'T-10', header: 'Refactor authentication middleware', content: 'Extract to shared package.' },
            { id: 'T-11', header: 'Fix timezone offset in calendar picker' },
            { id: 'T-12', header: 'Add loading skeleton to dashboard stats' },
          ]}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      </KanbanBoard>
    );
  },
};

// ---------------------------------------------------------------------------
// CustomGroupId — explaining groupId's role
// ---------------------------------------------------------------------------
export const CustomGroupId: Story = {
  parameters: {
    docs: {
      description: {
        story: `The \`groupId\` is the column's identity within the \`KanbanBoard\` drag-drop context. When a card is dragged between two columns, the board emits an \`onUpdate\` event with both the card's \`id\` and the destination \`groupId\`.

In this story two columns share the same board. Drag a card from **"sprint-1"** to **"sprint-2"** and observe the console output to see how \`groupId\` is used to route the move.`,
      },
    },
  },
  render: () => (
    <KanbanBoard
      className="flex gap-4"
      onUpdate={(e) => {
        console.log('[KanbanBoard] onUpdate — card moved:', {
          cardId: e.id,
          newGroupId: e.groupId,
          newIndex: e.index,
        });
      }}
    >
      <div className="w-64">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
          Sprint 1 (groupId: &quot;sprint-1&quot;)
        </p>
        <KanbanColumn
          groupId="sprint-1"
          data={[
            { id: 'S1-1', header: 'Set up CI/CD pipeline', content: 'GitHub Actions + Docker.' },
            { id: 'S1-2', header: 'Design token audit' },
          ]}
        />
      </div>
      <div className="w-64">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
          Sprint 2 (groupId: &quot;sprint-2&quot;)
        </p>
        <KanbanColumn
          groupId="sprint-2"
          data={[
            { id: 'S2-1', header: 'Implement search indexing' },
          ]}
        />
      </div>
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// MultipleColumns — 3 columns showing layout relationship
// ---------------------------------------------------------------------------
export const MultipleColumns: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three columns inside one KanbanBoard. Cards can be dragged across all three columns. This is the canonical multi-column usage.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="flex gap-4">
      <div className="w-64 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Backlog</p>
        <KanbanColumn groupId="backlog" data={BACKLOG_TICKETS} />
      </div>
      <div className="w-64 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">In Review</p>
        <KanbanColumn groupId="in-review" data={IN_REVIEW_TICKETS} />
      </div>
      <div className="w-64 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Done</p>
        <KanbanColumn groupId="done" data={DONE_TICKETS} />
      </div>
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// RealWorldBoard — Bug tracker with realistic tickets
// ---------------------------------------------------------------------------
export const RealWorldBoard: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'A production-style bug tracker board with Backlog, In Review, and Done columns. Cards carry realistic ticket metadata (ID, priority, description). Drag cards across columns and check the console for `onUpdate` payloads.',
      },
    },
  },
  render: () => {
    const columns: Array<{ id: string; label: string; data: BugTicket[] }> = [
      { id: 'backlog', label: 'Backlog', data: BACKLOG_TICKETS },
      { id: 'in-review', label: 'In Review', data: IN_REVIEW_TICKETS },
      { id: 'done', label: 'Done', data: DONE_TICKETS },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bug Tracker — Sprint 12</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Drag cards between columns to update status</p>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
            {BACKLOG_TICKETS.length + IN_REVIEW_TICKETS.length + DONE_TICKETS.length} open tickets
          </span>
        </div>

        <KanbanBoard
          className="flex gap-4 overflow-x-auto pb-2"
          onUpdate={(e) => {
            console.log('[BugTracker] Ticket moved:', e);
          }}
        >
          {columns.map(({ id, label, data }) => (
            <div key={id} className="w-72 shrink-0">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {label}
                </p>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-full px-2 py-0.5">
                  {data.length}
                </span>
              </div>
              <KanbanColumn groupId={id} data={data} />
            </div>
          ))}
        </KanbanBoard>
      </div>
    );
  },
};
