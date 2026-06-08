import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FloatingActionButton } from './FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Preset/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**FloatingActionButton** (FAB) is a fixed-position circular button that surfaces the primary action on a screen.
It supports three positions (\`bottom-right\`, \`bottom-left\`, \`bottom-center\`), three sizes (\`sm\`, \`md\`, \`lg\`), and all severity color variants.
When \`extendedLabel\` is provided, hovering or focusing the button reveals a text label beside the icon — useful for clarity on first use.
Use it for a single, dominant action such as creating a new record, composing a message, or starting a scan.
Avoid using more than one FAB per screen.
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'bottom-center'],
      description: 'Fixed position of the FAB on screen.',
      table: { defaultValue: { summary: 'bottom-right' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the button.',
      table: { defaultValue: { summary: 'md' } },
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color severity variant.',
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

// ---------------------------------------------------------------------------
// Helper: a fixed-height container that gives the FAB space to position itself
// ---------------------------------------------------------------------------

function FABStage({ children, height = 'h-64' }: { children: React.ReactNode; height?: string }) {
  return (
    <div className={`relative ${height} w-full bg-gray-50 dark:bg-gray-950 overflow-hidden`}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal FAB: "+" icon, primary severity, bottom-right position.',
      },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Create new item" onClick={() => {}} />
    </FABStage>
  ),
};

export const BottomRight: Story = {
  parameters: {
    docs: {
      description: { story: '`position="bottom-right"` — the default and most common FAB placement.' },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Add" position="bottom-right" onClick={() => {}} />
    </FABStage>
  ),
};

export const BottomLeft: Story = {
  parameters: {
    docs: {
      description: { story: '`position="bottom-left"` — useful when the right side is occupied by a bottom navigation.' },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Add" position="bottom-left" onClick={() => {}} />
    </FABStage>
  ),
};

export const BottomCenter: Story = {
  parameters: {
    docs: {
      description: { story: '`position="bottom-center"` — centred placement, often used above a bottom navigation bar.' },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Add" position="bottom-center" onClick={() => {}} />
    </FABStage>
  ),
};

export const WithExtendedLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover over the FAB to reveal the `extendedLabel` text. The label appears on hover/focus and disappears on mouse-leave.',
      },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton
        extendedLabel="New Report"
        icon="plus"
        label="Create new report"
        onClick={() => {}}
      />
    </FABStage>
  ),
};

export const Small: Story = {
  parameters: {
    docs: {
      description: { story: '`size="sm"` — compact FAB for dense layouts.' },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Add" size="sm" onClick={() => {}} />
    </FABStage>
  ),
};

export const Large: Story = {
  parameters: {
    docs: {
      description: { story: '`size="lg"` — prominent FAB for high-emphasis primary actions.' },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton icon="plus" label="Add" size="lg" onClick={() => {}} />
    </FABStage>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled FAB — visually de-emphasised, pointer events ignored. Use when the action is temporarily unavailable.',
      },
    },
  },
  render: () => (
    <FABStage>
      <FloatingActionButton disabled icon="plus" label="Cannot add — no permissions" onClick={() => {}} />
    </FABStage>
  ),
};

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All severity color variants stacked vertically on the right edge for visual comparison.',
      },
    },
  },
  render: () => (
    <FABStage height="h-[420px]">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s, i) => (
        <div className="absolute" key={s} style={{ bottom: 16 + i * 64, right: 16 }}>
          <FloatingActionButton icon="plus" label={s} severity={s} onClick={() => {}} />
        </div>
      ))}
    </FABStage>
  ),
};

export const CreateAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic primary creation action: "+" icon, primary severity, bottom-right, with extended label and a click counter.',
      },
    },
  },
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <FABStage>
        {count > 0 && (
          <p className="absolute top-4 left-4 text-xs text-gray-500">
            Created {count} item{count !== 1 ? 's' : ''}
          </p>
        )}
        <FloatingActionButton
          extendedLabel="New Item"
          icon="plus"
          label="Create new item"
          position="bottom-right"
          severity="primary"
          onClick={() => setCount((c) => c + 1)}
        />
      </FABStage>
    );
  },
};

export const InPageContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FAB positioned within a scrollable content area — simulates real-world placement on a data list page. Click the FAB to add new projects.',
      },
    },
  },
  render: () => {
    const [created, setCreated] = useState<string[]>([]);

    const items = [
      { id: 1, name: 'Project Alpha', status: 'Active' },
      { id: 2, name: 'Project Beta', status: 'On Hold' },
      { id: 3, name: 'Project Gamma', status: 'Completed' },
      { id: 4, name: 'Project Delta', status: 'Active' },
      { id: 5, name: 'Project Epsilon', status: 'Planning' },
    ];

    return (
      <div className="relative h-96 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <div className="p-4 space-y-2 pb-24">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Projects</h2>
          {[...items, ...created.map((name, i) => ({ id: 100 + i, name, status: 'Draft' }))].map((item) => (
            <div
              className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              key={item.id}
            >
              <span className="text-sm font-medium">{item.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                item.status === 'Active' ? 'bg-green-100 text-green-700' :
                item.status === 'Draft' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-500'
              }`}>{item.status}</span>
            </div>
          ))}
        </div>
        <FloatingActionButton
          extendedLabel="New Project"
          icon="plus"
          label="Create new project"
          position="bottom-right"
          onClick={() => setCreated((prev) => [...prev, `Project ${String.fromCharCode(90 - prev.length)}`])}
        />
      </div>
    );
  },
};
