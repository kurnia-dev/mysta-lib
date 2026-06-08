import type { Meta, StoryObj } from '@storybook/react';

import { AnimatedNumber } from '../animatednumber/AnimatedNumber';
import { Stagger } from './Stagger';

const meta: Meta<typeof Stagger> = {
  title: 'Animation/Stagger',
  component: Stagger,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Stagger** wraps its children and applies a sequential \`animationDelay\` to each one, producing a cascade entrance effect.

Each child's delay is \`delay × index\` seconds, where \`delay\` defaults to \`0.05\`. The parent container applies a \`className\` for layout control (e.g., \`grid\`, \`flex\`, \`space-y-2\`).
Use it any time a set of elements should appear one after another rather than all at once — lists, card grids, dashboard widgets, and navigation menus all benefit from stagger.

Note: Stagger sets the CSS \`animationDelay\` only — you must provide the animation itself via a CSS class (e.g. a Tailwind \`animate-\` class or a global keyframe applied to the child element).
        `,
      },
    },
  },
  argTypes: {
    delay: {
      control: { type: 'range', min: 0.01, max: 0.6, step: 0.01 },
      description: "Seconds between each child's animation start. Final child delay = delay × (n−1).",
      table: { defaultValue: { summary: '0.05' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Stagger>;

export const Default: Story = {
  render: () => (
    <Stagger delay={0.1}>
      {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((label) => (
        <div key={label} className="px-4 py-3 mb-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
          {label} item
        </div>
      ))}
    </Stagger>
  ),
};

export const FastDelay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Delay of 0.05s — the cascade is subtle and snappy. Use for long lists where a slow stagger would feel tedious.',
      },
    },
  },
  render: () => (
    <Stagger delay={0.05}>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((label) => (
        <div key={label} className="px-4 py-3 mb-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
          {label} — delay=0.05s
        </div>
      ))}
    </Stagger>
  ),
};

export const SlowDelay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Delay of 0.3s — clearly shows the stagger concept. Use sparingly for dramatic entrances with few items.',
      },
    },
  },
  render: () => (
    <Stagger delay={0.3}>
      {['One', 'Two', 'Three'].map((label) => (
        <div key={label} className="px-4 py-3 mb-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
          {label} — delay=0.3s between each
        </div>
      ))}
    </Stagger>
  ),
};

export const Cards: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stat cards staggering in — mimics a dashboard load animation where each metric appears in sequence.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Stagger delay={0.08}>
        {[
          { title: 'Revenue', value: '$48,320', color: 'text-green-600' },
          { title: 'Users', value: '1,284', color: 'text-blue-600' },
          { title: 'Errors', value: '17', color: 'text-red-500' },
        ].map((item) => (
          <div key={item.title} className="mb-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex justify-between items-center">
            <span className="text-sm text-gray-500">{item.title}</span>
            <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </Stagger>
    </div>
  ),
};

export const CardGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Six stat cards in a 2-column grid, each staggering in with a 0.07s offset. Demonstrates using Stagger with a grid layout via className.',
      },
    },
  },
  render: () => (
    <Stagger className="grid grid-cols-2 gap-3 w-96" delay={0.07}>
      {[
        { title: 'Active Users', value: '12,847', icon: '👥', color: 'bg-blue-50 dark:bg-blue-950' },
        { title: 'Revenue', value: '$48,320', icon: '💰', color: 'bg-green-50 dark:bg-green-950' },
        { title: 'Orders', value: '342', icon: '📦', color: 'bg-orange-50 dark:bg-orange-950' },
        { title: 'Uptime', value: '99.9%', icon: '⚡', color: 'bg-yellow-50 dark:bg-yellow-950' },
        { title: 'Tickets', value: '18 open', icon: '🎫', color: 'bg-purple-50 dark:bg-purple-950' },
        { title: 'Deploys', value: '7 today', icon: '🚀', color: 'bg-pink-50 dark:bg-pink-950' },
      ].map((card) => (
        <div key={card.title} className={`rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${card.color}`}>
          <div className="text-xl mb-1">{card.icon}</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{card.value}</div>
          <div className="text-xs text-gray-500">{card.title}</div>
        </div>
      ))}
    </Stagger>
  ),
};

export const ListItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A stagger-animated list of recent activity items — each row appears sequentially to draw attention down the list.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Recent Activity
      </h3>
      <Stagger delay={0.09}>
        {[
          { user: 'Aira Tanaka', action: 'deployed to production', time: '2 min ago', dot: 'bg-green-500' },
          { user: 'Reza Firmansyah', action: 'opened PR #248 — feat: auth refactor', time: '15 min ago', dot: 'bg-blue-500' },
          { user: 'Siti Rahmawati', action: 'closed issue #312 — fix: pagination bug', time: '1h ago', dot: 'bg-purple-500' },
          { user: 'Budi Santoso', action: 'commented on PR #245', time: '3h ago', dot: 'bg-yellow-500' },
          { user: 'Dewi Lestari', action: 'created milestone v2.0.0', time: '5h ago', dot: 'bg-orange-500' },
        ].map((item) => (
          <div key={item.user + item.time} className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{item.user}</span>
                {' '}
                <span className="text-gray-500">{item.action}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </Stagger>
    </div>
  ),
};

export const DashboardEntrance: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic dashboard load: a header stat row followed by four animated metric values, all staggering in at page load. Combines Stagger with AnimatedNumber.',
      },
    },
  },
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <span className="text-xs text-gray-400">May 2026</span>
      </div>
      <Stagger className="grid grid-cols-4 gap-3" delay={0.1}>
        {[
          { label: 'Users', value: 12847, format: (v: number) => Math.round(v).toLocaleString(), color: 'text-blue-600' },
          { label: 'Revenue', value: 48320, format: (v: number) => `$${Math.round(v).toLocaleString()}`, color: 'text-emerald-600' },
          { label: 'Orders', value: 342, format: (v: number) => String(Math.round(v)), color: 'text-orange-500' },
          { label: 'Uptime', value: 99.9, format: (v: number) => `${v.toFixed(1)}%`, color: 'text-yellow-500' },
        ].map(({ label, value, format, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <AnimatedNumber className={`text-2xl font-bold ${color}`} duration={1400} format={format} from={0} to={value} />
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </Stagger>
    </div>
  ),
};

export const FastStagger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal 0.03s delay — the cascade is barely perceptible but avoids the "everything pops at once" look. Good for large grids.',
      },
    },
  },
  render: () => (
    <Stagger className="space-y-1.5" delay={0.03}>
      {Array.from({ length: 8 }, (_, i) => `Item ${i + 1} — fast cascade`).map((label) => (
        <div key={label} className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200">
          {label}
        </div>
      ))}
    </Stagger>
  ),
};

export const SlowStagger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Exaggerated 0.35s delay so the cascade is unmistakable. Use for dramatic reveals of 3–4 items (feature lists, onboarding steps).',
      },
    },
  },
  render: () => (
    <Stagger className="space-y-3" delay={0.35}>
      {[
        { step: '01', title: 'Install the library', desc: 'pnpm add @mystaline/mysta-commons' },
        { step: '02', title: 'Wrap your app', desc: 'Add <MystaLibProvider> at the root' },
        { step: '03', title: 'Use the components', desc: 'Import from @mystaline/mysta-commons' },
        { step: '04', title: 'Ship to production', desc: 'Zero runtime overhead. Tree-shakeable.' },
      ].map(({ step, title, desc }) => (
        <div key={step} className="flex items-start gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <span className="text-xs font-mono font-bold text-gray-300 dark:text-gray-600 pt-0.5">{step}</span>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </Stagger>
  ),
};
