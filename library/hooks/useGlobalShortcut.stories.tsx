import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { useGlobalShortcut } from './useGlobalShortcut';

const meta: Meta = {
  title: 'Hooks/useGlobalShortcut',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useGlobalShortcut** registers a global \`keydown\` listener on \`window\` and calls a handler when the specified key combination is pressed from anywhere on the page.

\`\`\`ts
useGlobalShortcut(
  shortcut: string,       // e.g. "ctrl+k", "meta+k", "shift+?", "escape"
  handler: (e: KeyboardEvent) => void,
  enabled?: boolean       // default true — pass false to disable without unmounting
): void
\`\`\`

- Shortcut format: modifier(s) + key joined with \`+\`, case-insensitive. Supported modifiers: \`ctrl\`, \`meta\`, \`shift\`, \`alt\`.
- Automatically cleans up the listener when the component unmounts or when \`shortcut\`/\`enabled\` changes.
- Pass \`enabled={false}\` to temporarily disable the shortcut (e.g. while a modal is open that has its own shortcut).

> **Tip:** Wrap the \`handler\` in \`useCallback\` to avoid re-registering the listener on every render.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — Ctrl+K opens a simulated command palette
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [open, setOpen] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);

  const handleShortcut = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setOpen(true);
    setTriggerCount((c) => c + 1);
  }, []);

  useGlobalShortcut('ctrl+k', handleShortcut);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Press</p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <kbd className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">Ctrl</kbd>
          <span className="text-neutral-400">+</span>
          <kbd className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">K</kbd>
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">Times triggered</span>
        <span className="text-lg font-bold text-violet-600 dark:text-violet-400 tabular-nums">{triggerCount}</span>
      </div>

      {open && (
        <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
            <input
              autoFocus
              placeholder="Search commands..."
              className="w-full text-sm bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
            />
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {['New document', 'Open project', 'Share with team', 'Export as PDF'].map((item) => (
              <div key={item} className="px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                {item}
              </div>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            >
              Press Esc or click to close
            </button>
          </div>
        </div>
      )}

      {!open && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
          The shortcut fires from anywhere on the page — you do not need to focus any element.
        </p>
      )}
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Press **Ctrl+K** anywhere on the page to open the simulated command palette. The trigger counter increments each time the shortcut fires.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// MultipleShortcuts — Ctrl+S, Ctrl+Z, Escape all wired
// ---------------------------------------------------------------------------
interface ShortcutEvent {
  shortcut: string;
  description: string;
  timestamp: string;
}

function MultipleShortcutsDemo() {
  const [events, setEvents] = useState<ShortcutEvent[]>([]);

  const addEvent = useCallback((shortcut: string, description: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEvents((prev) => [{ shortcut, description, timestamp }, ...prev].slice(0, 8));
  }, []);

  const handleSave = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    addEvent('Ctrl+S', 'Document saved');
  }, [addEvent]);

  const handleUndo = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    addEvent('Ctrl+Z', 'Last action undone');
  }, [addEvent]);

  const handleCancel = useCallback(() => {
    addEvent('Escape', 'Operation cancelled');
  }, [addEvent]);

  useGlobalShortcut('ctrl+s', handleSave);
  useGlobalShortcut('ctrl+z', handleUndo);
  useGlobalShortcut('escape', handleCancel);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[420px]">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Multiple Global Shortcuts</h3>

      <div className="grid grid-cols-3 gap-2">
        {[
          { keys: ['Ctrl', 'S'], desc: 'Save' },
          { keys: ['Ctrl', 'Z'], desc: 'Undo' },
          { keys: ['Esc'], desc: 'Cancel' },
        ].map(({ keys, desc }) => (
          <div key={desc} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-0.5">
              {keys.map((k, i) => (
                <span key={k} className="flex items-center gap-0.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-500 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 shadow-sm">
                    {k}
                  </kbd>
                  {i < keys.length - 1 && <span className="text-neutral-400 text-xs">+</span>}
                </span>
              ))}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</span>
          </div>
        ))}
      </div>

      <div className="min-h-[160px] rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {events.length === 0 ? (
          <div className="flex items-center justify-center h-[160px]">
            <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">Press a shortcut to see events here...</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {events.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 w-[60px] shrink-0">{ev.timestamp}</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-xs font-mono text-violet-600 dark:text-violet-400 shrink-0">
                  {ev.shortcut}
                </kbd>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{ev.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const MultipleShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three shortcuts registered simultaneously: **Ctrl+S** (save), **Ctrl+Z** (undo), **Escape** (cancel). Each press logs an event with a timestamp.',
      },
    },
  },
  render: () => <MultipleShortcutsDemo />,
};

// ---------------------------------------------------------------------------
// EnabledDisabled — toggle button enables/disables the shortcut
// ---------------------------------------------------------------------------
function EnabledDisabledDemo() {
  const [enabled, setEnabled] = useState(true);
  const [fireCount, setFireCount] = useState(0);

  const handler = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setFireCount((c) => c + 1);
  }, []);

  useGlobalShortcut('ctrl+j', handler, enabled);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Shortcut</p>
        <div className="flex items-center justify-center gap-1">
          <kbd className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-xs font-mono font-semibold">Ctrl</kbd>
          <span className="text-neutral-400">+</span>
          <kbd className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-xs font-mono font-semibold">J</kbd>
        </div>
      </div>

      <div className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${enabled ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm font-medium ${enabled ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {enabled ? 'Shortcut active' : 'Shortcut disabled'}
          </span>
        </div>
        <span className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">{fireCount}</span>
      </div>

      <button
        onClick={() => setEnabled((v) => !v)}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${enabled ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
      >
        {enabled ? 'Disable shortcut' : 'Enable shortcut'}
      </button>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Disabling passes <code className="font-mono">enabled=false</code> — the listener is removed without unmounting the component.
      </p>
    </div>
  );
}

export const EnabledDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle the shortcut on and off without unmounting the component. When disabled, Ctrl+J does nothing. The counter only increments while the shortcut is active.',
      },
    },
  },
  render: () => <EnabledDisabledDemo />,
};

// ---------------------------------------------------------------------------
// WithPreventDefault — prevent browser default behavior
// ---------------------------------------------------------------------------
function WithPreventDefaultDemo() {
  const [saveCount, setSaveCount] = useState(0);

  const handler = useCallback((e: KeyboardEvent) => {
    e.preventDefault(); // Prevents the browser's native Save dialog
    setSaveCount((c) => c + 1);
  }, []);

  useGlobalShortcut('ctrl+s', handler);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Override browser defaults</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-xs font-mono">Ctrl+S</kbd> — the browser's native Save dialog is suppressed and the app's save action fires instead.
      </p>
      <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800">
        <span className="text-sm text-violet-700 dark:text-violet-400">App saves triggered</span>
        <span className="text-2xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">{saveCount}</span>
      </div>
      <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-400">
        <strong>Note:</strong> The handler receives the native <code className="font-mono">KeyboardEvent</code>. Call <code className="font-mono">e.preventDefault()</code> to suppress browser defaults like Save (Ctrl+S) or Find (Ctrl+F).
      </div>
    </div>
  );
}

export const WithPreventDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overrides Ctrl+S to prevent the browser\'s native Save dialog. The handler receives the raw `KeyboardEvent` so `e.preventDefault()` can be called. Press Ctrl+S to confirm the browser dialog does not appear.',
      },
    },
  },
  render: () => <WithPreventDefaultDemo />,
};
