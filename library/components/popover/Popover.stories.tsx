import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';

import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Preset/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Popover** is a floating content panel that appears relative to a trigger element. Unlike Tooltip, Popover is meant for richer interactive content — action menus, user cards, help text, form controls.

**Key behaviors:**
- Click-triggered by default; hover-triggered with \`triggerOnMouseOver\`.
- \`closeOnBlur\` closes the popover when the user clicks outside.
- \`visible\` + \`onVisibleChange\` — use for controlled (external state) scenarios.
- \`defaultVisibility\` opens the popover on first render.
- \`alwaysRender\` keeps the content in the DOM — use when you need animations.

**When to use:** Context menus, user profile previews, help/documentation bubbles, color pickers, and any floating UI that requires interaction (clicks, forms). For non-interactive labels or hints, use Tooltip instead.
        `,
      },
    },
  },
  argTypes: {
    closeOnBlur: {
      control: 'boolean',
      description: 'Close the popover when clicking outside.',
      table: { defaultValue: { summary: 'false' } },
    },
    triggerOnMouseOver: {
      control: 'boolean',
      description: 'Open on hover instead of click.',
      table: { defaultValue: { summary: 'false' } },
    },
    defaultVisibility: {
      control: 'boolean',
      description: 'Open the popover on initial render.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to toggle the popover. Click again or outside (with closeOnBlur) to dismiss.',
      },
    },
  },
  render: () => (
    <Popover content={<div className="p-3 text-sm">Click the button to toggle this popover.</div>}>
      <Button label="Click to Open" />
    </Popover>
  ),
};

// ─── Trigger behavior ─────────────────────────────────────────────────────────

export const CloseOnBlur: Story = {
  parameters: {
    docs: {
      description: {
        story: '`closeOnBlur` dismisses the popover when the user clicks anywhere outside the floating panel.',
      },
    },
  },
  render: () => (
    <Popover closeOnBlur content={<div className="p-3 text-sm">Click anywhere outside to close.</div>}>
      <Button label="Open (close on blur)" />
    </Popover>
  ),
};

export const TriggerOnHover: Story = {
  parameters: {
    docs: {
      description: {
        story: '`triggerOnMouseOver` makes the popover appear on pointer hover rather than click. Useful for quick previews.',
      },
    },
  },
  render: () => (
    <Popover content={<div className="p-3 text-sm">This opens on hover.</div>} triggerOnMouseOver>
      <Button label="Hover me" />
    </Popover>
  ),
};

export const DefaultVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: '`defaultVisibility` renders the popover open on first mount — useful for onboarding highlights.',
      },
    },
  },
  render: () => (
    <Popover content={<div className="p-3 text-sm">This popover starts open.</div>} defaultVisibility>
      <Button label="Toggle" />
    </Popover>
  ),
};

export const ControlledVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled mode — visibility is driven by an external button. Use `visible` + `onVisibleChange` for programmatic control.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="flex gap-3 items-center">
        <Button label={visible ? 'Hide Popover' : 'Show Popover'} severity="secondary" onClick={() => setVisible((v) => !v)} />
        <Popover
          content={<div className="p-3 text-sm">Controlled visibility via external state.</div>}
          visible={visible}
          onVisibleChange={setVisible}
        >
          <span className="text-sm text-gray-500">← controlled anchor</span>
        </Popover>
      </div>
    );
  },
};

// ─── Rich content ─────────────────────────────────────────────────────────────

export const RichContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover with multiple interactive items — a context menu with edit, duplicate, and delete actions.',
      },
    },
  },
  render: () => (
    <Popover
      content={
        <div className="p-4 space-y-2 w-56">
          <p className="text-sm font-semibold">More options</p>
          <button className="block w-full text-left text-sm px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" type="button">Edit</button>
          <button className="block w-full text-left text-sm px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" type="button">Duplicate</button>
          <button className="block w-full text-left text-sm px-2 py-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950" type="button">Delete</button>
        </div>
      }
    >
      <Button icon="menu" severity="secondary" />
    </Popover>
  ),
};

// ─── Real-world patterns ──────────────────────────────────────────────────────

export const UserCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clicking a user avatar triggers a profile card popover — shows name, role, email, and quick actions.',
      },
    },
  },
  render: () => (
    <Popover
      closeOnBlur
      content={
        <div className="p-4 w-64 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              AJ
            </div>
            <div>
              <p className="text-sm font-semibold">Alice Johnson</p>
              <p className="text-xs text-gray-500">alice@qtera.io</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge label="Admin" severity="primary" type="filled" />
            <Badge label="IAM Team" severity="secondary" type="outlined" />
          </div>
          <div className="flex gap-2 pt-1">
            <Button label="Message" outlined severity="secondary" width="100%" />
            <Button label="Profile" severity="primary" width="100%" />
          </div>
        </div>
      }
    >
      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all">
        AJ
      </div>
    </Popover>
  ),
};

export const ActionMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three-dot action menu — a popover with contextual operations for a row or card. Each action has an icon and label.',
      },
    },
  },
  render: () => {
    const actions = [
      { label: 'Edit', icon: '✏️', description: 'Modify this record' },
      { label: 'Duplicate', icon: '📋', description: 'Create a copy' },
      { label: 'Archive', icon: '📦', description: 'Move to archive' },
      { label: 'Delete', icon: '🗑️', description: 'Permanently remove', danger: true },
    ];
    return (
      <div className="flex items-center gap-3 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg">
        <span className="text-sm font-medium flex-1">Asset #A-00142 — Network Switch</span>
        <Badge label="Active" severity="success" type="dot" />
        <Popover
          closeOnBlur
          content={
            <div className="py-1 w-52">
              {actions.map((action) => (
                <button
                  key={action.label}
                  className={`flex items-start gap-3 w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    action.danger ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                  type="button"
                >
                  <span className="text-base mt-0.5">{action.icon}</span>
                  <div>
                    <p className="text-sm font-medium leading-none">{action.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          }
        >
          <Button icon="menu" severity="secondary" text />
        </Popover>
      </div>
    );
  },
};

export const HelpTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Help icon triggers a popover with descriptive help text. Richer than Tooltip — allows formatted text and links.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Approval Threshold</span>
      <Popover
        closeOnBlur
        triggerOnMouseOver
        content={
          <div className="p-4 w-72 space-y-2">
            <p className="text-sm font-semibold">About Approval Threshold</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              The approval threshold determines how many approvers must sign off before an asset request is processed.
              A value of <strong>1</strong> means any single approver can approve. A value equal to the total approvers means unanimous agreement is required.
            </p>
            <a className="text-xs text-indigo-500 hover:underline" href="#">
              Learn more in the docs →
            </a>
          </div>
        }
      >
        <button className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs font-bold flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" type="button">
          ?
        </button>
      </Popover>
    </div>
  ),
};

export const AllPlacements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover placement is determined automatically by available viewport space. This grid shows all four trigger positions with hover-triggered popovers.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8">
      {(
        [
          { label: 'Top trigger', content: 'Appears above' },
          { label: 'Right trigger', content: 'Appears to the right' },
          { label: 'Bottom trigger', content: 'Appears below' },
          { label: 'Left trigger', content: 'Appears to the left' },
        ] as const
      ).map((item) => (
        <Popover
          key={item.label}
          closeOnBlur
          content={<div className="p-3 text-sm">{item.content}</div>}
        >
          <Button label={item.label} severity="secondary" />
        </Popover>
      ))}
    </div>
  ),
};
