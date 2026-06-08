import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { useCountUp } from './useCountUp';
import type { UseCountUpOptions } from './useCountUp';

const meta: Meta = {
  title: 'Hooks/useCountUp',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useCountUp** animates a number from a starting value to a target value using \`requestAnimationFrame\`, with configurable duration and easing.

\`\`\`ts
const current = useCountUp({
  from?: number;     // start value, default 0
  to: number;        // target value (required)
  duration?: number; // animation time in ms, default 400
  ease?: (t: number) => number; // easing function, default easeOutCubic
  enabled?: boolean; // start immediately, default true
}): number
\`\`\`

- Returns the current animated integer value, updated each animation frame.
- Animation restarts automatically when \`to\`, \`from\`, or \`enabled\` changes.
- Pass \`enabled={false}\` to defer the animation until a user action (e.g. button click or scroll-into-view).
- Duration is capped to \`Math.min(duration, Math.abs(diff) * 0.15)\` to prevent very slow animations on small ranges.
- The hook uses \`easeOutCubic\` by default — it starts fast and decelerates. Import other easings from \`lib/utils\`.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — 0 to 1000 on mount
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [key, setKey] = useState(0);
  const value = useCountUp({ from: 0, to: 1000, duration: 1200 });

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">Count up</p>
        <div key={key} className="text-7xl font-bold tabular-nums text-neutral-900 dark:text-white">
          {value.toLocaleString()}
        </div>
      </div>
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-violet-600 rounded-full transition-none"
          style={{ width: `${(value / 1000) * 100}%` }}
        />
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors"
      >
        Replay animation
      </button>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        from: 0 · to: 1000 · duration: 1200ms
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Counts from 0 to 1,000 on mount with a 1200ms easeOutCubic animation. Click "Replay animation" to restart.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// WithCustomRange — configurable from/to with restart button
// ---------------------------------------------------------------------------
function WithCustomRangeDemo() {
  const [from, setFrom] = useState(500);
  const [to, setTo] = useState(1500);
  const [key, setKey] = useState(0);

  const animFrom = from;
  const animTo = to;

  // Re-mount the counter by changing key
  const CounterDisplay = useCallback(() => {
    const value = useCountUp({ from: animFrom, to: animTo, duration: 1000 });
    return (
      <div className="text-6xl font-bold tabular-nums text-neutral-900 dark:text-white text-center">
        {value.toLocaleString()}
      </div>
    );
  }, [animFrom, animTo]);

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Custom Range</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">From</label>
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(Number(e.target.value))}
            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">To</label>
          <input
            type="number"
            value={to}
            onChange={(e) => setTo(Number(e.target.value))}
            className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      <div key={key} className="py-6 px-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
        <CounterDisplay />
      </div>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors"
      >
        Restart animation
      </button>
    </div>
  );
}

export const WithCustomRange: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set custom from/to values and click "Restart animation" to replay. Try negative numbers, large ranges, or from > to for a count-down effect.',
      },
    },
  },
  render: () => <WithCustomRangeDemo />,
};

// ---------------------------------------------------------------------------
// RevenueCounter — $0 → $48,320 with prefix
// ---------------------------------------------------------------------------
function RevenueCounterDemo() {
  const [active, setActive] = useState(true);
  const revenue = useCountUp({ from: 0, to: 48320, duration: 1800, enabled: active });
  const orders = useCountUp({ from: 0, to: 1247, duration: 1400, enabled: active });
  const customers = useCountUp({ from: 0, to: 384, duration: 1000, enabled: active });

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[420px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Q4 2025 Performance</h3>
        <button
          onClick={() => setActive((v) => !v)}
          className="text-xs px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
        >
          {active ? 'Replay' : 'Start'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 p-4 text-white">
          <p className="text-xs opacity-75 mb-1">Revenue</p>
          <p className="text-2xl font-bold tabular-nums">${revenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-4 text-white">
          <p className="text-xs opacity-75 mb-1">Orders</p>
          <p className="text-2xl font-bold tabular-nums">{orders.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 text-white">
          <p className="text-xs opacity-75 mb-1">Customers</p>
          <p className="text-2xl font-bold tabular-nums">{customers.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Three independent counters with different durations for staggered feel.
      </p>
    </div>
  );
}

export const RevenueCounter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three simultaneous counters with different durations creating a staggered animation effect. Realistic dashboard stat card pattern.',
      },
    },
  },
  render: () => <RevenueCounterDemo />,
};

// ---------------------------------------------------------------------------
// UserCount — count to 24,521 with locale formatting
// ---------------------------------------------------------------------------
function UserCountDemo() {
  const [key, setKey] = useState(0);

  function AnimatedUserCount() {
    const count = useCountUp({ from: 0, to: 24521, duration: 2000 });
    return (
      <div className="text-5xl font-bold tabular-nums text-center text-neutral-900 dark:text-white">
        {count.toLocaleString('en-US')}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Total registered users</p>
        <div key={key}>
          <AnimatedUserCount />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">and growing every day</p>
      </div>

      <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
        <span className="text-emerald-600 dark:text-emerald-400 text-lg">↑</span>
        <div>
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">+12.4% this month</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500">2,721 new users</p>
        </div>
      </div>

      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
      >
        Replay
      </button>
    </div>
  );
}

export const UserCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Counts to 24,521 with `toLocaleString()` formatting (comma separator). Typical "users joined" or "items sold" social proof widget.',
      },
    },
  },
  render: () => <UserCountDemo />,
};

// ---------------------------------------------------------------------------
// Triggered — count-up starts on button click
// ---------------------------------------------------------------------------
function TriggeredDemo() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState(9847);

  const value = useCountUp({ from: 0, to: target, duration: 1500, enabled });

  const targets = [1000, 9847, 42000, 100000] as const;

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">Triggered Animation</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Pass <code className="font-mono">enabled=false</code> to hold the counter until a user event.
        </p>
      </div>

      <div className="py-6 text-center">
        <div className="text-6xl font-bold tabular-nums text-neutral-900 dark:text-white">
          {value.toLocaleString()}
        </div>
        <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          target: {target.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {targets.map((t) => (
          <button
            key={t}
            onClick={() => { setTarget(t); setEnabled(false); setTimeout(() => setEnabled(true), 50); }}
            className={`py-1 rounded-md text-xs font-medium transition-colors ${target === t && enabled ? 'bg-violet-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
          >
            {t >= 1000 ? `${t / 1000}k` : t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setEnabled(true)}
          disabled={enabled}
          className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
        >
          Start
        </button>
        <button
          onClick={() => setEnabled(false)}
          className="flex-1 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-medium text-sm transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export const Triggered: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The count-up only starts when "Start" is clicked (`enabled=true`). Use this pattern with `useIntersectionObserver` to trigger the animation when a stat card enters the viewport.',
      },
    },
  },
  render: () => <TriggeredDemo />,
};
