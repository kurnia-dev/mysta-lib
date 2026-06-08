import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { ShortcutSection } from './KeyboardHelp';
import { KeyboardHelp } from './KeyboardHelp';

const meta: Meta<typeof KeyboardHelp> = {
  title: 'Navigation/KeyboardHelp',
  component: KeyboardHelp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**KeyboardHelp** is a modal overlay that displays organised keyboard shortcut reference cards.
Pass either a flat \`shortcuts\` list (rendered under a single "Shortcuts" heading) or a structured \`sections\` array for grouped display.
Each shortcut has a \`key\` (string or string array for multi-key combos like \`['⌘', 'K']\`) and a human-readable \`label\`.
The modal closes on Escape or backdrop click, and locks page scroll while open.
Wire the \`open\` / \`onClose\` state from a parent button or a global "?" keydown listener.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof KeyboardHelp>;

// ---------------------------------------------------------------------------
// Shared shortcut data
// ---------------------------------------------------------------------------

const navigationSection: ShortcutSection = {
  title: 'Navigation',
  shortcuts: [
    { key: 'G H', label: 'Go to Home' },
    { key: 'G S', label: 'Go to Settings' },
    { key: 'G P', label: 'Go to Profile' },
    { key: 'G N', label: 'Go to Notifications' },
  ],
};

const actionsSection: ShortcutSection = {
  title: 'Actions',
  shortcuts: [
    { key: ['⌘', 'K'], label: 'Open Command Palette' },
    { key: ['⌘', 'S'], label: 'Save' },
    { key: ['⌘', 'Z'], label: 'Undo' },
    { key: ['⌘', '⇧', 'Z'], label: 'Redo' },
    { key: ['⌘', 'N'], label: 'New Document' },
  ],
};

const systemSection: ShortcutSection = {
  title: 'System',
  shortcuts: [
    { key: '?', label: 'Show keyboard shortcuts' },
    { key: 'Esc', label: 'Close / Cancel' },
    { key: ['⌘', '/'], label: 'Toggle keyboard help' },
  ],
};

const devEditorSection: ShortcutSection = {
  title: 'Editor',
  shortcuts: [
    { key: ['⌘', 'P'], label: 'Quick open file' },
    { key: ['⌘', 'B'], label: 'Toggle sidebar' },
    { key: ['⌘', '`'], label: 'Open integrated terminal' },
    { key: ['⌘', 'T'], label: 'Run tests' },
    { key: ['⇧', '⌥', 'F'], label: 'Format document' },
  ],
};

const devGitSection: ShortcutSection = {
  title: 'Git',
  shortcuts: [
    { key: ['⌃', 'G'], label: 'Show source control' },
    { key: ['⌘', 'Z'], label: 'Undo last commit (soft)' },
    { key: 'G S', label: 'Git status' },
    { key: 'G P', label: 'Git push' },
  ],
};

const saasNavSection: ShortcutSection = {
  title: 'Navigation',
  shortcuts: [
    { key: ['⌘', 'K'], label: 'Command palette' },
    { key: 'G D', label: 'Go to Dashboard' },
    { key: 'G U', label: 'Go to Users' },
    { key: 'G R', label: 'Go to Reports' },
    { key: 'G S', label: 'Go to Settings' },
  ],
};

const saasDataSection: ShortcutSection = {
  title: 'Data',
  shortcuts: [
    { key: ['⌘', 'F'], label: 'Search / filter' },
    { key: ['⌘', 'E'], label: 'Export current view' },
    { key: ['⌘', 'R'], label: 'Refresh data' },
    { key: ['⌘', 'N'], label: 'Create new record' },
    { key: 'Del', label: 'Delete selected rows' },
  ],
};

const saasViewSection: ShortcutSection = {
  title: 'View',
  shortcuts: [
    { key: ['⌘', '1'], label: 'Table view' },
    { key: ['⌘', '2'], label: 'Kanban view' },
    { key: ['⌘', '3'], label: 'Calendar view' },
    { key: ['⌘', 'D'], label: 'Toggle dark mode' },
  ],
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Keyboard help panel open with three sections: Navigation, Actions, and System.',
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
          Show Shortcuts (?)
        </button>
        <KeyboardHelp
          open={open}
          sections={[navigationSection, actionsSection, systemSection]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const Triggered: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Panel is closed by default. Click the button or press "?" to open it — demonstrates the trigger pattern.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) setOpen(true);
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Press</span>
          <kbd className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded font-mono">?</kbd>
          <span className="text-sm text-gray-500">or click</span>
          <button
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
            type="button"
            onClick={() => setOpen(true)}
          >
            Keyboard Shortcuts
          </button>
        </div>
        <KeyboardHelp
          open={open}
          sections={[navigationSection, actionsSection, systemSection]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const WithShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flat `shortcuts` prop — renders all shortcuts under a single "Shortcuts" heading. Ctrl+K, Ctrl+S, Ctrl+/, and Escape.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <KeyboardHelp
          open={open}
          shortcuts={[
            { key: ['⌘', 'K'], label: 'Open Command Palette' },
            { key: ['⌘', 'S'], label: 'Save document' },
            { key: ['⌘', '/'], label: 'Toggle keyboard help' },
            { key: 'Esc', label: 'Close / Cancel' },
            { key: '?', label: 'Show this help' },
          ]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const DeveloperShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'IDE-style shortcuts: Editor actions and Git commands — useful for a developer tool or code review interface.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <button
          className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium mb-4"
          type="button"
          onClick={() => setOpen(true)}
        >
          Developer Shortcuts (?)
        </button>
        <KeyboardHelp
          open={open}
          sections={[devEditorSection, devGitSection, systemSection]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const AppShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic SaaS app shortcut reference: Navigation, Data management, View switching, and System.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <button
          className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium mb-4"
          type="button"
          onClick={() => setOpen(true)}
        >
          App Shortcuts (?)
        </button>
        <KeyboardHelp
          open={open}
          sections={[saasNavSection, saasDataSection, saasViewSection, systemSection]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const ManySections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four sections — the panel scrolls when content exceeds the max height.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <KeyboardHelp
          open={open}
          sections={[navigationSection, actionsSection, devEditorSection, systemSection]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const ComboKeys: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-key combinations: when `key` is a string array, each element is rendered as a separate `<kbd>` badge.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <KeyboardHelp
          open={open}
          shortcuts={[
            { key: ['⌘', 'K'], label: 'Command palette' },
            { key: ['⌘', '⇧', 'P'], label: 'Command palette (VS Code style)' },
            { key: ['⌃', 'Alt', 'Del'], label: 'Task manager (Windows)' },
            { key: ['⌘', '⌥', 'I'], label: 'Developer tools' },
          ]}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
