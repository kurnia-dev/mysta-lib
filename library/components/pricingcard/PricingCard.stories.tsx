import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PricingCard } from './PricingCard';

const meta: Meta<typeof PricingCard> = {
  title: 'Form/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**PricingCard** displays a single pricing tier with a plan label, price, optional description, and a feature list.

When \`onSelect\` is provided the card behaves as a selectable button — clicking it highlights the card with an inverted dark/light theme and a green ring. Set \`selected={true}\` to mark a plan as the active choice.
Use it on pricing pages, upgrade prompts, and subscription selection flows. Compose three cards side by side for the canonical Free / Pro / Enterprise layout.
        `,
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether this pricing tier is currently selected (highlighted).',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PricingCard>;

export const Default: Story = {
  args: {
    description: 'For individuals and small teams',
    features: ['5 projects', '10 GB storage', 'Email support'],
    label: 'Starter',
    onSelect: () => {},
    price: '$9/mo',
    selected: false,
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `selected` state inverts the card color to dark with a green ring and checkmark badge — the recommended plan visual.',
      },
    },
  },
  args: {
    description: 'For growing teams',
    features: ['Unlimited projects', '100 GB storage', 'Priority support', 'Custom domains'],
    label: 'Pro',
    onSelect: () => {},
    price: '$29/mo',
    selected: true,
  },
};

export const NoFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant with only label, price, and description — no feature list. Useful for simple tier distinctions.',
      },
    },
  },
  args: {
    description: 'Try before you commit',
    label: 'Free',
    price: '$0/mo',
    selected: false,
  },
};

export const FeatureList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A single card with a realistic long feature list — tests that the checkmark list renders correctly at high item count.',
      },
    },
  },
  args: {
    description: 'Everything your team needs to scale',
    features: [
      'Unlimited projects',
      '500 GB storage',
      'SSO via SAML 2.0',
      'Priority support (4h SLA)',
      'Custom domains',
      'Advanced analytics',
      'Audit log (90 days)',
      'Role-based access control',
      'API rate limit: 10,000 req/hr',
      'Dedicated Slack channel',
    ],
    label: 'Business',
    onSelect: () => {},
    price: '$79/mo',
    selected: false,
  },
};

export const EnterprisePlan: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enterprise card using "Contact Sales" as the price — common when enterprise pricing is negotiated rather than listed.',
      },
    },
  },
  args: {
    description: 'Custom contracts, SLA, and dedicated support',
    features: [
      'Everything in Business',
      'Unlimited seats',
      'Dedicated infrastructure',
      '99.99% uptime SLA',
      'Custom integrations',
      'On-premise option',
      '24/7 premium support',
    ],
    label: 'Enterprise',
    onSelect: () => {},
    price: 'Contact Sales',
    selected: false,
  },
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three-card pricing group — click any plan to select it. The selected card inverts its color scheme and shows a checkmark.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState('pro');
    const plans = [
      { id: 'starter', label: 'Starter', price: '$9/mo', description: 'For individuals', features: ['5 projects', '10 GB'] },
      { id: 'pro', label: 'Pro', price: '$29/mo', description: 'For teams', features: ['Unlimited projects', '100 GB', 'Priority support'] },
      { id: 'enterprise', label: 'Enterprise', price: 'Custom', description: 'For large orgs', features: ['Everything in Pro', 'SLA', 'Dedicated support'] },
    ];
    return (
      <div className="flex gap-4 flex-wrap">
        {plans.map((p) => (
          <PricingCard
            key={p.id}
            description={p.description}
            features={p.features}
            label={p.label}
            price={p.price}
            selected={selected === p.id}
            onSelect={() => setSelected(p.id)}
          />
        ))}
      </div>
    );
  },
};

export const AllPlans: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The canonical Free / Pro / Enterprise three-card layout — Pro is pre-selected as the recommended plan. Click any card to switch selection.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string>('pro');

    const plans = [
      {
        id: 'free',
        label: 'Free',
        price: '$0',
        description: 'Get started at no cost',
        features: [
          '3 projects',
          '5 GB storage',
          'Community support',
          'Basic analytics',
        ],
      },
      {
        id: 'pro',
        label: 'Pro',
        price: '$29/mo',
        description: 'For professional teams',
        features: [
          'Unlimited projects',
          '100 GB storage',
          'Priority support',
          'Advanced analytics',
          'Custom domains',
          'Audit log',
        ],
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        price: 'Contact Sales',
        description: 'For large organisations',
        features: [
          'Everything in Pro',
          'Unlimited seats',
          '99.99% SLA',
          'Dedicated support',
          'Custom integrations',
          'On-premise option',
        ],
      },
    ];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose your plan</h2>
          <p className="text-sm text-gray-500 mt-1">Upgrade or downgrade at any time.</p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {plans.map((p) => (
            <PricingCard
              key={p.id}
              description={p.description}
              features={p.features}
              label={p.label}
              price={p.price}
              selected={selected === p.id}
              onSelect={() => setSelected(p.id)}
            />
          ))}
        </div>
        <p className="text-xs text-center text-gray-400">
          Selected: <span className="font-semibold text-gray-700 dark:text-gray-200">{plans.find((p) => p.id === selected)?.label}</span>
        </p>
      </div>
    );
  },
};

export const Highlighted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-selected "Pro" card next to an unselected "Starter" — shows the visual contrast between the selected dark variant and the unselected light variant.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string>('pro');
    return (
      <div className="flex gap-4">
        <PricingCard
          description="For solo projects"
          features={['3 projects', '5 GB', 'Community support']}
          label="Starter"
          price="$9/mo"
          selected={selected === 'starter'}
          onSelect={() => setSelected('starter')}
        />
        <PricingCard
          description="Most popular — for growing teams"
          features={['Unlimited projects', '100 GB', 'Priority support', 'Custom domains']}
          label="Pro"
          price="$29/mo"
          selected={selected === 'pro'}
          onSelect={() => setSelected('pro')}
        />
      </div>
    );
  },
};

export const WithMonthlyAnnualToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Monthly / annual billing toggle — annual pricing shows 20% savings. Demonstrates connecting PricingCard to external state for dynamic price display.',
      },
    },
  },
  render: () => {
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    const [selected, setSelected] = useState('pro');

    const plans: Array<{
      id: string;
      label: string;
      monthly: string;
      annual: string;
      description: string;
      features: string[];
    }> = [
      {
        id: 'basic',
        label: 'Basic',
        monthly: '$9/mo',
        annual: '$7/mo',
        description: 'For individuals',
        features: ['5 projects', '10 GB', 'Email support'],
      },
      {
        id: 'pro',
        label: 'Pro',
        monthly: '$29/mo',
        annual: '$23/mo',
        description: 'For teams',
        features: ['Unlimited projects', '100 GB', 'Priority support', 'Custom domains'],
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        monthly: '$99/mo',
        annual: '$79/mo',
        description: 'For organisations',
        features: ['Everything in Pro', 'Unlimited seats', 'SLA', '24/7 support'],
      },
    ];

    return (
      <div className="space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
            Monthly
          </span>
          <button
            className={`relative w-12 h-6 rounded-full transition-colors ${billing === 'annual' ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'}`}
            type="button"
            onClick={() => setBilling((b) => (b === 'monthly' ? 'annual' : 'monthly'))}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${billing === 'annual' ? 'translate-x-6' : ''}`}
            />
          </button>
          <span className={`text-sm font-medium ${billing === 'annual' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
            Annual
            {billing === 'annual' && (
              <span className="ml-1.5 text-[0.65rem] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            )}
          </span>
        </div>

        {/* Cards */}
        <div className="flex gap-4 flex-wrap justify-center">
          {plans.map((p) => (
            <PricingCard
              key={p.id}
              description={p.description}
              features={p.features}
              label={p.label}
              price={billing === 'monthly' ? p.monthly : p.annual}
              selected={selected === p.id}
              onSelect={() => setSelected(p.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const SaaS: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic SaaS pricing page: Basic ($9/mo) / Pro ($29/mo) / Enterprise (custom). Pro is pre-selected as the recommended plan.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState('pro');

    return (
      <div className="space-y-6 max-w-3xl">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Simple, transparent pricing</h2>
          <p className="text-sm text-gray-500">Start free. Upgrade when your team is ready.</p>
        </div>

        <div className="flex gap-5 justify-center flex-wrap">
          <PricingCard
            description="Perfect for solo developers and side projects"
            features={[
              '3 active projects',
              '5 GB storage',
              'Community forum support',
              'Basic analytics (30 days)',
            ]}
            label="Basic"
            price="$9/mo"
            selected={selected === 'basic'}
            onSelect={() => setSelected('basic')}
          />

          <PricingCard
            description="Designed for growing product teams"
            features={[
              'Unlimited projects',
              '100 GB storage',
              'Priority email support (next day)',
              'Advanced analytics (1 year)',
              'Custom domains',
              'Team roles & permissions',
              'Audit log (90 days)',
            ]}
            label="Pro"
            price="$29/mo"
            selected={selected === 'pro'}
            onSelect={() => setSelected('pro')}
          />

          <PricingCard
            description="Tailored for large organisations with compliance needs"
            features={[
              'Everything in Pro',
              'Unlimited seats',
              'Dedicated account manager',
              '99.99% uptime SLA',
              'SSO / SAML 2.0',
              'On-premise deployment',
              'Custom data retention',
            ]}
            label="Enterprise"
            price="Contact Sales"
            selected={selected === 'enterprise'}
            onSelect={() => setSelected('enterprise')}
          />
        </div>

        <p className="text-xs text-center text-gray-400">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    );
  },
};
