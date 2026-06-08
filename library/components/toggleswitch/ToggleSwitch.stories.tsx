import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Preset/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**ToggleSwitch** is a form-aware boolean switch built on react-hook-form. Unlike the standalone \`Toggle\` component, ToggleSwitch must be wrapped in a \`<Form>\` and registers its value under \`fieldName\` automatically.

Supports **binary** mode (default) storing \`true\`/\`false\`, and **tristate** mode cycling through \`true → false → null\` for indeterminate states. Built-in validation via \`required\`, \`customValidation\`, and \`customMessage\` surfaces inline errors on form submit.

Use ToggleSwitch in settings panels, preference forms, and anywhere you need a labelled on/off control that integrates with your form's submit flow.
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['binary', 'tristate'],
      description: 'Binary (true/false) or tristate (true/false/null) mode.',
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
type Story = StoryObj<typeof ToggleSwitch>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal binary ToggleSwitch. The form value is `true` when on, `false` when off.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <ToggleSwitch fieldName="notifications" label="Enable Notifications" />
      </Form>
    </div>
  ),
};

// ─── Checked ─────────────────────────────────────────────────────────────────

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-toggled on using `defaultValues` on the Form.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]} defaultValues={{ darkMode: true }}>
        <ToggleSwitch fieldName="darkMode" label="Dark Mode" />
      </Form>
    </div>
  ),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]} defaultValues={{ sso: false, mfa: true }}>
        <ToggleSwitch disabled fieldName="sso" label="Single Sign-On (managed by org)" />
        <ToggleSwitch disabled fieldName="mfa" label="Multi-factor Authentication (enforced)" />
      </Form>
    </div>
  ),
};

// ─── WithLabel ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ToggleSwitch with a descriptive label and a Submit button to show form integration.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Save' }]}
        defaultValues={{ autoBackup: false }}
      >
        <ToggleSwitch fieldName="autoBackup" label="Enable Automatic Backups" />
      </Form>
    </div>
  ),
};

// ─── WithInfo ────────────────────────────────────────────────────────────────

export const WithInfo: Story = {
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <ToggleSwitch
          fieldName="analytics"
          info="Helps us improve the product. Anonymous usage data only — no personal information is collected."
          label="Allow Analytics"
        />
      </Form>
    </div>
  ),
};

// ─── Required ────────────────────────────────────────────────────────────────

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Save** without enabling the switch to see the required validation error.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Save' }]}>
        <ToggleSwitch fieldName="terms" label="Accept Terms & Conditions" required />
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
          'Tristate mode allows three values: `true` (on), `false` (off), and `null` (indeterminate). Useful for "apply to all" controls with mixed state.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <ToggleSwitch fieldName="permission" label="Access Permission (tristate)" mode="tristate" />
      </Form>
    </div>
  ),
};

// ─── AllStates ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Reference grid showing all four states: off, on, disabled-off, disabled-on.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form
        buttonsConfig={[]}
        defaultValues={{ off: false, on: true, disOff: false, disOn: true }}
      >
        <ToggleSwitch fieldName="off" label="Off" />
        <ToggleSwitch fieldName="on" label="On" />
        <ToggleSwitch disabled fieldName="disOff" label="Disabled (off)" />
        <ToggleSwitch disabled fieldName="disOn" label="Disabled (on)" />
      </Form>
    </div>
  ),
};

// ─── SettingsPanel ────────────────────────────────────────────────────────────

export const SettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic settings panel with five ToggleSwitches in a single Form. Submitting logs all preferences at once.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <p className="text-sm font-semibold mb-3">Application Settings</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Save Settings' }]}
        defaultValues={{
          emailDigest: true,
          autoUpdate: true,
          crashReports: false,
          betaChannel: false,
          twoFactor: true,
        }}
      >
        <ToggleSwitch
          fieldName="emailDigest"
          info="Weekly summary of your activity sent every Monday."
          label="Weekly Email Digest"
        />
        <ToggleSwitch
          fieldName="autoUpdate"
          info="Keep the app up to date automatically."
          label="Automatic Updates"
        />
        <ToggleSwitch
          fieldName="crashReports"
          info="Send anonymous crash data to help us fix bugs faster."
          label="Crash Reports"
        />
        <ToggleSwitch
          fieldName="betaChannel"
          info="Receive early access to features still in testing."
          label="Beta Channel"
        />
        <ToggleSwitch
          fieldName="twoFactor"
          info="Strongly recommended for account security."
          label="Two-Factor Authentication"
        />
      </Form>
    </div>
  ),
};

// ─── NotificationsSettings ────────────────────────────────────────────────────

export const NotificationsSettings: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Notification channel preferences panel. Push is disabled because it requires a plan upgrade.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <p className="text-sm font-semibold mb-3">Notification Preferences</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Update Preferences' }]}
        defaultValues={{ emailNotif: true, smsNotif: false, pushNotif: false, inAppNotif: true }}
      >
        <ToggleSwitch
          fieldName="emailNotif"
          info="Sent to priyabagus@example.com"
          label="Email Notifications"
        />
        <ToggleSwitch
          fieldName="smsNotif"
          info="Requires a verified mobile number."
          label="SMS Notifications"
        />
        <ToggleSwitch
          disabled
          fieldName="pushNotif"
          info="Upgrade to Pro to enable push notifications."
          label="Push Notifications"
        />
        <ToggleSwitch
          fieldName="inAppNotif"
          info="Shown in the notification bell inside the app."
          label="In-App Notifications"
        />
      </Form>
    </div>
  ),
};
