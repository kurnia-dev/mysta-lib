import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Preset/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**RadioButton** is a form-aware radio input that integrates with react-hook-form via the \`<Form>\` wrapper. Multiple RadioButton components share the same \`fieldName\` to form a radio group — only one option can be selected at a time.

Each RadioButton has its own \`optionValue\` (the value stored in the form when this option is selected). Values can be strings (default) or booleans. Pre-select an option using \`defaultValues\` on the Form.

Use \`required\` to enforce that the user makes a selection before submitting. Add \`info\` to individual options to explain each choice.
        `,
      },
    },
  },
  argTypes: {
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
type Story = StoryObj<typeof RadioButton>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three RadioButtons sharing the `plan` fieldName form a radio group. Selecting one deselects the others automatically via react-hook-form.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]}>
        <RadioButton fieldName="plan" label="Starter" optionValue="starter" />
        <RadioButton fieldName="plan" label="Professional" optionValue="pro" />
        <RadioButton fieldName="plan" label="Enterprise" optionValue="enterprise" />
      </Form>
    </div>
  ),
};

// ─── WithDefaultSelected ──────────────────────────────────────────────────────

export const WithDefaultSelected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `defaultValues` to the Form to pre-select an option on initial render.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]} defaultValues={{ deliveryMethod: 'standard' }}>
        <RadioButton fieldName="deliveryMethod" label="Standard (3–5 days)" optionValue="standard" />
        <RadioButton fieldName="deliveryMethod" label="Express (1–2 days)" optionValue="express" />
        <RadioButton fieldName="deliveryMethod" label="Overnight" optionValue="overnight" />
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
          'Mark all options in the group as `required`. Click **Continue** without selecting to trigger the validation error.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[{ type: 'submit', label: 'Continue' }]}>
        <RadioButton fieldName="gender" label="Male" optionValue="male" required />
        <RadioButton fieldName="gender" label="Female" optionValue="female" required />
        <RadioButton fieldName="gender" label="Non-binary" optionValue="non-binary" required />
        <RadioButton fieldName="gender" label="Prefer not to say" optionValue="unspecified" required />
      </Form>
    </div>
  ),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled while others remain selectable.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]} defaultValues={{ tier: 'basic' }}>
        <RadioButton fieldName="tier" label="Free (current plan)" optionValue="free" disabled />
        <RadioButton fieldName="tier" label="Basic" optionValue="basic" />
        <RadioButton fieldName="tier" label="Standard" optionValue="standard" />
        <RadioButton
          disabled
          fieldName="tier"
          info="Contact sales to unlock Enterprise."
          label="Enterprise (contact sales)"
          optionValue="enterprise"
        />
      </Form>
    </div>
  ),
};

// ─── WithInfo ────────────────────────────────────────────────────────────────

export const WithInfo: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[]}>
        <RadioButton
          fieldName="notifyChannel"
          info="Delivered to your registered email address."
          label="Email"
          optionValue="email"
        />
        <RadioButton
          fieldName="notifyChannel"
          info="Requires a verified mobile number."
          label="SMS"
          optionValue="sms"
        />
        <RadioButton
          fieldName="notifyChannel"
          info="Browser or mobile push notification."
          label="Push"
          optionValue="push"
        />
        <RadioButton fieldName="notifyChannel" label="None" optionValue="none" />
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
          'Submit without selecting any option to see the validation error. The error clears as soon as an option is picked.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <Form buttonsConfig={[{ type: 'submit', label: 'Proceed to Payment' }]}>
        <RadioButton fieldName="paymentMethod" label="Credit / Debit Card" optionValue="card" required />
        <RadioButton fieldName="paymentMethod" label="Bank Transfer" optionValue="bank_transfer" required />
        <RadioButton fieldName="paymentMethod" label="Cash on Delivery" optionValue="cod" required />
      </Form>
    </div>
  ),
};

// ─── HorizontalLayout ─────────────────────────────────────────────────────────

export const HorizontalLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons displayed side-by-side using a flex row wrapper for compact inline selections.',
      },
    },
  },
  render: () => (
    <div className="w-72">
      <Form buttonsConfig={[]}>
        <div className="flex gap-6">
          <RadioButton fieldName="answer" label="Yes" optionValue="yes" />
          <RadioButton fieldName="answer" label="No" optionValue="no" />
          <RadioButton fieldName="answer" label="Maybe" optionValue="maybe" />
        </div>
      </Form>
    </div>
  ),
};

// ─── BooleanMode ─────────────────────────────────────────────────────────────

export const BooleanMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'RadioButton supports boolean `optionValue` — the form value will be `true` or `false` instead of a string.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-2">
      <p className="text-sm font-medium mb-2">Enable two-factor authentication?</p>
      <Form buttonsConfig={[{ type: 'submit', label: 'Save' }]}>
        <RadioButton fieldName="twoFactor" label="Yes, enable 2FA" optionValue={true} />
        <RadioButton fieldName="twoFactor" label="No, skip for now" optionValue={false} />
      </Form>
    </div>
  ),
};

// ─── PaymentMethod ────────────────────────────────────────────────────────────

export const PaymentMethod: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic payment method selector in a checkout form context.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-2">
      <p className="text-sm font-semibold mb-3">Select Payment Method</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Place Order' }]}
        defaultValues={{ payment: 'card' }}
      >
        <RadioButton
          fieldName="payment"
          info="Visa, Mastercard, or American Express."
          label="Credit / Debit Card"
          optionValue="card"
        />
        <RadioButton
          fieldName="payment"
          info="Funds transferred directly from your bank account."
          label="Bank Transfer"
          optionValue="bank_transfer"
        />
        <RadioButton
          fieldName="payment"
          info="Pay in cash when your order is delivered."
          label="Cash on Delivery"
          optionValue="cod"
        />
      </Form>
    </div>
  ),
};

// ─── ShippingMethod ───────────────────────────────────────────────────────────

export const ShippingMethod: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shipping option selector with delivery time labels.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-2">
      <p className="text-sm font-semibold mb-3">Shipping Method</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Continue' }]}
        defaultValues={{ shipping: 'standard' }}
      >
        <RadioButton
          fieldName="shipping"
          info="Estimated delivery: 5–7 business days. Free for orders over $50."
          label="Standard Shipping — Free"
          optionValue="standard"
        />
        <RadioButton
          fieldName="shipping"
          info="Estimated delivery: 2–3 business days."
          label="Express Shipping — $9.99"
          optionValue="express"
        />
        <RadioButton
          fieldName="shipping"
          info="Delivered by next business day if ordered before 2 PM."
          label="Overnight Shipping — $24.99"
          optionValue="overnight"
        />
      </Form>
    </div>
  ),
};

// ─── PlanSelector ─────────────────────────────────────────────────────────────

export const PlanSelector: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Subscription plan selector with pricing in labels — a common onboarding pattern.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-2">
      <p className="text-sm font-semibold mb-3">Choose Your Plan</p>
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Start Free Trial' }]}
        defaultValues={{ subscriptionPlan: 'pro' }}
      >
        <RadioButton
          fieldName="subscriptionPlan"
          info="Up to 3 projects, 1 GB storage, community support."
          label="Free — $0 / month"
          optionValue="free"
        />
        <RadioButton
          fieldName="subscriptionPlan"
          info="Unlimited projects, 50 GB storage, priority support."
          label="Pro — $12 / month"
          optionValue="pro"
        />
        <RadioButton
          fieldName="subscriptionPlan"
          info="Unlimited everything, SSO, dedicated account manager."
          label="Enterprise — Custom pricing"
          optionValue="enterprise"
        />
      </Form>
    </div>
  ),
};
