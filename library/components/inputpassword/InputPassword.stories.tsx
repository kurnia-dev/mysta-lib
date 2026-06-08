import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { InputPassword } from './InputPassword';

const meta: Meta<typeof InputPassword> = {
  title: 'Preset/Inputs/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**InputPassword** is a styled wrapper around \`<input type="password">\` that masks typed characters by default. An eye-icon button in the trailing slot toggles visibility between masked (•••) and plain text, letting users verify what they have typed.

Use it for login forms, registration, password-change flows, and any field collecting a secret. The \`passwordRequirements\` prop enables a strength checklist (uppercase, lowercase, alpha-numeric, special-character) that validates on submit. Combine with \`minLength\` to enforce a minimum length.

**Every InputPassword must be wrapped in a \`<Form>\` component.** It reads form state from react-hook-form and will silently break without one.
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
type Story = StoryObj<typeof InputPassword>;

/**
 * Default password field. Click the eye icon on the right to toggle visibility
 * between masked (•••) and plain text.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click the eye icon on the trailing edge of the input to toggle between hidden (•••) and visible text. This is a styled wrapper around `<input type="password">`.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputPassword
          fieldName="password"
          label="Password"
          placeholder="Enter your password"
        />
      </Form>
    </div>
  ),
};

/**
 * Required field — click Submit without typing to see the validation error.
 */
export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Login** without filling the field to see the required validation error appear beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Login' }]}>
        <InputPassword
          required
          fieldName="password"
          label="Password"
          placeholder="Enter your password"
        />
      </Form>
    </div>
  ),
};

/** Disabled — field is pre-filled and non-interactive. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]} defaultValues={{ token: 'secret-api-key' }}>
        <InputPassword
          disabled
          fieldName="token"
          label="API Token (read-only)"
        />
      </Form>
    </div>
  ),
};

/** Info tooltip describes password requirements to the user. */
export const WithInfo: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputPassword
          fieldName="password"
          info="Use at least 8 characters with a mix of uppercase, lowercase, numbers, and symbols."
          label="Password"
          placeholder="••••••••"
        />
      </Form>
    </div>
  ),
};

/**
 * ValidationError — required field, submitted empty.
 */
export const ValidationError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Submit** without entering a password to see the inline required validation error.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputPassword
          required
          fieldName="currentPassword"
          label="Current Password"
          placeholder="••••••••"
        />
      </Form>
    </div>
  ),
};

/**
 * WithStrengthMeter — passwordRequirements enables a rule checklist.
 * Each rule is validated on submit and shown with pass/fail indicators.
 */
export const WithStrengthMeter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `passwordRequirements` prop activates a strength checklist below the input. Submit to validate each rule: uppercase, lowercase, alpha-numeric mix, and special character.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Set Password' }]}>
        <InputPassword
          required
          fieldName="newPassword"
          label="New Password"
          passwordRequirements={[
            'uppercase',
            'lowercase',
            'alpha-numeric',
            'special-character',
          ]}
          placeholder="Create a strong password"
        />
      </Form>
    </div>
  ),
};

/** Minimum length validation — enforced on submit. */
export const WithMinLength: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'minLength=8 is enforced on submit. Try typing fewer than 8 characters and clicking **Save** to see the error.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Save' }]}>
        <InputPassword
          required
          fieldName="pin"
          label="Access PIN"
          minLength={8}
          placeholder="Minimum 8 characters"
        />
      </Form>
    </div>
  ),
};

/**
 * PasswordConfirmCombo — two password fields wired in one Form.
 * Typical change-password or sign-up pattern.
 */
export const PasswordConfirmCombo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Two InputPassword fields inside one Form: "New Password" and "Confirm Password". Both are required. In a real app, a customValidation on the confirm field would compare values via `useWatch`.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <p className="mb-4 text-lg font-semibold text-center">Change Password</p>
      <Form
        buttonsConfig={[
          { type: 'back', label: 'Cancel' },
          { type: 'submit', label: 'Update Password' },
        ]}
      >
        <InputPassword
          required
          fieldName="newPassword"
          label="New Password"
          minLength={8}
          passwordRequirements={['uppercase', 'lowercase', 'alpha-numeric']}
          placeholder="At least 8 characters"
        />
        <InputPassword
          required
          fieldName="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your new password"
        />
      </Form>
    </div>
  ),
};
