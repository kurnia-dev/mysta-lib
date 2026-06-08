import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MultiPhaseToast } from './MultiPhaseToast';

const meta: Meta<typeof MultiPhaseToast> = {
  title: 'Feedback/MultiPhaseToast',
  component: MultiPhaseToast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**MultiPhaseToast** is a persistent toast notification that tracks the sequential phases of a long-running async operation. It shows a progress bar, a dot indicator, and the current phase label — updating in place as each phase completes.

Use it for operations that have clearly defined steps the user needs to be aware of:
- File uploads (Preparing → Uploading → Processing → Done)
- Deployments (Building → Testing → Deploying → Live)
- Payments (Authorizing → Charging → Receipt sent)
- Form submissions with server-side processing stages

### How it works
Pass an ordered \`phases\` array and a \`currentPhase\` index (controlled externally). The component advances the progress bar and dot indicators as \`currentPhase\` increments. When \`currentPhase >= phases.length\`, the bar fills to 100% and marks the operation complete.

### Props
| Prop | Type | Description |
|---|---|---|
| \`phases\` | \`string[]\` | Ordered list of phase labels |
| \`currentPhase\` | \`number\` | Zero-based index of the active phase |
| \`open\` | \`boolean\` | Show or hide the toast |
| \`title\` | \`string\` | Optional heading above the phase label |
| \`onClose\` | \`() => void\` | Optional close button handler |

The toast renders \`null\` when \`open\` is \`false\`.
        `,
      },
    },
  },
  argTypes: {
    currentPhase: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Zero-based index of the currently active phase.',
    },
    open: {
      control: 'boolean',
      description: 'Controls visibility. The component renders `null` when `false`.',
      table: { defaultValue: { summary: 'true' } },
    },
    title: {
      control: 'text',
      description: 'Optional heading displayed above the current phase label.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof MultiPhaseToast>;

// ---------------------------------------------------------------------------
// Static phase snapshots
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The toast at phase 0 — first step active, progress bar at 0%, first dot pulsing.',
      },
    },
  },
  args: {
    currentPhase: 0,
    open: true,
    phases: ['Validating input', 'Saving to database', 'Sending notifications', 'Done'],
    title: 'Processing',
  },
};

export const MidProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Phase 2 of 4 — the progress bar is at 50%, two dots are filled, and the active dot is pulsing.',
      },
    },
  },
  args: {
    currentPhase: 2,
    open: true,
    phases: ['Validating input', 'Saving to database', 'Sending notifications', 'Done'],
    title: 'Processing',
  },
};

export const Completed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When `currentPhase >= phases.length` the bar fills to 100% and all dots are filled — the operation is complete.',
      },
    },
  },
  args: {
    currentPhase: 4,
    open: true,
    phases: ['Validating input', 'Saving to database', 'Sending notifications', 'Done'],
    title: 'Processing',
  },
};

export const WithClose: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Providing `onClose` adds a × button at the top-right of the toast.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="space-y-3">
        <MultiPhaseToast
          currentPhase={1}
          open={open}
          phases={['Preparing', 'Uploading', 'Processing', 'Complete']}
          title="File Upload"
          onClose={() => setOpen(false)}
        />
        {!open && (
          <button
            className="text-xs text-gray-400 underline"
            type="button"
            onClick={() => setOpen(true)}
          >
            Show again
          </button>
        )}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Interactive / animated
// ---------------------------------------------------------------------------

export const AllPhaseTransitions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Step through all phases manually using Prev / Next buttons. Demonstrates the full progression from start to completion.',
      },
    },
  },
  render: () => {
    const phases = ['Validating input', 'Saving to database', 'Sending notifications', 'Done'];
    const [phase, setPhase] = useState(0);
    const [open, setOpen] = useState(true);

    return (
      <div className="space-y-4">
        <MultiPhaseToast
          currentPhase={phase}
          open={open}
          phases={phases}
          title="Manual Control Demo"
          onClose={() => setOpen(false)}
        />
        <div className="flex items-center gap-2">
          <button
            className="text-xs px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40"
            disabled={phase <= 0}
            type="button"
            onClick={() => setPhase((p) => Math.max(0, p - 1))}
          >
            ← Prev
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40"
            disabled={phase >= phases.length}
            type="button"
            onClick={() => setPhase((p) => Math.min(phases.length, p + 1))}
          >
            Next →
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            type="button"
            onClick={() => { setPhase(0); setOpen(true); }}
          >
            Reset
          </button>
          <span className="text-xs text-gray-400 ml-2">
            phase {phase} / {phases.length}
          </span>
        </div>
      </div>
    );
  },
};

export const Animated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Auto-advancing animation: each phase lasts 1.2 s. Click Reset to replay. This is the typical integration pattern — your async function increments `currentPhase` as each step resolves.',
      },
    },
  },
  render: () => {
    const phases = ['Validating input', 'Saving to database', 'Sending notifications', 'Done'];
    const [phase, setPhase] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
      if (phase >= phases.length) return;
      const t = setTimeout(() => setPhase((p) => p + 1), 1200);
      return () => clearTimeout(t);
    }, [phase]);

    return (
      <div className="space-y-4">
        <MultiPhaseToast
          currentPhase={phase}
          open={open}
          phases={phases}
          title="Processing order"
          onClose={() => setOpen(false)}
        />
        <button
          className="text-xs text-gray-400 underline"
          type="button"
          onClick={() => { setPhase(0); setOpen(true); }}
        >
          Reset
        </button>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Domain scenarios
// ---------------------------------------------------------------------------

export const FileUploadPhases: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File upload workflow: Preparing → Uploading → Processing → Complete. Each phase advances automatically every 1.5 s.',
      },
    },
  },
  render: () => {
    const phases = ['Preparing upload', 'Uploading design-assets.zip', 'Processing on server', 'Upload complete!'];
    const [phase, setPhase] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
      if (phase >= phases.length) return;
      const t = setTimeout(() => setPhase((p) => p + 1), 1500);
      return () => clearTimeout(t);
    }, [phase]);

    return (
      <div className="space-y-3">
        <MultiPhaseToast
          currentPhase={phase}
          open={open}
          phases={phases}
          title="File Upload"
          onClose={() => setOpen(false)}
        />
        <button
          className="text-xs text-gray-400 underline"
          type="button"
          onClick={() => { setPhase(0); setOpen(true); }}
        >
          Replay
        </button>
      </div>
    );
  },
};

export const PaymentPhases: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Payment processing workflow: Authorizing → Charging → Sending receipt. Each step advances every 1.8 s.',
      },
    },
  },
  render: () => {
    const phases = ['Authorizing payment', 'Charging Visa •••• 4242', 'Receipt sent to alice@acme.com'];
    const [phase, setPhase] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
      if (phase >= phases.length) return;
      const t = setTimeout(() => setPhase((p) => p + 1), 1800);
      return () => clearTimeout(t);
    }, [phase]);

    return (
      <div className="space-y-3">
        <MultiPhaseToast
          currentPhase={phase}
          open={open}
          phases={phases}
          title="Payment"
          onClose={() => setOpen(false)}
        />
        <button
          className="text-xs text-gray-400 underline"
          type="button"
          onClick={() => { setPhase(0); setOpen(true); }}
        >
          Replay
        </button>
      </div>
    );
  },
};

export const DeploymentPhases: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CI/CD deployment workflow: Building → Running tests → Deploying to production → Live. Advances every 2 s.',
      },
    },
  },
  render: () => {
    const phases = ['Building Docker image', 'Running test suite', 'Deploying to production', 'Service is live'];
    const [phase, setPhase] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
      if (phase >= phases.length) return;
      const t = setTimeout(() => setPhase((p) => p + 1), 2000);
      return () => clearTimeout(t);
    }, [phase]);

    return (
      <div className="space-y-3">
        <MultiPhaseToast
          currentPhase={phase}
          open={open}
          phases={phases}
          title="Deployment"
          onClose={() => setOpen(false)}
        />
        <button
          className="text-xs text-gray-400 underline"
          type="button"
          onClick={() => { setPhase(0); setOpen(true); }}
        >
          Replay
        </button>
      </div>
    );
  },
};
