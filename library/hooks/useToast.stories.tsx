import type { Meta, StoryObj } from '@storybook/react';

import { useToast } from '../context/ToastContext';
import type { ToastData } from '../components/toast/Toast.d';

const meta: Meta = {
  title: 'Hooks/useToast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useToast** gives any component access to the global toast queue managed by \`ToastProvider\`.

\`\`\`ts
const { showToast } = useToast();

showToast({
  message:  string;            // required — the notification text
  severity?: Severities;       // 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  icon?:    Icons;             // override the default severity icon
  action?:  {
    label:   string;           // action button label
    command: () => void | Promise<void>;
  };
}): void
\`\`\`

**How it is wired:**

\`MystaLibProvider\` (the root provider injected by Storybook's \`preview.tsx\`) bundles \`ToastProvider\` internally. Any app that wraps with \`MystaLibProvider\` gets \`useToast\` for free — no additional provider needed.

In application code:
\`\`\`tsx
// app root
<MystaLibProvider configOptions={{ preset: 'kitsune' }}>
  <App />  {/* useToast works anywhere inside */}
</MystaLibProvider>
\`\`\`

\`showToast\` is safe to call from event handlers, async callbacks, or after awaiting an API call.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — button triggers a success toast
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">useToast demo</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Click the button — a toast notification appears in the bottom-right corner.
        </p>
      </div>

      <button
        onClick={() =>
          showToast({
            message: 'Profile updated successfully.',
            severity: 'success',
          })
        }
        className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
      >
        Save profile changes
      </button>

      <div className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        <span className="text-neutral-400">// usage:</span>
        <br />
        <span className="text-violet-600 dark:text-violet-400">showToast</span>{'({'}
        <br />
        {'  message: "Profile updated successfully.",'}
        <br />
        {'  severity: "success",'}
        <br />
        {'});'}
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to trigger a success toast. The toast appears bottom-right and auto-dismisses after a few seconds.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// AllSeverities — 6 buttons each triggering different severity
// ---------------------------------------------------------------------------
type Severity = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

interface SeverityConfig {
  severity: Severity;
  label: string;
  message: string;
  color: string;
}

const SEVERITY_CONFIG: SeverityConfig[] = [
  { severity: 'success', label: 'Success', message: 'Asset registration approved.', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { severity: 'danger', label: 'Danger', message: 'Failed to connect to the database.', color: 'bg-red-600 hover:bg-red-700' },
  { severity: 'warning', label: 'Warning', message: 'Your session expires in 5 minutes.', color: 'bg-amber-500 hover:bg-amber-600' },
  { severity: 'info', label: 'Info', message: 'A new version of the app is available.', color: 'bg-blue-600 hover:bg-blue-700' },
  { severity: 'primary', label: 'Primary', message: 'Workflow triggered for 12 pending items.', color: 'bg-violet-600 hover:bg-violet-700' },
  { severity: 'secondary', label: 'Secondary', message: 'Draft saved automatically.', color: 'bg-neutral-600 hover:bg-neutral-700' },
];

function AllSeveritiesDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">All severity variants</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Click any button to trigger a toast with that severity. Multiple toasts stack.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {SEVERITY_CONFIG.map(({ severity, label, message, color }) => (
          <button
            key={severity}
            onClick={() => showToast({ message, severity })}
            className={`py-2 px-3 rounded-lg text-white text-xs font-medium transition-colors ${color}`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Toasts stack — trigger several in a row to see them queue.
      </p>
    </div>
  );
}

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Six buttons trigger toasts with different severity variants: success, danger, warning, info, primary, secondary. Each uses a contextually appropriate message. Toasts stack bottom-right.',
      },
    },
  },
  render: () => <AllSeveritiesDemo />,
};

// ---------------------------------------------------------------------------
// WithAction — toast with undo action
// ---------------------------------------------------------------------------
function WithActionDemo() {
  const { showToast } = useToast();

  const handleDeleteItem = (itemName: string) => {
    showToast({
      message: `"${itemName}" moved to trash.`,
      severity: 'warning',
      action: {
        label: 'Undo',
        command: () => {
          showToast({
            message: `"${itemName}" restored successfully.`,
            severity: 'success',
          });
        },
      },
    });
  };

  const ITEMS = [
    'Q4 Audit Report',
    'Team Standup Notes',
    'Asset Inventory Dec 2025',
  ] as const;

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Documents</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Delete a document — the toast includes an Undo action to restore it.
      </p>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">📄</span>
              <span className="text-sm text-neutral-800 dark:text-neutral-200">{item}</span>
            </div>
            <button
              onClick={() => handleDeleteItem(item)}
              className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        action: {'{'} label: <span className="text-green-600 dark:text-green-400">"Undo"</span>, command: restoreFn {'}'}
      </div>
    </div>
  );
}

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Delete a document — the toast shows an "Undo" action button. Clicking Undo triggers a second toast confirming the restore. This demonstrates the `action` field on `ToastData`.',
      },
    },
  },
  render: () => <WithActionDemo />,
};

// ---------------------------------------------------------------------------
// ProgrammaticPattern — calling showToast after async API call
// ---------------------------------------------------------------------------
function ProgrammaticPatternDemo() {
  const { showToast } = useToast();

  const simulateApiCall = (shouldFail: boolean): Promise<void> =>
    new Promise((resolve, reject) =>
      setTimeout(() => (shouldFail ? reject(new Error('Network error')) : resolve()), 1200)
    );

  const handleSubmit = async (shouldFail: boolean) => {
    showToast({ message: 'Submitting approval request...', severity: 'info' });
    try {
      await simulateApiCall(shouldFail);
      showToast({
        message: 'Approval request submitted. The requester will be notified.',
        severity: 'success',
      });
    } catch {
      showToast({
        message: 'Failed to submit request. Please try again.',
        severity: 'danger',
        action: {
          label: 'Retry',
          command: () => handleSubmit(false),
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">Asset approval</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Simulate submitting an approval request.
        </p>
      </div>

      <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">💻</span>
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">MacBook Pro M4 14"</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">Requested by: Priya Bagus · IDR 32,000,000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleSubmit(false)}
          className="py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
        >
          Approve
        </button>
        <button
          onClick={() => handleSubmit(true)}
          className="py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
        >
          Simulate error
        </button>
      </div>

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        <span className="text-neutral-400">// pattern:</span>
        <br />
        <span className="text-violet-600 dark:text-violet-400">showToast</span>{'({ severity: "info", ... })'}
        <br />
        <span className="text-neutral-400">await</span> apiCall()
        <br />
        <span className="text-violet-600 dark:text-violet-400">showToast</span>{'({ severity: "success", ... })'}
      </div>
    </div>
  );
}

export const ProgrammaticPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates calling `showToast` at multiple points in an async flow: info while pending, success on resolve, danger with retry action on reject. Click "Approve" for success or "Simulate error" for the error path.',
      },
    },
  },
  render: () => <ProgrammaticPatternDemo />,
};

// ---------------------------------------------------------------------------
// FormFeedback — toast triggered after form submission
// ---------------------------------------------------------------------------
function FormFeedbackDemo() {
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();

    if (!name) {
      showToast({ message: 'Display name is required.', severity: 'warning' });
      return;
    }

    showToast({
      message: `Settings saved for ${name}.`,
      severity: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Account settings</h3>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Display name</label>
          <input
            name="name"
            defaultValue="Priya Bagus Amanullah"
            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Email</label>
          <input
            name="email"
            type="email"
            defaultValue="priyabagus.a29@gmail.com"
            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={() => showToast({ message: 'Changes discarded.', severity: 'secondary' })}
            className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Discard
          </button>
        </div>
      </form>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Clear the name field and click Save to see validation feedback.
      </p>
    </div>
  );
}

export const FormFeedback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Account settings form with toast feedback for both success and validation failure states. Clear the name field and submit to trigger a warning toast.',
      },
    },
  },
  render: () => <FormFeedbackDemo />,
};
