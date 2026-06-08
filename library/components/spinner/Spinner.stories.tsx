import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../card/Card';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Spinner** is a circular loading indicator that signals an in-progress operation to the user.

Use it when:
- Content is being fetched from an API
- A form is being submitted
- A button action is running in the background
- A card or section is loading its data

### Sizes
| \`size\` | Use case |
|---|---|
| \`sm\` | Inline text, compact buttons |
| \`md\` | Default — cards, small panels |
| \`lg\` | Full-page or full-section overlays |

Color is controlled via \`className\` using Tailwind \`text-*\` utilities (the spinner border inherits \`currentColor\`). Default color is inherited from the surrounding text context.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner.',
      table: { defaultValue: { summary: 'md' } },
    },
    className: {
      control: 'text',
      description: 'Tailwind `text-*` class to control the spinner color.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The spinner at its default size (`md`) with no color override — it inherits the surrounding text color.',
      },
    },
  },
  args: { size: 'md' },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three size variants side-by-side: `sm` (inline use), `md` (default), `lg` (overlay / full-section).',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-gray-400">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-gray-400">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-gray-400">lg</span>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Color is controlled via `className` using Tailwind `text-*` utilities. The spinner border inherits `currentColor`.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-blue-500" size="md" />
        <span className="text-xs text-gray-400">blue-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-emerald-500" size="md" />
        <span className="text-xs text-gray-400">emerald-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-red-500" size="md" />
        <span className="text-xs text-gray-400">red-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-yellow-500" size="md" />
        <span className="text-xs text-gray-400">yellow-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner className="text-purple-500" size="md" />
        <span className="text-xs text-gray-400">purple-500</span>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Contextual usage
// ---------------------------------------------------------------------------

export const InlineWithText: Story = {
  parameters: {
    docs: {
      description: {
        story: '`size="sm"` spinner placed inline with a status message — the most common pattern for fetch states.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <Spinner size="sm" />
      <span>Loading transactions…</span>
    </div>
  ),
};

export const InButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spinner inside a loading button — use `size="sm"` with a white `className` on a filled button. Disable the button while loading.',
      },
    },
  },
  render: () => (
    <div className="flex gap-3">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm opacity-80 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner className="text-white" size="sm" />
        Saving changes…
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 opacity-80 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner size="sm" />
        Exporting…
      </button>
    </div>
  ),
};

export const FullPageOverlay: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full-page loading overlay pattern — a semi-transparent backdrop with a centered `lg` spinner. Use for initial app load or route transitions.',
      },
    },
  },
  render: () => (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      {/* Simulated page content behind overlay */}
      <div className="absolute inset-0 p-8 opacity-30 pointer-events-none">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" key={i} />
          ))}
        </div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 flex flex-col items-center justify-center gap-3">
        <Spinner className="text-blue-500" size="lg" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Loading dashboard…</span>
      </div>
    </div>
  ),
};

export const InCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Spinner replacing the content area of a Card while data is being fetched. Use `md` size for card-level loading.',
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Card
        mode="container"
        size="md"
        slots={{
          header: <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Recent Orders</span>,
          content: (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Spinner className="text-blue-500" size="md" />
              <span className="text-xs text-gray-400 dark:text-gray-500">Fetching orders…</span>
            </div>
          ),
        }}
      />
    </div>
  ),
};

export const InTable: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Spinner replacing a table body while server data is loading — center the spinner in a full-width row spanning all columns.',
      },
    },
  },
  render: () => (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Table header */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {['Name', 'Email', 'Role', 'Status'].map((h) => (
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                key={h}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-12 text-center" colSpan={4}>
              <div className="flex flex-col items-center gap-2">
                <Spinner className="text-blue-500" size="md" />
                <span className="text-xs text-gray-400">Loading users…</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Composition
// ---------------------------------------------------------------------------

export const ButtonStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different loading button states using Spinner. The "Submitting" state uses a white spinner; "Syncing" uses a gray spinner on an outlined button.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm opacity-75 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner className="text-white" size="sm" />
        Submitting form…
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm opacity-75 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner className="text-white" size="sm" />
        Saving…
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm opacity-75 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner size="sm" />
        Syncing data…
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm opacity-75 cursor-not-allowed"
        disabled
        type="button"
      >
        <Spinner className="text-white" size="sm" />
        Deleting…
      </button>
    </div>
  ),
};
