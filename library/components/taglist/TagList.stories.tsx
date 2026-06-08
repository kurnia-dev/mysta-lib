import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TagList } from './TagList';

const meta: Meta<typeof TagList> = {
  title: 'Data/TagList',
  component: TagList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**TagList** renders a wrapping set of tag chips or badge pills from a \`string[]\`. Use it to display labels, categories, skills, statuses, or any collection of short text identifiers.

### Variants
| \`variant\` | Style | Use case |
|---|---|---|
| \`'chip'\` (default) | Rounded pill, gray background | Skills, technologies, filters |
| \`'badge'\` | Square-ish, blue background | Statuses, categories, labels |

### Removable tags
Pass an \`onRemove\` callback to add a × button to each tag. The callback receives the removed tag string — use \`useState\` to filter it from the array.

### Composition
Pair TagList with an input + add button to build a full tag management UI where users can both add and remove tags.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['chip', 'badge'],
      description: 'Visual style variant.',
      table: { defaultValue: { summary: 'chip' } },
    },
    tags: {
      control: false,
      description: 'Array of tag strings to display.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof TagList>;

// ---------------------------------------------------------------------------
// Core variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default chip variant — rounded pills with a neutral gray background.',
      },
    },
  },
  args: { tags: ['React', 'TypeScript', 'Tailwind', 'Go', 'Vite'] },
};

export const ChipVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: '`variant="chip"` (default) — pill-shaped tags suitable for skills, technologies, and filters.',
      },
    },
  },
  args: { tags: ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data'], variant: 'chip' },
};

export const BadgeVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: '`variant="badge"` — square-ish blue badges, suited for status labels and categories.',
      },
    },
  },
  args: { tags: ['Draft', 'Pending Review', 'Approved', 'Published'], variant: 'badge' },
};

// ---------------------------------------------------------------------------
// Removal
// ---------------------------------------------------------------------------

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `onRemove` to add a × button to each chip. Manage the tags array externally with `useState`.',
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Go', 'PostgreSQL']);
    return (
      <div className="space-y-3 w-72">
        <TagList
          tags={tags}
          onRemove={(t) => setTags((prev) => prev.filter((x) => x !== t))}
        />
        {tags.length === 0 && (
          <p className="text-sm text-gray-400 text-center">All tags removed</p>
        )}
      </div>
    );
  },
};

export const RemovableBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Removable badges — same `onRemove` pattern with `variant="badge"`. Useful for status labels or filter chips.',
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['Draft', 'Needs Review', 'High Priority', 'Q2']);
    return (
      <TagList
        tags={tags}
        variant="badge"
        onRemove={(t) => setTags((prev) => prev.filter((x) => x !== t))}
      />
    );
  },
};

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

export const ManyTags: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Twelve tags demonstrating wrapping behavior — tags flow to new lines naturally via flex-wrap.',
      },
    },
  },
  args: {
    tags: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte', 'Node.js', 'Go', 'Python', 'Rust', 'Docker', 'Kubernetes'],
  },
};

export const SingleTag: Story = {
  args: { tags: ['Solo'] },
};

export const LongTagNames: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: tags with long text labels. Text is not truncated — choose shorter labels in real UIs.',
      },
    },
  },
  args: {
    tags: ['Machine Learning', 'Natural Language Processing', 'Distributed Systems', 'Infrastructure as Code'],
    variant: 'chip',
  },
};

// ---------------------------------------------------------------------------
// Domain scenarios
// ---------------------------------------------------------------------------

export const TechStack: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Composition: two TagLists grouped by concern (Frontend / Backend) to show a project tech stack.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Frontend</p>
        <TagList tags={['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Storybook']} variant="chip" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Backend</p>
        <TagList tags={['Go', 'PostgreSQL', 'Redis', 'Temporal', 'Kafka']} variant="badge" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Infrastructure</p>
        <TagList tags={['Docker', 'Kubernetes', 'GitHub Actions']} variant="chip" />
      </div>
    </div>
  ),
};

export const InteractiveRemovable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive removable tag list — click × to remove any tag. A counter updates in real time.',
      },
    },
  },
  render: () => {
    const initial = ['Design System', 'Accessibility', 'Dark Mode', 'Animations', 'Responsive', 'i18n'];
    const [tags, setTags] = useState(initial);

    return (
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Selected features</span>
          <span className="text-xs tabular-nums text-gray-400">{tags.length} / {initial.length}</span>
        </div>
        <TagList
          tags={tags}
          onRemove={(t) => setTags((prev) => prev.filter((x) => x !== t))}
        />
        {tags.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2">No features selected</p>
        )}
        <button
          className="text-xs text-blue-500 hover:underline"
          type="button"
          onClick={() => setTags(initial)}
        >
          Restore all
        </button>
      </div>
    );
  },
};

export const AddableList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full tag management pattern: text input + Add button to append tags, × button to remove them. Prevents duplicate tags and trims whitespace.',
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Go']);
    const [input, setInput] = useState('');

    const addTag = (): void => {
      const trimmed = input.trim();
      if (!trimmed || tags.includes(trimmed)) return;
      setTags((prev) => [...prev, trimmed]);
      setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') addTag();
    };

    return (
      <div className="w-80 space-y-3">
        <div className="flex gap-2">
          <input
            className="flex-1 text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a tag…"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-40 transition-colors"
            disabled={!input.trim() || tags.includes(input.trim())}
            type="button"
            onClick={addTag}
          >
            Add
          </button>
        </div>
        {tags.length > 0 ? (
          <TagList
            tags={tags}
            onRemove={(t) => setTags((prev) => prev.filter((x) => x !== t))}
          />
        ) : (
          <p className="text-xs text-gray-400">No tags yet — add one above.</p>
        )}
      </div>
    );
  },
};

export const FilterChips: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Active filter chip pattern: removable chips for applied search filters. Removing a chip clears that filter.',
      },
    },
  },
  render: () => {
    const [filters, setFilters] = useState(['Status: Active', 'Role: Admin', 'Department: Engineering', 'Joined: 2023']);

    return (
      <div className="w-96 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Active filters</span>
          {filters.length > 0 && (
            <button
              className="text-xs text-blue-500 hover:underline"
              type="button"
              onClick={() => setFilters([])}
            >
              Clear all
            </button>
          )}
        </div>
        {filters.length > 0 ? (
          <TagList
            tags={filters}
            variant="badge"
            onRemove={(t) => setFilters((prev) => prev.filter((f) => f !== t))}
          />
        ) : (
          <p className="text-xs text-gray-400">No filters applied</p>
        )}
      </div>
    );
  },
};
