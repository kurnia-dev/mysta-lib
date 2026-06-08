import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { DragItem } from '../../types/kanban.type';
import { KanbanColumn } from '../kanbancolumn/KanbanColumn';
import type { SimplifiedCardProps } from '../kanbancolumn/KanbanColumn.d';
import { KanbanBoard } from './KanbanBoard';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Preset/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**KanbanBoard** is the drag-and-drop context provider for Kanban layouts. It self-wraps with \`KanbanProvider\` — do NOT add \`KanbanProvider\` manually. Render one or more \`KanbanColumn\` components as direct children; each column is identified by its \`groupId\`.

Subscribe to \`onUpdate\` to be notified whenever a card is dropped into a new position. The callback receives a \`DragItem\` with the card's \`id\`, the destination \`groupId\`, and the destination \`index\`.

\`KanbanBoard\` is purely a layout and context host — apply flexbox / grid layout via its \`className\` prop.
        `,
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind classes for board layout (e.g. `flex gap-4`, `grid grid-cols-3`).',
    },
  },
};
export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// ---------------------------------------------------------------------------
// Shared data fixtures
// ---------------------------------------------------------------------------

type ColumnData = { id: string; label: string; cards: SimplifiedCardProps[] };

const DEFAULT_COLUMNS: ColumnData[] = [
  {
    id: 'todo',
    label: 'To Do',
    cards: [
      { id: 'T-01', header: 'Implement OAuth 2.0 PKCE flow', content: 'Replace implicit grant with authorization code + PKCE.' },
      { id: 'T-02', header: 'Add cursor-based pagination to /invoices', content: 'Current offset pagination is too slow on large datasets.' },
      { id: 'T-03', header: 'Setup CI/CD pipeline', content: 'GitHub Actions → staging → production with rollback gate.' },
    ],
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    cards: [
      { id: 'T-04', header: 'Implement auth middleware', content: 'JWT validation, refresh token rotation, and device fingerprinting.' },
      { id: 'T-05', header: 'Fix pagination reset on filter change' },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    cards: [
      { id: 'T-06', header: 'Create database schema', content: 'ERD reviewed and approved.' },
      { id: 'T-07', header: 'Team onboarding documentation' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Default — 3 columns, enriched with realistic data
// ---------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three-column board with To Do, In Progress, and Done swimlanes. Drag any card between columns — the board manages internal state automatically.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="flex gap-4">
      {DEFAULT_COLUMNS.map(({ id, label, cards }) => (
        <div key={id} className="w-64 shrink-0">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
            {label}
          </p>
          <KanbanColumn groupId={id} data={cards} />
        </div>
      ))}
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// FourColumns — product backlog / sprint workflow
// ---------------------------------------------------------------------------
export const FourColumns: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A four-column layout for product development workflows: Backlog → To Do → In Progress → Done.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="flex gap-4">
      <div className="w-60 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Backlog</p>
        <KanbanColumn
          groupId="backlog"
          data={[
            { id: 'B-01', header: 'Research competitors' },
            { id: 'B-02', header: 'Define MVP scope', content: 'Align with PM on scope boundaries.' },
          ]}
        />
      </div>
      <div className="w-60 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">To Do</p>
        <KanbanColumn
          groupId="todo"
          data={[
            { id: 'B-03', header: 'Design system setup' },
            { id: 'B-04', header: 'API contract draft' },
          ]}
        />
      </div>
      <div className="w-60 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">In Progress</p>
        <KanbanColumn
          groupId="in-progress"
          data={[
            { id: 'B-05', header: 'Build authentication service', content: 'JWT + PKCE. Assigned to Kenji.' },
          ]}
        />
      </div>
      <div className="w-60 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Done</p>
        <KanbanColumn
          groupId="done"
          data={[
            { id: 'B-06', header: 'Project scaffolding' },
            { id: 'B-07', header: 'Repository setup' },
            { id: 'B-08', header: 'Team onboarding' },
          ]}
        />
      </div>
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// Empty — columns with no cards (edge case)
// ---------------------------------------------------------------------------
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All three columns start empty. Drop targets are still active — you can drag cards once any column is populated via `onUpdate`.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="flex gap-4">
      {(['todo', 'in-progress', 'done'] as const).map((id) => (
        <div key={id} className="w-64 shrink-0">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1 capitalize">
            {id.replace('-', ' ')}
          </p>
          <KanbanColumn groupId={id} data={[]} />
        </div>
      ))}
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// WithOnUpdate — observe the DragItem payload on each drag
// ---------------------------------------------------------------------------
export const WithOnUpdate: Story = {
  parameters: {
    docs: {
      description: {
        story: `Drag any card and observe the \`onUpdate\` payload logged to the console and displayed below the board.

The \`DragItem\` shape:
\`\`\`ts
interface DragItem {
  id: string;       // card identifier
  groupId: string;  // destination column groupId
  index?: number;   // destination position within the column
}
\`\`\``,
      },
    },
  },
  render: () => {
    const [lastEvent, setLastEvent] = useState<DragItem | null>(null);

    return (
      <div className="space-y-4">
        <KanbanBoard
          className="flex gap-4"
          onUpdate={(e) => {
            console.log('[KanbanBoard] onUpdate:', e);
            setLastEvent(e);
          }}
        >
          {DEFAULT_COLUMNS.map(({ id, label, cards }) => (
            <div key={id} className="w-64 shrink-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
                {label}
              </p>
              <KanbanColumn groupId={id} data={cards} />
            </div>
          ))}
        </KanbanBoard>

        <div className="border-t pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Last onUpdate event
          </p>
          {lastEvent ? (
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-gray-700 dark:text-gray-300">
              {JSON.stringify(lastEvent, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-gray-400">Drag a card to see the event payload here.</p>
          )}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// ScrumBoard — Sprint-style: 5 columns
// ---------------------------------------------------------------------------
export const ScrumBoard: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'A five-column Scrum board matching a typical sprint workflow: Product Backlog → Sprint Backlog → In Progress → Code Review → Done. Demonstrates that KanbanBoard scales naturally to any number of columns.',
      },
    },
  },
  render: () => {
    const scrumColumns: ColumnData[] = [
      {
        id: 'product-backlog',
        label: 'Product Backlog',
        cards: [
          { id: 'PB-01', header: 'Guest checkout flow', content: 'Allow purchase without account creation.' },
          { id: 'PB-02', header: 'Automated invoice PDF generation' },
          { id: 'PB-03', header: 'Multi-currency support' },
        ],
      },
      {
        id: 'sprint-backlog',
        label: 'Sprint Backlog',
        cards: [
          { id: 'SB-01', header: 'Add real-time inventory deduction on order', content: 'Prevent overselling on flash sale events.' },
          { id: 'SB-02', header: 'Integrate payment gateway webhook handler' },
        ],
      },
      {
        id: 'in-progress',
        label: 'In Progress',
        cards: [
          { id: 'IP-01', header: 'Order status page with live tracking', content: 'Assigned: Amelia H. · Due: Friday' },
          { id: 'IP-02', header: 'Email notification templates', content: 'Assigned: Kenji W.' },
        ],
      },
      {
        id: 'code-review',
        label: 'Code Review',
        cards: [
          { id: 'CR-01', header: 'Refactor cart reducer to use Immer', content: 'PR #441 — awaiting 2 reviewers.' },
        ],
      },
      {
        id: 'done',
        label: 'Done',
        cards: [
          { id: 'D-01', header: 'Product listing page with filters' },
          { id: 'D-02', header: 'User authentication + OAuth sign-in' },
          { id: 'D-03', header: 'Shopping cart persistence in localStorage' },
        ],
      },
    ];

    return (
      <div className="space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">E-Commerce Platform — Sprint 7</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">May 13 – May 27, 2025</p>
          </div>
        </div>
        <KanbanBoard className="flex gap-4 min-w-max">
          {scrumColumns.map(({ id, label, cards }) => (
            <div key={id} className="w-56 shrink-0">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
                <span className="text-[0.65rem] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-full px-1.5">
                  {cards.length}
                </span>
              </div>
              <KanbanColumn groupId={id} data={cards} />
            </div>
          ))}
        </KanbanBoard>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// ProjectBoard — 4 columns with project task domain data
// ---------------------------------------------------------------------------
export const ProjectBoard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A project management board for a software delivery team. Columns map to a lightweight Kanban workflow (Requested → Planned → In Flight → Shipped). Realistic card descriptions show the expected data density.',
      },
    },
  },
  render: () => {
    const columns: ColumnData[] = [
      {
        id: 'requested',
        label: 'Requested',
        cards: [
          { id: 'REQ-04', header: 'GDPR data erasure endpoint', content: 'Must comply with 30-day deletion SLA.' },
          { id: 'REQ-05', header: 'Webhook delivery retry with exponential backoff' },
          { id: 'REQ-06', header: 'Admin impersonation for support team' },
        ],
      },
      {
        id: 'planned',
        label: 'Planned',
        cards: [
          { id: 'PLN-08', header: 'Migrate from REST to tRPC on internal services', content: 'Scoped to IAM + billing. Est. 5 days.' },
          { id: 'PLN-09', header: 'Performance budget monitoring in CI' },
        ],
      },
      {
        id: 'in-flight',
        label: 'In Flight',
        cards: [
          { id: 'FLT-12', header: 'Role-based access control v2', content: 'Attribute-based policies. 60% complete.' },
          { id: 'FLT-13', header: 'Dashboard widget drag-to-rearrange', content: 'In review — Amelia H.' },
        ],
      },
      {
        id: 'shipped',
        label: 'Shipped',
        cards: [
          { id: 'SHP-07', header: 'Two-factor authentication via TOTP', footer: 'Released v3.4.0' },
          { id: 'SHP-08', header: 'Audit log for all admin actions', footer: 'Released v3.4.0' },
          { id: 'SHP-09', header: 'CSV export for all report views', footer: 'Released v3.3.2' },
        ],
      },
    ];

    return (
      <KanbanBoard className="flex gap-4">
        {columns.map(({ id, label, cards }) => (
          <div key={id} className="w-64 shrink-0">
            <div className="flex items-center gap-2 mb-2 px-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
              <span className="text-[0.65rem] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-full px-1.5">
                {cards.length}
              </span>
            </div>
            <KanbanColumn groupId={id} data={cards} />
          </div>
        ))}
      </KanbanBoard>
    );
  },
};

// ---------------------------------------------------------------------------
// MinimalBoard — 2 columns, simplest possible usage
// ---------------------------------------------------------------------------
export const MinimalBoard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The smallest viable KanbanBoard configuration: two columns and the minimum required props. Copy this pattern as a starting point.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="flex gap-4">
      <div className="w-64 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Open</p>
        <KanbanColumn
          groupId="open"
          data={[
            { id: 'M-01', header: 'Update privacy policy', content: 'Legal review scheduled for May 22.' },
            { id: 'M-02', header: 'Renew SSL certificate for api.company.io' },
          ]}
        />
      </div>
      <div className="w-64 shrink-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Resolved</p>
        <KanbanColumn
          groupId="resolved"
          data={[
            { id: 'M-03', header: 'Rotate AWS IAM access keys', footer: 'Completed 2025-05-14' },
          ]}
        />
      </div>
    </KanbanBoard>
  ),
};

// ---------------------------------------------------------------------------
// CustomStyling — demonstrate className on board and column wrapper
// ---------------------------------------------------------------------------
export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Apply any Tailwind layout utility to `KanbanBoard` via `className`. Here the board uses a grid instead of flex and the wrapper div adds a contrasting background to each column header area.',
      },
    },
  },
  render: () => (
    <KanbanBoard className="grid grid-cols-3 gap-6">
      {[
        { id: 'open', label: 'Open', count: 3, headerColor: 'border-t-4 border-primary-500' },
        { id: 'in-progress', label: 'In Progress', count: 1, headerColor: 'border-t-4 border-warning-500' },
        { id: 'closed', label: 'Closed', count: 2, headerColor: 'border-t-4 border-success-500' },
      ].map(({ id, label, count, headerColor }) => (
        <div key={id} className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm ${headerColor}`}>
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
              {label}
            </span>
            <span className="text-xs text-gray-400">{count}</span>
          </div>
          <div className="px-2 pb-2">
            <KanbanColumn
              groupId={id}
              data={
                id === 'open'
                  ? [
                      { id: `${id}-1`, header: 'Design new onboarding flow' },
                      { id: `${id}-2`, header: 'Write API documentation' },
                      { id: `${id}-3`, header: 'Update dependencies to latest' },
                    ]
                  : id === 'in-progress'
                    ? [{ id: `${id}-1`, header: 'Implement notification preferences', content: 'In progress — Kenji W.' }]
                    : [
                        { id: `${id}-1`, header: 'Migrate legacy auth module' },
                        { id: `${id}-2`, header: 'Archive unused S3 buckets' },
                      ]
              }
            />
          </div>
        </div>
      ))}
    </KanbanBoard>
  ),
};
