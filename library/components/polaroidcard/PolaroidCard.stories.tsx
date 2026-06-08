import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Whiteboard } from '../whiteboard/Whiteboard';
import { PolaroidCard } from './PolaroidCard';

const meta: Meta<typeof PolaroidCard> = {
  title: 'Layout/PolaroidCard',
  component: PolaroidCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**PolaroidCard** mimics a physical polaroid photograph — a white card with a square image area, a tape strip at the top, an optional status badge, a caption, and an optional tagline.

Cards are draggable by default when placed inside a \`<Whiteboard>\`. Apply \`initialRotation\` (degrees) for a naturalistic tilt. Provide \`image\` (URL string) or \`imageContent\` (any ReactNode) to fill the photo area. If neither is supplied the caption is shown as placeholder text.

Pass \`onOpen\` to make the card openable — a single click shows a "click again to open" hint overlay, and the second click (or a double-click) fires \`onOpen\`. Use it for project galleries, team directories, photo walls, and portfolio mood boards.
        `,
      },
    },
  },
  argTypes: {
    initialRotation: {
      control: { type: 'range', min: -30, max: 30, step: 1 },
      description: 'Initial rotation in degrees. A slight tilt (±3–8°) looks most natural.',
      table: { defaultValue: { summary: '0' } },
    },
    statusVariant: {
      control: 'select',
      options: ['active', 'archived', 'default'],
      description: 'Color variant for the status badge.',
      table: { defaultValue: { summary: 'default' } },
    },
    draggable: {
      control: 'boolean',
      description: 'When true (default), the card can be dragged around its container.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PolaroidCard>;

export const Default: Story = {
  render: () => (
    <div className="relative w-48 h-64">
      <PolaroidCard caption="mystaline-portfolio" status="Live" onOpen={() => alert('open')} />
    </div>
  ),
};

export const WithTagline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `tagline` prop adds a secondary line below the caption — ideal for a subtitle, tech stack, or role.',
      },
    },
  },
  render: () => (
    <div className="relative w-48 h-72">
      <PolaroidCard caption="react-lib" status="WIP" tagline="@mystaline/mysta-commons" onOpen={() => {}} />
    </div>
  ),
};

export const StatusActive: Story = {
  render: () => (
    <div className="relative w-48 h-64">
      <PolaroidCard caption="Active Project" status="Active" statusVariant="active" onOpen={() => {}} />
    </div>
  ),
};

export const StatusArchived: Story = {
  render: () => (
    <div className="relative w-48 h-64">
      <PolaroidCard caption="Old Project" status="Archived" statusVariant="archived" onOpen={() => {}} />
    </div>
  ),
};

export const AllStatusVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three status badge variants side by side: default (blue), active (green), archived (gray).',
      },
    },
  },
  render: () => (
    <div className="relative flex gap-10 h-64">
      {(
        [
          { caption: 'In Progress', status: 'WIP', statusVariant: 'default' },
          { caption: 'Shipped', status: 'Active', statusVariant: 'active' },
          { caption: 'Sunset', status: 'Archived', statusVariant: 'archived' },
        ] as const
      ).map((p) => (
        <div key={p.caption} className="relative w-44 h-56">
          <PolaroidCard {...p} onOpen={() => {}} />
        </div>
      ))}
    </div>
  ),
};

export const WithImageContent: Story = {
  parameters: {
    docs: {
      description: {
        story: '`imageContent` accepts any ReactNode for the photo area — gradients, icons, illustrations, or custom UI.',
      },
    },
  },
  render: () => (
    <div className="relative w-48 h-64">
      <PolaroidCard
        caption="Preview"
        imageContent={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 text-white text-2xl font-bold">
            🚀
          </div>
        }
        status="Live"
        onOpen={() => {}}
      />
    </div>
  ),
};

export const WithRotation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A positive rotation of 8° gives the card a casual, hand-placed look. Combine with negative rotations on neighbouring cards.',
      },
    },
  },
  render: () => (
    <div className="relative w-48 h-64">
      <PolaroidCard caption="Rotated" initialRotation={8} status="Live" onOpen={() => {}} />
    </div>
  ),
};

export const PhotoGallery: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four project polaroids in a grid — the standard portfolio gallery layout. Each card has a unique gradient representing the project\'s theme.',
      },
    },
  },
  render: () => {
    const projects = [
      { caption: 'mystaline-portfolio', tagline: 'React · Go · Tailwind', gradient: 'from-indigo-500 to-purple-600', status: 'Live', variant: 'active' as const },
      { caption: 'react-lib', tagline: '@mystaline/mysta-commons', gradient: 'from-sky-400 to-blue-600', status: 'WIP', variant: 'default' as const },
      { caption: 'chatarea', tagline: 'Go Fiber · WebSocket', gradient: 'from-emerald-400 to-teal-600', status: 'Archived', variant: 'archived' as const },
      { caption: 'lyrics-overlay', tagline: 'Wails · Go · PortAudio', gradient: 'from-rose-400 to-pink-600', status: 'WIP', variant: 'default' as const },
    ];

    return (
      <div className="grid grid-cols-2 gap-12 p-8 bg-amber-50 dark:bg-gray-900">
        {projects.map(({ caption, tagline, gradient, status, variant }) => (
          <div key={caption} className="relative w-44 h-64">
            <PolaroidCard
              caption={caption}
              draggable={false}
              imageContent={
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white text-3xl`}>
                  📸
                </div>
              }
              status={status}
              statusVariant={variant}
              tagline={tagline}
              onOpen={() => {}}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const TeamPhotos: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Team member polaroids with name captions and role taglines — a team directory wall or org chart accent.',
      },
    },
  },
  render: () => {
    const team = [
      { name: 'Aira Tanaka', role: 'Frontend Engineer', color: 'from-violet-400 to-purple-600', initials: 'AT' },
      { name: 'Reza Firmansyah', role: 'Backend Engineer', color: 'from-blue-400 to-sky-600', initials: 'RF' },
      { name: 'Siti Rahmawati', role: 'Product Designer', color: 'from-rose-400 to-pink-600', initials: 'SR' },
      { name: 'Budi Santoso', role: 'DevOps Engineer', color: 'from-emerald-400 to-teal-600', initials: 'BS' },
    ];

    return (
      <div className="flex gap-10 p-8 bg-amber-50 dark:bg-gray-900">
        {team.map(({ name, role, color, initials }, i) => (
          <div key={name} className="relative w-44 h-64">
            <PolaroidCard
              caption={name}
              draggable={false}
              imageContent={
                <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${color} text-white text-2xl font-bold`}>
                  {initials}
                </div>
              }
              initialRotation={[-3, 4, -2, 5][i]}
              tagline={role}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const MemoryWall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple polaroids scattered at varying rotations on a Whiteboard — the classic memory wall or mood board pattern. Drag to rearrange.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="480px">
      {[
        { caption: 'Team Offsite 2025', tagline: 'Bali, October', x: 40, y: 40, rot: -4 },
        { caption: 'Hackathon Winner', tagline: '1st Place — Internal', x: 260, y: 60, rot: 3 },
        { caption: 'v1.0 Launch', tagline: 'September 12, 2025', x: 160, y: 220, rot: -6 },
        { caption: 'Sprint Demo Day', tagline: 'May 2026', x: 420, y: 150, rot: 5 },
      ].map(({ caption, tagline, x, y, rot }) => (
        <PolaroidCard
          key={caption}
          caption={caption}
          draggable
          initialRotation={rot}
          initialX={x}
          initialY={y}
          tagline={tagline}
        />
      ))}
    </Whiteboard>
  ),
};

export const OpenableCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click once to see the "click again to open" hint overlay, then click again (or double-click) to fire `onOpen`. The selected project name is shown below.',
      },
    },
  },
  render: () => {
    const [opened, setOpened] = useState<string | null>(null);
    return (
      <div className="space-y-4 text-center">
        <div className="flex gap-8 justify-center">
          {[
            { caption: 'mystaline-portfolio', status: 'Live', variant: 'active' as const },
            { caption: 'react-lib', status: 'WIP', variant: 'default' as const },
          ].map((p) => (
            <div key={p.caption} className="relative w-44 h-64">
              <PolaroidCard
                {...p}
                draggable={false}
                statusVariant={p.variant}
                onOpen={() => setOpened(p.caption)}
              />
            </div>
          ))}
        </div>
        {opened && (
          <p className="text-xs text-gray-500">
            Opened: <span className="font-semibold text-gray-800 dark:text-white">{opened}</span>
          </p>
        )}
      </div>
    );
  },
};

export const OnWhiteboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three draggable project cards on a Whiteboard canvas — drag to rearrange, double-click to open.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="450px">
      <PolaroidCard caption="Portfolio" draggable initialRotation={-3} initialX={40} initialY={40} status="Live" statusVariant="active" tagline="React + Go" onOpen={() => {}} />
      <PolaroidCard caption="react-lib" draggable initialRotation={2} initialX={280} initialY={80} status="WIP" onOpen={() => {}} />
      <PolaroidCard caption="chatarea" draggable initialRotation={-5} initialX={160} initialY={220} status="Archived" statusVariant="archived" onOpen={() => {}} />
    </Whiteboard>
  ),
};
