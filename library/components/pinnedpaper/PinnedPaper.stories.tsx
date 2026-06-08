import type { Meta, StoryObj } from '@storybook/react';

import { Whiteboard } from '../whiteboard/Whiteboard';
import { PinnedPaper } from './PinnedPaper';

const meta: Meta<typeof PinnedPaper> = {
  title: 'Layout/PinnedPaper',
  component: PinnedPaper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**PinnedPaper** renders a draggable sheet of paper with a red push-pin decoration at the top center, evoking a physical corkboard note.

Position it absolutely within a \`<Whiteboard>\` or any \`position: relative\` container using \`initialX\` and \`initialY\`. Apply \`initialRotation\` (degrees) for a natural tilted look. Set \`draggable={false}\` to lock it in place. Supply \`width\` in pixels or CSS units (e.g. \`'50%'\`) to control the paper width.
Use it for brainstorm boards, mood boards, portfolio displays, and any canvas UI where content should feel tangible and repositionable.
        `,
      },
    },
  },
  argTypes: {
    initialRotation: {
      control: { type: 'range', min: -30, max: 30, step: 1 },
      description: 'Initial rotation in degrees. Positive values tilt right, negative values tilt left.',
      table: { defaultValue: { summary: '0' } },
    },
    draggable: {
      control: 'boolean',
      description: 'When true, the paper can be dragged around its container.',
      table: { defaultValue: { summary: 'true' } },
    },
    width: {
      control: 'number',
      description: 'Width of the paper in pixels (or pass a CSS string).',
      table: { defaultValue: { summary: '260' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PinnedPaper>;

export const Default: Story = {
  render: () => (
    <div className="relative w-80 h-64">
      <PinnedPaper title="About">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          This is a pinned paper component with a push-pin decoration at the top.
        </p>
      </PinnedPaper>
    </div>
  ),
};

export const NoTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Without a `title` the header is omitted and the pin hangs directly above the content. Use when the content is self-explanatory.',
      },
    },
  },
  render: () => (
    <div className="relative w-80 h-48">
      <PinnedPaper>
        <p className="text-sm text-gray-600 dark:text-gray-300">No title — just content and the pin above.</p>
      </PinnedPaper>
    </div>
  ),
};

export const WithRotation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A slight negative rotation gives the paper a natural, hand-placed look. Combine multiple rotated papers on a Whiteboard for a realistic corkboard.',
      },
    },
  },
  render: () => (
    <div className="relative w-80 h-64">
      <PinnedPaper initialRotation={-5} title="Tilted Note">
        <p className="text-sm text-gray-600">Rotated slightly for a natural, hand-pinned appearance.</p>
      </PinnedPaper>
    </div>
  ),
};

export const WideWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom `width` (400px) accommodates longer content or multi-column layouts within a single paper.',
      },
    },
  },
  render: () => (
    <div className="relative w-[500px] h-48">
      <PinnedPaper title="Wide Paper" width={400}>
        <p className="text-sm text-gray-600">
          Custom width=400. Great for longer content that needs more horizontal space.
        </p>
      </PinnedPaper>
    </div>
  ),
};

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic content: a sprint planning note with a task checklist. Any React node can be passed as children.',
      },
    },
  },
  render: () => (
    <div className="relative w-80 h-72">
      <PinnedPaper title="Sprint 42 Goals">
        <ul className="text-xs text-gray-700 space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Finish auth refactor (PR #248)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Deploy v1.4.0 to staging
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-300">○</span> Write migration guide
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-300">○</span> Review asset approval flow
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-300">○</span> Update Storybook docs
          </li>
        </ul>
      </PinnedPaper>
    </div>
  ),
};

export const WithRichContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Rich children — a list with colored bullets representing different tech domains.',
      },
    },
  },
  render: () => (
    <div className="relative w-80 h-56">
      <PinnedPaper title="Tech Stack">
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>🔵 Go · PostgreSQL · Temporal</li>
          <li>🟢 React · TypeScript · Tailwind</li>
          <li>🟡 Redis · Kafka · PeerDB</li>
        </ul>
      </PinnedPaper>
    </div>
  ),
};

export const NonDraggable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `draggable={false}` the paper is locked in place — the pin decoration still shows but grab cursor and drag behavior are disabled.',
      },
    },
  },
  render: () => (
    <div className="relative w-80 h-48">
      <PinnedPaper draggable={false} title="Pinned (locked)">
        <p className="text-xs text-gray-600">This paper cannot be moved. draggable=false.</p>
      </PinnedPaper>
    </div>
  ),
};

export const MultipleRotations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three papers with varying rotations side by side — illustrates how different tilt values create a naturalistic corkboard aesthetic.',
      },
    },
  },
  render: () => (
    <div className="relative w-[620px] h-72">
      <PinnedPaper initialRotation={-6} initialX={20} title="Idea A" width={160}>
        <p className="text-xs text-gray-600">A wild idea came up during standup.</p>
      </PinnedPaper>
      <PinnedPaper initialRotation={2} initialX={210} title="Idea B" width={160}>
        <p className="text-xs text-gray-600">Revisit the approval workflow design.</p>
      </PinnedPaper>
      <PinnedPaper initialRotation={-3} initialX={400} title="Idea C" width={160}>
        <p className="text-xs text-gray-600">Add keyboard shortcuts to the command palette.</p>
      </PinnedPaper>
    </div>
  ),
};

export const InDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'PinnedPaper used as a floating widget inside a dashboard layout — drag the papers around the Whiteboard canvas.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="450px">
      <PinnedPaper draggable initialRotation={-3} initialX={60} initialY={50} title="Release Notes">
        <p className="text-xs text-gray-600">v1.4.0 ships Friday. Includes auth refactor, new preset system, and 12 bug fixes.</p>
      </PinnedPaper>
      <PinnedPaper draggable initialRotation={4} initialX={320} initialY={100} title="Team OOO" width={200}>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>Aira — May 24–28</li>
          <li>Reza — Jun 3–7</li>
        </ul>
      </PinnedPaper>
      <PinnedPaper draggable initialRotation={-1} initialX={80} initialY={270} title="Blockers" width={220}>
        <p className="text-xs text-gray-600 leading-relaxed">
          PeerDB replication lag on tenant migrations. Investigating with ops team.
        </p>
      </PinnedPaper>
    </Whiteboard>
  ),
};

export const OnWhiteboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two draggable papers on a Whiteboard — click and drag each to rearrange. The last dragged paper automatically floats to the front.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="450px">
      <PinnedPaper draggable initialRotation={-3} initialX={60} initialY={50} title="Notes">
        <p className="text-sm text-gray-600">Drag me around the canvas.</p>
      </PinnedPaper>
      <PinnedPaper draggable initialRotation={4} initialX={320} initialY={100} title="Ideas" width={200}>
        <p className="text-sm text-gray-600">Another paper on the board.</p>
      </PinnedPaper>
    </Whiteboard>
  ),
};
