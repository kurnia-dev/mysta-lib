import type { Meta, StoryObj } from '@storybook/react';

import { PinnedPaper } from '../pinnedpaper/PinnedPaper';
import { StickyNote } from '../stickynote/StickyNote';
import { Whiteboard } from './Whiteboard';

const meta: Meta<typeof Whiteboard> = {
  title: 'Layout/Whiteboard',
  component: Whiteboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Whiteboard** is a bounded free-canvas container for draggable elements like \`StickyNote\` and \`PinnedPaper\`.

It provides a \`BoundsContext\` that constrains dragging to the canvas bounds and manages a z-index stack so the last-touched element always floats to the front. Choose between four background textures — \`paper\`, \`grid\`, \`dots\`, and \`plain\` — to match the aesthetic of your use case.

Use Whiteboard as the root of any freeform canvas UI: brainstorm boards, mood boards, sprint planning walls, retro boards, and project portfolio displays.
        `,
      },
    },
  },
  argTypes: {
    background: {
      control: 'select',
      options: ['paper', 'grid', 'dots', 'plain'],
      description: 'Background texture of the canvas.',
      table: { defaultValue: { summary: 'paper' } },
    },
    height: {
      control: 'text',
      description: 'Height of the canvas (px, %, vh, or CSS string).',
      table: { defaultValue: { summary: '600' } },
    },
    width: {
      control: 'text',
      description: 'Width of the canvas (px, %, vw, or CSS string). Defaults to 100%.',
      table: { defaultValue: { summary: '100%' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Whiteboard>;

export const Plain: Story = {
  parameters: {
    docs: {
      description: {
        story: '`plain` background — pure white canvas. Best when children provide their own visual texture.',
      },
    },
  },
  render: () => (
    <Whiteboard background="plain" height="500px">
      <StickyNote initialRotation={-2} initialX={60} initialY={60} text="Drag me around!" />
      <StickyNote color="#fce7f3" initialRotation={3} initialX={260} initialY={100} text="Another note" />
      <StickyNote color="#dbeafe" initialRotation={-1} initialX={160} initialY={220} text="Ideas here" />
    </Whiteboard>
  ),
};

export const Paper: Story = {
  parameters: {
    docs: {
      description: {
        story: '`paper` background — warm amber tint evoking physical paper. The default and most versatile option.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="500px">
      <StickyNote initialX={80} initialY={60} text="Warm paper background" />
    </Whiteboard>
  ),
};

export const Grid: Story = {
  parameters: {
    docs: {
      description: {
        story: '`grid` background — 24px grid lines for precise positioning. Use when spatial alignment matters (e.g. diagramming).',
      },
    },
  },
  render: () => (
    <Whiteboard background="grid" height="500px">
      <StickyNote initialX={80} initialY={80} text="On a grid" />
      <StickyNote color="#d1fae5" initialX={240} initialY={120} text="Grid aligns nicely" />
    </Whiteboard>
  ),
};

export const Dots: Story = {
  parameters: {
    docs: {
      description: {
        story: '`dots` background — dotted grid at 20px spacing. Subtler than the line grid, popular in design tools.',
      },
    },
  },
  render: () => (
    <Whiteboard background="dots" height="500px">
      <StickyNote initialX={100} initialY={100} text="Dot grid pattern" />
    </Whiteboard>
  ),
};

export const WithStickyNotes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple StickyNotes on a paper Whiteboard — drag any note to rearrange. The last-touched note automatically floats to the front.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="500px">
      <StickyNote color="#fef08a" initialRotation={-3} initialX={60} initialY={60} text="Drag me!" />
      <StickyNote color="#bbf7d0" initialRotation={5} initialX={240} initialY={90} text="Ship new features" />
      <StickyNote color="#bfdbfe" initialRotation={-2} initialX={420} initialY={50} text="Fix pagination bug" />
      <StickyNote color="#fecaca" initialRotation={4} initialX={120} initialY={240} text="Write Storybook docs" />
      <StickyNote color="#e9d5ff" initialRotation={-6} initialX={320} initialY={260} text="Review open PRs" />
    </Whiteboard>
  ),
};

export const WithCards: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Whiteboard used as a free canvas with custom card children — demonstrates that any React content can live on the board.',
      },
    },
  },
  render: () => {
    const cards = [
      { title: 'Active Users', value: '12,847', color: 'bg-blue-50 border-blue-200', x: 60, y: 60 },
      { title: 'Revenue', value: '$48,320', color: 'bg-emerald-50 border-emerald-200', x: 280, y: 80 },
      { title: 'Uptime', value: '99.9%', color: 'bg-yellow-50 border-yellow-200', x: 160, y: 220 },
    ];
    return (
      <Whiteboard background="dots" height="500px">
        {cards.map(({ title, value, color, x, y }) => (
          <div
            key={title}
            className={`absolute rounded-xl border p-4 shadow-sm w-44 text-center ${color}`}
            style={{ left: x, top: y }}
          >
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{title}</div>
          </div>
        ))}
      </Whiteboard>
    );
  },
};

export const CollaborationBoard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic brainstorm session — sticky notes and pinned papers on a grid whiteboard. Color-coded: yellow = ideas, green = action items, blue = blockers, pinned papers = structured notes.',
      },
    },
  },
  render: () => (
    <Whiteboard background="grid" height="600px">
      {/* Sticky notes cluster — ideas */}
      <StickyNote color="#fef08a" initialRotation={-3} initialX={40} initialY={40} text={`IDEA\n\nBreak auth into separate microservice`} />
      <StickyNote color="#fef08a" initialRotation={5} initialX={220} initialY={30} text={`IDEA\n\nAdd keyboard shortcuts to all modals`} />
      <StickyNote color="#fef08a" initialRotation={-2} initialX={410} initialY={55} text={`IDEA\n\nPreset theme marketplace`} />

      {/* Green — action items */}
      <StickyNote color="#bbf7d0" initialRotation={4} initialX={60} initialY={220} text={`ACTION\n\nMerge PR #248 by Friday`} />
      <StickyNote color="#bbf7d0" initialRotation={-5} initialX={250} initialY={240} text={`ACTION\n\nSchedule v1.4 release demo`} />

      {/* Pink/blue — blockers */}
      <StickyNote color="#fecaca" initialRotation={3} initialX={430} initialY={210} text={`BLOCKER\n\nPeerDB lag on tenant sync`} />

      {/* Pinned paper — sprint goals */}
      <PinnedPaper draggable initialRotation={-2} initialX={80} initialY={370} title="Sprint 42 Goals" width={220}>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ Auth refactor complete</li>
          <li>✓ Whiteboard component</li>
          <li>○ Storybook story coverage</li>
          <li>○ v1.4 release notes</li>
        </ul>
      </PinnedPaper>

      {/* Pinned paper — team note */}
      <PinnedPaper draggable initialRotation={3} initialX={360} initialY={360} title="Team OOO" width={180}>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>Aira — May 24–28</li>
          <li>Reza — Jun 3–7</li>
        </ul>
      </PinnedPaper>
    </Whiteboard>
  ),
};

export const WithPinnedPapers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'PinnedPaper and StickyNote side by side on a paper Whiteboard — shows how the two canvas primitives complement each other.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="600px">
      <PinnedPaper draggable initialX={60} initialY={50} title="About Me">
        <p className="text-sm text-gray-600">Full-stack developer. Go + React. Building useful things.</p>
      </PinnedPaper>
      <PinnedPaper draggable initialX={320} initialY={80} title="Stack">
        <ul className="text-sm text-gray-600 space-y-1">
          <li>Go · PostgreSQL · Temporal</li>
          <li>React · TypeScript · Tailwind</li>
        </ul>
      </PinnedPaper>
      <StickyNote color="#fef9c3" initialRotation={-4} initialX={150} initialY={300} text="Remember to ship!" />
    </Whiteboard>
  ),
};
