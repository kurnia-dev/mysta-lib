import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Preset/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Dropdown** is a form-aware select component built on react-hook-form. Register it inside a \`<Form>\` wrapper — the \`fieldName\` prop maps directly to the form field key, so you never need to manage state manually.

Supports **single** selection (default) and **multi** selection via the \`mode\` prop. Options are plain \`{ label, value }\` objects where \`value\` can be a string, number, boolean, or object.

Built-in validation: \`required\`, \`customValidation\`, and \`customMessage\` surface inline error messages automatically on form submit. Use \`info\` to attach a contextual tooltip next to the label.
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multi'],
      description: 'Selection mode — single value or an array of values.',
      table: { defaultValue: { summary: 'single' } },
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
type Story = StoryObj<typeof Dropdown>;

// ─── Shared fixtures ────────────────────────────────────────────────────────

const roleOptions = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Contributor', value: 'contributor' },
  { label: 'Viewer', value: 'viewer' },
];

const timezoneOptions = [
  { label: 'UTC+0 — London', value: 'Europe/London' },
  { label: 'UTC+1 — Paris, Berlin', value: 'Europe/Paris' },
  { label: 'UTC+7 — Bangkok, Jakarta', value: 'Asia/Jakarta' },
  { label: 'UTC+8 — Singapore, Kuala Lumpur', value: 'Asia/Singapore' },
  { label: 'UTC+9 — Tokyo, Seoul', value: 'Asia/Tokyo' },
  { label: 'UTC-5 — New York', value: 'America/New_York' },
  { label: 'UTC-8 — Los Angeles', value: 'America/Los_Angeles' },
];

const languageOptions = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'Bahasa Indonesia', value: 'id-ID' },
  { label: 'Japanese (日本語)', value: 'ja-JP' },
  { label: 'Korean (한국어)', value: 'ko-KR' },
];

const skillOptions = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Go', value: 'go' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'Docker', value: 'docker' },
  { label: 'Kubernetes', value: 'kubernetes' },
];

const planOptions = [
  { label: 'Free — $0/mo', value: 'free' },
  { label: 'Pro — $12/mo', value: 'pro' },
  { label: 'Enterprise — Custom', value: 'enterprise' },
];

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage: a labelled dropdown with a list of options inside a Form context.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Dropdown
          fieldName="role"
          label="Role"
          options={roleOptions}
          placeholder="Select a role…"
        />
      </Form>
    </div>
  ),
};

// ─── Multi ──────────────────────────────────────────────────────────────────

export const Multi: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select mode. The field value is an array of selected option values. Use `mode="multi"` to enable.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Dropdown
          fieldName="skills"
          label="Tech Skills"
          mode="multi"
          options={skillOptions}
          placeholder="Select skills…"
        />
      </Form>
    </div>
  ),
};

// ─── Required ───────────────────────────────────────────────────────────────

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `required` prop marks the field mandatory. Click Submit without selecting to trigger validation.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <Dropdown
          fieldName="role"
          label="Role"
          options={roleOptions}
          placeholder="Select a role…"
          required
        />
      </Form>
    </div>
  ),
};

// ─── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]} defaultValues={{ plan: 'pro' }}>
        <Dropdown
          disabled
          fieldName="plan"
          label="Subscription Plan"
          options={planOptions}
          placeholder="Select plan…"
        />
      </Form>
    </div>
  ),
};

// ─── WithInfo ───────────────────────────────────────────────────────────────

export const WithInfo: Story = {
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <Dropdown
          fieldName="plan"
          info="Your plan determines billing, storage limits, and team size. You can upgrade at any time."
          label="Subscription Plan"
          options={planOptions}
          placeholder="Select plan…"
        />
      </Form>
    </div>
  ),
};

// ─── WithCustomValidation ────────────────────────────────────────────────────

export const WithCustomValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Provide a `customValidation` function for business-rule validation beyond `required`. Here only the `admin` role is accepted.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Validate' }]}>
        <Dropdown
          customMessage="Only the Administrator role may access this section."
          customValidation={(v) => v === 'admin'}
          fieldName="access"
          label="Access Level"
          options={roleOptions}
          placeholder="Select a role…"
        />
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
          'Click **Validate** without selecting an option to see the inline validation error. The error clears as soon as a valid selection is made.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Validate' }]}>
        <Dropdown
          fieldName="department"
          label="Department"
          options={[
            { label: 'Engineering', value: 'eng' },
            { label: 'Design', value: 'design' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Finance', value: 'finance' },
          ]}
          placeholder="Select department…"
          required
        />
      </Form>
    </div>
  ),
};

// ─── MultiRequired ───────────────────────────────────────────────────────────

export const MultiRequired: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with `required` validation. At least one skill must be selected before the form submits.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[{ type: 'submit', label: 'Save Profile' }]}>
        <Dropdown
          fieldName="skills"
          label="Required Skills"
          mode="multi"
          options={skillOptions}
          placeholder="Select at least one…"
          required
        />
      </Form>
    </div>
  ),
};

// ─── SettingsFormCombo ────────────────────────────────────────────────────────

export const SettingsFormCombo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Realistic settings panel combining three independent Dropdowns (role, timezone, language) inside a single Form. Each field maps to its own `fieldName`.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <Form
        buttonsConfig={[
          { type: 'back', label: 'Cancel' },
          { type: 'submit', label: 'Save Settings' },
        ]}
        defaultValues={{ role: 'editor', timezone: 'Asia/Singapore', language: 'en-US' }}
      >
        <Dropdown
          fieldName="role"
          info="Determines what actions this user can perform."
          label="Role"
          options={roleOptions}
          placeholder="Select role…"
          required
        />
        <Dropdown
          fieldName="timezone"
          info="All times and dates will be displayed in this timezone."
          label="Timezone"
          options={timezoneOptions}
          placeholder="Select timezone…"
          required
        />
        <Dropdown
          fieldName="language"
          info="Preferred language for the interface and email notifications."
          label="Interface Language"
          options={languageOptions}
          placeholder="Select language…"
          required
        />
      </Form>
    </div>
  ),
};
