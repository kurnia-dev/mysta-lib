import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Preset/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Button** is the primary action trigger in the library. It supports six severity levels, three style variants (default fill, outlined, text), icon placement, loading states, and custom sizing.

**When to use each severity:**
- \`primary\` — default CTA, the main action on a page or section
- \`secondary\` — subordinate action (Cancel, Back, View Details)
- \`success\` — save, confirm, or complete a positive action (Save, Create, Approve)
- \`warning\` — cautionary action that requires attention but is not destructive
- \`danger\` — irreversible or destructive actions (Delete, Remove, Revoke)
- \`info\` — informational prompts and non-critical actions (View Log, Learn More)

**Icon positions:** Use \`iconPos="left"\` (default) for contextual icons (plus, check) and \`iconPos="right"\` for navigation arrows (chevron-right, arrow-right).
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color severity variant of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    iconPos: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the label.',
      table: { defaultValue: { summary: 'left' } },
    },
    height: {
      control: 'number',
      description: 'Button height in pixels (number) or any CSS unit (string).',
      table: { defaultValue: { summary: '26' } },
    },
    width: {
      control: 'text',
      description: 'Button width — number (pixels), CSS string, or "max-content".',
      table: { defaultValue: { summary: 'max-content' } },
    },
    loading: {
      control: 'boolean',
      description: 'Displays a spinner and disables interaction while true.',
      table: { defaultValue: { summary: 'false' } },
    },
    outlined: {
      control: 'boolean',
      description: 'Renders the button with a border and transparent background.',
      table: { defaultValue: { summary: 'false' } },
    },
    text: {
      control: 'boolean',
      description: 'Removes background and border — text color only.',
      table: { defaultValue: { summary: 'false' } },
    },
    raised: {
      control: 'boolean',
      description: 'Adds a box shadow to elevate the button visually.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents all interaction and applies a muted visual style.',
      table: { defaultValue: { summary: 'false' } },
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute.',
      table: { defaultValue: { summary: 'button' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

// ─── Default / Severity variants ─────────────────────────────────────────────

export const Primary: Story = {
  args: { label: 'Save Changes', severity: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Cancel', severity: 'secondary' },
};

export const Success: Story = {
  args: { label: 'Approve Request', severity: 'success' },
};

export const Warning: Story = {
  args: { label: 'Archive Project', severity: 'warning' },
};

export const Danger: Story = {
  args: { label: 'Delete Account', severity: 'danger' },
};

export const Info: Story = {
  args: { label: 'View Audit Log', severity: 'info' },
};

// ─── Style variants ───────────────────────────────────────────────────────────

export const Outlined: Story = {
  args: { label: 'Export CSV', outlined: true, severity: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Outlined style keeps the border but removes the fill. Use as a secondary CTA when the primary action uses a filled button.',
      },
    },
  },
};

export const TextStyle: Story = {
  args: { label: 'Learn more', severity: 'primary', text: true },
  parameters: {
    docs: {
      description: {
        story: 'Text-only style — no background or border. Ideal for tertiary actions or inline links within prose.',
      },
    },
  },
};

export const Raised: Story = {
  args: { label: 'Add to Dashboard', raised: true, severity: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Raised adds elevation via box-shadow. Use sparingly to draw attention to a floating or hero CTA.',
      },
    },
  },
};

// ─── Icon variants ────────────────────────────────────────────────────────────

export const WithIconLeft: Story = {
  args: { icon: 'plus', iconPos: 'left', label: 'New Asset', severity: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Icon on the left is the default placement. Works well for action-oriented icons (plus, edit, upload).',
      },
    },
  },
};

export const WithIconRight: Story = {
  args: { icon: 'chevron-right', iconPos: 'right', label: 'Next Step', severity: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Icon on the right is best for directional cues (chevron-right, arrow-right) that imply navigation.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: { icon: 'trash', severity: 'danger' },
  parameters: {
    docs: {
      description: {
        story: 'No label — icon only. Always pair with a Tooltip so the action is accessible to screen readers and keyboard users.',
      },
    },
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { label: 'Saving…', loading: true, severity: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Static loading state. In practice, toggle this with `useState` while awaiting an async operation (see WithLoadingSpinner).',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Submit (permissions required)', severity: 'primary' },
};

// ─── Custom sizing ────────────────────────────────────────────────────────────

export const CustomSize: Story = {
  args: { height: 48, label: 'Large CTA', severity: 'primary', width: 240 },
  parameters: {
    docs: {
      description: {
        story: 'Override default dimensions with `height` and `width` props (number = pixels, string = any CSS unit). Use sparingly — prefer consistent sizing across the product.',
      },
    },
  },
};

// ─── Grid stories ─────────────────────────────────────────────────────────────

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severity levels rendered side by side. Use this as a quick reference for which severity maps to which color.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <Button key={s} label={s} severity={s} />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The four style variants (fill, outlined, text, raised) for the primary severity — swap the severity prop to preview all combinations.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button label="Fill (default)" severity="primary" />
      <Button label="Outlined" outlined severity="primary" />
      <Button label="Text" severity="primary" text />
      <Button label="Raised" raised severity="primary" />
    </div>
  ),
};

// ─── Interaction stories ──────────────────────────────────────────────────────

export const WithLoadingSpinner: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Simulates an async save operation. Click the button to see the loading spinner; it auto-resolves after 2 s. This is the recommended pattern for async actions.',
      },
    },
  },
  render: () => {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      setLoading(true);
      setSaved(false);
      setTimeout(() => {
        setLoading(false);
        setSaved(true);
      }, 2000);
    };

    return (
      <div className="flex items-center gap-3">
        <Button
          label={saved ? 'Saved!' : 'Save Report'}
          loading={loading}
          severity={saved ? 'success' : 'primary'}
          onClick={handleSave}
        />
        {saved && <span className="text-xs text-green-600">Changes persisted.</span>}
      </div>
    );
  },
};

// ─── Layout / composition stories ────────────────────────────────────────────

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Setting `width="100%"` makes the button fill its container — common in mobile layouts, dialogs, and bottom sheets.',
      },
    },
  },
  render: () => (
    <div className="w-80 flex flex-col gap-2">
      <Button label="Create Account" severity="primary" width="100%" />
      <Button label="Sign in with SSO" outlined severity="secondary" width="100%" />
    </div>
  ),
};

export const ButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A horizontal group of related actions. The primary action (Save) is fill, subordinate actions (Reset, Cancel) use lower-weight variants to maintain clear hierarchy.',
      },
    },
  },
  render: () => (
    <div className="flex gap-2">
      <Button label="Save" severity="success" />
      <Button label="Reset" outlined severity="secondary" />
      <Button label="Cancel" severity="secondary" text />
    </div>
  ),
};

export const ActionBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic toolbar pattern — "New Asset" is the primary CTA, "Export" is a secondary outlined action, and "Delete Selected" is a danger text button shown only when items are selected.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
        <Button icon="plus" label="New Asset" severity="primary" />
        <Button icon="download" label="Export CSV" outlined severity="secondary" />
        <div className="ml-auto flex gap-2 items-center">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
            <input
              checked={selected}
              type="checkbox"
              onChange={(e) => setSelected(e.target.checked)}
            />
            Simulate selection
          </label>
          {selected && (
            <Button icon="trash" label="Delete Selected" severity="danger" text />
          )}
        </div>
      </div>
    );
  },
};
