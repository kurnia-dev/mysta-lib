import type { Meta, StoryObj } from '@storybook/react';

import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Preset/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**StatCard** displays a single KPI metric — a prominent value, a label, an optional trend indicator, and an optional icon.

Use it in dashboard grids to surface key business numbers at a glance. The \`severity\` prop tints the card's icon and trend color. The \`trendUp\` boolean controls the direction arrow (▲ / ▼). Set \`clickable={true}\` with an \`onClick\` handler to make the whole card navigate to a detail view.

Do **not** use StatCard for tabular data or multi-value comparisons — use MetricsGrid, ComparisonTable, or Table instead.
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'],
      description: 'Color severity variant that tints the icon and accent elements.',
      table: { defaultValue: { summary: 'neutral' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Padding / text size variant.',
      table: { defaultValue: { summary: 'md' } },
    },
    trendUp: {
      control: 'boolean',
      description: 'Direction of the trend arrow. `true` = up (positive), `false` = down (negative).',
    },
    clickable: {
      control: 'boolean',
      description: 'Renders the card with hover/focus styles and calls `onClick` on press.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { label: 'Total Users', value: '24,521' },
};

export const WithTrend: Story = {
  args: {
    label: 'Revenue',
    severity: 'success',
    subtitle: 'vs last month',
    trend: '+8.2%',
    trendUp: true,
    value: '$48,320',
  },
};

export const TrendDown: Story = {
  args: {
    label: 'Error Rate',
    severity: 'danger',
    subtitle: 'last 24 h',
    trend: '+41%',
    trendUp: false,
    value: '143',
  },
};

export const WithoutTrend: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bare minimum: just a label and a value — no trend, no icon, no subtitle.',
      },
    },
  },
  args: { label: 'Registered Accounts', value: '8,902' },
};

export const NegativeTrend: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A negative trend does not always mean a problem — lower bounce rate or churn are wins. Set `trendUp={false}` and pick `severity` to match domain semantics.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatCard label="Churn Rate"   severity="danger"  subtitle="vs prev quarter" trend="-2.1%" trendUp={false} value="4.7%" />
      <StatCard label="Bounce Rate"  severity="success" subtitle="vs prev month"   trend="-3.4%" trendUp={false} value="38.6%" />
      <StatCard label="Support Tix." severity="warning" subtitle="this week"       trend="+18%"  trendUp={false} value="72" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: 'users', label: 'Active Users', severity: 'primary', value: '1,284' },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const SizeSM: Story = {
  args: { label: 'Requests', size: 'sm', subtitle: 'today', value: '5,023' },
};

export const SizeMD: Story = {
  args: { label: 'Revenue', size: 'md', value: '$12,300' },
};

export const SizeLG: Story = {
  args: { icon: 'check-circle', label: 'Growth', severity: 'success', size: 'lg', trend: '+22%', trendUp: true, value: '+22%' },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three size variants side-by-side.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <StatCard label="Small card"  size="sm" value="1,234" />
      <StatCard label="Medium card" size="md" value="5,678" />
      <StatCard label="Large card"  size="lg" value="9,012" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Clickable: Story = {
  args: {
    clickable: true,
    label: 'Open Tasks',
    severity: 'warning',
    value: '7',
    onClick: () => alert('Navigate to tasks'),
  },
};

export const Neutral: Story = {
  args: { label: 'Storage Used', severity: 'neutral', value: '67 GB' },
};

// ---------------------------------------------------------------------------
// Grid stories
// ---------------------------------------------------------------------------

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All severity variants in a single row.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const).map(
        (s) => <StatCard key={s} label={s} severity={s} trend="+5%" trendUp value="999" />,
      )}
    </div>
  ),
};

export const AllWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each severity paired with a domain-appropriate icon.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatCard icon="users"          label="Total Users"   severity="primary"   value="24,521" />
      <StatCard icon="dollar"         label="Revenue"       severity="success"   trend="+12%"  trendUp value="$48k" />
      <StatCard icon="alert-triangle" label="Warnings"      severity="warning"   value="3" />
      <StatCard icon="x"              label="Error Rate"    severity="danger"    trend="+5"    trendUp={false} value="1.4%" />
      <StatCard icon="check-circle"   label="Uptime"        severity="info"      value="99.9%" />
    </div>
  ),
};

export const DashboardGrid: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Realistic 2×2 dashboard grid: Revenue, Active Users, Conversion Rate, and Churn — the four most common SaaS top-line metrics.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      <StatCard icon="dollar"      label="Monthly Revenue"   severity="success" subtitle="vs last month" trend="+8.2%"  trendUp      value="$48,320" />
      <StatCard icon="users"       label="Active Users"      severity="primary" subtitle="monthly active" trend="+1,240" trendUp      value="24,521" />
      <StatCard icon="check-circle" label="Conversion Rate"  severity="info"    subtitle="signup → paid"  trend="+0.4%" trendUp      value="3.8%" />
      <StatCard icon="alert-circle" label="Churn Rate"       severity="danger"  subtitle="vs last quarter" trend="-0.3%" trendUp={false} value="2.1%" />
    </div>
  ),
};

export const AnalyticsRow: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Three-card horizontal row for a web analytics section: Sessions, Bounce Rate, and Average Session Duration.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      <StatCard label="Sessions"         severity="primary" subtitle="last 7 days"   trend="+12.4%" trendUp      value="142,830" />
      <StatCard label="Bounce Rate"      severity="warning" subtitle="last 7 days"   trend="-2.1%"  trendUp={false} value="41.2%" />
      <StatCard label="Avg. Duration"    severity="info"    subtitle="per session"    trend="+0:23"  trendUp      value="3m 47s" />
    </div>
  ),
};
