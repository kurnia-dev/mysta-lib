import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NumberStepper } from './NumberStepper';

const meta: Meta<typeof NumberStepper> = {
  title: 'Form/NumberStepper',
  component: NumberStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**NumberStepper** is a controlled increment/decrement input with − and + buttons. It is a **standalone presentational component** — pass \`value\` and \`onChange\` for controlled usage.

Set \`min\` and \`max\` to clamp the value at its boundaries; the corresponding button is automatically disabled when the boundary is reached. Use \`step\` to control the increment size (defaults to 1).

Common use cases: cart quantity pickers, ticket counters, guest counts, and any other whole-number input where a text field would be cumbersome.
        `,
      },
    },
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum allowed value.',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value.',
      table: { defaultValue: { summary: 'Infinity' } },
    },
    step: {
      control: 'number',
      description: 'Amount added or subtracted per click.',
      table: { defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables both buttons.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NumberStepper>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal controlled stepper. Click − or + to change the value.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(1);
    return <NumberStepper max={10} min={1} value={val} onChange={setVal} />;
  },
};

// ─── WithMinMax ───────────────────────────────────────────────────────────────

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The − button disables at min=1 and + disables at max=5. Try clicking past the boundary.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(3);
    return (
      <div className="space-y-2 text-center">
        <p className="text-sm text-gray-500">min=1 · max=5 · value={val}</p>
        <NumberStepper max={5} min={1} value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── WithStep ────────────────────────────────────────────────────────────────

export const WithStep: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Step of 5: each click increments or decrements by 5 units.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(0);
    return (
      <div className="space-y-2 text-center">
        <p className="text-sm text-gray-500">Step=5 · Value: {val}</p>
        <NumberStepper max={100} min={0} step={5} value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both buttons are disabled — value cannot be changed. Use when the quantity is locked.',
      },
    },
  },
  render: () => (
    <div className="space-y-2 text-center">
      <p className="text-sm text-gray-400">Quantity locked (sold out)</p>
      <NumberStepper disabled max={99} min={1} value={3} onChange={() => {}} />
    </div>
  ),
};

// ─── AtBoundary ──────────────────────────────────────────────────────────────

export const AtBoundary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the stepper starting at min (1) and max (5) to demonstrate disabled button states at boundaries.',
      },
    },
  },
  render: () => {
    const [atMin, setAtMin] = useState(1);
    const [atMax, setAtMax] = useState(5);
    return (
      <div className="space-y-4">
        <div className="space-y-1 text-center">
          <p className="text-xs text-gray-400">At minimum (1)</p>
          <NumberStepper max={5} min={1} value={atMin} onChange={setAtMin} />
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs text-gray-400">At maximum (5)</p>
          <NumberStepper max={5} min={1} value={atMax} onChange={setAtMax} />
        </div>
      </div>
    );
  },
};

// ─── CartQuantity ─────────────────────────────────────────────────────────────

export const CartQuantity: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic cart quantity picker. The total price updates as quantity changes.',
      },
    },
  },
  render: () => {
    const [qty, setQty] = useState(1);
    const unitPrice = 12.99;
    return (
      <div className="w-80 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
            🛒
          </div>
          <div>
            <p className="text-sm font-medium">Wireless Earbuds Pro</p>
            <p className="text-xs text-gray-500">${unitPrice.toFixed(2)} each</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Quantity:</span>
            <NumberStepper max={99} min={1} value={qty} onChange={setQty} />
          </div>
          <span className="text-sm font-semibold">
            ${(qty * unitPrice).toFixed(2)}
          </span>
        </div>
      </div>
    );
  },
};

// ─── TicketCounter ────────────────────────────────────────────────────────────

export const TicketCounter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Event ticket quantity selector with a per-ticket price and a running total.',
      },
    },
  },
  render: () => {
    const [tickets, setTickets] = useState(2);
    const ticketPrice = 85;
    return (
      <div className="w-80 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <div>
          <p className="font-semibold text-sm">Tokyo Jazz Festival 2026</p>
          <p className="text-xs text-gray-500 mt-0.5">Saturday, 14 June · 7:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">General Admission</p>
            <p className="text-xs text-gray-400">${ticketPrice} per ticket</p>
          </div>
          <NumberStepper max={10} min={1} value={tickets} onChange={setTickets} />
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-bold">${(tickets * ticketPrice).toFixed(2)}</span>
        </div>
      </div>
    );
  },
};

// ─── GuestCount ───────────────────────────────────────────────────────────────

export const GuestCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Restaurant reservation guest count selector (1–20 guests).',
      },
    },
  },
  render: () => {
    const [guests, setGuests] = useState(2);
    return (
      <div className="w-80 space-y-4">
        <div>
          <p className="font-semibold text-sm">Table Reservation</p>
          <p className="text-xs text-gray-500 mt-0.5">Sakura Garden · Friday, 23 May</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Number of Guests</span>
          <NumberStepper max={20} min={1} value={guests} onChange={setGuests} />
        </div>
        <p className="text-xs text-gray-400">
          {guests > 10
            ? 'Large party — please call us to confirm your reservation.'
            : `Table for ${guests} reserved.`}
        </p>
      </div>
    );
  },
};

// ─── MultiLineItem ────────────────────────────────────────────────────────────

export const MultiLineItem: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multiple NumberSteppers in a list — each controls an independent quantity. Demonstrates composing several steppers together.',
      },
    },
  },
  render: () => {
    const initialItems = [
      { id: 'tshirt', name: 'Classic T-Shirt', price: 24.99, qty: 1 },
      { id: 'hoodie', name: 'Zip-Up Hoodie', price: 59.99, qty: 2 },
      { id: 'cap', name: 'Baseball Cap', price: 18.99, qty: 1 },
    ];
    const [items, setItems] = useState(initialItems);

    const setQty = (id: string, qty: number) =>
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
      <div className="w-96 space-y-3">
        {items.map((item) => (
          <div className="flex items-center justify-between gap-4" key={item.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
            </div>
            <NumberStepper max={20} min={1} value={item.qty} onChange={(q) => setQty(item.id, q)} />
          </div>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
          <span className="text-sm font-medium">Order Total</span>
          <span className="text-sm font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    );
  },
};
