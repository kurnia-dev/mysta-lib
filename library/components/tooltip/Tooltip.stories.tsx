import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Preset/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Tooltip** displays a short text hint when the user hovers over or focuses a trigger element. It is non-interactive — for richer floating content (action menus, user cards, clickable links), use Popover instead.

**Key behaviors:**
- Wraps any element; the wrapped child is the trigger.
- \`position\` controls which side the tooltip appears on: \`top\` / \`right\` / \`bottom\` / \`left\`.
- \`hide=true\` suppresses the tooltip entirely — useful when the trigger already has a visible label.
- \`content\` accepts a string or JSX for rich hints.

**When to use:** Icon-only buttons (always), disabled buttons (explain why), truncated text (show full value), and any interactive element whose function is not immediately obvious from its visual appearance.
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Side of the trigger element where the tooltip appears.',
      table: { defaultValue: { summary: 'top' } },
    },
    hide: {
      control: 'boolean',
      description: 'When true, suppresses the tooltip entirely.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage — only `content` is required. Position defaults to `top`.',
      },
    },
  },
  render: () => (
    <Tooltip content="This is a helpful tooltip.">
      <Button label="Hover me" />
    </Tooltip>
  ),
};

// ─── Position variants ────────────────────────────────────────────────────────

export const Top: Story = {
  render: () => (
    <Tooltip content="Tooltip above" position="top">
      <Button label="Top" />
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip content="Tooltip below" position="bottom">
      <Button label="Bottom" />
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip content="Tooltip on the left" position="left">
      <Button label="Left" />
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip content="Tooltip on the right" position="right">
      <Button label="Right" />
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All four tooltip positions side by side. Hover each button to compare placement.',
      },
    },
  },
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} content={`${pos} tooltip`} position={pos}>
          <Button label={pos} severity="secondary" />
        </Tooltip>
      ))}
    </div>
  ),
};

// ─── State variants ───────────────────────────────────────────────────────────

export const Hidden: Story = {
  parameters: {
    docs: {
      description: {
        story: '`hide=true` suppresses the tooltip. Use programmatically to disable tooltips when a label is already visible (e.g. after expanding an icon-only nav).',
      },
    },
  },
  render: () => (
    <Tooltip content="You won't see me" hide>
      <Button label="Tooltip hidden (hide=true)" />
    </Tooltip>
  ),
};

// ─── Rich content ─────────────────────────────────────────────────────────────

export const RichContent: Story = {
  parameters: {
    docs: {
      description: {
        story: '`content` accepts JSX — useful for multi-line hints with a title and description.',
      },
    },
  },
  render: () => (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold text-xs">Pro tip</p>
          <p className="text-xs text-gray-300">Use keyboard shortcuts to speed things up.</p>
        </div>
      }
    >
      <Button label="Rich tooltip" severity="info" />
    </Tooltip>
  ),
};

// ─── Real-world patterns ──────────────────────────────────────────────────────

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip on a bare icon — the most common pattern. Without a tooltip, icon-only elements are inaccessible to users who rely on text labels.',
      },
    },
  },
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="Download report as PDF" position="bottom">
        <span className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Icon name="copy" />
        </span>
      </Tooltip>
      <Tooltip content="Share with teammates" position="bottom">
        <span className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Icon name="send" />
        </span>
      </Tooltip>
      <Tooltip content="View change history" position="bottom">
        <span className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Icon name="clock" />
        </span>
      </Tooltip>
    </div>
  ),
};

export const OnTruncatedText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip revealing full text on a truncated element — common in table cells or list items with limited width.',
      },
    },
  },
  render: () => (
    <div className="space-y-3 w-64">
      {[
        'Integrate RFID readers with the Temporal workflow orchestration layer',
        'Review Q2 enterprise asset procurement report for APAC region',
        'Migrate ts-migrations to the new multi-tenant PostgreSQL schema',
      ].map((text) => (
        <Tooltip key={text} content={text} position="top">
          <p className="text-sm truncate cursor-default border border-gray-200 dark:border-gray-700 rounded px-2 py-1">
            {text}
          </p>
        </Tooltip>
      ))}
    </div>
  ),
};

export const ActionTooltips: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toolbar of icon buttons with descriptive tooltips. Each button has a meaningful label explaining the action — essential for accessibility.',
      },
    },
  },
  render: () => {
    const actions = [
      { icon: 'check' as const, label: 'Save changes (Ctrl+S)', severity: 'success' as const },
      { icon: 'edit' as const, label: 'Edit selected item', severity: 'primary' as const },
      { icon: 'copy' as const, label: 'Duplicate item', severity: 'secondary' as const },
      { icon: 'trash' as const, label: 'Delete permanently', severity: 'danger' as const },
    ];
    return (
      <div className="flex items-center gap-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        {actions.map((action) => (
          <Tooltip key={action.icon} content={action.label} position="bottom">
            <Button icon={action.icon} severity={action.severity} text />
          </Tooltip>
        ))}
      </div>
    );
  },
};

export const DisabledButtonTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip on a disabled button explaining why the action is unavailable. Disabled elements cannot receive mouse events directly — wrap them in a `span` to capture hover.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Tooltip content="You need the Editor role or higher to publish content." position="right">
        <span className="inline-block">
          <Button disabled label="Publish Report" severity="primary" />
        </span>
      </Tooltip>
      <Tooltip content="Select at least one row before exporting." position="right">
        <span className="inline-block">
          <Button disabled icon="download" label="Export Selected" outlined severity="secondary" />
        </span>
      </Tooltip>
      <Tooltip content="Cannot delete the last admin account." position="right">
        <span className="inline-block">
          <Button disabled icon="trash" label="Delete Account" severity="danger" />
        </span>
      </Tooltip>
    </div>
  ),
};
