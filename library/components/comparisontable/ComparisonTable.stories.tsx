import type { Meta, StoryObj } from '@storybook/react';

import type { ComparisonRow } from './ComparisonTable';
import { ComparisonTable } from './ComparisonTable';

const meta: Meta<typeof ComparisonTable> = {
  title: 'Data/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**ComparisonTable** renders a feature-comparison grid — the classic pricing-table pattern where rows are features and columns are plans or products.

### Data shape
\`\`\`ts
columns: string[]          // e.g. ['Free', 'Pro', 'Enterprise']
rows: ComparisonRow[]      // { name: string; [col: string]: boolean | string | number }
\`\`\`

Cell values:
- **\`true\`** → renders a green ✓ checkmark
- **\`false\`** → renders a muted — dash
- **\`string | number\`** → renders the value as text

The first entry in \`columns\` is used as the **feature label column** header; remaining entries become plan columns. Use this component for pricing tables, product spec comparisons, and feature matrices.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic three-plan pricing comparison: Free / Pro / Enterprise.',
      },
    },
  },
  args: {
    columns: ['Feature', 'Free', 'Pro', 'Enterprise'],
    rows: [
      { name: 'Projects',         Free: '5',         Pro: 'Unlimited',  Enterprise: 'Unlimited' },
      { name: 'Storage',          Free: '10 GB',     Pro: '100 GB',     Enterprise: '1 TB' },
      { name: 'Team Members',     Free: '3',         Pro: '25',         Enterprise: 'Unlimited' },
      { name: 'API Access',       Free: false,       Pro: true,         Enterprise: true },
      { name: 'Custom Domains',   Free: false,       Pro: true,         Enterprise: true },
      { name: 'SLA',              Free: false,       Pro: false,        Enterprise: true },
      { name: 'Priority Support', Free: false,       Pro: false,        Enterprise: true },
    ] satisfies ComparisonRow[],
  },
};

export const TwoPlans: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Binary Free vs Pro comparison — the simplest upgrade pitch.',
      },
    },
  },
  args: {
    columns: ['Feature', 'Free', 'Pro'],
    rows: [
      { name: 'Bandwidth',        Free: '100 GB',    Pro: 'Unlimited' },
      { name: 'SSL Certificate',  Free: true,        Pro: true },
      { name: 'CDN',              Free: false,       Pro: true },
      { name: 'Custom Subdomain', Free: false,       Pro: true },
      { name: 'Analytics',        Free: 'Basic',     Pro: 'Advanced' },
      { name: '24/7 Support',     Free: false,       Pro: true },
    ] satisfies ComparisonRow[],
  },
};

export const ThreePlans: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Starter / Growth / Scale — a progressive SaaS tier structure with mixed string and boolean values.',
      },
    },
  },
  args: {
    columns: ['Feature', 'Starter', 'Growth', 'Scale'],
    rows: [
      { name: 'Users',              Starter: '5',        Growth: '50',          Scale: 'Unlimited' },
      { name: 'Workspaces',         Starter: '1',        Growth: '10',          Scale: 'Unlimited' },
      { name: 'Integrations',       Starter: false,      Growth: '10',          Scale: 'Unlimited' },
      { name: 'Custom Roles',       Starter: false,      Growth: true,          Scale: true },
      { name: 'Audit Logs',         Starter: false,      Growth: false,         Scale: true },
      { name: 'SSO / SAML',         Starter: false,      Growth: false,         Scale: true },
      { name: 'Priority Support',   Starter: false,      Growth: true,          Scale: true },
      { name: 'Dedicated CSM',      Starter: false,      Growth: false,         Scale: true },
    ] satisfies ComparisonRow[],
  },
};

export const FeatureMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A pure boolean feature matrix — every cell is either a checkmark or a dash. Ideal for concise capability comparisons.',
      },
    },
  },
  args: {
    columns: ['Capability', 'Basic', 'Standard', 'Premium'],
    rows: [
      { name: 'REST API',           Basic: true,  Standard: true,  Premium: true },
      { name: 'GraphQL API',        Basic: false, Standard: true,  Premium: true },
      { name: 'Webhooks',           Basic: false, Standard: true,  Premium: true },
      { name: 'OAuth 2.0',          Basic: false, Standard: true,  Premium: true },
      { name: 'IP Allow-listing',   Basic: false, Standard: false, Premium: true },
      { name: 'Custom Rate Limits', Basic: false, Standard: false, Premium: true },
      { name: 'HIPAA Compliance',   Basic: false, Standard: false, Premium: true },
    ] satisfies ComparisonRow[],
  },
};

export const SaaSPricingComparison: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Realistic SaaS pricing table for a project management product. Mix of seat limits, storage quotas, and boolean feature flags.',
      },
    },
  },
  render: () => (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Compare plans</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">All plans include a 14-day free trial. No credit card required.</p>
      </div>
      <ComparisonTable
        columns={['Feature', 'Free', 'Pro — $12/mo', 'Enterprise']}
        rows={[
          { name: 'Active Projects',    'Free': '5',          'Pro — $12/mo': '100',        'Enterprise': 'Unlimited' },
          { name: 'Team Members',       'Free': '3',          'Pro — $12/mo': '25',         'Enterprise': 'Unlimited' },
          { name: 'File Storage',       'Free': '2 GB',       'Pro — $12/mo': '100 GB',     'Enterprise': '1 TB' },
          { name: 'API Calls / month',  'Free': '10,000',     'Pro — $12/mo': '500,000',    'Enterprise': 'Unlimited' },
          { name: 'Custom Fields',      'Free': false,        'Pro — $12/mo': true,         'Enterprise': true },
          { name: 'Time Tracking',      'Free': false,        'Pro — $12/mo': true,         'Enterprise': true },
          { name: 'Advanced Reports',   'Free': false,        'Pro — $12/mo': true,         'Enterprise': true },
          { name: 'Audit Log',          'Free': false,        'Pro — $12/mo': false,        'Enterprise': true },
          { name: 'SSO / SAML',         'Free': false,        'Pro — $12/mo': false,        'Enterprise': true },
          { name: 'SLA Guarantee',      'Free': false,        'Pro — $12/mo': false,        'Enterprise': true },
          { name: 'Dedicated Support',  'Free': false,        'Pro — $12/mo': 'Email',      'Enterprise': 'Phone + Email' },
        ] satisfies ComparisonRow[]}
      />
    </div>
  ),
};

export const ProductComparison: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparing three cloud storage products by technical specifications — a non-pricing use case for ComparisonTable.',
      },
    },
  },
  args: {
    columns: ['Specification', 'AWS S3', 'Google Cloud Storage', 'Cloudflare R2'],
    rows: [
      { name: 'Egress Fees',        'AWS S3': '$0.09/GB',  'Google Cloud Storage': '$0.12/GB', 'Cloudflare R2': 'Free' },
      { name: 'Minimum Storage',    'AWS S3': 'None',      'Google Cloud Storage': 'None',      'Cloudflare R2': 'None' },
      { name: 'Global CDN',         'AWS S3': true,        'Google Cloud Storage': true,        'Cloudflare R2': true },
      { name: 'Object Versioning',  'AWS S3': true,        'Google Cloud Storage': true,        'Cloudflare R2': true },
      { name: 'S3-Compatible API',  'AWS S3': true,        'Google Cloud Storage': false,       'Cloudflare R2': true },
      { name: 'Server-Side Enc.',   'AWS S3': 'AES-256',   'Google Cloud Storage': 'AES-256',   'Cloudflare R2': 'AES-256' },
      { name: 'SLA Uptime',         'AWS S3': '99.99%',    'Google Cloud Storage': '99.95%',    'Cloudflare R2': '99.9%' },
    ] satisfies ComparisonRow[],
  },
};

export const AllTrue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: all cells are `true` — every plan has every feature. Useful for verifying alignment of the checkmark column.',
      },
    },
  },
  args: {
    columns: ['Feature', 'Plan A', 'Plan B', 'Plan C'],
    rows: [
      { name: 'Feature 1', 'Plan A': true, 'Plan B': true, 'Plan C': true },
      { name: 'Feature 2', 'Plan A': true, 'Plan B': true, 'Plan C': true },
      { name: 'Feature 3', 'Plan A': true, 'Plan B': true, 'Plan C': true },
    ] satisfies ComparisonRow[],
  },
};

export const MixedValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cells can be `true`, `false`, or any string — all three are used here to show the full value range.',
      },
    },
  },
  args: {
    columns: ['Feature', 'Starter', 'Growth', 'Scale'],
    rows: [
      { name: 'Users',          Starter: '5',   Growth: '50',        Scale: 'Unlimited' },
      { name: 'Workspaces',     Starter: '1',   Growth: '10',        Scale: 'Unlimited' },
      { name: 'Integrations',   Starter: false, Growth: '10',        Scale: 'Unlimited' },
      { name: 'Audit Logs',     Starter: false, Growth: false,       Scale: true },
      { name: 'SSO',            Starter: false, Growth: false,       Scale: true },
      { name: 'Priority Sup.',  Starter: false, Growth: true,        Scale: true },
    ] satisfies ComparisonRow[],
  },
};
