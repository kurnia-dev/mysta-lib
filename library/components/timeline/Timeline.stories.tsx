import type { Meta, StoryObj } from '@storybook/react';

import type { TimelineItem } from './Timeline';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Data/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Timeline** displays a vertical list of ordered events, each with a period label, a title/role, and an optional description. A colored dot marks each event; the \`current\` flag renders the dot in green with a ring to highlight the active entry.

Use Timeline for:
- Career / work history
- Project milestone tracking
- Audit logs and activity feeds
- Incident reports and order tracking

### TimelineItem shape
\`\`\`ts
{
  period: string;       // e.g. "2023 – Present" or "14 May 2026 09:41"
  role: string;         // primary label (event title)
  description?: string; // optional secondary text
  color?: string;       // CSS color string for the dot
  current?: boolean;    // marks the active/current entry
}
\`\`\`
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

// ---------------------------------------------------------------------------
// Core stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three career milestones with descriptions and a `current` flag on the active role.',
      },
    },
  },
  args: {
    items: [
      { color: '#3b82f6', current: true,  period: '2023 – Present', role: 'Senior Backend Engineer', description: 'Building BETS multi-service Go backend with Temporal, PeerDB, and Kafka.' },
      { color: '#8b5cf6',                 period: '2022 – 2023',    role: 'Freelance Frontend Dev',  description: 'Built React component library and a portfolio site for clients.' },
      { color: '#10b981',                 period: '2021 – 2022',    role: 'Junior Developer',         description: 'Laravel + Vue projects for various SMB clients.' },
    ] satisfies TimelineItem[],
  },
};

export const WithCurrent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `current: true` flag renders the dot with an emerald color and a ring indicator — use it for the most recent / in-progress entry.',
      },
    },
  },
  args: {
    items: [
      { current: true,  period: '2024 – Present', role: 'Tech Lead',          description: 'Platform architecture, team leadership, and cross-service API design.' },
      {                 period: '2022 – 2024',    role: 'Senior Backend Dev',  description: 'Led migration to microservices; 4× latency improvement.' },
      {                 period: '2020 – 2022',    role: 'Backend Developer',   description: 'Delivered CRUD services for a SaaS inventory platform.' },
    ] satisfies TimelineItem[],
  },
};

export const NoDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal timeline — only `period` and `role`, no descriptions. Compact and scannable.',
      },
    },
  },
  args: {
    items: [
      { color: '#3b82f6', period: '2023 – Now',  role: 'Backend Engineer' },
      { color: '#6b7280', period: '2021 – 2023', role: 'Full Stack Dev' },
      { color: '#6b7280', period: '2019 – 2021', role: 'Junior Dev' },
    ] satisfies TimelineItem[],
  },
};

export const ManyItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Five-item timeline with a current marker, verifying that the vertical connector renders correctly through all but the last entry.',
      },
    },
  },
  args: {
    items: [
      { color: '#3b82f6', current: true, period: '2024 – Now',  role: 'Tech Lead',          description: 'Leading a team of 8 across 3 squads.' },
      { color: '#8b5cf6',                period: '2022 – 2024', role: 'Senior Backend Dev',  description: 'Led platform migration to Go microservices.' },
      { color: '#10b981',                period: '2020 – 2022', role: 'Backend Developer',   description: 'Owned two core services end-to-end.' },
      { color: '#f59e0b',                period: '2019 – 2020', role: 'Freelancer',           description: 'Contract web work; Laravel, Vue, MySQL.' },
      { color: '#6b7280',                period: '2019',        role: 'Intern',               description: 'Bootcamp graduation project.' },
    ] satisfies TimelineItem[],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { color: '#10b981', current: true, period: '2023 – Now',  role: 'Staff Engineer' },
      { color: '#3b82f6',                period: '2020 – 2023', role: 'Senior Engineer' },
    ] satisfies TimelineItem[],
  },
};

// ---------------------------------------------------------------------------
// Domain scenarios
// ---------------------------------------------------------------------------

export const ProjectMilestones: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Project launch timeline with key milestones from kick-off through go-live.',
      },
    },
  },
  args: {
    items: [
      { color: '#10b981', current: true, period: '30 Apr 2026', role: 'Go-Live',              description: 'Production deployment completed. All smoke tests passed.' },
      { color: '#3b82f6',                period: '14 Apr 2026', role: 'UAT Sign-off',          description: 'Business stakeholders approved acceptance criteria.' },
      { color: '#3b82f6',                period: '01 Apr 2026', role: 'Beta Testing',          description: 'Internal beta with 20 power users. 34 issues logged and resolved.' },
      { color: '#8b5cf6',                period: '10 Mar 2026', role: 'Feature Freeze',        description: 'Codebase locked for stabilisation. QA regression cycle begins.' },
      { color: '#8b5cf6',                period: '03 Feb 2026', role: 'Sprint 1 Kickoff',      description: 'First sprint started after design review and tech planning.' },
      { color: '#6b7280',                period: '15 Jan 2026', role: 'Project Kick-off',      description: 'Stakeholder alignment session. Scope, budget, and timeline agreed.' },
    ] satisfies TimelineItem[],
  },
};

export const AuditLog: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User activity audit log — recent events listed newest-first with timestamps.',
      },
    },
  },
  args: {
    items: [
      { color: '#10b981', current: true, period: '20 May 2026 14:32', role: 'Exported report',         description: 'User downloaded "Q1 Revenue Report.xlsx".' },
      { color: '#3b82f6',                period: '20 May 2026 11:08', role: 'Added team member',        description: 'Invited grace@acme.com as Editor.' },
      { color: '#f59e0b',                period: '19 May 2026 17:55', role: 'Changed password',          description: 'Password updated via Account Settings.' },
      { color: '#6b7280',                period: '19 May 2026 09:01', role: 'Logged in',                 description: 'Authenticated from 203.0.113.42 (Tokyo, JP).' },
    ] satisfies TimelineItem[],
  },
};

export const OrderTracking: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce order tracking — shows the fulfilment pipeline from placement to delivery.',
      },
    },
  },
  args: {
    items: [
      { color: '#10b981', current: true, period: '21 May 2026 13:20', role: 'Delivered',               description: 'Package left at front door. Signed by resident.' },
      { color: '#3b82f6',                period: '21 May 2026 08:05', role: 'Out for delivery',         description: 'Driver: Alex T. — estimated arrival 12:00–16:00.' },
      { color: '#3b82f6',                period: '20 May 2026 22:30', role: 'Shipped',                  description: 'Tracking: TN-8832940-JP. Carrier: DHL Express.' },
      { color: '#8b5cf6',                period: '20 May 2026 14:47', role: 'Payment confirmed',        description: 'Visa •••• 4242 charged $89.99.' },
      { color: '#6b7280',                period: '20 May 2026 14:45', role: 'Order placed',             description: 'Order #ORD-20240520-001 created.' },
    ] satisfies TimelineItem[],
  },
};

export const IncidentTimeline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Incident report timeline showing the lifecycle of a production outage from detection to resolution.',
      },
    },
  },
  args: {
    items: [
      { color: '#10b981', current: true, period: '20 May 2026 03:41', role: 'Resolved',                description: 'Root cause identified: misconfigured rate-limit rule. Rolled back. All services nominal.' },
      { color: '#3b82f6',                period: '20 May 2026 03:12', role: 'Investigating',            description: 'Engineering on-call isolating affected microservices. Load balancer bypass applied.' },
      { color: '#f59e0b',                period: '20 May 2026 02:58', role: 'Acknowledged',             description: 'On-call engineer paged. Incident severity set to P1.' },
      { color: '#ef4444',                period: '20 May 2026 02:47', role: 'Detected',                 description: 'Error rate spike >40%. PagerDuty alert fired automatically.' },
    ] satisfies TimelineItem[],
  },
};
