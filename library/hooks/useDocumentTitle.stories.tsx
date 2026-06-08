import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { useDocumentTitle } from './useDocumentTitle';

const meta: Meta = {
  title: 'Hooks/useDocumentTitle',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useDocumentTitle** sets \`document.title\` to the provided string, with an optional restore-on-unmount behavior.

\`\`\`ts
useDocumentTitle(
  title: string,               // the title to apply to the browser tab
  restoreOnUnmount?: boolean   // default false — if true, restores the previous title on unmount
): void
\`\`\`

- Runs on every change to \`title\`. Updates are synchronous within the effect.
- If \`restoreOnUnmount\` is \`true\`, the hook captures the title at mount time and restores it when the component unmounts — useful for modals and drawers that temporarily override the page title.
- Pass a dynamic string (e.g. with notification count, entity name) to keep the tab title in sync with app state.

> **Check the browser tab** title to verify changes — the demo panel shows the current \`document.title\` as well.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — input field changes browser tab title live
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [title, setTitle] = useState('My Application');
  useDocumentTitle(title);

  return (
    <div className="flex flex-col gap-5 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">Browser tab title</p>
        <p className="text-lg font-semibold text-neutral-900 dark:text-white">{title || '(empty)'}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Page title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        document.title = <span className="text-violet-600 dark:text-violet-400">"{title}"</span>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Look at your browser tab — it updates as you type.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Type in the input — `document.title` updates on every keystroke. Check your browser tab to see the title change live.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// DynamicTitle — notification count in tab title
// ---------------------------------------------------------------------------
function DynamicTitleDemo() {
  const [count, setCount] = useState(0);
  const [appName] = useState('Workspace Pro');
  const title = count > 0 ? `(${count}) ${appName}` : appName;

  useDocumentTitle(title);

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{appName}</h3>
        <div className="relative">
          <span className="text-xl">🔔</span>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center leading-none">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3">
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-1">Current tab title:</p>
        <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300">{title}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
        >
          +1 Notification
        </button>
        <button
          onClick={() => setCount(0)}
          disabled={count === 0}
          className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="space-y-1.5">
        {Array.from({ length: Math.min(count, 4) }, (_, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-blue-700 dark:text-blue-400">
              {['Priya commented on your document', 'New team member joined', 'Deployment to production completed', 'Weekly digest is ready'][i]}
            </span>
          </div>
        ))}
        {count > 4 && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">+{count - 4} more notifications</p>
        )}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Tab title format: <code className="font-mono">({`count`}) {appName}</code>
      </p>
    </div>
  );
}

export const DynamicTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic notification badge pattern: the tab title shows "(3) Workspace Pro" when there are 3 unread notifications. Click "+1 Notification" and check the browser tab.',
      },
    },
  },
  render: () => <DynamicTitleDemo />,
};

// ---------------------------------------------------------------------------
// RestoreOnUnmount — modal pattern
// ---------------------------------------------------------------------------
function ModalContent({ onClose }: { onClose: () => void }) {
  useDocumentTitle('Edit Profile — Workspace Pro', true);

  return (
    <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Edit Profile</h3>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xl leading-none transition-colors"
        >
          ×
        </button>
      </div>
      <div className="px-6 py-5 space-y-3">
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Display name</label>
          <input defaultValue="Priya Bagus Amanullah" className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Email</label>
          <input defaultValue="priyabagus.a29@gmail.com" className="w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Notice: the browser tab now shows "Edit Profile — Workspace Pro". Closing this modal restores "Workspace Pro".
        </p>
      </div>
      <div className="flex gap-2 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800">
        <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors">
          Save changes
        </button>
        <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function RestoreOnUnmountDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  useDocumentTitle('Workspace Pro');

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div className="text-center">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Workspace Pro</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Tab title: <code className="font-mono">{modalOpen ? 'Edit Profile — Workspace Pro' : 'Workspace Pro'}</code>
        </p>
      </div>

      {!modalOpen ? (
        <>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
            Open the edit modal — the tab title will change. Closing it restores the original title because <code className="font-mono text-xs">restoreOnUnmount=true</code>.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="py-2.5 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
          >
            Open Edit Profile
          </button>
        </>
      ) : (
        <ModalContent onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export const RestoreOnUnmount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Open the modal — the tab changes to "Edit Profile — Workspace Pro". Close it and the title reverts to "Workspace Pro". The modal uses `restoreOnUnmount=true`; the page itself does not.',
      },
    },
  },
  render: () => <RestoreOnUnmountDemo />,
};

// ---------------------------------------------------------------------------
// EntityPage — title reflects the selected record
// ---------------------------------------------------------------------------
const RECORDS = [
  { id: 'rec-001', name: 'Laptop Dell XPS 15', type: 'Hardware', status: 'Active' },
  { id: 'rec-002', name: 'Office Chair — Ergonomic', type: 'Furniture', status: 'In review' },
  { id: 'rec-003', name: 'Cisco Switch 24-port', type: 'Network', status: 'Active' },
  { id: 'rec-004', name: 'Projector Epson EB-X39', type: 'AV Equipment', status: 'Maintenance' },
] as const;

type Record = (typeof RECORDS)[number];

function EntityPageInner({ record }: { record: Record }) {
  useDocumentTitle(`${record.name} · Asset Registry`);
  return null;
}

function EntityPageDemo() {
  const [selected, setSelected] = useState<Record>(RECORDS[0]);

  return (
    <div className="flex flex-col gap-4 w-[480px]">
      <EntityPageInner record={selected} />

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Select an asset to update the tab title</p>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {RECORDS.map((record) => (
            <button
              key={record.id}
              onClick={() => setSelected(record)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${selected.id === record.id ? 'bg-violet-50 dark:bg-violet-900/20' : ''}`}
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-sm shrink-0">
                {record.type === 'Hardware' ? '💻' : record.type === 'Furniture' ? '🪑' : record.type === 'Network' ? '🔌' : '📽️'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{record.name}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">{record.type} · {record.id}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${record.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : record.status === 'In review' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                {record.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        document.title = <span className="text-violet-600 dark:text-violet-400">"{selected.name} · Asset Registry"</span>
      </div>
    </div>
  );
}

export const EntityPage: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Selecting an asset record updates the tab title to include the asset name. Common in CRM/ERP apps where each entity has a detail view.',
      },
    },
  },
  render: () => <EntityPageDemo />,
};
