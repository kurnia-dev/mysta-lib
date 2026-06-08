import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Preset/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Badge** is a compact inline label used to communicate status, category, or count. It renders in three visual types and six severity colors.

**Types:**
- \`dot\` (default) — dark pill with a small severity-colored circle; ideal for status indicators
- \`filled\` — full background color derived from severity; more prominent
- \`outlined\` — transparent background with severity-colored border and text; softer alternative

**When to use:** Use Badge for status labels (Active, Pending, Archived), content categories (Frontend, Design, Backend), or notification counts. Avoid using more than two badges per list item to prevent visual clutter.
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
      description: 'Color severity that determines badge color.',
      table: { defaultValue: { summary: 'primary' } },
    },
    type: {
      control: 'radio',
      options: ['dot', 'filled', 'outlined'],
      description: 'Visual style variant of the badge.',
      table: { defaultValue: { summary: 'dot' } },
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the label.',
      table: { defaultValue: { summary: 'right' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'Active', severity: 'success', type: 'dot' },
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage — only `label` is required. The default type is `dot` and severity falls back to `primary`.',
      },
    },
  },
};

// ─── Type variants ────────────────────────────────────────────────────────────

export const Dot: Story = {
  args: { label: 'primary', severity: 'primary', type: 'dot' },
};

export const Filled: Story = {
  args: { label: 'success', severity: 'success', type: 'filled' },
};

export const Outlined: Story = {
  args: { label: 'danger', severity: 'danger', type: 'outlined' },
};

// ─── Icon variants ────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  args: { label: 'Verified', severity: 'success', type: 'filled', icon: 'check-circle', iconPos: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Icon on the left reinforces the badge meaning — useful for verified/approved statuses.',
      },
    },
  },
};

export const WithIconRight: Story = {
  args: { label: 'Alert', severity: 'warning', type: 'filled', icon: 'alert-circle', iconPos: 'right' },
  parameters: {
    docs: {
      description: {
        story: 'Icon on the right works well when the label leads and the icon provides supplementary context.',
      },
    },
  },
};

// ─── Grid / overview stories ──────────────────────────────────────────────────

export const AllDot: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severities rendered in `dot` style — the most common badge variant for status columns.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const).map((s) => (
        <Badge key={s} label={s} severity={s} type="dot" />
      ))}
    </div>
  ),
};

export const AllFilled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severities in `filled` style. More visually prominent than dot — use when the status must stand out.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const).map((s) => (
        <Badge key={s} label={s} severity={s} type="filled" />
      ))}
    </div>
  ),
};

export const AllOutlined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severities in `outlined` style. Use on light backgrounds where filled colors would be too heavy.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const).map((s) => (
        <Badge key={s} label={s} severity={s} type="outlined" />
      ))}
    </div>
  ),
};

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three types across all six severities — a complete visual reference.',
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {(['dot', 'filled', 'outlined'] as const).map((type) => (
        <div key={type} className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-400 w-16">{type}</span>
          {(['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const).map((s) => (
            <Badge key={s} label={s} severity={s} type={type} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Composition / real-world stories ────────────────────────────────────────

export const StatusBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common status patterns for asset/entity management UIs. Each status maps to a semantic severity color.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge label="Active" severity="success" type="dot" />
      <Badge label="Inactive" severity="secondary" type="dot" />
      <Badge label="Pending Review" severity="warning" type="dot" />
      <Badge label="Rejected" severity="danger" type="dot" />
      <Badge label="Draft" severity="info" type="dot" />
      <Badge label="Archived" severity="secondary" type="outlined" />
    </div>
  ),
};

export const TagBadges: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Content category tags — filled badges used as multi-select labels on articles, tasks, or assets.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge label="Frontend" severity="primary" type="filled" />
      <Badge label="Backend" severity="info" type="filled" />
      <Badge label="Design" severity="warning" type="filled" />
      <Badge label="DevOps" severity="secondary" type="filled" />
      <Badge label="Security" severity="danger" type="filled" />
      <Badge label="Data" severity="success" type="filled" />
    </div>
  ),
};

export const NotificationCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge used as a notification count indicator. Pair with an icon button in an app header or nav item.',
      },
    },
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="relative inline-flex">
        <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700" type="button">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17H20L18.595 15.595A1 1 0 0118 14.843V11a6 6 0 00-5-5.917V4a1 1 0 00-2 0v1.083A6 6 0 006 11v3.843a1 1 0 01-.595.757L4 17h5M15 17v1a3 3 0 01-6 0v-1M15 17H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="absolute -top-1.5 -right-1.5">
          <Badge label="3" severity="danger" type="filled" />
        </span>
      </div>
      <div className="relative inline-flex">
        <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700" type="button">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="absolute -top-1.5 -right-1.5">
          <Badge label="12" severity="primary" type="filled" />
        </span>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge placed inside a list item — the most common in-context placement. Shows how the badge reads alongside real content.',
      },
    },
  },
  render: () => (
    <div className="w-96 divide-y divide-gray-100 dark:divide-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {[
        { name: 'Alice Johnson', role: 'Admin', status: 'Active', severity: 'success' as const },
        { name: 'Bob Martinez', role: 'Editor', status: 'Pending', severity: 'warning' as const },
        { name: 'Carol Kim', role: 'Viewer', status: 'Inactive', severity: 'secondary' as const },
        { name: 'David Osei', role: 'Editor', status: 'Active', severity: 'success' as const },
      ].map((user) => (
        <div key={user.name} className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <Badge label={user.status} severity={user.severity} type="dot" />
        </div>
      ))}
    </div>
  ),
};
