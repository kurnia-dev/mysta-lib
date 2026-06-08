import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**ProgressBar** shows the completion state of a task as a horizontal fill bar, expressed as a \`value / max\` ratio.

Use it for:
- File upload / download progress
- Form completion percentage
- Onboarding step completion
- Resource usage indicators (CPU, disk, memory)

### Key props
| Prop | Type | Default | Description |
|---|---|---|---|
| \`value\` | \`number\` | — | Current value |
| \`max\` | \`number\` | \`100\` | Maximum value |
| \`label\` | \`string\` | — | Displays above the bar with a percentage counter on the right |
| \`animated\` | \`boolean\` | \`false\` | Adds a pulse animation to signal an in-progress state |
| \`color\` | \`string\` | — | Tailwind background class (e.g. \`bg-green-500\`). Falls back to \`bg-blue-500\` |

Pass \`animated={true}\` while the operation is running; set it to \`false\` once complete.
        `,
      },
    },
  },
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Pulsing animation to signal an in-progress state.',
      table: { defaultValue: { summary: 'false' } },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value.',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value (denominator).',
      table: { defaultValue: { summary: '100' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ---------------------------------------------------------------------------
// Static states
// ---------------------------------------------------------------------------

export const Default: Story = { args: { value: 60 } };
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
export const Quarter: Story = { args: { value: 25 } };
export const ThreeQuarters: Story = { args: { value: 75 } };

// ---------------------------------------------------------------------------
// With label / max
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  args: { animated: true, label: 'Uploading report.xlsx…', value: 45 },
};

export const WithCustomMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `max` to express progress in any unit — here `80 / 200` tasks completed.',
      },
    },
  },
  args: { label: 'Tasks completed', max: 200, value: 80 },
};

export const Animated: Story = {
  args: { animated: true, label: 'Processing…', value: 65 },
};

// ---------------------------------------------------------------------------
// Color variants
// ---------------------------------------------------------------------------

export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass a Tailwind `bg-*` class to the `color` prop to override the default blue fill.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-4">
      <ProgressBar color="bg-green-500"  label="Success"  value={80} />
      <ProgressBar color="bg-red-500"    label="Error"    value={30} />
      <ProgressBar color="bg-yellow-400" label="Warning"  value={55} />
      <ProgressBar color="bg-purple-500" label="Custom"   value={70} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Animated / interactive
// ---------------------------------------------------------------------------

export const UploadProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Simulates a live file upload by incrementing the value every 100 ms. The label switches to "Done!" at 100%.',
      },
    },
  },
  render: () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const id = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(id); return 100; }
          return p + 2;
        });
      }, 100);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="w-80 space-y-1">
        <ProgressBar animated={progress < 100} label={progress < 100 ? 'Uploading file…' : 'Done!'} value={progress} />
      </div>
    );
  },
};

export const MultipleItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack multiple ProgressBars for resource usage dashboards. Each bar uses a distinct color per metric.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-4">
      {[
        { label: 'CPU',     color: 'bg-blue-500',   value: 72 },
        { label: 'Memory',  color: 'bg-green-500',  value: 45 },
        { label: 'Disk',    color: 'bg-yellow-500', value: 88 },
        { label: 'Network', color: 'bg-purple-500', value: 30 },
      ].map((item) => (
        <ProgressBar key={item.label} animated color={item.color} label={item.label} value={item.value} />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Domain scenarios
// ---------------------------------------------------------------------------

export const FileUploadSimulation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive file upload with start / reset control. Demonstrates `animated` toggling and label transitions.',
      },
    },
  },
  render: () => {
    const [progress, setProgress] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
      if (!running) return;
      const id = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(id); setRunning(false); return 100; }
          return Math.min(100, p + Math.random() * 4 + 1);
        });
      }, 120);
      return () => clearInterval(id);
    }, [running]);

    const reset = (): void => { setProgress(0); setRunning(false); };

    const label =
      progress === 0 ? 'Ready to upload' :
      progress >= 100 ? 'Upload complete!' :
      `Uploading design-assets.zip… ${Math.round(progress)}%`;

    return (
      <div className="w-80 space-y-3">
        <ProgressBar animated={running} label={label} value={Math.round(progress)} />
        <div className="flex gap-2">
          <button
            className="text-xs px-3 py-1.5 rounded bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            disabled={running || progress >= 100}
            type="button"
            onClick={() => setRunning(true)}
          >
            {progress >= 100 ? 'Done' : 'Start upload'}
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
};

export const OnboardingProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Onboarding checklist pattern: shows "X of Y steps completed" above the bar. Click a step to mark it done.',
      },
    },
  },
  render: () => {
    const steps = [
      'Verify your email address',
      'Complete your profile',
      'Connect your first integration',
      'Invite a team member',
      'Create your first project',
      'Set up billing',
      'Explore the dashboard',
    ];
    const [completed, setCompleted] = useState<Set<number>>(new Set([0, 1, 2]));

    const toggle = (i: number): void => {
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i); else next.add(i);
        return next;
      });
    };

    return (
      <div className="w-80 space-y-4">
        <ProgressBar
          label={`${completed.size} of ${steps.length} steps completed`}
          value={completed.size}
          max={steps.length}
          color={completed.size === steps.length ? 'bg-emerald-500' : undefined}
        />
        <ul className="space-y-1.5">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2 cursor-pointer" onClick={() => toggle(i)}>
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] shrink-0 transition-colors ${completed.has(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                {completed.has(i) && '✓'}
              </span>
              <span className={`text-xs ${completed.has(i) ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
