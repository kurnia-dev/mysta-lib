import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Preset/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Checkbox** is a form-aware boolean / value-collection / tristate input. It must be wrapped in a \`<Form>\` component — the \`fieldName\` prop binds it to the react-hook-form context.

Three modes are available: **binary** (default) stores \`true\`/\`false\`; **value** mode accumulates selected \`optionValue\`s into an array under a shared \`fieldName\` — ideal for permission or preference groups; **tristate** cycles through \`true → false → null\` for indeterminate states.

The \`required\` prop, \`customValidation\`, and \`customMessage\` provide inline error feedback on form submit. Use \`info\` to attach a tooltip to the label.
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['binary', 'value', 'tristate'],
      description: 'Checkbox mode: binary (boolean), value (array collection), or tristate (true/false/null).',
      table: { defaultValue: { summary: 'binary' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    hideRequiredMark: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal binary checkbox. The field value is `true` when checked, `false` when unchecked.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Checkbox fieldName="agree" label="I agree to the Terms of Service" />
      </Form>
    </div>
  ),
};

// ─── Checked ─────────────────────────────────────────────────────────────────

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-checked state using `defaultValues` on the Form. No prop needed on the Checkbox itself.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]} defaultValues={{ marketing: true }}>
        <Checkbox fieldName="marketing" label="Receive product updates and announcements" />
      </Form>
    </div>
  ),
};

// ─── Required ────────────────────────────────────────────────────────────────

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A required checkbox must be checked before the form submits. Click Submit without checking to trigger validation.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Create Account' }]}>
        <Checkbox fieldName="privacy" label="I have read and accept the Privacy Policy" required />
      </Form>
    </div>
  ),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]} defaultValues={{ mfa: true }}>
        <Checkbox disabled fieldName="mfa" label="Multi-factor authentication (managed by org)" />
        <Checkbox disabled fieldName="sso" label="Single sign-on (not available on your plan)" />
      </Form>
    </div>
  ),
};

// ─── WithInfo ────────────────────────────────────────────────────────────────

export const WithInfo: Story = {
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Checkbox
          fieldName="newsletter"
          info="We send at most one email per week. You can unsubscribe at any time from your account settings."
          label="Subscribe to weekly newsletter"
        />
      </Form>
    </div>
  ),
};

// ─── Tristate ────────────────────────────────────────────────────────────────

export const Tristate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tristate mode cycles through checked → unchecked → indeterminate (null). Useful for "select all" controls where child items may have mixed states.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Checkbox fieldName="selectAll" label="Select all items" mode="tristate" />
      </Form>
    </div>
  ),
};

// ─── IndeterminateState ───────────────────────────────────────────────────────

export const IndeterminateState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three tristate checkboxes showing all possible states: checked (`true`), unchecked (`false`), and indeterminate (`null`).',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form
        buttonsConfig={[]}
        defaultValues={{ stateTrue: true, stateFalse: false, stateNull: null }}
      >
        <Checkbox fieldName="stateTrue" label="Checked (true)" mode="tristate" />
        <Checkbox fieldName="stateFalse" label="Unchecked (false)" mode="tristate" />
        <Checkbox fieldName="stateNull" label="Indeterminate (null)" mode="tristate" />
      </Form>
    </div>
  ),
};

// ─── ValueMode ───────────────────────────────────────────────────────────────

export const ValueMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Value mode: multiple checkboxes share one `fieldName`. Selected `optionValue`s are accumulated into an array. Perfect for multi-select preference lists.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]} defaultValues={{ skills: ['react', 'typescript'] }}>
        <Checkbox fieldName="skills" label="React" mode="value" optionValue="react" />
        <Checkbox fieldName="skills" label="TypeScript" mode="value" optionValue="typescript" />
        <Checkbox fieldName="skills" label="Go" mode="value" optionValue="go" />
        <Checkbox fieldName="skills" label="PostgreSQL" mode="value" optionValue="postgresql" />
        <Checkbox fieldName="skills" label="Docker" mode="value" optionValue="docker" />
      </Form>
    </div>
  ),
};

// ─── ValidationError ─────────────────────────────────────────────────────────

export const ValidationError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Create Account** without checking the required consent checkbox to see the inline validation error message. The error clears on check.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[{ type: 'submit', label: 'Create Account' }]}>
        <Checkbox
          fieldName="tos"
          label="I accept the Terms of Service"
          required
        />
        <Checkbox
          fieldName="privacy"
          label="I accept the Privacy Policy"
          required
        />
      </Form>
    </div>
  ),
};

// ─── NotificationsPanel ───────────────────────────────────────────────────────

export const NotificationsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic notification preference panel: four independent binary checkboxes, each controlling a separate channel.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-1">
      <p className="text-sm font-semibold mb-3">Notification Channels</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Save Preferences' }]}
        defaultValues={{ emailNotif: true, smsNotif: false, pushNotif: true, inAppNotif: true }}
      >
        <Checkbox
          fieldName="emailNotif"
          info="Sent to your registered email address."
          label="Email notifications"
        />
        <Checkbox
          fieldName="smsNotif"
          info="Requires a verified mobile number."
          label="SMS notifications"
        />
        <Checkbox
          fieldName="pushNotif"
          info="Browser or mobile push alerts."
          label="Push notifications"
        />
        <Checkbox
          fieldName="inAppNotif"
          info="Shown in the notification bell inside the app."
          label="In-app notifications"
        />
      </Form>
    </div>
  ),
};

// ─── PermissionsGroup ─────────────────────────────────────────────────────────

export const PermissionsGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Value-mode permission group: five checkboxes share the `permissions` field name. The form value is an array of granted permission strings.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-1">
      <p className="text-sm font-semibold mb-3">Resource Permissions</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Apply Permissions' }]}
        defaultValues={{ permissions: ['read', 'write'] }}
      >
        <Checkbox fieldName="permissions" label="Read" mode="value" optionValue="read" />
        <Checkbox fieldName="permissions" label="Write" mode="value" optionValue="write" />
        <Checkbox fieldName="permissions" label="Delete" mode="value" optionValue="delete" />
        <Checkbox fieldName="permissions" label="Export" mode="value" optionValue="export" />
        <Checkbox
          fieldName="permissions"
          info="Grants full administrative control over this resource."
          label="Admin"
          mode="value"
          optionValue="admin"
        />
      </Form>
    </div>
  ),
};
