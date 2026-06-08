import { Toast as RUIToast } from 'radix-ui';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { useToast } from 'lib/context/ToastContext';

import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Preset/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Toast** is a brief, auto-dismissing notification that appears in the corner of the screen. It communicates the outcome of an action (save, error, warning, info) without interrupting the user's flow.

**Two usage patterns:**

1. **Static \`<Toast>\` component** — render directly inside a \`RUIToast.Provider\` when you need full control over when and how the toast appears. Used in the stories below that show static visuals.

2. **\`useToast\` hook** (recommended for most flows) — call \`showToast({ message, severity })\` from anywhere in a component tree that is wrapped in \`MystaLibProvider\` (which Storybook preview already injects). This is the pattern to use in real application code.

\`\`\`tsx
import { useToast } from 'lib/context/ToastContext';

function SaveButton() {
  const { showToast } = useToast();
  return (
    <Button
      label="Save Changes"
      onClick={() => showToast({ message: 'Saved successfully!', severity: 'success' })}
    />
  );
}
\`\`\`

**Severity options:** \`success\` / \`danger\` / \`warning\` / \`info\` / \`primary\` / \`secondary\`

**Props:** \`message\`, \`severity\`, \`icon\`, \`action\` (undo button), \`onClose\`
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
      description: 'Color severity that styles the toast.',
      table: { defaultValue: { summary: 'primary' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

// ─── Static Toast component stories ──────────────────────────────────────────

const noop = () => {};

function ToastDemo(props: Omit<React.ComponentProps<typeof Toast>, 'onClose'>) {
  return (
    <RUIToast.Provider swipeDirection="right">
      <Toast {...props} onClose={noop} />
      <RUIToast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80" />
    </RUIToast.Provider>
  );
}

export const Success: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Success severity — use after a create, save, or approve action completes.',
      },
    },
  },
  render: () => <ToastDemo message="Changes saved successfully!" severity="success" />,
};

export const Danger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Danger severity — use when an operation fails or encounters a critical error.',
      },
    },
  },
  render: () => <ToastDemo message="Something went wrong. Please try again." severity="danger" />,
};

export const Warning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Warning severity — use for cautionary messages that do not prevent the user from continuing.',
      },
    },
  },
  render: () => <ToastDemo message="Your session expires in 5 minutes." severity="warning" />,
};

export const Info: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Info severity — neutral informational messages (sync complete, update available).',
      },
    },
  },
  render: () => <ToastDemo message="A new software update is available." severity="info" />,
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `action` prop adds a labelled button to the toast — ideal for undo flows after a destructive operation.',
      },
    },
  },
  render: () => (
    <ToastDemo
      message="Asset #A-00142 deleted."
      severity="danger"
      action={{ label: 'Undo', command: noop }}
    />
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `icon` prop adds a leading icon to reinforce the severity meaning.',
      },
    },
  },
  render: () => <ToastDemo message="Profile photo updated." severity="success" icon="check-circle" />,
};

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severity variants stacked — use this as a visual reference when choosing the right severity for a notification.',
      },
    },
  },
  render: () => (
    <RUIToast.Provider swipeDirection="right">
      <div className="flex flex-col gap-3 w-80">
        {(['success', 'danger', 'warning', 'info', 'primary', 'secondary'] as const).map((s) => (
          <Toast key={s} message={`${s} — operation completed`} severity={s} onClose={noop} />
        ))}
      </div>
      <RUIToast.Viewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80" />
    </RUIToast.Provider>
  ),
};

export const LongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toast with a long message — verifies text wrapping behavior. Keep messages concise in production; wrap if unavoidable.',
      },
    },
  },
  render: () => (
    <ToastDemo
      message="Import completed: 243 assets were added to inventory, 12 were skipped due to duplicate serial numbers, and 3 failed validation. Review the import log for details."
      severity="warning"
    />
  ),
};

// ─── useToast hook stories (programmatic) ─────────────────────────────────────

function ProgrammaticTriggerDemo() {
  const { showToast } = useToast();
  return (
    <Button
      label="Save Changes"
      severity="primary"
      onClick={() => showToast({ message: 'Settings saved successfully!', severity: 'success' })}
    />
  );
}

export const ProgrammaticTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This is the recommended pattern for triggering toasts from user actions. `useToast()` is available in any component because `MystaLibProvider` (which wraps `ToastProvider`) is injected by the Storybook preview.',
      },
    },
  },
  render: () => <ProgrammaticTriggerDemo />,
};

function MultipleToastsDemo() {
  const { showToast } = useToast();
  const toasts = [
    { message: 'Asset imported', severity: 'success' as const },
    { message: 'Duplicate serial detected — skipped', severity: 'warning' as const },
    { message: 'Network timeout on row 47', severity: 'danger' as const },
  ];
  return (
    <Button
      label="Trigger 3 toasts"
      severity="info"
      onClick={() => toasts.forEach((t, i) => setTimeout(() => showToast(t), i * 400))}
    />
  );
}

export const MultipleToasts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click to trigger three toasts in rapid sequence. The ToastProvider stacks them in the viewport corner.',
      },
    },
  },
  render: () => <MultipleToastsDemo />,
};

function AllSeveritiesInteractiveDemo() {
  const { showToast } = useToast();
  const severities = [
    { severity: 'success' as const, label: 'Success', message: 'Record saved successfully.' },
    { severity: 'danger' as const, label: 'Danger', message: 'Operation failed. Check logs.' },
    { severity: 'warning' as const, label: 'Warning', message: 'Approaching rate limit.' },
    { severity: 'info' as const, label: 'Info', message: 'Sync completed in background.' },
    { severity: 'primary' as const, label: 'Primary', message: 'New feature now available.' },
    { severity: 'secondary' as const, label: 'Secondary', message: 'Background task running.' },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {severities.map(({ severity, label, message }) => (
        <Button
          key={severity}
          label={label}
          severity={severity}
          onClick={() => showToast({ message, severity })}
        />
      ))}
    </div>
  );
}

export const AllSeveritiesInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Six buttons each triggering a different severity toast via `useToast`. Click any button to see the live notification.',
      },
    },
  },
  render: () => <AllSeveritiesInteractiveDemo />,
};
