import type { Meta, StoryObj } from '@storybook/react';

import { Whiteboard } from '../whiteboard/Whiteboard';
import { StickyNote } from './StickyNote';

const meta: Meta<typeof StickyNote> = {
  title: 'Layout/StickyNote',
  component: StickyNote,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**StickyNote** renders a draggable colored note card — the digital equivalent of a physical sticky note.

Position it absolutely via \`initialX\` and \`initialY\` inside a \`<Whiteboard>\` or any \`position: relative\` container. Apply \`initialRotation\` (degrees) for a naturalistic tilt. Override the background color with the \`color\` prop (hex or any CSS color); if omitted, a color is automatically chosen from the built-in five-color palette based on a stable ID.
Use StickyNote for brainstorm boards, kanban idea lanes, whiteboard UIs, reminder widgets, and any canvas where quick text snippets should feel tactile and movable.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Background color of the note. Defaults to a palette color derived from the component\'s stable ID.',
    },
    initialRotation: {
      control: { type: 'range', min: -30, max: 30, step: 1 },
      description: 'Initial rotation in degrees. Small values (±2–8) look most natural.',
      table: { defaultValue: { summary: '0' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StickyNote>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimum usage — just a `text` prop. The color is chosen automatically from the built-in palette.',
      },
    },
  },
  render: () => (
    <div className="relative w-48 h-48">
      <StickyNote text="Hello from StickyNote!" />
    </div>
  ),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All five palette colors shown together — yellow, green, blue, pink, and purple. Pass any of these hex values to the `color` prop.',
      },
    },
  },
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {[
        { color: '#fef08a', label: 'Yellow' },
        { color: '#bbf7d0', label: 'Green' },
        { color: '#bfdbfe', label: 'Blue' },
        { color: '#fecaca', label: 'Pink' },
        { color: '#e9d5ff', label: 'Purple' },
      ].map(({ color, label }) => (
        <div key={color} className="relative w-36 h-36">
          <StickyNote color={color} text={label} />
        </div>
      ))}
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative w-36 h-36"><StickyNote color="#fef08a" text="Yellow" /></div>
      <div className="relative w-36 h-36"><StickyNote color="#bbf7d0" text="Green" /></div>
      <div className="relative w-36 h-36"><StickyNote color="#bfdbfe" text="Blue" /></div>
      <div className="relative w-36 h-36"><StickyNote color="#fecaca" text="Pink" /></div>
      <div className="relative w-36 h-36"><StickyNote color="#e9d5ff" text="Purple" /></div>
    </div>
  ),
};

export const WithTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Simulate a titled note by prefixing the text with an uppercase label — since `text` supports newlines, a header line followed by content reads naturally.',
      },
    },
  },
  render: () => (
    <div className="relative w-52 h-52">
      <StickyNote
        color="#fef08a"
        text={`SPRINT 42\n\n• Auth refactor\n• Fix pagination\n• Update docs`}
      />
    </div>
  ),
};

export const WithRotation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three notes at −8°, 0°, and +6° — illustrates how small rotations create a hand-placed, natural look.',
      },
    },
  },
  render: () => (
    <div className="flex gap-6">
      <div className="relative w-40 h-40"><StickyNote color="#fef08a" initialRotation={-8} text="Tilted left" /></div>
      <div className="relative w-40 h-40"><StickyNote color="#bbf7d0" initialRotation={0} text="Straight" /></div>
      <div className="relative w-40 h-40"><StickyNote color="#bfdbfe" initialRotation={6} text="Tilted right" /></div>
    </div>
  ),
};

export const Rotated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single note with a pronounced rotation. Use sparingly for decorative accent notes on a whiteboard.',
      },
    },
  },
  render: () => (
    <div className="relative w-48 h-48">
      <StickyNote color="#e9d5ff" initialRotation={-12} text="Off-axis note for emphasis!" />
    </div>
  ),
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: text longer than the note width wraps across multiple lines. The note height grows to fit (`min-h-[120px]`).',
      },
    },
  },
  render: () => (
    <div className="relative w-44 h-52">
      <StickyNote color="#fecaca" text="This note has longer content that wraps across multiple lines — useful for meeting action items or longer reminders." />
    </div>
  ),
};

export const TodoList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sticky note with a checklist-style text — common for sprint tasks, shopping lists, or daily todos.',
      },
    },
  },
  render: () => (
    <div className="relative w-52 h-56">
      <StickyNote
        color="#bbf7d0"
        text={`TODAY\n\n☑ Morning standup\n☑ Review PR #248\n○ Deploy to staging\n○ Update changelog\n○ 1:1 with Reza`}
      />
    </div>
  ),
};

export const WhiteboardLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple sticky notes arranged as a brainstorm board — drag any note to rearrange. Color-coded by theme: yellow = tasks, green = ideas, blue = blockers.',
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

export const OnWhiteboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Canonical whiteboard scene — five notes on a paper background with realistic content and slight rotations. Drag to rearrange.',
      },
    },
  },
  render: () => (
    <Whiteboard background="paper" height="500px">
      <StickyNote color="#fef08a" initialRotation={-3} initialX={60} initialY={60} text="Drag me!" />
      <StickyNote color="#bbf7d0" initialRotation={5} initialX={240} initialY={90} text="Ship features" />
      <StickyNote color="#bfdbfe" initialRotation={-2} initialX={420} initialY={50} text="Fix bugs" />
      <StickyNote color="#fecaca" initialRotation={4} initialX={120} initialY={240} text="Write docs" />
      <StickyNote color="#e9d5ff" initialRotation={-6} initialX={320} initialY={260} text="Review PRs" />
    </Whiteboard>
  ),
};
