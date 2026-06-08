import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { ChipProps } from './Chip.d';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Preset/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Chip** is a compact label element used for tags, statuses, filters, and category badges. It is a **standalone component** — no Form wrapper is required.

Three visual variants are available: **filled** (solid background, default), **outlined** (border only), and **light** (tinted background). Six severity colours control the palette: \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\`.

Set \`removable\` to show a × remove button and handle removal via \`onRemove\`. Set \`clickable\` to make the chip interactive (cursor pointer, hover/press styles) and handle selection via \`onClick\`. Both can be combined. Optional \`icon\` renders a leading icon from the Icon library.
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color severity variant.',
      table: { defaultValue: { summary: 'secondary' } },
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined', 'light'],
      description: 'Visual style variant.',
      table: { defaultValue: { summary: 'filled' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant.',
      table: { defaultValue: { summary: 'md' } },
    },
    removable: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    clickable: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: 'React' },
};

// ─── Filled ──────────────────────────────────────────────────────────────────

export const Filled: Story = {
  args: { label: 'Filled', severity: 'primary', variant: 'filled' },
};

// ─── Outlined ────────────────────────────────────────────────────────────────

export const Outlined: Story = {
  args: { label: 'Outlined', severity: 'primary', variant: 'outlined' },
};

// ─── Light ───────────────────────────────────────────────────────────────────

export const Light: Story = {
  args: { label: 'Light', severity: 'primary', variant: 'light' },
};

// ─── Small ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
};

// ─── Medium ──────────────────────────────────────────────────────────────────

export const Medium: Story = {
  args: { label: 'Medium', size: 'md' },
};

// ─── Large ───────────────────────────────────────────────────────────────────

export const Large: Story = {
  args: { label: 'Large', size: 'lg' },
};

// ─── WithIcon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  args: { icon: 'check-circle', label: 'Verified', severity: 'success' },
};

// ─── Removable ───────────────────────────────────────────────────────────────

export const Removable: Story = {
  args: { label: 'TypeScript', removable: true, onRemove: () => {} },
};

// ─── Clickable ───────────────────────────────────────────────────────────────

export const Clickable: Story = {
  args: { clickable: true, label: 'Frontend', severity: 'info', onClick: () => {} },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable' },
};

// ─── AllSeverities ────────────────────────────────────────────────────────────

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severity colours shown in the default `filled` variant.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <Chip key={s} label={s} severity={s} />
      ))}
    </div>
  ),
};

// ─── AllVariants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three visual variants (`filled`, `outlined`, `light`) shown for each severity colour.',
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <div className="flex flex-wrap gap-2" key={s}>
          {(['filled', 'outlined', 'light'] as const).map((v) => (
            <Chip key={v} label={`${s} ${v}`} severity={s} variant={v} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── AllSizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three sizes (`sm`, `md`, `lg`) side by side for each variant.',
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {(['filled', 'outlined', 'light'] as const).map((v) => (
        <div className="flex flex-wrap items-center gap-2" key={v}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Chip key={s} label={`${s} ${v}`} severity="primary" size={s} variant={v} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── RemovableList ────────────────────────────────────────────────────────────

export const RemovableList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive removable tag list. Click × on any chip to remove it from the list.',
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Go', 'PostgreSQL', 'Docker']);
    return (
      <div className="flex flex-wrap gap-2 max-w-xs">
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            removable
            severity="primary"
            variant="light"
            onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
          />
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-gray-400 italic">All tags removed.</p>
        )}
      </div>
    );
  },
};

// ─── TagCloud ────────────────────────────────────────────────────────────────

export const TagCloud: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic technology tag cloud mixing severity colours for visual variety.',
      },
    },
  },
  render: () => {
    const tags: { label: string; severity: ChipProps['severity'] }[] = [
      { label: 'JavaScript', severity: 'warning' },
      { label: 'TypeScript', severity: 'info' },
      { label: 'React', severity: 'primary' },
      { label: 'Go', severity: 'info' },
      { label: 'PostgreSQL', severity: 'secondary' },
      { label: 'Docker', severity: 'info' },
      { label: 'Kubernetes', severity: 'success' },
      { label: 'Redis', severity: 'danger' },
      { label: 'Kafka', severity: 'secondary' },
    ];
    return (
      <div className="flex flex-wrap gap-2 max-w-sm">
        {tags.map(({ label, severity }) => (
          <Chip key={label} label={label} severity={severity} variant="light" />
        ))}
      </div>
    );
  },
};

// ─── StatusChips ─────────────────────────────────────────────────────────────

export const StatusChips: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status indicators using severity colours — a common pattern in data tables and dashboards.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Active" severity="success" variant="light" />
      <Chip label="Pending Review" severity="warning" variant="light" />
      <Chip label="Inactive" severity="secondary" variant="light" />
      <Chip label="Suspended" severity="danger" variant="light" />
      <Chip label="In Progress" severity="info" variant="light" />
      <Chip label="Archived" severity="secondary" variant="outlined" />
    </div>
  ),
};

// ─── FilterChips ─────────────────────────────────────────────────────────────

export const FilterChips: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Clickable chips used as filter toggles. Selected chips are highlighted with `filled` variant; deselected chips use `outlined`. Click to toggle selection.',
      },
    },
  },
  render: () => {
    const filters = ['All', 'Open', 'In Progress', 'Review', 'Done', 'Blocked'] as const;
    type Filter = (typeof filters)[number];
    const [active, setActive] = useState<Filter>('All');

    return (
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Chip
            clickable
            key={f}
            label={f}
            severity="primary"
            variant={active === f ? 'filled' : 'outlined'}
            onClick={() => setActive(f)}
          />
        ))}
      </div>
    );
  },
};

// ─── CategoryLabels ───────────────────────────────────────────────────────────

export const CategoryLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Product category labels shown as chips — typical e-commerce or CMS tagging pattern.',
      },
    },
  },
  render: () => {
    const categories: { label: string; severity: ChipProps['severity'] }[] = [
      { label: 'Electronics', severity: 'info' },
      { label: 'Clothing', severity: 'primary' },
      { label: 'Home & Garden', severity: 'success' },
      { label: 'Sports', severity: 'warning' },
      { label: 'Books', severity: 'secondary' },
      { label: 'Toys', severity: 'danger' },
      { label: 'Automotive', severity: 'secondary' },
      { label: 'Beauty', severity: 'primary' },
    ];
    return (
      <div className="flex flex-wrap gap-2 max-w-xs">
        {categories.map(({ label, severity }) => (
          <Chip key={label} label={label} severity={severity} size="sm" variant="light" />
        ))}
      </div>
    );
  },
};

// ─── WithIconAndRemovable ─────────────────────────────────────────────────────

export const WithIconAndRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Chips combining an icon and a remove button — useful for selected filter pills.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState([
      { id: 1, label: 'Verified', icon: 'check-circle' as const, severity: 'success' as const },
      { id: 2, label: 'Featured', icon: 'star' as const, severity: 'warning' as const },
      { id: 3, label: 'New', icon: 'sparkles' as const, severity: 'info' as const },
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <Chip
            key={item.id}
            icon={item.icon}
            label={item.label}
            removable
            severity={item.severity}
            variant="light"
            onRemove={() => setSelected((prev) => prev.filter((x) => x.id !== item.id))}
          />
        ))}
        {selected.length === 0 && (
          <p className="text-sm text-gray-400 italic">No active filters.</p>
        )}
      </div>
    );
  },
};
