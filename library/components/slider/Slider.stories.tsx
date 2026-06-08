import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Slider** is a controlled range input with an optional tooltip, step marks, and tick labels. It renders a native \`<input type="range">\` styled with Tailwind, so it is lightweight and keyboard-accessible.

Pass \`value\` and \`onChange\` for controlled usage. Set \`min\`, \`max\`, and \`step\` to constrain the range. Enable \`showTooltip\` to display the current value above the thumb. Pass a \`formatTooltip\` function to customise the tooltip label (e.g. currency, units). Use \`ticks\` to render string labels below the track.

This component is a **standalone presentational control** — it does not integrate with react-hook-form. Wrap it in your own form logic or pair it with a \`<Form>\` field manually if validation is needed.
        `,
      },
    },
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value.',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
      table: { defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'Increment step between values.',
      table: { defaultValue: { summary: '1' } },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show the current value in a floating tooltip above the thumb.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal slider with default min (0) and max (100). Value displayed above.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(40);
    return (
      <div className="w-72 space-y-2">
        <p className="text-sm text-gray-500">Value: {val}</p>
        <Slider max={100} min={0} value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── WithMinMax ───────────────────────────────────────────────────────────────

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom min and max values. The slider is constrained to 50–200.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(100);
    return (
      <div className="w-72 space-y-2">
        <p className="text-sm text-gray-500">Range: 50–200 · Value: {val}</p>
        <Slider max={200} min={50} showTooltip value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── WithStep ────────────────────────────────────────────────────────────────

export const WithStep: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Step of 25: the thumb snaps to 0, 25, 50, 75, 100.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <div className="w-72 space-y-2">
        <p className="text-sm text-gray-500">Step=25 · Value: {val}</p>
        <Slider max={100} min={0} showTooltip step={25} value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── WithTooltip ─────────────────────────────────────────────────────────────

export const WithTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enable `showTooltip` to show the raw numeric value floating above the thumb.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(60);
    return (
      <div className="w-72 space-y-2">
        <Slider max={100} min={0} showTooltip value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── WithDefaultValue ─────────────────────────────────────────────────────────

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slider initialised at 50 (mid-point). Demonstrate pre-filling a controlled slider.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <div className="w-72 space-y-2">
        <p className="text-sm text-gray-500">Value: {val}</p>
        <Slider max={100} min={0} showTooltip value={val} onChange={setVal} />
      </div>
    );
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <p className="text-sm text-gray-400">Value: 35 (disabled — cannot interact)</p>
      <Slider disabled max={100} min={0} value={35} onChange={() => {}} />
    </div>
  ),
};

// ─── WithTicks ───────────────────────────────────────────────────────────────

export const WithTicks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'String tick labels rendered below the track. Use `ticks` + integer `min`/`max`/`step` to align labels to snap positions.',
      },
    },
  },
  render: () => {
    const labels = ['XS', 'S', 'M', 'L', 'XL'] as const;
    const [idx, setIdx] = useState(2);
    return (
      <div className="w-80 space-y-2 pb-4">
        <p className="text-sm text-gray-500">Selected size: {labels[idx]}</p>
        <Slider
          max={4}
          min={0}
          showTooltip
          step={1}
          ticks={[...labels]}
          value={idx}
          onChange={setIdx}
        />
      </div>
    );
  },
};

// ─── WithCustomTooltip ───────────────────────────────────────────────────────

export const WithCustomTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `formatTooltip` to customise the tooltip label — here showing a percentage symbol.',
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(75);
    return (
      <div className="w-72 space-y-2">
        <Slider
          formatTooltip={(v) => `${v}%`}
          max={100}
          min={0}
          showTooltip
          value={val}
          onChange={setVal}
        />
        <p className="text-sm text-gray-500">Completion: {val}%</p>
      </div>
    );
  },
};

// ─── VolumeControl ───────────────────────────────────────────────────────────

export const VolumeControl: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic volume control: 0–100 range with percentage tooltip.',
      },
    },
  },
  render: () => {
    const [volume, setVolume] = useState(70);
    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Volume</span>
          <span className="text-sm text-gray-500 tabular-nums">{volume}%</span>
        </div>
        <Slider
          formatTooltip={(v) => `${v}%`}
          max={100}
          min={0}
          showTooltip
          value={volume}
          onChange={setVolume}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Muted</span>
          <span>Max</span>
        </div>
      </div>
    );
  },
};

// ─── BudgetSlider ────────────────────────────────────────────────────────────

export const BudgetSlider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Monthly budget selector: $0–$10,000 in $100 increments with currency-formatted tooltip.',
      },
    },
  },
  render: () => {
    const [budget, setBudget] = useState(2500);
    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Monthly Budget</span>
          <span className="text-sm font-semibold text-primary-600">
            ${budget.toLocaleString()}
          </span>
        </div>
        <Slider
          formatTooltip={(v) => `$${v.toLocaleString()}`}
          max={10000}
          min={0}
          showTooltip
          step={100}
          value={budget}
          onChange={setBudget}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>$0</span>
          <span>$10,000</span>
        </div>
      </div>
    );
  },
};

// ─── RatingSlider ─────────────────────────────────────────────────────────────

export const RatingSlider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Rating slider from 1 to 10 using integer steps. Tooltip shows the raw score.',
      },
    },
  },
  render: () => {
    const [rating, setRating] = useState(7);
    const ratingLabel = (v: number): string => {
      if (v <= 3) return 'Poor';
      if (v <= 5) return 'Average';
      if (v <= 7) return 'Good';
      if (v <= 9) return 'Great';
      return 'Excellent';
    };
    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Your Rating</span>
          <span className="text-sm font-semibold">
            {rating} / 10 — {ratingLabel(rating)}
          </span>
        </div>
        <Slider
          formatTooltip={(v) => `${v}/10`}
          max={10}
          min={1}
          showTooltip
          step={1}
          ticks={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          value={rating}
          onChange={setRating}
        />
      </div>
    );
  },
};
