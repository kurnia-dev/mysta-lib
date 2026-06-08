import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { InputEmail } from '../inputemail/InputEmail';
import { InputPassword } from '../inputpassword/InputPassword';
import { InputText } from './InputText';

const meta: Meta<typeof InputText> = {
  title: 'Preset/Inputs/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**InputText** is a single-line text input field built on top of react-hook-form. Use it whenever you need free-form text entry — names, addresses, usernames, search queries, short descriptions, or any field where the value is a plain string.

Validation (required, minLength, maxLength, pattern, customValidation) is evaluated on submit and surfaced as an inline error message beneath the field. The \`info\` prop adds a tooltip icon beside the label for contextual guidance.

**Every InputText must be wrapped in a \`<Form>\` component.** It reads its form context from react-hook-form and will silently break without one.
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
type Story = StoryObj<typeof InputText>;

/** Minimal usage — only required props. Shows the bare component at rest. */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputText fieldName="username" label="Username" />
      </Form>
    </div>
  ),
};

/** Demonstrates placeholder text guidance inside the field. */
export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputText
          fieldName="fullName"
          label="Full Name"
          placeholder="e.g. Priya Bagus Amanullah"
        />
      </Form>
    </div>
  ),
};

/**
 * Required field with a submit button.
 * Click Submit without typing anything to trigger the validation message.
 */
export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Submit** without filling the field to see the required validation error appear inline beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputText
          required
          fieldName="companyName"
          label="Company Name"
          placeholder="Acme Corporation"
        />
      </Form>
    </div>
  ),
};

/** The input is non-interactive and visually dimmed. Pre-filled via Form defaultValues. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]} defaultValues={{ department: 'Engineering' }}>
        <InputText
          disabled
          fieldName="department"
          label="Department (read-only)"
        />
      </Form>
    </div>
  ),
};

/** The info icon beside the label reveals a tooltip with additional context. */
export const WithInfo: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputText
          fieldName="username"
          info="3–20 characters. Letters, numbers, and underscores only."
          label="Username"
          placeholder="my_username"
        />
      </Form>
    </div>
  ),
};

/** minLength and maxLength enforce text length constraints on submit. */
export const WithMinMaxLength: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'minLength=10 and maxLength=160 are enforced on submit. Try typing fewer than 10 characters and clicking Submit.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Save Bio' }]}>
        <InputText
          fieldName="bio"
          label="Bio"
          maxLength={160}
          minLength={10}
          placeholder="Tell us about yourself (10–160 characters)"
        />
      </Form>
    </div>
  ),
};

/**
 * ValidationError — required field left empty on submit.
 * The error message appears inline without a page reload.
 */
export const ValidationError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Submit** without filling the field to see the inline validation error message appear beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputText
          required
          fieldName="projectName"
          label="Project Name"
          placeholder="e.g. Apollo Dashboard"
        />
      </Form>
    </div>
  ),
};

/** Regex pattern validates input format on submit. */
export const WithPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The pattern `/^[A-Z0-9]{6}$/` enforces exactly 6 uppercase letters or digits. Click **Apply** with an invalid value to see the error.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Apply' }]}>
        <InputText
          fieldName="promoCode"
          label="Promo Code"
          pattern={/^[A-Z0-9]{6}$/}
          placeholder="e.g. SAVE20"
        />
      </Form>
    </div>
  ),
};

/** Form defaultValues pre-populates the field on render. */
export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]} defaultValues={{ city: 'Jakarta' }}>
        <InputText fieldName="city" label="City" />
      </Form>
    </div>
  ),
};

/**
 * RegistrationFormCombo — shows InputText, InputEmail, and InputPassword
 * wired together inside a single Form, the typical sign-up pattern.
 */
export const RegistrationFormCombo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic sign-up form combining InputText (full name), InputEmail, and InputPassword inside one `<Form>`. All three fields share the same react-hook-form context and are validated together on submit.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <Form
        buttonsConfig={[
          { type: 'back', label: 'Cancel' },
          { type: 'submit', label: 'Create Account' },
        ]}
      >
        <InputText
          required
          fieldName="fullName"
          label="Full Name"
          placeholder="Priya Bagus Amanullah"
        />
        <InputEmail
          required
          fieldName="email"
          label="Email Address"
          placeholder="priya@example.com"
        />
        <InputPassword
          required
          fieldName="password"
          label="Password"
          minLength={8}
          placeholder="At least 8 characters"
        />
      </Form>
    </div>
  ),
};
