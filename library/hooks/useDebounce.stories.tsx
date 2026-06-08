import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useDebounce } from './useDebounce';

const meta: Meta = {
  title: 'Hooks/useDebounce',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useDebounce** delays propagating a value until it stops changing for a given number of milliseconds. It is a pure passthrough hook — no side effects, no refs, just a delayed mirror of the input.

\`\`\`ts
const debouncedValue = useDebounce<T>(value: T, delay?: number): T;
\`\`\`

- \`value\` — any state value (string, number, object…)
- \`delay\` — debounce window in milliseconds. Defaults to \`300\`.
- Returns the last stable value after the delay has elapsed with no new changes.

**Common use cases:** search inputs (defer API calls), live validation (avoid per-keystroke checks), expensive derived calculations.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [raw, setRaw] = useState('');
  const debounced = useDebounce(raw, 300);

  return (
    <div className="flex flex-col gap-5 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Type something
        </label>
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Start typing..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
          <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Raw value</p>
          <p className="text-sm text-red-800 dark:text-red-300 break-all min-h-[20px] font-mono">{raw || <span className="italic opacity-50">empty</span>}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Debounced (300ms)</p>
          <p className="text-sm text-green-800 dark:text-green-300 break-all min-h-[20px] font-mono">{debounced || <span className="italic opacity-50">empty</span>}</p>
        </div>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        The green value updates 300ms after you stop typing.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type in the input and watch the debounced value lag behind by 300ms. The raw value updates on every keystroke; the debounced value updates only when you pause.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// WithCustomDelay — slider to change debounce window
// ---------------------------------------------------------------------------
function WithCustomDelayDemo() {
  const [raw, setRaw] = useState('');
  const [delay, setDelay] = useState(500);
  const debounced = useDebounce(raw, delay);

  return (
    <div className="flex flex-col gap-5 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Delay</label>
          <span className="text-sm font-mono font-bold text-violet-600 dark:text-violet-400">{delay}ms</span>
        </div>
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full accent-violet-600"
        />
        <div className="flex justify-between text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
          <span>100ms</span>
          <span>2000ms</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Input</label>
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Type to see debounce behavior..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">Immediate</p>
          <p className="text-sm font-mono text-neutral-900 dark:text-white min-h-[20px]">{raw || '—'}</p>
        </div>
        <div className="rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-3">
          <p className="text-xs text-violet-600 dark:text-violet-400 mb-0.5">After {delay}ms</p>
          <p className="text-sm font-mono text-violet-900 dark:text-violet-300 min-h-[20px]">{debounced || '—'}</p>
        </div>
      </div>
    </div>
  );
}

export const WithCustomDelay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drag the slider to change the debounce window from 100ms to 2000ms. With a long delay you can clearly see the debounced value trailing behind the raw value.',
      },
    },
  },
  render: () => <WithCustomDelayDemo />,
};

// ---------------------------------------------------------------------------
// SearchWithDebounce — realistic search
// ---------------------------------------------------------------------------
const MOCK_RESULTS: Record<string, string[]> = {
  react: ['React Router', 'React Query', 'React Hook Form', 'React Spring'],
  next: ['Next.js 14', 'Next Auth', 'Next SEO'],
  tail: ['Tailwind CSS', 'Tailwind UI', 'Tailwind Forms'],
  type: ['TypeScript', 'type-fest', 'ts-node', 'typescript-eslint'],
};

function getMockResults(query: string): string[] {
  if (!query.trim()) return [];
  const lower = query.toLowerCase();
  for (const [key, results] of Object.entries(MOCK_RESULTS)) {
    if (lower.includes(key)) return results;
  }
  return [`No packages matching "${query}"`];
}

function SearchWithDebounceDemo() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [apiCallCount, setApiCallCount] = useState(0);

  const results = getMockResults(debouncedQuery);

  // Track debounced changes (would be API call in real app)
  const prevDebounced = useState(debouncedQuery)[0];
  if (prevDebounced !== debouncedQuery && debouncedQuery) {
    // intentionally not tracking in effect — just for display
  }

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Package search</h3>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "react", "next", "tail", or "type"...'
          className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
      </div>

      <div className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 rounded-md px-3 py-2 text-neutral-600 dark:text-neutral-400">
        {debouncedQuery
          ? <>API call would fire with: <strong className="text-violet-600 dark:text-violet-400">"{debouncedQuery}"</strong></>
          : <span className="italic opacity-60">Waiting for input...</span>
        }
      </div>

      {results.length > 0 && (
        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          {results.map((r) => (
            <li key={r} className="px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
              📦 {r}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Debounce delay: <strong>400ms</strong> — the API call fires only after you pause typing.
      </p>
    </div>
  );
}

export const SearchWithDebounce: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic package search: the "API call" only fires 400ms after the user stops typing. Try typing "react", "next", "tail", or "type" to see mock results.',
      },
    },
  },
  render: () => <SearchWithDebounceDemo />,
};

// ---------------------------------------------------------------------------
// FormValidation — debounced field validation
// ---------------------------------------------------------------------------
function validateEmail(email: string): string | null {
  if (!email) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
}

function FormValidationDemo() {
  const [email, setEmail] = useState('');
  const debouncedEmail = useDebounce(email, 600);
  const error = validateEmail(debouncedEmail);
  const isValid = debouncedEmail.length > 0 && error === null;

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Account registration</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Email address
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="priya@example.com"
            className={`w-full px-3 py-2 pr-9 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-red-400 focus:ring-red-300 bg-red-50 dark:bg-red-900/10'
                : isValid
                ? 'border-green-400 focus:ring-green-300 bg-green-50 dark:bg-green-900/10'
                : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:ring-violet-500'
            } text-neutral-900 dark:text-white`}
          />
          {debouncedEmail && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
              {isValid ? '✅' : '❌'}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
        )}
        {isValid && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">Looks good!</p>
        )}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Validation runs 600ms after you stop typing — no red error on every keystroke.
      </p>
    </div>
  );
}

export const FormValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Email validation is debounced by 600ms. No error flashes while the user is still typing — the check only runs after a 600ms pause.',
      },
    },
  },
  render: () => <FormValidationDemo />,
};
