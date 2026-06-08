import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { IconCard } from './IconCard';

const meta: Meta<typeof IconCard> = {
  title: 'Data/IconCard',
  component: IconCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**IconCard** is a compact card pairing a prominent icon with a label and optional detail line.

When an \`onClick\` handler is provided the component renders as a \`<button>\` with hover styles, making it a tappable navigation tile.
Without \`onClick\` it renders as a \`<div>\` — useful for pure informational display (e.g., stat summaries).
Use it for feature grids, navigation tiles, category cards, and dashboard stat summaries where a small visual anchor (icon) helps recognition.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof IconCard>;

export const Default: Story = {
  args: { detail: 'Last run 2h ago', icon: '🚀', label: 'Deploy' },
};

export const WithDetail: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `detail` prop adds a secondary line below the label — ideal for timestamps, subtitles, or counts.',
      },
    },
  },
  args: { detail: 'View all 1,284 members', icon: '👥', label: 'Team Members' },
};

export const WithoutDetail: Story = {
  args: { icon: '⚙️', label: 'Settings' },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With an `onClick` handler, IconCard renders as a `<button>` with hover background and cursor-pointer. Click to see it in action.',
      },
    },
  },
  args: { detail: 'Manage team members', icon: '👥', label: 'Users', onClick: () => alert('clicked') },
};

export const Grid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clickable 2×2 grid — the typical navigation tile pattern. Each card navigates to a different section.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-72">
      <IconCard icon="🚀" label="Deploy" detail="Production" onClick={() => {}} />
      <IconCard icon="📊" label="Analytics" detail="Last 30 days" onClick={() => {}} />
      <IconCard icon="⚙️" label="Settings" detail="Configure" onClick={() => {}} />
      <IconCard icon="🔔" label="Alerts" detail="3 active" onClick={() => {}} />
    </div>
  ),
};

export const StatsCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Non-clickable stat display — icon anchors the metric type visually while the label holds the value and the detail provides context.',
      },
    },
  },
  render: () => (
    <div className="space-y-2 w-72">
      <IconCard icon="📈" label="$48,320" detail="Revenue this month" />
      <IconCard icon="👤" label="12,847" detail="Registered users" />
      <IconCard icon="📦" label="342 orders" detail="Processed today" />
      <IconCard icon="⚡" label="99.9% uptime" detail="Last 90 days" />
    </div>
  ),
};

export const FeatureCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Marketing feature grid — icon + feature name + short benefit description. Renders as a non-clickable display card.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-96">
      <IconCard icon="🎨" label="Preset Themes" detail="6 built-in color presets" />
      <IconCard icon="🌙" label="Dark Mode" detail="Automatic .dark class toggle" />
      <IconCard icon="♿" label="Accessible" detail="ARIA roles on every component" />
      <IconCard icon="📦" label="Tree-shakeable" detail="Import only what you use" />
      <IconCard icon="🔒" label="Type-safe" detail="Full TypeScript coverage" />
      <IconCard icon="⚡" label="Zero runtime" detail="No runtime CSS injection" />
    </div>
  ),
};

export const DashboardGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four clickable metric cards in a row — the canonical dashboard header pattern. Each navigates to a drilldown page.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState<string | null>(null);
    const cards = [
      { icon: '👥', label: 'Users', detail: '12,847 registered' },
      { icon: '💰', label: 'Revenue', detail: '$48,320 this month' },
      { icon: '📦', label: 'Orders', detail: '342 processed today' },
      { icon: '🎫', label: 'Support', detail: '18 open tickets' },
    ];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 w-96">
          {cards.map((c) => (
            <IconCard
              key={c.label}
              className={active === c.label ? 'ring-2 ring-blue-500' : ''}
              detail={c.detail}
              icon={c.icon}
              label={c.label}
              onClick={() => setActive(c.label)}
            />
          ))}
        </div>
        {active && (
          <p className="text-xs text-center text-gray-500">
            Navigating to: <span className="font-semibold text-gray-800 dark:text-white">{active}</span>
          </p>
        )}
      </div>
    );
  },
};

export const NavigationGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Application navigation tiles — icon cards arranged as a mobile-style app launcher or settings menu.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-3 w-80">
      {[
        { icon: '👤', label: 'Profile', detail: 'Account settings' },
        { icon: '🔔', label: 'Notifications', detail: '5 unread' },
        { icon: '🔒', label: 'Security', detail: '2FA enabled' },
        { icon: '📊', label: 'Reports', detail: 'Export data' },
        { icon: '🔌', label: 'Integrations', detail: '3 connected' },
        { icon: '❓', label: 'Help', detail: 'Docs & support' },
      ].map((c) => (
        <IconCard
          key={c.label}
          detail={c.detail}
          icon={c.icon}
          label={c.label}
          onClick={() => {}}
        />
      ))}
    </div>
  ),
};

export const LongLabelOverflow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: both label and detail are longer than the card width — both truncate with an ellipsis rather than wrapping.',
      },
    },
  },
  args: {
    detail: 'Last synchronised 3 minutes ago from remote origin',
    icon: '🔄',
    label: 'Synchronise all remote repositories',
  },
};
