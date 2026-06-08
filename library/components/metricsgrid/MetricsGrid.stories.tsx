import type { Meta, StoryObj } from '@storybook/react';

import type { MetricItem, MetricsGridProps } from './MetricsGrid';
import { MetricsGrid } from './MetricsGrid';

const meta: Meta<typeof MetricsGrid> = {
  title: 'Data/MetricsGrid',
  component: MetricsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**MetricsGrid** arranges multiple \`StatCard\` components in a responsive CSS grid. Use it whenever you need to display a set of KPI metrics together — it handles the column layout, gap spacing, and optional staggered fade-in animation for you.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`MetricItem[]\` | — | Array of StatCard props extended with a required \`id\` string |
| \`cols\` | \`2 \\| 3 \\| 4\` | \`3\` | Number of columns on large viewports (always 1 col on mobile, 2 on tablet) |
| \`stagger\` | \`boolean\` | \`true\` | Enables staggered fade-in animation on mount |

### MetricItem shape
\`MetricItem\` extends \`StatCardProps\` (minus \`pt\`) and adds a required \`id: string\` field used as the React list key.

Prefer MetricsGrid over a manual \`flex\` row of StatCards to get consistent responsive breakpoints across the library.
        `,
      },
    },
  },
  argTypes: {
    cols: {
      control: 'radio',
      options: [2, 3, 4],
      description: 'Number of grid columns on large viewports.',
      table: { defaultValue: { summary: '3' } },
    },
    stagger: {
      control: 'boolean',
      description: 'Enable staggered fade-in animation on mount.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MetricsGrid>;

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const baseItems: MetricItem[] = [
  { id: 'users',   icon: 'users',         label: 'Total Users',   severity: 'primary', subtitle: 'vs last month', trend: '+12%',   trendUp: true,  value: '24,521' },
  { id: 'revenue', icon: 'dollar',        label: 'Revenue',       severity: 'success', subtitle: 'vs last month', trend: '+8.2%',  trendUp: true,  value: '$48,320' },
  { id: 'bounce',  icon: 'alert-circle',  label: 'Bounce Rate',   severity: 'danger',  subtitle: 'vs last month', trend: '-3.1%',  trendUp: false, value: '42.3%' },
];

const fourItems: MetricItem[] = [
  ...baseItems,
  { id: 'uptime',  icon: 'check-circle',  label: 'Uptime',        severity: 'info',    subtitle: 'rolling 30d',   trend: '+0.01%', trendUp: true,  value: '99.97%' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { cols: 3, items: baseItems, stagger: false },
};

export const WithStagger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each card fades in with a 60 ms stagger delay after mount. Refresh the page / re-mount the story to replay the animation.',
      },
    },
  },
  args: { cols: 3, items: baseItems, stagger: true },
};

export const TwoColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: '`cols={2}` — two-column layout, suitable for a sidebar dashboard or a narrow panel.',
      },
    },
  },
  args: { cols: 2, items: baseItems.slice(0, 2), stagger: false },
};

export const ThreeColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default three-column layout — the most common dashboard top-row pattern.',
      },
    },
  },
  args: { cols: 3, items: baseItems, stagger: false },
};

export const FourColumns: Story = {
  parameters: {
    docs: {
      description: {
        story: '`cols={4}` — four-column layout for wide screens.',
      },
    },
  },
  args: { cols: 4, items: fourItems, stagger: false },
};

export const WithTrends: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All cards include trend values. `trendUp={false}` shows a downward arrow in danger/warning color.',
      },
    },
  },
  render: () => (
    <MetricsGrid
      cols={3}
      items={[
        { id: 'conv',   label: 'Conversion Rate', severity: 'success', trend: '+0.4%', trendUp: true,  value: '3.8%' },
        { id: 'churn',  label: 'Churn Rate',       severity: 'danger',  trend: '-0.3%', trendUp: false, value: '2.1%' },
        { id: 'nps',    label: 'NPS Score',        severity: 'info',    trend: '+4',    trendUp: true,  value: '67' },
      ]}
      stagger={false}
    />
  ),
};

export const EcommerceDashboard: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Six-card e-commerce top-line: Revenue, Orders, Customers, Returns, Conversion Rate, and Average Order Value.',
      },
    },
  },
  render: () => (
    <MetricsGrid
      cols={3}
      items={[
        { id: 'revenue',  icon: 'dollar',        label: 'Gross Revenue',      severity: 'success', subtitle: 'vs last month', trend: '+11.4%', trendUp: true,  value: '$124,830' },
        { id: 'orders',   icon: 'check-circle',  label: 'Total Orders',       severity: 'primary', subtitle: 'vs last month', trend: '+8.7%',  trendUp: true,  value: '3,421' },
        { id: 'customers',icon: 'users',         label: 'New Customers',      severity: 'info',    subtitle: 'this month',    trend: '+5.2%',  trendUp: true,  value: '892' },
        { id: 'returns',  icon: 'alert-triangle',label: 'Return Rate',        severity: 'warning', subtitle: 'vs last month', trend: '+0.6%',  trendUp: false, value: '4.3%' },
        { id: 'conv',     icon: 'check-circle',  label: 'Conversion Rate',    severity: 'success', subtitle: 'visit → buy',   trend: '+0.2%',  trendUp: true,  value: '2.9%' },
        { id: 'aov',      icon: 'dollar',        label: 'Avg Order Value',    severity: 'primary', subtitle: 'all channels',  trend: '+$3.40', trendUp: true,  value: '$36.50' },
      ] satisfies MetricItem[]}
      stagger
    />
  ),
};

export const ServerMonitoring: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Infrastructure monitoring grid: CPU, Memory, Disk, Network throughput, Request rate, and Error rate.',
      },
    },
  },
  render: () => (
    <MetricsGrid
      cols={3}
      items={[
        { id: 'cpu',      icon: 'check-circle',  label: 'CPU Usage',          severity: 'warning', subtitle: 'avg last 5 min', trend: '+3%',   trendUp: false, value: '72%' },
        { id: 'memory',   icon: 'check-circle',  label: 'Memory Usage',       severity: 'success', subtitle: 'of 32 GB',       trend: '-1%',   trendUp: true,  value: '44%' },
        { id: 'disk',     icon: 'alert-circle',  label: 'Disk Usage',         severity: 'danger',  subtitle: 'of 500 GB',      trend: '+2%',   trendUp: false, value: '89%' },
        { id: 'network',  icon: 'check-circle',  label: 'Network In/Out',     severity: 'info',    subtitle: 'MB/s',           trend: '+12%',  trendUp: true,  value: '340 MB/s' },
        { id: 'rps',      icon: 'check-circle',  label: 'Requests / sec',     severity: 'primary', subtitle: 'p50',            trend: '+5%',   trendUp: true,  value: '2,140' },
        { id: 'errors',   icon: 'alert-triangle',label: 'Error Rate',         severity: 'danger',  subtitle: 'last 10 min',    trend: '+0.1%', trendUp: false, value: '0.4%' },
      ] satisfies MetricItem[]}
      stagger
    />
  ),
};

export const MinimalItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: a single metric item in a 3-column grid — the item occupies the first column only.',
      },
    },
  },
  args: {
    cols: 3,
    stagger: false,
    items: [{ id: 'single', label: 'Active Sessions', value: '142' }],
  },
};
