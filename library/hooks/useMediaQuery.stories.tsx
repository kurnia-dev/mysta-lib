import type { Meta, StoryObj } from '@storybook/react';

import { useMediaQuery } from './useMediaQuery';

const meta: Meta = {
  title: 'Hooks/useMediaQuery',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useMediaQuery** evaluates a CSS media query string and returns a live boolean that updates when the viewport or system settings change.

\`\`\`ts
const matches = useMediaQuery(query: string): boolean;
\`\`\`

- Returns \`false\` during SSR (when \`window\` is not available).
- Attaches a \`change\` listener on the \`MediaQueryList\` — no polling, no re-renders on unrelated changes.
- Pass any valid CSS media query: \`(max-width: 768px)\`, \`(prefers-color-scheme: dark)\`, \`(prefers-reduced-motion: reduce)\`, etc.

> **Browser-only:** Requires \`window.matchMedia\`. Resize the Storybook viewport (using the Viewport toolbar) to see breakpoint stories update live.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <div className="text-4xl">{isMobile ? '📱' : '🖥️'}</div>
      <div className="text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
          Query: <code className="font-mono normal-case">(max-width: 768px)</code>
        </p>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
          {isMobile ? 'Mobile viewport' : 'Desktop viewport'}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          matches: <span className={isMobile ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>{String(isMobile)}</span>
        </p>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Resize the Storybook viewport using the toolbar to see this update live.
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Detects whether the viewport is ≤768px wide. Use the Storybook Viewport toolbar to switch between mobile and desktop sizes.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// BreakpointDetector
// ---------------------------------------------------------------------------
const BREAKPOINTS = [
  { label: 'xs', query: '(max-width: 639px)', tailwind: 'default' },
  { label: 'sm', query: '(min-width: 640px)', tailwind: 'sm:' },
  { label: 'md', query: '(min-width: 768px)', tailwind: 'md:' },
  { label: 'lg', query: '(min-width: 1024px)', tailwind: 'lg:' },
  { label: 'xl', query: '(min-width: 1280px)', tailwind: 'xl:' },
  { label: '2xl', query: '(min-width: 1536px)', tailwind: '2xl:' },
] as const;

function BreakpointRow({ label, query, tailwind }: { label: string; query: string; tailwind: string }) {
  const matches = useMediaQuery(query);
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${matches ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700'}`}>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-mono font-bold w-6 text-center ${matches ? 'text-green-700 dark:text-green-400' : 'text-neutral-400'}`}>{label}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{query}</span>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-xs text-neutral-400 dark:text-neutral-500">{tailwind}</code>
        <span className={`w-2 h-2 rounded-full ${matches ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
      </div>
    </div>
  );
}

function BreakpointDetectorDemo() {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[480px]">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Tailwind Breakpoints</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">Active breakpoints are highlighted in green. Resize the Storybook viewport to see them toggle.</p>
      <div className="flex flex-col gap-1.5 mt-1">
        {BREAKPOINTS.map((bp) => (
          <BreakpointRow key={bp.label} {...bp} />
        ))}
      </div>
    </div>
  );
}

export const BreakpointDetector: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All standard Tailwind CSS breakpoints shown with live pass/fail status. Green = currently matching. Use the Viewport toolbar to switch between screen sizes.',
      },
    },
  },
  render: () => <BreakpointDetectorDemo />,
};

// ---------------------------------------------------------------------------
// PrefersDarkMode
// ---------------------------------------------------------------------------
function PrefersDarkModeDemo() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-4xl">{prefersDark ? '🌙' : '☀️'}</div>
      <div className="text-center">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">System color scheme preference</p>
        <p className="text-xl font-bold mt-1 text-neutral-900 dark:text-white">
          {prefersDark ? 'Prefers Dark' : 'Prefers Light'}
        </p>
      </div>
      <div className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
        <code className="text-xs text-neutral-600 dark:text-neutral-400">
          useMediaQuery('(prefers-color-scheme: dark)')
        </code>
        <br />
        <code className="text-xs font-bold text-violet-600 dark:text-violet-400">
          → {String(prefersDark)}
        </code>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Change your OS color scheme in System Settings to see this update.
      </p>
    </div>
  );
}

export const PrefersDarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Reads `(prefers-color-scheme: dark)` from the OS. Change your system appearance settings to see this toggle.',
      },
    },
  },
  render: () => <PrefersDarkModeDemo />,
};

// ---------------------------------------------------------------------------
// PrefersReducedMotion
// ---------------------------------------------------------------------------
function PrefersReducedMotionDemo() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Reduced motion preference</p>
        <p className={`text-xl font-bold mt-1 ${reducedMotion ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
          {reducedMotion ? 'Reduce motion: ON' : 'Animations: allowed'}
        </p>
      </div>

      {/* Demo box that respects the preference */}
      <div className="relative w-48 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={`absolute top-1 left-1 w-10 h-10 rounded-full bg-violet-500 ${reducedMotion ? '' : 'animate-bounce'}`}
          style={{ animationDuration: '0.8s' }}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500 dark:text-neutral-400">
          {reducedMotion ? 'static' : 'bouncing'}
        </span>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        Enable "Reduce motion" in OS Accessibility Settings to stop the animation.
      </p>
    </div>
  );
}

export const PrefersReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The bouncing ball animation stops when `(prefers-reduced-motion: reduce)` is detected. Enable this in your OS accessibility settings to test.',
      },
    },
  },
  render: () => <PrefersReducedMotionDemo />,
};

// ---------------------------------------------------------------------------
// ResponsiveLayout
// ---------------------------------------------------------------------------
function ResponsiveLayoutDemo() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-[500px]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">Responsive layout</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 font-mono">
          {isDesktop ? 'md+' : 'xs/sm'}
        </span>
      </div>

      {isDesktop ? (
        // Desktop: sidebar + content
        <div className="flex gap-4">
          <aside className="w-40 shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 flex flex-col gap-2">
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Navigation</p>
            {['Dashboard', 'Projects', 'Team', 'Settings'].map((item) => (
              <div key={item} className="text-sm text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors">
                {item}
              </div>
            ))}
          </aside>
          <main className="flex-1 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Desktop layout: sidebar + main content area.</p>
          </main>
        </div>
      ) : (
        // Mobile: stacked
        <div className="flex flex-col gap-3">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">☰ Menu</p>
              <span className="text-xs text-neutral-400">tap to expand</span>
            </div>
          </div>
          <main className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Mobile layout: stacked navigation + content.</p>
          </main>
        </div>
      )}

      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4 text-center">
        Resize the Storybook viewport to switch layouts at 768px.
      </p>
    </div>
  );
}

export const ResponsiveLayout: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Conditionally renders a sidebar+content layout (desktop) or a stacked layout (mobile) based on the `(min-width: 768px)` query. Resize the viewport to switch.',
      },
    },
  },
  render: () => <ResponsiveLayoutDemo />,
};
