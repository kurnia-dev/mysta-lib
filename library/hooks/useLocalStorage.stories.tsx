import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useLocalStorage } from './useLocalStorage';

const meta: Meta = {
  title: 'Hooks/useLocalStorage',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useLocalStorage** is a drop-in replacement for \`useState\` that automatically persists state to \`localStorage\`.

\`\`\`ts
const [value, setValue] = useLocalStorage<T>(key: string, initialValue: T);
\`\`\`

- Reads the current value from \`localStorage\` on mount. Falls back to \`initialValue\` if not set.
- \`setValue\` accepts a direct value or an updater function (same API as \`useState\`).
- Values survive page reloads. Multiple components sharing the same key will each have their own state snapshot (no cross-component sync on this version).
- Silently ignores \`QuotaExceededError\` (private/incognito mode) — falls back to in-memory state.

> **Browser-only:** Requires \`window.localStorage\`. Not SSR-safe without a guard.

Open **DevTools → Application → Local Storage** to verify values are persisted.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — counter
// ---------------------------------------------------------------------------
function CounterDemo() {
  const [count, setCount] = useLocalStorage<number>('storybook-counter', 0);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
        Persistent Counter
      </h3>
      <div className="text-6xl font-bold text-neutral-900 dark:text-white tabular-nums">{count}</div>
      <div className="flex gap-3 w-full">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="flex-1 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xl font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          −
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="flex-1 py-2 rounded-lg bg-violet-600 text-white text-xl font-medium hover:bg-violet-700 transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Key: <code className="font-mono">storybook-counter</code> · Survives page reload
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Increment and decrement the counter. Reload the page — the count is restored from `localStorage` key `"storybook-counter"`.',
      },
    },
  },
  render: () => <CounterDemo />,
};

// ---------------------------------------------------------------------------
// StringValue — text input
// ---------------------------------------------------------------------------
function StringValueDemo() {
  const [draft, setDraft] = useLocalStorage<string>('storybook-draft-note', '');

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Draft note
        </label>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="Start typing — your note is saved automatically..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
        <span>{draft.length} characters</span>
        <button
          onClick={() => setDraft('')}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          Clear
        </button>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Key: <code className="font-mono">storybook-draft-note</code>
      </p>
    </div>
  );
}

export const StringValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type in the textarea. The string is persisted character by character to `localStorage`. Reload the page and your note is still there.',
      },
    },
  },
  render: () => <StringValueDemo />,
};

// ---------------------------------------------------------------------------
// ObjectValue — user preferences
// ---------------------------------------------------------------------------
interface UserPrefs {
  language: string;
  timezone: string;
  notifications: boolean;
  theme: 'system' | 'light' | 'dark';
}

const DEFAULT_PREFS: UserPrefs = {
  language: 'en-US',
  timezone: 'Asia/Jakarta',
  notifications: true,
  theme: 'system',
};

function ObjectValueDemo() {
  const [prefs, setPrefs] = useLocalStorage<UserPrefs>('storybook-user-prefs', DEFAULT_PREFS);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <h3 className="font-semibold text-neutral-900 dark:text-white">User Preferences</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Language</label>
          <select
            value={prefs.language}
            onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
            className="w-full px-2 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
          >
            <option value="en-US">English (US)</option>
            <option value="id-ID">Bahasa Indonesia</option>
            <option value="ja-JP">日本語</option>
            <option value="ko-KR">한국어</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Theme</label>
          <select
            value={prefs.theme}
            onChange={(e) => setPrefs((p) => ({ ...p, theme: e.target.value as UserPrefs['theme'] }))}
            className="w-full px-2 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={prefs.notifications}
          onChange={(e) => setPrefs((p) => ({ ...p, notifications: e.target.checked }))}
          className="rounded"
        />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">Enable notifications</span>
      </label>

      <div>
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Stored JSON:</p>
        <pre className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded-md p-3 overflow-auto text-neutral-700 dark:text-neutral-300">
          {JSON.stringify(prefs, null, 2)}
        </pre>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Key: <code className="font-mono">storybook-user-prefs</code>
      </p>
    </div>
  );
}

export const ObjectValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complex objects are serialized via `JSON.stringify`. Modify the preferences and see the JSON update in real-time. All changes persist across reloads.',
      },
    },
  },
  render: () => <ObjectValueDemo />,
};

// ---------------------------------------------------------------------------
// WithReset — back to initialValue
// ---------------------------------------------------------------------------
function WithResetDemo() {
  const INITIAL = 42;
  const [value, setValue] = useLocalStorage<number>('storybook-resettable', INITIAL);
  const [editInput, setEditInput] = useState(String(value));

  const handleSet = () => {
    const parsed = parseInt(editInput, 10);
    if (!isNaN(parsed)) setValue(parsed);
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Resettable Value</h3>
      <div className="text-center">
        <div className="text-5xl font-bold text-violet-600 tabular-nums">{value}</div>
        <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">current stored value</div>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          className="flex-1 px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
          placeholder="New value"
        />
        <button
          onClick={handleSet}
          className="px-3 py-1.5 text-sm rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        >
          Set
        </button>
      </div>
      <button
        onClick={() => { setValue(INITIAL); setEditInput(String(INITIAL)); }}
        className="w-full py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
      >
        Reset to initial value ({INITIAL})
      </button>
    </div>
  );
}

export const WithReset: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set any value using the input, then click Reset to restore the `initialValue` of `42`. Resets are just another call to `setValue(initialValue)` — there is no built-in reset method.',
      },
    },
  },
  render: () => <WithResetDemo />,
};
