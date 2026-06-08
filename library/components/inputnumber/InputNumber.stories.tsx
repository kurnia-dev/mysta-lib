import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../form/Form';
import { InputNumber } from './InputNumber';

const meta: Meta<typeof InputNumber> = {
  title: 'Preset/Inputs/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**InputNumber** is a numeric input field that constrains user entry to numbers. Use it for quantities, prices, ages, scores, measurements, or any field where the value must be numeric. The \`min\` and \`max\` props enforce range boundaries, and \`required\` ensures the field is not left empty on submit.

Validation errors appear inline beneath the field after a submit attempt. The component works with both integer and decimal inputs depending on the browser's native behavior.

**Every InputNumber must be wrapped in a \`<Form>\` component.** It reads form state from react-hook-form and will silently break without one.
        `,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    hideRequiredMark: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof InputNumber>;

/** Minimal usage — numeric field with no constraints. */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputNumber
          fieldName="amount"
          label="Amount"
          placeholder="0"
        />
      </Form>
    </div>
  ),
};

/**
 * Required — click Submit without a value to see the validation error.
 */
export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click **Submit** without entering a number to see the required validation error appear beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputNumber
          required
          fieldName="quantity"
          label="Quantity"
          placeholder="Enter quantity"
        />
      </Form>
    </div>
  ),
};

/**
 * WithMinMax — min=0, max=100. Values outside the range are rejected on submit.
 */
export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'min=0 and max=100 restrict the accepted range. Type a value outside 0–100 and click **Submit** to see the validation error. The component does not clamp the typed value in real time — validation fires on submit.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Submit' }]}>
        <InputNumber
          fieldName="score"
          label="Score (0–100)"
          max={100}
          min={0}
          placeholder="0 to 100"
        />
      </Form>
    </div>
  ),
};

/** Disabled — shows a pre-filled number in a non-interactive state. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]} defaultValues={{ totalItems: 247 }}>
        <InputNumber
          disabled
          fieldName="totalItems"
          label="Total Items (read-only)"
        />
      </Form>
    </div>
  ),
};

/** Info tooltip describes the meaning or constraints of the numeric value. */
export const WithInfo: Story = {
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[]}>
        <InputNumber
          fieldName="budget"
          info="Enter your monthly budget in USD. Minimum recommended: $500."
          label="Monthly Budget"
          placeholder="e.g. 2500"
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
          'Click **Save** without entering a number to see the inline required validation error beneath the input.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Save' }]}>
        <InputNumber
          required
          fieldName="targetRevenue"
          label="Target Revenue"
          placeholder="e.g. 10000"
        />
      </Form>
    </div>
  ),
};

/**
 * AgeField — realistic scenario: adult age validation.
 */
export const AgeField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Realistic age field constrained to 18–120. Useful for sign-up forms that require users to be adults.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Continue' }]}>
        <InputNumber
          required
          fieldName="age"
          info="You must be at least 18 years old to register."
          label="Age"
          max={120}
          min={18}
          placeholder="Your age"
        />
      </Form>
    </div>
  ),
};

/**
 * QuantityField — realistic e-commerce quantity selector.
 */
export const QuantityField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Quantity input for an order form. min=1 prevents zero or negative orders; max=99 prevents bulk orders beyond warehouse capacity.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form
        buttonsConfig={[{ type: 'submit', label: 'Add to Cart' }]}
        defaultValues={{ quantity: 1 }}
      >
        <InputNumber
          required
          fieldName="quantity"
          label="Quantity"
          max={99}
          min={1}
          placeholder="1–99"
        />
      </Form>
    </div>
  ),
};

/**
 * PriceField — realistic pricing input with domain context.
 */
export const PriceField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Price input in USD. min=0 prevents negative prices. Used in product listing or invoice creation forms.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Form buttonsConfig={[{ type: 'submit', label: 'Set Price' }]}>
        <InputNumber
          required
          fieldName="price"
          info="Enter the selling price in USD, e.g. 49.99"
          label="Price (USD)"
          min={0}
          placeholder="e.g. 49.99"
        />
      </Form>
    </div>
  ),
};

/**
 * MultiFieldForm — quantity, price, and discount in one Form to show
 * how multiple numeric fields share a single form context.
 */
export const MultiFieldForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three InputNumber fields inside one Form: Quantity, Unit Price, and Discount %. All share the same react-hook-form context and are validated together on submit.',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <p className="mb-4 text-lg font-semibold">Create Order Line</p>
      <Form
        buttonsConfig={[
          { type: 'back', label: 'Cancel' },
          { type: 'submit', label: 'Add Line' },
        ]}
        defaultValues={{ quantity: 1, unitPrice: 0, discount: 0 }}
      >
        <InputNumber
          required
          fieldName="quantity"
          label="Quantity"
          max={1000}
          min={1}
          placeholder="1–1000"
        />
        <InputNumber
          required
          fieldName="unitPrice"
          info="Price per single unit in USD."
          label="Unit Price (USD)"
          min={0}
          placeholder="e.g. 25.00"
        />
        <InputNumber
          fieldName="discount"
          info="Percentage discount applied to the line total."
          label="Discount (%)"
          max={100}
          min={0}
          placeholder="0–100"
        />
      </Form>
    </div>
  ),
};
