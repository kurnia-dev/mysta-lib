import type { Meta, StoryObj } from '@storybook/react';

import { Typewriter } from './Typewriter';

const meta: Meta<typeof Typewriter> = {
  title: 'Animation/Typewriter',
  component: Typewriter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Typewriter** cycles through an array of \`lines\`, typing each one character by character, pausing, then deleting before moving to the next.

Control typing speed with \`speed\` (ms per character), deletion speed with \`deleteSpeed\`, and the pause between finishing a line and starting deletion with \`pauseMs\`.
Set \`loop: false\` to stop at the last line without deleting. Customize the blinking cursor with \`cursorChar\`.
Ideal for hero headlines, role descriptions, and interactive terminal-style UIs.
        `,
      },
    },
  },
  argTypes: {
    speed: {
      control: { type: 'range', min: 10, max: 300, step: 10 },
      description: 'Milliseconds per character typed (randomized slightly for realism).',
      table: { defaultValue: { summary: '60' } },
    },
    deleteSpeed: {
      control: { type: 'range', min: 5, max: 150, step: 5 },
      description: 'Milliseconds per character deleted.',
      table: { defaultValue: { summary: '20' } },
    },
    pauseMs: {
      control: { type: 'range', min: 500, max: 5000, step: 100 },
      description: 'Milliseconds to pause after finishing a line before deletion begins.',
      table: { defaultValue: { summary: '1600' } },
    },
    loop: {
      control: 'boolean',
      description: 'Whether to restart from the first line after the last line is typed and deleted.',
      table: { defaultValue: { summary: 'true' } },
    },
    cursorChar: {
      control: 'text',
      description: 'Character rendered as the blinking cursor.',
      table: { defaultValue: { summary: '|' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Typewriter>;

export const Default: Story = {
  args: { lines: ['Hello, world!', 'Building things.', 'One keystroke at a time.'], loop: true, speed: 60 },
};

export const Fast: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Speed at 30ms and deleteSpeed at 20ms for rapid cycling. Good for status messages or loading hints.',
      },
    },
  },
  args: { deleteSpeed: 20, lines: ['Fast typing...', 'Super fast!'], loop: true, speed: 30 },
};

export const Slow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slow speed makes each character clearly visible. Useful for dramatic effect or onboarding copy.',
      },
    },
  },
  args: { deleteSpeed: 30, lines: ['S  l  o  w  .  .  .', 'Taking it easy.'], loop: true, speed: 150 },
};

export const NoLoop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With `loop: false` the component types the last line and stops — the cursor keeps blinking but nothing is deleted.',
      },
    },
  },
  args: { lines: ['This types once.', 'Then stops here.'], loop: false, speed: 60 },
};

export const CustomCursor: Story = {
  args: { cursorChar: '▌', lines: ['Custom cursor character.', 'Block cursor style.'], loop: true, speed: 60 },
};

export const LongPause: Story = {
  args: { lines: ['Long pause before next line.', 'Wait for it…', 'There it is!'], loop: true, pauseMs: 3000, speed: 60 },
};

export const WithClassName: Story = {
  args: {
    className: 'text-2xl font-bold text-primary-500',
    lines: ['Frontend Developer', 'Backend Engineer', 'Full Stack Builder'],
    loop: true,
    speed: 80,
  },
};

export const Hero: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typical hero section pattern: static label + dynamic typewriter with a large block cursor for a dramatic effect.',
      },
    },
  },
  render: () => (
    <div className="text-center space-y-2">
      <p className="text-sm text-gray-400 uppercase tracking-widest">I am a</p>
      <div className="text-3xl font-bold">
        <Typewriter
          className="text-primary-500"
          cursorChar="█"
          lines={['React Developer', 'Go Engineer', 'UI/UX Enthusiast', 'Open Source Contributor']}
          loop
          speed={70}
        />
      </div>
    </div>
  ),
};

export const HeroHeadline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Marketing hero headline pattern — three punchy value statements cycle through with a medium speed for readability.',
      },
    },
  },
  render: () => (
    <div className="max-w-xl text-center space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Ship with confidence</p>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight min-h-[3rem]">
        <Typewriter
          cursorChar="|"
          lines={[
            'Build faster.',
            'Ship smarter.',
            'Scale confidently.',
          ]}
          loop
          pauseMs={2000}
          speed={75}
        />
      </h1>
      <p className="text-sm text-gray-500">The component library that gets out of your way.</p>
    </div>
  ),
};

export const MultiLineSequence: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple sentences cycle in sequence, simulating a rotating testimonial or feature highlight. pauseMs is set high so each line is fully readable.',
      },
    },
  },
  render: () => (
    <div className="max-w-sm text-center space-y-2">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Our customers say:</p>
      <blockquote className="text-lg font-semibold italic text-gray-800 dark:text-white min-h-[3.5rem] flex items-center justify-center">
        &ldquo;<Typewriter
          cursorChar="|"
          lines={[
            'We shipped 3× faster after switching.',
            'The design system paid for itself in a week.',
            'Dark mode out of the box — finally.',
            'Our team loves the preset theming.',
          ]}
          loop
          pauseMs={2500}
          speed={55}
        />&rdquo;
      </blockquote>
    </div>
  ),
};

export const SlowTyping: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Speed set to 180ms so individual characters are clearly visible. Great for illustrating the typewriter mechanism in documentation.',
      },
    },
  },
  render: () => (
    <div className="font-mono text-xl text-gray-800 dark:text-white">
      <Typewriter
        cursorChar="_"
        deleteSpeed={50}
        lines={['Slow and deliberate typing...', 'Each character waits its turn.']}
        loop
        speed={180}
      />
    </div>
  ),
};

export const CTAText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CTA copy cycling through urgency variants — loop: false stops after the last line so the final CTA persists.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white min-h-[2.5rem]">
        <Typewriter
          cursorChar="|"
          lines={[
            'Start your free trial today.',
            'No credit card required.',
            'Cancel anytime.',
            'Join 12,000+ happy teams.',
          ]}
          loop
          pauseMs={2000}
          speed={65}
        />
      </div>
      <button
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors"
        type="button"
      >
        Get started free
      </button>
    </div>
  ),
};
