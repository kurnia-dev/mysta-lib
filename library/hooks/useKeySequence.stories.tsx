import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { useKeySequence } from './useKeySequence';

const meta: Meta = {
  title: 'Hooks/useKeySequence',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useKeySequence** fires a handler when the user types a specific sequence of keys in order — Konami-code style.

\`\`\`ts
useKeySequence(
  sequence: string[],  // array of e.key values, e.g. ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown']
  handler: () => void  // called once the full sequence is matched
): void
\`\`\`

- Uses a sliding buffer: the last \`sequence.length\` keys are compared against the target sequence.
- Buffer clears after a successful match.
- Key values must match \`KeyboardEvent.key\` exactly (case-sensitive). Use \`'ArrowUp'\`, \`'Enter'\`, \`'a'\`, \`'g'\`, etc.
- No timeout — users can type slowly between keys.

**Common use cases:** easter eggs, developer cheat codes, Gmail-style two-key navigation shortcuts (e.g. \`g\` then \`h\` to go home).
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — Konami code
// ---------------------------------------------------------------------------
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function DefaultDemo() {
  const [activated, setActivated] = useState(false);
  const [lastKeys, setLastKeys] = useState<string[]>([]);

  const handleActivate = useCallback(() => {
    setActivated(true);
    setTimeout(() => setActivated(false), 3000);
  }, []);

  useKeySequence(KONAMI, handleActivate);

  // Track last few keys for display
  const trackKeys = useCallback((e: KeyboardEvent) => {
    setLastKeys((prev) => [...prev, e.key].slice(-10));
  }, []);

  // Attach key tracker
  useState(() => {
    window.addEventListener('keydown', trackKeys);
    return () => window.removeEventListener('keydown', trackKeys);
  });

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div className="text-center">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Konami Code</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Type the sequence below to activate</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {KONAMI.map((key, i) => (
          <kbd key={i} className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
            {key === 'ArrowUp' ? '↑' : key === 'ArrowDown' ? '↓' : key === 'ArrowLeft' ? '←' : key === 'ArrowRight' ? '→' : key.toUpperCase()}
          </kbd>
        ))}
      </div>

      {activated ? (
        <div className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 p-6 text-center text-white animate-pulse">
          <div className="text-3xl mb-2">🎮</div>
          <p className="font-bold text-lg">+30 Lives Activated!</p>
          <p className="text-xs opacity-80 mt-1">Classic cheat code unlocked</p>
        </div>
      ) : (
        <div className="w-full rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-2">Recent keystrokes:</p>
          <div className="flex flex-wrap gap-1 min-h-[24px]">
            {lastKeys.length === 0 ? (
              <span className="text-xs text-neutral-300 dark:text-neutral-600 italic">none yet</span>
            ) : (
              lastKeys.map((k, i) => (
                <kbd key={i} className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                  {k === 'ArrowUp' ? '↑' : k === 'ArrowDown' ? '↓' : k === 'ArrowLeft' ? '←' : k === 'ArrowRight' ? '→' : k}
                </kbd>
              ))
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Focus anywhere on the page and type the sequence using keyboard arrow keys, B, and A.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type the classic Konami code: ↑ ↑ ↓ ↓ ← → ← → B A. The hook fires once the full 10-key sequence is entered in order.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// CustomSequence — "hello" cheat code
// ---------------------------------------------------------------------------
function CustomSequenceDemo() {
  const [activated, setActivated] = useState(false);
  const [count, setCount] = useState(0);

  const handleCheat = useCallback(() => {
    setActivated(true);
    setCount((c) => c + 1);
    setTimeout(() => setActivated(false), 2000);
  }, []);

  useKeySequence(['h', 'e', 'l', 'l', 'o'], handleCheat);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Custom Sequence</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Type <code className="font-mono text-violet-600 dark:text-violet-400">hello</code> anywhere on the page</p>
      </div>

      <div className="flex items-center gap-1">
        {['h', 'e', 'l', 'l', 'o'].map((key, i) => (
          <kbd key={i} className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 border border-violet-300 dark:border-violet-700 text-sm font-mono font-bold text-violet-700 dark:text-violet-400">
            {key}
          </kbd>
        ))}
      </div>

      <div className={`w-full text-center py-4 px-6 rounded-xl border-2 transition-all ${activated ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-600' : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}>
        {activated ? (
          <>
            <div className="text-2xl mb-1">👋</div>
            <p className="font-bold text-green-700 dark:text-green-400">Cheat code activated!</p>
          </>
        ) : (
          <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">Waiting for sequence...</p>
        )}
      </div>

      {count > 0 && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          Activated <strong className="text-neutral-700 dark:text-neutral-300">{count}</strong> {count === 1 ? 'time' : 'times'}
        </p>
      )}
    </div>
  );
}

export const CustomSequence: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type "hello" anywhere on the page (5 consecutive keypresses: h→e→l→l→o). The handler fires and shows a confirmation banner.',
      },
    },
  },
  render: () => <CustomSequenceDemo />,
};

// ---------------------------------------------------------------------------
// ShortcutSequence — Gmail-style "g h" / "g s" two-key navigation
// ---------------------------------------------------------------------------
interface NavRoute {
  sequence: string[];
  label: string;
  icon: string;
  path: string;
}

const NAV_ROUTES: NavRoute[] = [
  { sequence: ['g', 'h'], label: 'Home', icon: '🏠', path: '/dashboard' },
  { sequence: ['g', 's'], label: 'Settings', icon: '⚙️', path: '/settings' },
  { sequence: ['g', 'p'], label: 'Profile', icon: '👤', path: '/profile' },
  { sequence: ['g', 'n'], label: 'Notifications', icon: '🔔', path: '/notifications' },
];

function RouteShortcut({ route, onNavigate }: { route: NavRoute; onNavigate: (r: NavRoute) => void }) {
  const handler = useCallback(() => onNavigate(route), [route, onNavigate]);
  useKeySequence(route.sequence, handler);
  return null;
}

function ShortcutSequenceDemo() {
  const [activeRoute, setActiveRoute] = useState<NavRoute | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleNavigate = useCallback((route: NavRoute) => {
    setActiveRoute(route);
    setHistory((prev) => [`→ ${route.path} (${route.icon} ${route.label})`, ...prev].slice(0, 5));
    setTimeout(() => setActiveRoute(null), 2000);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[440px]">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">Gmail-style Navigation</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Press <kbd className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 font-mono text-xs">g</kbd> then a second key to navigate</p>
      </div>

      {NAV_ROUTES.map((route) => (
        <RouteShortcut key={route.path} route={route} onNavigate={handleNavigate} />
      ))}

      <div className="grid grid-cols-2 gap-2">
        {NAV_ROUTES.map((route) => (
          <div
            key={route.path}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${activeRoute?.path === route.path ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-700' : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'}`}
          >
            <span className="text-lg">{route.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{route.label}</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                {route.sequence.map((k, i) => (
                  <span key={i} className="flex items-center gap-0.5">
                    <kbd className="px-1 py-0.5 rounded bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-xs font-mono">{k}</kbd>
                    {i < route.sequence.length - 1 && <span className="text-neutral-300 dark:text-neutral-600 text-xs"> then </span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 min-h-[80px]">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-1.5">Navigation log</p>
        {history.length === 0 ? (
          <p className="text-xs text-neutral-300 dark:text-neutral-600 italic">No navigations yet</p>
        ) : (
          <div className="space-y-1">
            {history.map((h, i) => (
              <p key={i} className="text-xs font-mono text-neutral-600 dark:text-neutral-400">{h}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const ShortcutSequence: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gmail-style two-key sequences: press **g then h** to go Home, **g then s** for Settings, **g then p** for Profile, **g then n** for Notifications. The active card highlights when a sequence matches.',
      },
    },
  },
  render: () => <ShortcutSequenceDemo />,
};

// ---------------------------------------------------------------------------
// EasterEgg — "debug" unlocks a hidden panel
// ---------------------------------------------------------------------------
function EasterEggDemo() {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
  }, []);

  useKeySequence(['d', 'e', 'b', 'u', 'g'], handleUnlock);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Developer Easter Egg</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {unlocked ? 'Debug panel unlocked!' : 'There is a hidden panel. Find the secret code...'}
        </p>
      </div>

      {!unlocked ? (
        <div className="w-full rounded-xl bg-neutral-950 p-6 text-center">
          <div className="text-4xl mb-3 opacity-30">🔒</div>
          <p className="text-xs text-neutral-600 font-mono">Access restricted</p>
        </div>
      ) : (
        <div className="w-full rounded-xl bg-neutral-950 p-4 text-green-400 font-mono text-xs space-y-1">
          <p className="text-green-600">// Debug panel</p>
          <p>version: <span className="text-yellow-400">"1.0.0-alpha.37"</span></p>
          <p>env: <span className="text-yellow-400">"development"</span></p>
          <p>user_id: <span className="text-yellow-400">"usr_a8f3d9c1"</span></p>
          <p>feature_flags: <span className="text-yellow-400">['kanban_v2', 'ai_assist']</span></p>
          <div className="mt-2 pt-2 border-t border-neutral-800">
            <button
              onClick={() => setUnlocked(false)}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              close panel
            </button>
          </div>
        </div>
      )}

      {!unlocked && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
          Hint: type a 5-letter word related to software development
        </p>
      )}
    </div>
  );
}

export const EasterEgg: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type **"debug"** on your keyboard to unlock a hidden developer panel. Classic easter egg pattern using a 5-key sequence.',
      },
    },
  },
  render: () => <EasterEggDemo />,
};
