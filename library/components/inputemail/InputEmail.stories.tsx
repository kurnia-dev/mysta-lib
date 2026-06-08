import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { InputPassword } from '../inputpassword/InputPassword';
import { InputEmail } from './InputEmail';

const meta: Meta<typeof InputEmail> = {
  title: 'Preset/Inputs/InputEmail',
  component: InputEmail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**InputEmail** is a form input field that constrains the value to a valid email address format. Use it for login forms, registration, newsletter sign-ups, contact forms, or any field that collects an email address.

The component validates the email format automatically using the browser's built-in \`email\` pattern and surfaces errors inline on submit. Combine the \`required\` prop to also enforce that the field is not left empty.

**Every InputEmail must be wrapped in a \`<Form>\` component.** It reads form state from react-hook-form and will silently break without one.
        `,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hideRequiredMark: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof InputEmail>;

/** Minimal usage — email field with no validation enforced. */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputEmail
          fieldName="email"
          label="Email Address"
          placeholder="you@example.com"
        />
      </Form>
    </div>
  ),
};

/**
 * Required field. Click Submit without typing to see the required error.
 */
export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Submit** without filling the field to see the required validation error appear beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputEmail
          required
          fieldName="workEmail"
          label="Work Email"
          placeholder="you@company.com"
        />
      </Form>
    </div>
  ),
};

/** Disabled — shows a pre-filled email in a non-interactive state. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Form
        buttonsConfig={[]}
        defaultValues={{ email: 'alice@example.com' }}
      >
        <InputEmail
          disabled
          fieldName="email"
          label="Email (read-only)"
        />
      </Form>
    </div>
  ),
};

/** The info tooltip explains what the email address is used for. */
export const WithInfo: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputEmail
          fieldName="email"
          info="Used for account notifications, login, and password recovery."
          label="Email Address"
          placeholder="you@example.com"
        />
      </Form>
    </div>
  ),
};

/**
 * InvalidEmailFormat — enter a non-email value and submit to see the format error.
 */
export const InvalidEmailFormat: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Type something that is not a valid email (e.g. `not-an-email`) and click **Submit** to see the format validation error.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Submit' }]}
        defaultValues={{ contactEmail: 'not-an-email' }}
      >
        <InputEmail
          fieldName="contactEmail"
          label="Contact Email"
          placeholder="contact@company.com"
        />
      </Form>
    </div>
  ),
};

/**
 * RequiredAndFormat — both constraints active. Submit empty to see required error;
 * submit with an invalid format to see format error.
 */
export const RequiredAndFormat: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Two validations are active: the field is `required` and must be a valid email. Click **Submit** empty first, then try `hello@` to observe both error states.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Register' }]}>
        <InputEmail
          required
          fieldName="registrationEmail"
          label="Registration Email"
          placeholder="you@example.com"
        />
      </Form>
    </div>
  ),
};

/**
 * ValidationError — required field left empty on submit.
 */
export const ValidationError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Sign Up** without filling the field to see the inline validation error appear beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Sign Up' }]}>
        <InputEmail
          required
          fieldName="signupEmail"
          label="Email Address"
          placeholder="you@example.com"
        />
      </Form>
    </div>
  ),
};

/**
 * LoginCombo — email + password in one Form. The most common usage pattern.
 */
export const LoginCombo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A complete login form: InputEmail and InputPassword wired inside a single `<Form>`. Both fields are validated together on submit. This is the canonical usage pattern for authentication flows.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <p className="mb-4 text-lg font-semibold text-center">Sign in to your account</p>
      <Form
        buttonsConfig={[
          { type: 'submit', label: 'Sign In' },
        ]}
      >
        <InputEmail
          required
          fieldName="email"
          label="Email Address"
          placeholder="you@example.com"
        />
        <InputPassword
          required
          fieldName="password"
          label="Password"
          placeholder="Your password"
        />
      </Form>
    </div>
  ),
};
