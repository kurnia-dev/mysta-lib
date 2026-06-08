import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { CommandItem } from './CommandPalette';
import { CommandPalette } from './CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'Navigation/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**CommandPalette** is a modal search-and-execute interface, similar to VS Code's command palette or Spotlight.
It accepts a flat list of \`CommandItem\` objects — each with an \`id\`, \`label\`, optional \`hint\` (keyboard shortcut badge shown on the right), and an \`action\` callback.
Items are filtered in real time as the user types; keyboard navigation (↑ / ↓ / Enter) is built-in.
The palette closes on Escape, backdrop click, or after an action executes.
Wire the open/close state via \`useState\` and trigger it with a button or a global Ctrl+K / ⌘K keydown listener.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

// ---------------------------------------------------------------------------
// Shared command sets
// ---------------------------------------------------------------------------

const appCommands: CommandItem[] = [
  { id: 'new-doc', action: () => {}, hint: '⌘N', label: 'New Document' },
  { id: 'open-file', action: () => {}, hint: '⌘O', label: 'Open File…' },
  { id: 'save', action: () => {}, hint: '⌘S', label: 'Save' },
  { id: 'search', action: () => {}, hint: '⌘F', label: 'Search in Document' },
  { id: 'cmd-palette', action: () => {}, hint: '⌘K', label: 'Open Command Palette' },
  { id: 'settings', action: () => {}, hint: '⌘,', label: 'Open Settings' },
  { id: 'switch-theme', action: () => {}, label: 'Switch Theme' },
  { id: 'sign-out', action: () => {}, label: 'Sign Out' },
];

const devCommands: CommandItem[] = [
  { id: 'terminal', action: () => {}, hint: '⌃`', label: 'Open Terminal' },
  { id: 'run-tests', action: () => {}, hint: '⌘T', label: 'Run Tests' },
  { id: 'build', action: () => {}, hint: '⌘B', label: 'Build Project' },
  { id: 'deploy', action: () => {}, label: 'Deploy to Production' },
  { id: 'lint', action: () => {}, label: 'Run Linter' },
  { id: 'format', action: () => {}, hint: '⇧⌥F', label: 'Format Document' },
  { id: 'git-status', action: () => {}, label: 'Git: Show Status' },
  { id: 'git-commit', action: () => {}, label: 'Git: Commit Staged Changes' },
  { id: 'git-push', action: () => {}, label: 'Git: Push to Origin' },
];

const minimalCommands: CommandItem[] = [
  { id: 'save', action: () => {}, hint: '⌘S', label: 'Save' },
  { id: 'close', action: () => {}, hint: 'Esc', label: 'Close Panel' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Palette open with a realistic set of app commands. Type to filter, use ↑ / ↓ to navigate, Enter to execute.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <button
          className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg text-sm font-medium"
          type="button"
          onClick={() => setOpen(true)}
        >
          Open Palette (⌘K)
        </button>
        <CommandPalette items={appCommands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const WithTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Palette closed by default. Click the fake search bar trigger to open it — the canonical trigger UI pattern.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <button
          className="flex items-center gap-2 px-4 py-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          type="button"
          onClick={() => setOpen(true)}
        >
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span className="flex-1 text-left">Search commands…</span>
          <kbd className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>
        <CommandPalette items={appCommands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const WithKeyboardShortcut: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Global Ctrl+K / ⌘K keyboard shortcut opens the palette. Press the shortcut while this story is focused.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Press</p>
          <div className="flex items-center justify-center gap-1">
            <kbd className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm px-2.5 py-1 rounded font-mono">⌘</kbd>
            <span className="text-gray-400">+</span>
            <kbd className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm px-2.5 py-1 rounded font-mono">K</kbd>
          </div>
          <p className="text-xs text-gray-400">to open the command palette</p>
        </div>
        <CommandPalette items={appCommands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const AppCommands: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic general app command set: New Document, Open File, Save, Settings, Switch Theme, Sign Out. Each command reports its label when executed.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    const [lastAction, setLastAction] = useState<string | null>(null);

    const commands: CommandItem[] = appCommands.map((cmd) => ({
      ...cmd,
      action: () => setLastAction(cmd.label),
    }));

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <div className="space-y-2">
          <button
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
            type="button"
            onClick={() => setOpen(true)}
          >
            Open Command Palette
          </button>
          {lastAction && (
            <p className="text-xs text-gray-500">
              Executed: <span className="font-medium text-gray-800 dark:text-gray-200">{lastAction}</span>
            </p>
          )}
        </div>
        <CommandPalette items={commands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const DeveloperTools: Story = {
  parameters: {
    docs: {
      description: {
        story: 'IDE-style developer command palette: Open Terminal, Run Tests, Build, Deploy to Production, Lint, Format, Git actions.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <button
          className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
          type="button"
          onClick={() => setOpen(true)}
        >
          Developer Tools (⌘K)
        </button>
        <CommandPalette items={devCommands} open={open} placeholder="> run command…" onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const FewItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: only two commands. The list is short and all items are visible without scrolling.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <CommandPalette items={minimalCommands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const NoResults: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type something that matches no command (e.g. "zzz") to see the empty state — the palette shows "no matches".',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <p className="text-xs text-gray-400 mb-4">Type something that matches no command to see the empty state.</p>
        <button
          className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
          type="button"
          onClick={() => setOpen(true)}
        >
          Open Palette
        </button>
        <CommandPalette items={appCommands} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const WithCustomPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom `placeholder` text for the search input — overrides the default "> search…".',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <CommandPalette
          items={appCommands}
          open={open}
          placeholder="Type a command or search…"
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
