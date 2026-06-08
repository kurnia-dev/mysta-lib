import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useScrollLock } from './useScrollLock';

const meta: Meta = {
  title: 'Hooks/useScrollLock',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useScrollLock** sets \`document.body.style.overflow = 'hidden'\` when \`active\` is \`true\`, preventing page scroll. Restores the previous overflow value when \`active\` becomes \`false\` or the component unmounts.

\`\`\`ts
useScrollLock(active: boolean): void
\`\`\`

- When \`active\` is \`false\`, the hook is a no-op — no styles are modified.
- The previous \`overflow\` value is captured at the moment \`active\` becomes \`true\` and restored when it becomes \`false\` — so existing overflow styles (e.g. \`overflow: hidden\` on a scroll container) are preserved.
- Best used inside modal, drawer, and bottom-sheet components to prevent the page from scrolling while the overlay is open.

> **Note:** Scroll lock applies to \`document.body\`. In the Storybook canvas, the body is shared with the story host page — you will feel the lock when trying to scroll the host page while a modal is open.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — button toggles scroll lock on page body
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [locked, setLocked] = useState(false);
  useScrollLock(locked);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all ${locked ? 'bg-red-100 dark:bg-red-900/30' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
        {locked ? '🔒' : '🔓'}
      </div>

      <div className="text-center">
        <p className={`text-lg font-semibold ${locked ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {locked ? 'Scroll locked' : 'Scrolling allowed'}
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          {locked
            ? 'document.body.style.overflow = "hidden"'
            : 'document.body.style.overflow = ""'
          }
        </p>
      </div>

      <button
        onClick={() => setLocked((v) => !v)}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
          locked
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {locked ? 'Unlock scroll' : 'Lock scroll'}
      </button>

      <div className="w-full rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-400">
        <strong>Try it:</strong> Lock scroll, then try to scroll the Storybook page. It will not move.
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toggle the scroll lock with the button. While locked, try scrolling the Storybook host page — it will be frozen. Unlock to restore normal scrolling.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// WithModal — modal auto-locks scroll when open
// ---------------------------------------------------------------------------
function WithModalDemo() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Open the modal — page scroll is automatically locked. Closing it restores normal scrolling.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="py-2.5 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors"
      >
        Open modal
      </button>

      <div className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs">
        <span className={`w-2 h-2 rounded-full ${open ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className="text-neutral-600 dark:text-neutral-400">
          Scroll: <strong>{open ? 'locked' : 'unlocked'}</strong>
        </span>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-[380px] mx-4 overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-white">Transfer funds</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Complete the form to initiate the transfer</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Recipient</label>
                <select className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
                  <option>Priya Bagus — IDR account</option>
                  <option>Operational Fund — USD account</option>
                  <option>Reserve — EUR account</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Amount</label>
                <input
                  type="number"
                  defaultValue="5000000"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-700 dark:text-amber-400">
                Page scroll is locked while this modal is open. Try scrolling in the background.
              </div>
            </div>
            <div className="flex gap-2 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
              >
                Confirm transfer
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
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
        story: 'Opening the modal automatically locks body scroll. Closing it — via "Confirm" or "Cancel" — restores scrolling. The lock/unlock is driven purely by the `open` state variable.',
      },
    },
  },
  render: () => <WithModalDemo />,
};

// ---------------------------------------------------------------------------
// WithDrawer — side drawer pattern
// ---------------------------------------------------------------------------
function WithDrawerDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useScrollLock(drawerOpen);

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80 relative overflow-hidden">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Open the side drawer — scroll is locked on the host page while it is open.
      </p>

      <button
        onClick={() => setDrawerOpen(true)}
        className="py-2.5 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors flex items-center gap-2"
      >
        <span>☰</span>
        Open navigation drawer
      </button>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-900 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-violet-600" />
                <span className="font-semibold text-neutral-900 dark:text-white text-sm">Workspace</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <nav className="p-4 space-y-0.5">
              {[
                { icon: '🏠', label: 'Dashboard' },
                { icon: '📋', label: 'Projects' },
                { icon: '✅', label: 'Tasks' },
                { icon: '📅', label: 'Calendar' },
                { icon: '📁', label: 'Documents' },
                { icon: '👥', label: 'Team' },
                { icon: '📊', label: 'Reports' },
                { icon: '⚙️', label: 'Settings' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </nav>
            <div className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-400 dark:text-neutral-500">
              Click the backdrop to close (scroll is locked while open)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const WithDrawer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navigation drawer with scroll lock. While the drawer is open, the host page cannot be scrolled. Clicking the backdrop closes the drawer and restores scrolling.',
      },
    },
  },
  render: () => <WithDrawerDemo />,
};
