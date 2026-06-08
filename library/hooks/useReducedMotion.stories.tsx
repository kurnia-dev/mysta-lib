import type { Meta, StoryObj } from '@storybook/react';

import { useReducedMotion } from './useReducedMotion';

const meta: Meta = {
  title: 'Hooks/useReducedMotion',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useReducedMotion** returns \`true\` when the user's OS has "Reduce motion" enabled in accessibility settings. It is a thin wrapper around \`useMediaQuery('(prefers-reduced-motion: reduce)')\`.

\`\`\`ts
const prefersReducedMotion = useReducedMotion(): boolean
\`\`\`

- Returns \`true\` when \`(prefers-reduced-motion: reduce)\` matches.
- Returns \`false\` when no preference is set or when \`no-preference\` is set.
- Updates reactively — if the user changes their OS setting while the page is open, the component re-renders immediately.
- Use this to disable or simplify animations for users who have opted out of motion effects.

**How to test:**
- macOS: System Settings → Accessibility → Display → Reduce Motion
- Windows: Settings → Accessibility → Visual effects → Animation effects (off)
- iOS: Settings → Accessibility → Motion → Reduce Motion
- Android: Settings → Accessibility → Remove animations

> **Note:** \`useReducedMotion\` delegates to \`useMediaQuery\` — see that hook for SSR and browser compatibility notes.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default — shows current preference
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
          prefers-reduced-motion
        </p>
        <div className={`text-6xl mb-3 ${reduceMotion ? '' : 'animate-bounce'}`}>
          {reduceMotion ? '🧘' : '🎢'}
        </div>
        <p className={`text-2xl font-bold ${reduceMotion ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
          {reduceMotion ? 'reduce' : 'no-preference'}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          useReducedMotion() → <code className="font-mono font-bold">{String(reduceMotion)}</code>
        </p>
      </div>

      <div className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        useMediaQuery('(prefers-reduced-motion: reduce)')
        <br />
        <span className="text-violet-600 dark:text-violet-400">→ {String(reduceMotion)}</span>
      </div>

      <div className={`w-full rounded-lg border p-3 text-xs ${
        reduceMotion
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
          : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
      }`}>
        {reduceMotion
          ? 'Reduced motion is preferred. Use simplified transitions (fade only, no slide/bounce/spin).'
          : 'No motion preference. Full animations are allowed.'
        }
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Enable "Reduce motion" in OS Accessibility settings to change this value.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the current `prefers-reduced-motion` preference. The emoji bounces when motion is allowed. Enable "Reduce motion" in your OS accessibility settings to set it to `true`.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// ConditionalAnimation — animated element respects the preference
// ---------------------------------------------------------------------------
function ConditionalAnimationDemo() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-5 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Notification badge</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          reduceMotion
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
        }`}>
          {reduceMotion ? 'reduced motion' : 'animated'}
        </span>
      </div>

      {/* Pulsing notification bell */}
      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center text-3xl">
            🔔
          </div>
          {/* Badge */}
          <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold ${
            reduceMotion ? '' : 'animate-ping'
          }`}>
            {!reduceMotion && ''}
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            3
          </div>
        </div>
      </div>

      {/* Loading spinner */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <div className={`w-8 h-8 rounded-full border-[3px] border-violet-200 dark:border-violet-800 border-t-violet-600 dark:border-t-violet-400 ${
          reduceMotion ? 'opacity-40' : 'animate-spin'
        }`} />
        <div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {reduceMotion ? 'Spinner static' : 'Spinner spinning'}
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {reduceMotion ? 'animate-spin disabled' : 'animate-spin active'}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
          <span>Upload progress</span>
          <span>68%</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-violet-600 rounded-full ${
              reduceMotion ? '' : 'transition-all duration-1000 ease-out'
            }`}
            style={{ width: '68%' }}
          />
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
          Transition: {reduceMotion ? 'none (static)' : '1000ms ease-out'}
        </p>
      </div>

      <div className={`rounded-lg border p-3 text-xs ${
        reduceMotion
          ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
      }`}>
        {reduceMotion
          ? 'Animations removed: no ping, no spin, no transition. Content is still visible.'
          : 'Animations active: ping badge, spinning loader, smooth progress bar.'
        }
      </div>
    </div>
  );
}

export const ConditionalAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows three animated elements (notification ping, spinner, progress bar) that adapt to the reduced-motion preference. Enable "Reduce motion" in OS settings to see all animations disabled.',
      },
    },
  },
  render: () => <ConditionalAnimationDemo />,
};

// ---------------------------------------------------------------------------
// MotionSafeTransitions — CSS animation classes toggled by the hook
// ---------------------------------------------------------------------------
function MotionSafeTransitionsDemo() {
  const reduceMotion = useReducedMotion();

  const EXAMPLES = [
    {
      label: 'Slide in',
      animated: 'translate-x-0 opacity-100 transition-all duration-500 ease-out',
      reduced: 'opacity-100',
      content: 'Sidebar panel slides in from the left',
    },
    {
      label: 'Scale up',
      animated: 'scale-100 opacity-100 transition-all duration-300 ease-spring',
      reduced: 'opacity-100',
      content: 'Dialog scales up from center',
    },
    {
      label: 'Fade in',
      animated: 'opacity-100 transition-opacity duration-200',
      reduced: 'opacity-100',
      content: 'Tooltip fades in (fade is motion-safe)',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[420px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Motion-safe transitions</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          reduceMotion
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
        }`}>
          {reduceMotion ? 'Reduced' : 'Full animations'}
        </span>
      </div>

      <div className="space-y-3">
        {EXAMPLES.map((ex) => (
          <div key={ex.label} className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{ex.label}</span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">{reduceMotion ? 'simplified' : 'full'}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">{ex.content}</p>
              <div className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 rounded-md p-2 text-neutral-600 dark:text-neutral-400 break-all">
                className=<span className="text-violet-600 dark:text-violet-400">"{reduceMotion ? ex.reduced : ex.animated}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        The class applied changes based on the OS preference detected by the hook.
      </p>
    </div>
  );
}

export const MotionSafeTransitions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows how to conditionally apply different CSS class strings based on the reduced-motion preference. Fade-only transitions are generally considered motion-safe.',
      },
    },
  },
  render: () => <MotionSafeTransitionsDemo />,
};
