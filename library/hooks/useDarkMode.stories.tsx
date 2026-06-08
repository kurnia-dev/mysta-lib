import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useDarkMode } from './useDarkMode';

const meta: Meta = {
  title: 'Hooks/useDarkMode',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useDarkMode** reads and persists the user's color-scheme preference to \`localStorage\` under the key \`"theme"\`.

\`\`\`ts
const [scheme, toggle] = useDarkMode();
// scheme: 'dark' | 'light'
// toggle: () => void
\`\`\`

On mount, the hook reads from \`localStorage\`. If nothing is stored, it falls back to \`window.matchMedia('(prefers-color-scheme: dark)')\`.
Every time \`scheme\` changes it toggles the \`.dark\` class on \`<html>\` — making it compatible with Tailwind's class-based dark mode.
The Storybook toolbar **Mode** button also controls this class, so changes made via that toolbar are reflected here too.

> **Browser-only:** This hook uses \`window.localStorage\` and \`window.matchMedia\`. It is not SSR-safe without a guard.
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
  const [scheme, toggle] = useDarkMode();

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className="text-5xl">{scheme === 'dark' ? '🌙' : '☀️'}</div>
      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Current scheme</p>
        <p className="text-2xl font-semibold text-neutral-900 dark:text-white capitalize">{scheme}</p>
      </div>
      <button
        onClick={toggle}
        className="w-full py-2 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-colors hover:opacity-90"
      >
        Toggle to {scheme === 'dark' ? 'Light' : 'Dark'} mode
      </button>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click "Toggle" to switch between dark and light mode. The `.dark` class is applied to `<html>` and the scheme name updates live.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// WithPersistence
// ---------------------------------------------------------------------------
function PersistenceDemo() {
  const [scheme, toggle] = useDarkMode();
  const [reloaded, setReloaded] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Persistence Demo</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Current scheme: <strong className="text-neutral-900 dark:text-white capitalize">{scheme}</strong>
      </p>
      <button
        onClick={toggle}
        className="py-2 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-colors hover:opacity-90"
      >
        Switch to {scheme === 'dark' ? 'light' : 'dark'}
      </button>
      <button
        onClick={() => setReloaded(true)}
        className="py-2 px-4 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
      >
        Simulate reload check
      </button>
      {reloaded && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-3 text-sm text-green-800 dark:text-green-300">
          On a real reload, the hook would read <code className="font-mono font-bold">"{scheme}"</code> from{' '}
          <code className="font-mono">localStorage.getItem("theme")</code> and restore the same scheme.
        </div>
      )}
      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Open DevTools → Application → Local Storage → <code>theme</code> to verify the persisted value.
      </p>
    </div>
  );
}

export const WithPersistence: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle the scheme, then open DevTools → Application → Local Storage. You will see `theme` stored as `"dark"` or `"light"`. A real page reload would restore the saved scheme.',
      },
    },
  },
  render: () => <PersistenceDemo />,
};

// ---------------------------------------------------------------------------
// InHeader — realistic ThemeSwitcher button
// ---------------------------------------------------------------------------
function ThemeSwitcherDemo() {
  const [scheme, toggle] = useDarkMode();

  return (
    <div className="w-[640px] rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Simulated app header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-semibold text-neutral-900 dark:text-white text-sm">MystaApp</span>
        </div>

        <nav className="flex items-center gap-6">
          <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Dashboard</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Projects</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Settings</span>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme switcher button */}
          <button
            onClick={toggle}
            title={`Switch to ${scheme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-neutral-200 dark:border-neutral-700"
            aria-label="Toggle color scheme"
          >
            <span className="text-lg leading-none">{scheme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            PA
          </div>
        </div>
      </header>

      {/* Simulated page body */}
      <main className="px-6 py-8 bg-neutral-50 dark:bg-neutral-950 min-h-32">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Click the {scheme === 'dark' ? '☀️' : '🌙'} icon in the header to toggle the theme.
        </p>
      </main>
    </div>
  );
}

export const InHeader: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Realistic ThemeSwitcher button integrated into an app header. The icon flips between ☀️ and 🌙 based on the current scheme. Click the icon to toggle.',
      },
    },
  },
  render: () => <ThemeSwitcherDemo />,
};
