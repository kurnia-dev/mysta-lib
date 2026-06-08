import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';
import type { UseIntersectionObserverOptions } from './useIntersectionObserver';

const meta: Meta = {
  title: 'Hooks/useIntersectionObserver',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useIntersectionObserver** wraps the browser's \`IntersectionObserver\` API and returns the latest \`IntersectionObserverEntry\` for a given element ref.

\`\`\`ts
const entry = useIntersectionObserver(
  ref: RefObject<Element>,
  options?: UseIntersectionObserverOptions
): IntersectionObserverEntry | undefined;

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean; // default false — if true, stops observing after first intersection
}
\`\`\`

- Returns \`undefined\` before the first observation.
- \`entry.isIntersecting\` is the most commonly used field — \`true\` when the element is in view.
- \`entry.intersectionRatio\` gives the fraction (0–1) of the element currently visible.
- Set \`freezeOnceVisible: true\` for one-shot animations — the observer disconnects after the first appearance, preventing re-animation on scroll back.

**Common use cases:** lazy image loading, animate-on-enter, infinite scroll triggers, viewport-based counters.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// Suppress unused type import warning
type _Options = UseIntersectionObserverOptions;

// ---------------------------------------------------------------------------
// Default — element enters viewport, counter increments
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref);
  const [intersectCount, setIntersectCount] = useState(0);
  const [wasVisible, setWasVisible] = useState(false);

  const isVisible = entry?.isIntersecting ?? false;
  const ratio = entry?.intersectionRatio ?? 0;

  // Track every time it becomes visible
  const prevVisible = useRef(false);
  if (isVisible !== prevVisible.current) {
    prevVisible.current = isVisible;
    if (isVisible) setIntersectCount((c) => c + 1);
  }

  return (
    <div className="flex flex-col gap-4 w-72">
      {/* Stats panel */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Currently visible</span>
          <span className={`text-sm font-bold ${isVisible ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {isVisible ? 'true' : 'false'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Intersection ratio</span>
          <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white">{ratio.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Times entered viewport</span>
          <span className="text-xl font-bold tabular-nums text-violet-600 dark:text-violet-400">{intersectCount}</span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${ratio * 100}%` }} />
        </div>
      </div>

      {/* Scrollable container */}
      <div className="h-40 overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="h-24 flex items-center justify-center text-xs text-neutral-400 dark:text-neutral-500">
          scroll down ↓
        </div>

        <div
          ref={ref}
          className={`mx-4 rounded-xl p-4 text-center transition-all border-2 ${
            isVisible
              ? 'bg-violet-100 dark:bg-violet-900/30 border-violet-400 dark:border-violet-600'
              : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
          }`}
        >
          <div className={`text-2xl mb-1 ${isVisible ? '' : 'opacity-30'}`}>{isVisible ? '👀' : '🙈'}</div>
          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {isVisible ? 'I am visible!' : 'I am hidden'}
          </p>
        </div>

        <div className="h-24 flex items-center justify-center text-xs text-neutral-400 dark:text-neutral-500">
          ↑ scroll up
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Scroll within the box to make the observed element visible. The stats panel updates in real-time: `isIntersecting`, `intersectionRatio`, and a count of how many times it has entered the viewport.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// LazyLoad — image placeholder "loads" when it enters viewport
// ---------------------------------------------------------------------------
interface LazyImageProps {
  src: string;
  alt: string;
  caption: string;
}

function LazyImage({ src, alt, caption }: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isLoaded = entry?.isIntersecting ?? false;

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
      {isLoaded ? (
        <div className="w-full h-32 bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-3xl mb-1">{src}</div>
            <p className="text-xs opacity-80">Loaded: {alt}</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-32 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center animate-pulse">
          <span className="text-2xl opacity-40">🖼️</span>
        </div>
      )}
      <div className="px-3 py-2 bg-white dark:bg-neutral-900">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{caption}</p>
      </div>
    </div>
  );
}

const LAZY_IMAGES = [
  { src: '🏔️', alt: 'Mountain landscape', caption: 'Team offsite — Bandung, Nov 2025' },
  { src: '🌊', alt: 'Ocean view', caption: 'Q3 retrospective venue — Bali, Aug 2025' },
  { src: '🌇', alt: 'City skyline', caption: 'Product launch event — Jakarta, Sep 2025' },
  { src: '🌿', alt: 'Forest path', caption: 'Annual company retreat — Bogor, Oct 2025' },
];

function LazyLoadDemo() {
  return (
    <div className="w-72 h-[420px] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-3 space-y-3">
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mb-2">Scroll down — images load as they enter the viewport</p>
      {LAZY_IMAGES.map((img) => (
        <LazyImage key={img.alt} {...img} />
      ))}
    </div>
  );
}

export const LazyLoad: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Scroll down in the container. Each image placeholder switches to the loaded state when it enters the viewport. `freezeOnceVisible: true` ensures they stay loaded after scrolling away.',
      },
    },
  },
  render: () => <LazyLoadDemo />,
};

// ---------------------------------------------------------------------------
// AnimateOnEnter — element fades in when entering viewport
// ---------------------------------------------------------------------------
interface AnimatedItemProps {
  delay: number;
  title: string;
  description: string;
  icon: string;
}

function AnimatedItem({ delay, title, description, icon }: AnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.2, freezeOnceVisible: true });
  const isVisible = entry?.isIntersecting ?? false;

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: '⚡', title: 'Zero-dependency core', description: 'No runtime dependencies. The library ships only what you install.' },
  { icon: '🎨', title: 'Theme presets', description: 'Switch between kitsune, inari, raijin, sakuragi, yuki, and yurei themes.' },
  { icon: '♿', title: 'Accessible by default', description: 'Built on Radix UI primitives — keyboard navigation and ARIA included.' },
  { icon: '🌙', title: 'Dark mode ready', description: 'Full dark mode support via Tailwind\'s `.dark` class on `<html>`.' },
  { icon: '📦', title: 'Tree-shakeable', description: 'Import only the components you need — unused code is excluded at build time.' },
];

function AnimateOnEnterDemo() {
  return (
    <div className="w-[380px] h-[420px] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-4 space-y-3">
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">Scroll down to see items animate in</p>
      <div className="h-8" />
      {FEATURES.map((feature, i) => (
        <AnimatedItem
          key={feature.title}
          delay={i * 80}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
      <div className="h-4" />
    </div>
  );
}

export const AnimateOnEnter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Scroll down to see each feature card fade and slide up into view. Uses `threshold: 0.2` so the animation starts when 20% of the element is visible. `freezeOnceVisible: true` prevents re-animation.',
      },
    },
  },
  render: () => <AnimateOnEnterDemo />,
};

// ---------------------------------------------------------------------------
// InfiniteScroll — load more trigger at bottom
// ---------------------------------------------------------------------------
function InfiniteScrollDemo() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(() => Array.from({ length: 5 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  const entry = useIntersectionObserver(sentinelRef, { rootMargin: '100px' });
  const isBottom = entry?.isIntersecting ?? false;

  const prevBottom = useRef(false);
  if (isBottom !== prevBottom.current) {
    prevBottom.current = isBottom;
    if (isBottom && !loading && items.length < 20) {
      setLoading(true);
      setTimeout(() => {
        setItems((prev) => [...prev, ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1)]);
        setLoading(false);
      }, 800);
    }
  }

  return (
    <div className="w-72 h-[420px] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 sticky top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Activity Feed</h3>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">{items.length} items loaded</p>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {items.map((n) => (
          <div key={n} className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {String.fromCharCode(65 + (n % 26))}
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Activity #{n}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {new Date(Date.now() - n * 3600000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sentinel element */}
      <div ref={sentinelRef} className="flex items-center justify-center py-4">
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
            <div className="w-3 h-3 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
            Loading more...
          </div>
        ) : items.length >= 20 ? (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">All items loaded</p>
        ) : null}
      </div>
    </div>
  );
}

export const InfiniteScroll: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An activity feed that loads 5 more items each time the bottom sentinel enters the viewport. The sentinel uses `rootMargin: "100px"` to trigger loading slightly before reaching the bottom.',
      },
    },
  },
  render: () => <InfiniteScrollDemo />,
};
