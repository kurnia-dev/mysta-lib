import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Preset/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Card** is a surface container that groups related content with an optional header, body, and footer. It supports two modes:

- \`container\` (default) — a static presentational surface. Use for dashboards, product listings, settings panels, and user profiles.
- \`kanban\` — a draggable card for KanbanBoard/KanbanColumn workflows. When \`mode="kanban"\` and \`draggable=true\`, the card participates in drag-and-drop, and a \`menus\` prop adds a hover-revealed icon menu via Popover.

**Key props:**
- \`header\`, \`content\`, \`footer\` — simple string shortcuts
- \`slots\` — override any zone with JSX for rich content
- \`clickable\` — adds role=button and focus ring for interactive cards
- \`useSeparator\` (default true) — shows a visual divider between header and body
- \`severity\` — tints the card border/header to communicate status
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['container', 'kanban'],
      description: 'Render mode of the card.',
      table: { defaultValue: { summary: 'container' } },
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Tints the card surface to communicate severity or status.',
    },
    clickable: {
      control: 'boolean',
      description: 'Adds role=button and keyboard interaction.',
      table: { defaultValue: { summary: 'false' } },
    },
    useSeparator: {
      control: 'boolean',
      description: 'Shows a separator line between the header and content zones.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { content: 'Card content goes here.' },
};

export const WithHeader: Story = {
  args: { content: 'Main content of the card.', header: 'Card Title' },
};

export const WithFooter: Story = {
  args: {
    content: 'Main content here.',
    footer: 'Last updated 20 May 2026',
    header: 'Card Title',
  },
};

// ─── Slot customisation ───────────────────────────────────────────────────────

export const WithSlots: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three slots overridden with JSX — header, content, and footer. Slots take precedence over the string shortcut props.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Card
        slots={{
          header: (
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Q2 Sales Report</span>
              <Button icon="more-horizontal" severity="secondary" text />
            </div>
          ),
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Revenue grew 18 % quarter-over-quarter, driven by enterprise contracts in APAC.
              </p>
              <Badge label="On Track" severity="success" type="dot" />
            </div>
          ),
          footer: (
            <div className="flex justify-end gap-2">
              <Button label="Download" outlined severity="secondary" />
              <Button label="Share" severity="primary" />
            </div>
          ),
        }}
      />
    </div>
  ),
};

// ─── Interaction ──────────────────────────────────────────────────────────────

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clickable cards are focusable via keyboard and fire an onClick. Useful for navigating to a detail view.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Card
        clickable
        content="Click anywhere on this card to navigate to the detail view."
        header="Asset #A-00142 — Network Switch"
        onClick={() => alert('Navigating to asset detail…')}
      />
    </div>
  ),
};

// ─── Severity ─────────────────────────────────────────────────────────────────

export const WithSeverity: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Severity tints the card surface. Use to communicate health or status at a glance in dashboard layouts.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <div key={s} className="w-44">
          <Card content={`severity="${s}"`} header={s} severity={s} />
        </div>
      ))}
    </div>
  ),
};

// ─── Structure options ────────────────────────────────────────────────────────

export const NoSeparator: Story = {
  args: {
    content: 'No visual divider between the header and content zones.',
    header: 'Seamless Card',
    useSeparator: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Setting `useSeparator=false` merges the header and content visually — useful for compact cards or when the header uses a background color.',
      },
    },
  },
};

export const ContainerMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container mode (the default) wraps arbitrary layout inside the card. Here the content slot holds a 2-column grid.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Card
        mode="container"
        slots={{
          header: <span className="font-semibold text-sm">Asset Summary</span>,
          content: (
            <div className="grid grid-cols-2 gap-3 p-2">
              {[
                { label: 'Total', value: '1,248' },
                { label: 'Active', value: '1,112' },
                { label: 'In Maintenance', value: '89' },
                { label: 'Decommissioned', value: '47' },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="font-semibold mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          ),
          footer: <span className="text-xs text-gray-400">Updated 2 minutes ago</span>,
        }}
      />
    </div>
  ),
};

// ─── Real-world templates ─────────────────────────────────────────────────────

export const ProductCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A product listing card with name, description, category badge, and pricing footer.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Card
        slots={{
          header: (
            <div className="flex items-center justify-between">
              <span className="font-semibold">RFID Asset Tag Pro</span>
              <Badge label="In Stock" severity="success" type="dot" />
            </div>
          ),
          content: (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Industrial-grade UHF RFID tag with 10-year battery life. IP68 rated for harsh environments.
              </p>
              <Badge label="Hardware" severity="info" type="filled" />
            </div>
          ),
          footer: (
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">Rp 185.000 / unit</span>
              <Button icon="shopping-cart" label="Add to Cart" severity="primary" />
            </div>
          ),
        }}
      />
    </div>
  ),
};

export const UserCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A user profile card showing avatar, name, role badge, and action buttons in the footer.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Card
        slots={{
          header: (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                AJ
              </div>
              <div>
                <p className="font-semibold text-sm">Alice Johnson</p>
                <p className="text-xs text-gray-500">alice@qtera.io</p>
              </div>
            </div>
          ),
          content: (
            <div className="flex gap-2 flex-wrap">
              <Badge label="Admin" severity="primary" type="filled" />
              <Badge label="IAM Team" severity="secondary" type="outlined" />
            </div>
          ),
          footer: (
            <div className="flex justify-end gap-2">
              <Button icon="mail" label="Message" outlined severity="secondary" />
              <Button icon="settings" label="Manage" severity="primary" />
            </div>
          ),
        }}
      />
    </div>
  ),
};

export const TaskCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A task card with title, assignee, due date, and priority badge — typical in project management UIs.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Card
        slots={{
          header: (
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-sm leading-snug">Integrate RFID readers with Temporal workflow</span>
              <Badge label="High" severity="danger" type="filled" />
            </div>
          ),
          content: (
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-500 inline-flex items-center justify-center text-white text-[9px] font-bold">D</span>
                <span>David Osei</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>Due 30 May 2026</span>
              </div>
            </div>
          ),
          footer: (
            <div className="flex items-center justify-between">
              <Badge label="In Progress" severity="warning" type="dot" />
              <span className="text-xs text-gray-400">3 / 7 subtasks</span>
            </div>
          ),
        }}
      />
    </div>
  ),
};

export const DashboardWidget: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card used as a dashboard metric widget — clean header, large KPI value, and a trend indicator in the footer.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        { title: 'Total Assets', value: '12,483', trend: '+4.2% this month', severity: 'success' as const },
        { title: 'Pending Approvals', value: '37', trend: '+12 since yesterday', severity: 'warning' as const },
        { title: 'Active Users', value: '284', trend: 'No change', severity: 'info' as const },
      ].map((widget) => (
        <div key={widget.title} className="w-56">
          <Card
            slots={{
              header: <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{widget.title}</span>,
              content: (
                <p className="text-3xl font-bold py-1">{widget.value}</p>
              ),
              footer: (
                <div className="flex items-center gap-1.5">
                  <Badge label={widget.trend} severity={widget.severity} type="dot" />
                </div>
              ),
            }}
          />
        </div>
      ))}
    </div>
  ),
};
