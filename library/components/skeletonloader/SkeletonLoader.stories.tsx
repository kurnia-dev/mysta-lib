import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonLoader } from './SkeletonLoader';

const meta: Meta<typeof SkeletonLoader> = {
  title: 'Feedback/SkeletonLoader',
  component: SkeletonLoader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SkeletonLoader** renders a pulsing placeholder block that mimics the shape of content while it is being loaded. Use it to reduce perceived load time by showing a structural preview of the page before data arrives.

### Key principle — match the shape
Each \`SkeletonLoader\` block should match the visual dimensions of the real content it replaces:
- Use \`rounded="rounded-full"\` + equal \`width\`/\`height\` for avatars and icons
- Use \`height="h-4"\` / \`height="h-3"\` for text lines (title vs body)
- Use a taller \`height\` for image placeholders

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| \`width\` | \`string\` | \`'w-full'\` | Tailwind width class |
| \`height\` | \`string\` | \`'h-4'\` | Tailwind height class |
| \`rounded\` | \`string\` | \`'rounded-md'\` | Tailwind border-radius class |
| \`animated\` | \`boolean\` | \`true\` | Enable pulse animation |

Combine multiple \`SkeletonLoader\` blocks in a container to build skeleton layouts that match real component structures.
        `,
      },
    },
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Tailwind width class (e.g. `w-full`, `w-48`, `w-1/2`).',
      table: { defaultValue: { summary: 'w-full' } },
    },
    height: {
      control: 'text',
      description: 'Tailwind height class (e.g. `h-4`, `h-8`, `h-24`).',
      table: { defaultValue: { summary: 'h-4' } },
    },
    rounded: {
      control: 'text',
      description: 'Tailwind border-radius class (e.g. `rounded-md`, `rounded-full`, `rounded-none`).',
      table: { defaultValue: { summary: 'rounded-md' } },
    },
    animated: {
      control: 'boolean',
      description: 'Enable pulse animation. Disable when showing a static preview.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

// ---------------------------------------------------------------------------
// Core variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default skeleton block: full width, `h-4` height, `rounded-md` corners, animated.',
      },
    },
  },
  args: {},
};

export const TextLine: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Narrow, short block for simulating a single line of body text.',
      },
    },
  },
  args: { height: 'h-3', width: 'w-3/4' },
};

export const HeadingLine: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Taller block for a heading or title — use `h-5` or `h-6` to match typical heading font sizes.',
      },
    },
  },
  args: { height: 'h-5', width: 'w-1/2' },
};

export const CircleAvatar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Circular avatar placeholder — equal `width` and `height` with `rounded="rounded-full"`.',
      },
    },
  },
  args: { height: 'h-10', rounded: 'rounded-full', width: 'w-10' },
};

export const ImageBlock: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tall rectangle for an image or banner placeholder — use `rounded-xl` to match card image rounding.',
      },
    },
  },
  args: { height: 'h-40', rounded: 'rounded-xl', width: 'w-full' },
};

export const NoAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: '`animated={false}` renders a static gray block — useful when the content state is unknown or for UI screenshots.',
      },
    },
  },
  args: { animated: false, height: 'h-4', width: 'w-64' },
};

// ---------------------------------------------------------------------------
// Composed layouts
// ---------------------------------------------------------------------------

export const ProfileSkeleton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Profile card skeleton: avatar circle + name heading + subtitle + two detail lines.',
      },
    },
  },
  render: () => (
    <div className="flex items-start gap-4 w-80 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
      <SkeletonLoader height="h-14" rounded="rounded-full" width="w-14" />
      <div className="flex-1 space-y-2 pt-1">
        <SkeletonLoader height="h-4" width="w-3/4" />
        <SkeletonLoader height="h-3" width="w-1/2" />
        <SkeletonLoader height="h-3" width="w-full" />
        <SkeletonLoader height="h-3" width="w-4/5" />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card content skeleton: image area at the top, followed by a title and two description lines.',
      },
    },
  },
  render: () => (
    <div className="w-64 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
      <SkeletonLoader height="h-36" rounded="rounded-none" width="w-full" />
      <div className="p-4 space-y-2">
        <SkeletonLoader height="h-4" width="w-3/4" />
        <SkeletonLoader height="h-3" width="w-full" />
        <SkeletonLoader height="h-3" width="w-2/3" />
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  parameters: {
    docs: {
      description: {
        story: '5 list item skeletons — each with an avatar circle on the left and two text lines on the right.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div className="flex items-center gap-3" key={i}>
          <SkeletonLoader height="h-10" rounded="rounded-full" width="w-10" />
          <div className="flex-1 space-y-1.5">
            <SkeletonLoader height="h-4" width="w-3/4" />
            <SkeletonLoader height="h-3" width="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton table rows: a header row with wider blocks followed by 5 data rows with consistent column widths.',
      },
    },
  },
  render: () => (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <SkeletonLoader animated={false} height="h-3" width="w-36" />
        <SkeletonLoader animated={false} height="h-3" width="w-52" />
        <SkeletonLoader animated={false} height="h-3" width="w-24" />
        <SkeletonLoader animated={false} height="h-3" width="w-20" />
      </div>
      {/* Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div className="flex gap-4" key={i}>
          <SkeletonLoader height="h-3" width="w-36" />
          <SkeletonLoader height="h-3" width="w-52" />
          <SkeletonLoader height="h-3" width="w-24" />
          <SkeletonLoader height="h-3" width="w-20" />
        </div>
      ))}
    </div>
  ),
};

export const ArticleSkeleton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Blog/article skeleton: hero image area + article title + author row + body paragraphs.',
      },
    },
  },
  render: () => (
    <div className="w-96 space-y-5">
      {/* Hero image */}
      <SkeletonLoader height="h-48" rounded="rounded-xl" width="w-full" />
      {/* Title */}
      <div className="space-y-2">
        <SkeletonLoader height="h-6" width="w-full" />
        <SkeletonLoader height="h-6" width="w-3/4" />
      </div>
      {/* Author row */}
      <div className="flex items-center gap-3">
        <SkeletonLoader height="h-8" rounded="rounded-full" width="w-8" />
        <div className="space-y-1">
          <SkeletonLoader height="h-3" width="w-28" />
          <SkeletonLoader height="h-3" width="w-20" />
        </div>
      </div>
      {/* Body text */}
      <div className="space-y-2">
        <SkeletonLoader height="h-3" width="w-full" />
        <SkeletonLoader height="h-3" width="w-full" />
        <SkeletonLoader height="h-3" width="w-5/6" />
        <SkeletonLoader height="h-3" width="w-full" />
        <SkeletonLoader height="h-3" width="w-4/5" />
      </div>
    </div>
  ),
};

export const DashboardSkeleton: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full dashboard skeleton: stat card row + a large chart panel + a sidebar panel. Replace with real components once data loads.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 max-w-4xl">
      {/* Stat cards row */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3" key={i}>
            <div className="flex items-center justify-between">
              <SkeletonLoader height="h-3" width="w-20" />
              <SkeletonLoader height="h-5" rounded="rounded-md" width="w-5" />
            </div>
            <SkeletonLoader height="h-7" width="w-3/4" />
            <SkeletonLoader height="h-3" width="w-1/2" />
          </div>
        ))}
      </div>
      {/* Main content + sidebar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
          <SkeletonLoader height="h-4" width="w-36" />
          <SkeletonLoader height="h-48" rounded="rounded-lg" width="w-full" />
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-4">
          <SkeletonLoader height="h-4" width="w-28" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="flex items-center gap-2" key={i}>
              <SkeletonLoader height="h-8" rounded="rounded-full" width="w-8" />
              <div className="flex-1 space-y-1">
                <SkeletonLoader height="h-3" width="w-3/4" />
                <SkeletonLoader height="h-2" width="w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
