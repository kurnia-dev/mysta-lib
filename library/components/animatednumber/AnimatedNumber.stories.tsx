import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { AnimatedNumber } from './AnimatedNumber';

const meta: Meta<typeof AnimatedNumber> = {
  title: 'Animation/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**AnimatedNumber** smoothly counts from a \`from\` value to a \`to\` value over a configurable \`duration\` (ms).
Use it for dashboards, stats sections, and landing pages where a number should appear to "count up" on mount.

Supply a \`format\` function to display currency, percentages, units, or any custom string.
The animation re-triggers whenever the \`to\` prop changes, making it ideal for live-updating metrics.
        `,
      },
    },
  },
  argTypes: {
    to: {
      control: 'number',
      description: 'Target value the animation counts up to.',
      table: { defaultValue: { summary: '—' } },
    },
    from: {
      control: 'number',
      description: 'Starting value before the animation begins.',
      table: { defaultValue: { summary: '0' } },
    },
    duration: {
      control: { type: 'range', min: 100, max: 5000, step: 100 },
      description: 'Animation duration in milliseconds.',
      table: { defaultValue: { summary: '400' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AnimatedNumber>;

export const Default: Story = {
  args: { duration: 1500, from: 0, to: 1234 },
};

export const Currency: Story = {
  args: {
    duration: 2000,
    format: (v: number) => `$${Math.round(v).toLocaleString()}`,
    from: 0,
    to: 48320,
  },
};

export const Percentage: Story = {
  args: {
    duration: 1000,
    format: (v: number) => `${v.toFixed(1)}%`,
    from: 0,
    to: 94.7,
  },
};

export const FastAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A very short 300ms duration. Useful for small counters where a long animation would feel sluggish.',
      },
    },
  },
  args: { duration: 300, from: 0, to: 999 },
};

export const SlowAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Duration extended to 3000ms so the count-up easing is clearly visible. Set duration via the Controls tab to compare.',
      },
    },
  },
  args: { duration: 3000, from: 0, to: 10000 },
};

export const CountUp: Story = {
  args: { duration: 1500, from: 0, to: 100, format: (v: number) => `${Math.round(v)} users` },
};

export const CountDown: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Counting downward by setting `from` higher than `to`. Useful for countdown timers or remaining-slots counters.',
      },
    },
  },
  args: { duration: 1500, from: 60, to: 0, format: (v: number) => `${Math.round(v)}s` },
};

export const WithClassName: Story = {
  args: {
    className: 'text-4xl font-bold text-primary-500',
    duration: 1500,
    format: (v: number) => `$${Math.round(v).toLocaleString()}`,
    from: 0,
    to: 24521,
  },
};

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three metrics animating simultaneously, each with different durations and formats — typical dashboard hero section.',
      },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <div className="text-center">
        <AnimatedNumber className="text-3xl font-bold text-green-600" duration={1500} format={(v) => `$${Math.round(v).toLocaleString()}`} from={0} to={48320} />
        <p className="text-xs text-gray-400 mt-1">Revenue</p>
      </div>
      <div className="text-center">
        <AnimatedNumber className="text-3xl font-bold text-blue-600" duration={1200} from={0} to={1284} />
        <p className="text-xs text-gray-400 mt-1">Users</p>
      </div>
      <div className="text-center">
        <AnimatedNumber className="text-3xl font-bold text-yellow-500" duration={800} format={(v) => `${v.toFixed(1)}%`} from={0} to={94.7} />
        <p className="text-xs text-gray-400 mt-1">Uptime</p>
      </div>
    </div>
  ),
};

export const CounterWithButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to increment the value and watch the animation re-trigger from the current display value to the new target.',
      },
    },
  },
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-6">
        <AnimatedNumber
          className="text-5xl font-bold tabular-nums text-gray-900 dark:text-white"
          duration={600}
          from={0}
          to={count}
        />
        <button
          className="px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
          type="button"
          onClick={() => setCount((c) => c + 100)}
        >
          Add 100
        </button>
      </div>
    );
  },
};

export const RevenueCounter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic revenue counter — formats with locale-aware thousands separator and a dollar prefix. Duration is 2.5s so the animation is noticeable.',
      },
    },
  },
  render: () => (
    <div className="text-center space-y-1">
      <p className="text-xs text-gray-400 uppercase tracking-widest">Monthly Revenue</p>
      <AnimatedNumber
        className="text-5xl font-bold font-mono text-emerald-600"
        duration={2500}
        format={(v) => `$${Math.round(v).toLocaleString('en-US')}`}
        from={0}
        to={48320}
      />
      <p className="text-xs text-gray-400">+12% vs last month</p>
    </div>
  ),
};

export const LiveStats: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three animated numbers side by side — Users, Orders, and Revenue — all starting at zero and animating simultaneously with staggered durations.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-8 text-center">
      {[
        { label: 'Active Users', value: 12847, format: (v: number) => Math.round(v).toLocaleString(), color: 'text-blue-600' },
        { label: 'Orders Today', value: 342, format: (v: number) => String(Math.round(v)), color: 'text-orange-500' },
        { label: 'Revenue', value: 48320, format: (v: number) => `$${Math.round(v).toLocaleString()}`, color: 'text-emerald-600' },
      ].map(({ label, value, format, color }) => (
        <div key={label}>
          <AnimatedNumber
            className={`text-3xl font-bold ${color}`}
            duration={1800}
            format={format}
            from={0}
            to={value}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
        </div>
      ))}
    </div>
  ),
};
