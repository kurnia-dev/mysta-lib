import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from './useClickOutside';

const meta: Meta = {
  title: 'Hooks/useClickOutside',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useClickOutside** attaches a \`mousedown\` listener to \`document\` and calls a handler when a click occurs outside the referenced element.

\`\`\`ts
useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,     // ref attached to the element to watch
  handler: () => void,   // called when a click outside is detected
  enabled?: boolean      // default true — pass false to pause listening
): void
\`\`\`

- Uses \`mousedown\` (not \`click\`) so the handler fires at the beginning of the interaction, before the element loses focus.
- Checks \`ref.current.contains(e.target)\` — clicks on child elements do NOT trigger the handler.
- Pass \`enabled={false}\` to disable without unmounting (e.g. while an animation is running or the element is hidden).

**Common use cases:** closing dropdowns, dismissing popovers, hiding context menus, click-away-to-cancel inline edits.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — colored box, clicking outside triggers a counter
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [outsideCount, setOutsideCount] = useState(0);
  const [active, setActive] = useState(false);

  const handleOutside = useCallback(() => {
    setOutsideCount((c) => c + 1);
    setActive(false);
  }, []);

  useClickOutside(ref, handleOutside);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        Click <strong>inside</strong> the box or <strong>outside</strong> it to see the difference.
      </p>

      <div
        ref={ref}
        onClick={() => setActive(true)}
        className={`w-40 h-40 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border-2 ${
          active
            ? 'bg-violet-100 dark:bg-violet-900/30 border-violet-400 dark:border-violet-600 shadow-lg shadow-violet-100 dark:shadow-violet-900/20'
            : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600'
        }`}
      >
        <span className="text-3xl">{active ? '🎯' : '📦'}</span>
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {active ? 'I am active' : 'Click me'}
        </span>
      </div>

      <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <span className="text-sm text-red-700 dark:text-red-400">Outside clicks</span>
        <span className="text-2xl font-bold text-red-600 dark:text-red-400 tabular-nums">{outsideCount}</span>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Click anywhere outside the purple box to increment the counter.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click inside the box to activate it (it turns violet). Click anywhere outside to dismiss it and increment the outside-click counter.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// Dropdown — custom dropdown closes on outside click
// ---------------------------------------------------------------------------
const DROPDOWN_OPTIONS = [
  { value: 'draft', label: 'Draft', color: 'bg-neutral-400' },
  { value: 'review', label: 'In Review', color: 'bg-blue-500' },
  { value: 'approved', label: 'Approved', color: 'bg-emerald-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
] as const;

type OptionValue = (typeof DROPDOWN_OPTIONS)[number]['value'];

function DropdownDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<OptionValue>('draft');
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  const selectedOption = DROPDOWN_OPTIONS.find((o) => o.value === selected)!;

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white w-full">Document status</h3>

      <div ref={containerRef} className="relative w-full">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm hover:border-violet-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${selectedOption.color}`} />
            <span>{selectedOption.label}</span>
          </div>
          <span className={`text-neutral-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl z-10 overflow-hidden">
            {DROPDOWN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => { setSelected(option.value); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${selected === option.value ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400' : 'text-neutral-700 dark:text-neutral-300'}`}
              >
                <div className={`w-2 h-2 rounded-full ${option.color} shrink-0`} />
                {option.label}
                {selected === option.value && <span className="ml-auto text-violet-600 dark:text-violet-400 text-xs">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Open the dropdown, then click anywhere outside it — the dropdown closes without selecting anything.
      </p>
    </div>
  );
}

export const Dropdown: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A custom status dropdown that closes when clicking outside. `useClickOutside` is only `enabled` when the dropdown is open — no unnecessary listeners when closed.',
      },
    },
  },
  render: () => <DropdownDemo />,
};

// ---------------------------------------------------------------------------
// Modal — click-outside-to-close modal pattern
// ---------------------------------------------------------------------------
function ModalDemo() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, () => setOpen(false), open);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Open the modal and click the backdrop (outside the white panel) to close it.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="py-2.5 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors"
      >
        Open modal
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            ref={panelRef}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-80 mx-4 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="font-semibold text-neutral-900 dark:text-white">Confirm action</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                You are about to archive this project. This action can be undone later.
              </p>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                All team members will lose access until the project is restored.
              </p>
            </div>
            <div className="flex gap-2 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
              >
                Archive project
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

export const Modal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Open the modal and click the dark backdrop to close it. The `ref` is attached to the white modal panel — any click outside the panel triggers `setOpen(false)`.',
      },
    },
  },
  render: () => <ModalDemo />,
};

// ---------------------------------------------------------------------------
// InlineEdit — click-outside commits or cancels an edit
// ---------------------------------------------------------------------------
function InlineEditDemo() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState('Quarterly Budget Review — FY 2025');
  const [draft, setDraft] = useState(saved);
  const inputRef = useRef<HTMLDivElement>(null);

  const commitEdit = useCallback(() => {
    if (editing) {
      setSaved(draft.trim() || saved);
      setEditing(false);
    }
  }, [editing, draft, saved]);

  useClickOutside(inputRef, commitEdit, editing);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Document title</p>
        {!editing && (
          <button
            onClick={() => { setDraft(saved); setEditing(true); }}
            className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div ref={inputRef}>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              if (e.key === 'Escape') { setDraft(saved); setEditing(false); }
            }}
            className="w-full px-3 py-2 text-base font-semibold rounded-lg border-2 border-violet-400 bg-violet-50 dark:bg-violet-900/10 text-neutral-900 dark:text-white focus:outline-none"
          />
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Click outside or press Enter to save · Esc to cancel
          </p>
        </div>
      ) : (
        <h2
          className="text-base font-semibold text-neutral-900 dark:text-white cursor-pointer hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          onDoubleClick={() => { setDraft(saved); setEditing(true); }}
        >
          {saved}
        </h2>
      )}

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <span className="text-xs text-green-700 dark:text-green-400">Saved: <strong>{saved}</strong></span>
      </div>
    </div>
  );
}

export const InlineEdit: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Double-click the title or press "Edit" to enter inline edit mode. Clicking outside the input field commits the change. Press Esc to cancel.',
      },
    },
  },
  render: () => <InlineEditDemo />,
};
