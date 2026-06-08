import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { useEscapeKey } from './useEscapeKey';

const meta: Meta = {
  title: 'Hooks/useEscapeKey',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useEscapeKey** listens for the \`Escape\` key on \`document\` and calls a handler when it is pressed.

\`\`\`ts
useEscapeKey(
  handler: () => void,   // called when Escape is pressed
  enabled?: boolean      // default true — pass false to pause listening
): void
\`\`\`

- Listens on \`keydown\` at the \`document\` level — works regardless of which element has focus.
- Pass \`enabled={false}\` to disable the listener without unmounting the component (e.g. while a child dialog is open and should handle Escape instead).
- Automatically cleans up the listener on unmount or when \`enabled\` / \`handler\` changes.

**Common use cases:** closing modals, sidebars, drawers, and popovers; cancelling in-progress actions; dismissing search overlays.

> Wrap the \`handler\` in \`useCallback\` to prevent re-registering the listener on every render.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — press Escape to trigger event, show counter
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [fireCount, setFireCount] = useState(0);
  const [lastAt, setLastAt] = useState<string | null>(null);

  const handler = useCallback(() => {
    setFireCount((c) => c + 1);
    setLastAt(new Date().toLocaleTimeString('en-US', { hour12: false }));
  }, []);

  useEscapeKey(handler);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Press</p>
        <kbd className="mt-2 inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-sm font-mono font-semibold text-neutral-700 dark:text-neutral-300 shadow-sm">
          Escape
        </kbd>
      </div>

      <div className="w-full rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
        <div className="text-5xl font-bold tabular-nums text-neutral-900 dark:text-white">{fireCount}</div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">times fired</p>
        {lastAt && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Last: <code className="font-mono">{lastAt}</code>
          </p>
        )}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        No element needs to be focused — the listener is on <code className="font-mono">document</code>.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Press the Escape key anywhere on the page. The counter increments each time Escape fires.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// WithModal — open a modal, press Escape to close
// ---------------------------------------------------------------------------
function WithModalDemo() {
  const [open, setOpen] = useState(false);

  useEscapeKey(() => setOpen(false), open);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Open the notification settings modal, then press <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-xs font-mono">Esc</kbd> to close it.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="py-2.5 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors"
      >
        Open settings
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-[360px] mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-white">Notification Settings</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'Email notifications', desc: 'Get notified via email about task updates', checked: true },
                { label: 'Push notifications', desc: 'Receive browser push notifications', checked: false },
                { label: 'Weekly digest', desc: 'Summary of activity sent every Monday', checked: true },
              ].map((item) => (
                <label key={item.label} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="mt-0.5 rounded accent-violet-600" />
                  <div>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">Press Esc to dismiss</p>
              <button
                onClick={() => setOpen(false)}
                className="py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const WithModal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Press "Open settings" then press Escape to close the modal. `useEscapeKey` is only `enabled` when the modal is open, preventing interference with other Escape listeners.',
      },
    },
  },
  render: () => <WithModalDemo />,
};

// ---------------------------------------------------------------------------
// EnabledDisabled — toggle button enables/disables listener
// ---------------------------------------------------------------------------
function EnabledDisabledDemo() {
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(0);

  const handler = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  useEscapeKey(handler, enabled);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${enabled ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20' : 'border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-neutral-400'}`} />
          <span className={`text-sm font-medium ${enabled ? 'text-green-700 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
            {enabled ? 'Listening for Escape' : 'Listener paused'}
          </span>
        </div>
        <span className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">{count}</span>
      </div>

      <div className="text-center">
        <kbd className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-sm font-mono font-semibold text-neutral-700 dark:text-neutral-300">
          Escape
        </kbd>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
          {enabled ? 'Fires when pressed' : 'Does nothing when pressed'}
        </p>
      </div>

      <button
        onClick={() => setEnabled((v) => !v)}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${enabled ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
      >
        {enabled ? 'Disable listener' : 'Enable listener'}
      </button>
    </div>
  );
}

export const EnabledDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle the Escape listener on and off without unmounting. While disabled, pressing Escape does nothing. Use this pattern when a nested component (like a dialog) needs to own the Escape key.',
      },
    },
  },
  render: () => <EnabledDisabledDemo />,
};

// ---------------------------------------------------------------------------
// SearchOverlay — realistic search with Escape to clear/close
// ---------------------------------------------------------------------------
function SearchOverlayDemo() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const handleEscape = useCallback(() => {
    if (query) {
      setQuery('');
    } else {
      setOpen(false);
    }
  }, [query]);

  useEscapeKey(handleEscape, open);

  const RESULTS = [
    { title: 'Q4 Revenue Report', type: 'Document', date: 'Nov 2025' },
    { title: 'Team Standup Notes', type: 'Note', date: 'Dec 2025' },
    { title: 'Asset Inventory 2025', type: 'Spreadsheet', date: 'Oct 2025' },
  ].filter((r) => !query || r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Open search, type a query, then press <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-xs font-mono">Esc</kbd> once to clear — and again to close.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-600 dark:text-neutral-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors w-full"
      >
        <span>🔍</span>
        <span className="flex-1 text-left">Search documents...</span>
        <kbd className="text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 font-mono">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 pt-24 flex items-start justify-center bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-[420px] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-neutral-400">🔍</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents, notes, reports..."
                className="flex-1 text-sm bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xs px-1.5"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {RESULTS.map((r) => (
                <div key={r.title} className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-sm">
                    {r.type === 'Document' ? '📄' : r.type === 'Note' ? '📝' : '📊'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{r.title}</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{r.type} · {r.date}</p>
                  </div>
                </div>
              ))}
              {RESULTS.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
                  No results for "{query}"
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-3">
              <span><kbd className="font-mono">Esc</kbd> to {query ? 'clear' : 'close'}</span>
              <span><kbd className="font-mono">Enter</kbd> to open</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const SearchOverlay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A command-palette-style search: first Escape press clears the query, second press closes the overlay. The `handler` checks `query` first to implement this two-stage dismiss.',
      },
    },
  },
  render: () => <SearchOverlayDemo />,
};
