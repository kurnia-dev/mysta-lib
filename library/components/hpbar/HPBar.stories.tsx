import type { Meta, StoryObj } from '@storybook/react';

import { HPBar } from './HPBar';

const meta: Meta<typeof HPBar> = {
  title: 'Feedback/HPBar',
  component: HPBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**HPBar** (Health Points Bar) is a segmented progress bar that automatically applies threshold-based coloring: green at high values, yellow at low, and red at critical levels.

It is designed for game-like interfaces, resource usage dashboards, and any scenario where the fill color communicates urgency at a glance.

### Automatic color thresholds
| Percentage | Derived color |
|---|---|
| ≥ 50% | \`color\` prop (default: green) |
| 25% – 49% | yellow (always) |
| < 25% | red (always) |

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| \`value\` | \`number\` | — | Current value |
| \`max\` | \`number\` | \`100\` | Maximum value |
| \`label\` | \`string\` | — | Abbreviation label shown above-left (e.g. "HP", "MP") |
| \`color\` | \`'green' \\| 'yellow' \\| 'red' \\| 'blue' \\| 'purple'\` | \`'green'\` | Fill color at ≥ 50% |
| \`segments\` | \`number\` | — | Divides the bar into equal segments with thin dividers |
| \`showValue\` | \`boolean\` | \`false\` | Shows \`value/max\` above-right |
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['green', 'yellow', 'red', 'blue', 'purple'],
      description: 'Fill color when the bar is at or above 50%.',
      table: { defaultValue: { summary: 'green' } },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value — drag to see threshold color transitions.',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value (denominator).',
      table: { defaultValue: { summary: '100' } },
    },
    segments: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visual segments (dividers). Omit for a continuous bar.',
    },
    showValue: {
      control: 'boolean',
      description: 'Show value/max counter above the bar.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HPBar>;

// ---------------------------------------------------------------------------
// Core levels
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage: `value` and `max` only. No label, no segments, no value display.',
      },
    },
  },
  args: { value: 70, max: 100 },
};

export const Full: Story = {
  args: { label: 'HP', max: 100, segments: 10, showValue: true, value: 100 },
};

export const Half: Story = {
  args: { label: 'HP', max: 100, segments: 10, showValue: true, value: 50 },
};

export const Low: Story = {
  parameters: {
    docs: {
      description: {
        story: 'At 30%, the bar transitions to yellow to signal a low but non-critical state.',
      },
    },
  },
  args: { label: 'HP', max: 100, segments: 10, showValue: true, value: 30 },
};

export const Critical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Below 25%, the bar turns red automatically — no color prop needed.',
      },
    },
  },
  args: { label: 'HP', max: 100, segments: 10, showValue: true, value: 15 },
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'At `value={0}` the bar is empty. Still renders the segment dividers and label.',
      },
    },
  },
  args: { label: 'HP', max: 100, segments: 10, showValue: true, value: 0 },
};

// ---------------------------------------------------------------------------
// Color variants
// ---------------------------------------------------------------------------

export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All five `color` options at a healthy (≥ 50%) value. Below 50% the color is overridden by the threshold logic regardless of this prop.',
      },
    },
  },
  render: () => (
    <div className="w-64 space-y-4">
      {(['green', 'yellow', 'red', 'blue', 'purple'] as const).map((c) => (
        <HPBar key={c} color={c} label={c} max={100} segments={8} showValue value={75} />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Variant options
// ---------------------------------------------------------------------------

export const WithSegments: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Segments divide the bar into equal sections with thin black dividers — great for showing discrete health points.',
      },
    },
  },
  render: () => (
    <div className="w-64 space-y-4">
      <HPBar label="5 segments"  max={100} segments={5}  showValue value={60} />
      <HPBar label="10 segments" max={100} segments={10} showValue value={60} />
      <HPBar label="20 segments" max={100} segments={20} showValue value={60} />
    </div>
  ),
};

export const NoSegments: Story = {
  args: { label: 'EXP', max: 1000, showValue: true, value: 420 },
};

export const MagicPoints: Story = {
  parameters: {
    docs: {
      description: {
        story: 'MP bar using `color="blue"` with a custom max of 200.',
      },
    },
  },
  args: { color: 'blue', label: 'MP', max: 200, showValue: true, value: 140 },
};

export const NoLabel: Story = {
  args: { max: 100, segments: 5, value: 75 },
};

export const NoValue: Story = {
  args: { label: 'HP', max: 100, segments: 10, showValue: false, value: 60 },
};

// ---------------------------------------------------------------------------
// All threshold states
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All threshold states in one view: Full → Good → Half → Low → Critical → Dead. Color transitions are automatic.',
      },
    },
  },
  render: () => (
    <div className="w-64 space-y-4">
      <HPBar label="Full"     max={100} segments={10} showValue value={100} />
      <HPBar label="Good"     max={100} segments={10} showValue value={75} />
      <HPBar label="Half"     max={100} segments={10} showValue value={50} />
      <HPBar label="Low"      max={100} segments={10} showValue value={25} />
      <HPBar label="Critical" max={100} segments={10} showValue value={10} />
      <HPBar label="Dead"     max={100} segments={10} showValue value={0} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Domain scenarios
// ---------------------------------------------------------------------------

export const PlayerHealth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic game character HP — 73/100 is in the healthy green zone.',
      },
    },
  },
  render: () => (
    <div className="w-64 space-y-3">
      <HPBar color="green" label="HP" max={100} segments={10} showValue value={73} />
      <HPBar color="blue"  label="MP" max={100} segments={10} showValue value={55} />
      <HPBar color="purple" label="XP" max={100} showValue value={88} />
    </div>
  ),
};

export const BatteryLevel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Battery-style indicator: 23% triggers the red critical threshold automatically — no extra prop needed.',
      },
    },
  },
  render: () => (
    <div className="w-48 space-y-1">
      <HPBar label="Battery" max={100} showValue value={23} />
      <p className="text-[10px] text-red-500 font-medium">Low battery — please charge</p>
    </div>
  ),
};

export const StorageUsage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Storage quota indicator. At 67% the bar stays green; adding `segments={10}` gives a chunked disk-block look.',
      },
    },
  },
  render: () => (
    <div className="w-64 space-y-2">
      <HPBar color="blue" label="Storage" max={100} segments={10} showValue value={67} />
      <p className="text-xs text-gray-400">67 GB of 100 GB used</p>
    </div>
  ),
};

export const MultipleResources: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Composition: multiple HPBars in a stack to monitor several system resources simultaneously.',
      },
    },
  },
  render: () => (
    <div className="w-72 space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Server Resources</h3>
      <HPBar color="blue"   label="CPU"     max={100} showValue value={72} />
      <HPBar color="green"  label="Memory"  max={100} showValue value={44} />
      <HPBar color="purple" label="Disk"    max={100} showValue value={89} />
      <HPBar color="blue"   label="Network" max={100} showValue value={30} />
    </div>
  ),
};
