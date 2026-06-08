import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PullToRefresh } from './PullToRefresh';

const meta: Meta<typeof PullToRefresh> = {
  title: 'Preset/PullToRefresh',
  component: PullToRefresh,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**PullToRefresh** wraps any scrollable content and triggers an \`onRefresh\` callback when the user pulls the content past a configurable distance threshold. It is a **touch-gesture component** — desktop mouse dragging does NOT trigger the refresh indicator. Test on a real mobile device or with browser DevTools in mobile emulation mode.

The \`onRefresh\` prop must return a \`Promise<void>\`; PullToRefresh shows a spinner while the promise is pending and hides it on settlement. Set \`disabled={true}\` to prevent any pull interaction — useful while another async operation is in progress.

Adjust \`threshold\` (default \`80\` px) to make the gesture more or less sensitive to the pull distance.
        `,
      },
    },
  },
  argTypes: {
    threshold: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: 'Pull distance in px before the refresh is triggered.',
      table: { defaultValue: { summary: '80' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables pull-to-refresh entirely when true.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PullToRefresh>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface NewsItem {
  id: number;
  headline: string;
  source: string;
  timestamp: string;
  category: string;
}

const INITIAL_FEED: NewsItem[] = [
  { id: 1, headline: 'Central bank holds interest rate steady at 5.25% amid inflation data', source: 'Financial Times', timestamp: '2 min ago', category: 'Economy' },
  { id: 2, headline: 'New renewable energy legislation passes with bipartisan support', source: 'Reuters', timestamp: '18 min ago', category: 'Policy' },
  { id: 3, headline: 'Southeast Asian startup raises $120 M Series B for logistics platform', source: 'TechCrunch', timestamp: '34 min ago', category: 'Startup' },
  { id: 4, headline: 'Global chip shortage easing as Taiwan fabs ramp Q3 output', source: 'Nikkei Asia', timestamp: '1 hr ago', category: 'Technology' },
  { id: 5, headline: 'Quarterly earnings: cloud division surpasses analyst expectations', source: 'Bloomberg', timestamp: '2 hr ago', category: 'Markets' },
];

const REFRESHED_ITEMS: NewsItem[] = [
  { id: 0, headline: 'Breaking: Major trade agreement signed between Pacific economies', source: 'AP News', timestamp: 'Just now', category: 'Trade' },
  ...INITIAL_FEED,
];

function FeedCard({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
          {item.category}
        </span>
        <span className="text-[0.65rem] text-gray-400">{item.timestamp}</span>
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{item.headline}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{item.source}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Default — realistic scrollable feed, touch-only note
// ---------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wraps a realistic news feed list. On a touch device or mobile emulator, pull the list downward past the 80 px threshold to trigger the refresh spinner (1.5 s simulated delay). Desktop mouse drag does not trigger this gesture.',
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<NewsItem[]>(INITIAL_FEED);
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefresh = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setItems(refreshCount === 0 ? REFRESHED_ITEMS : INITIAL_FEED);
          setRefreshCount((c) => c + 1);
          resolve();
        }, 1500);
      });

    return (
      <div className="h-screen overflow-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="max-w-lg mx-auto">
            <div className="px-4 pt-4 pb-2">
              <h1 className="text-base font-semibold text-gray-900 dark:text-white">Latest News</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Pull down to refresh (touch / mobile emulation only)
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mx-4">
              {items.map((item) => <FeedCard key={item.id} item={item} />)}
            </div>
            <p className="text-center text-xs text-gray-300 dark:text-gray-600 py-6">
              You&apos;ve reached the end
            </p>
          </div>
        </PullToRefresh>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// WithCustomThreshold — low vs high threshold comparison
// ---------------------------------------------------------------------------
export const WithCustomThreshold: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Threshold controls how far the user must pull before the refresh triggers. A lower value (40 px) is more sensitive; a higher value (160 px) requires a deliberate pull. Adjust with the Controls slider.',
      },
    },
  },
  args: {
    threshold: 40,
  },
  render: (args) => (
    <div className="h-screen overflow-auto">
      <PullToRefresh
        {...args}
        onRefresh={() => new Promise<void>((r) => setTimeout(r, 1000))}
      >
        <div className="max-w-lg mx-auto p-4 space-y-3">
          <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg p-3 text-sm text-info-700 dark:text-info-300">
            Current threshold: <strong>{args.threshold ?? 40} px</strong>. Pull down in mobile emulation to test.
          </div>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center px-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 shrink-0" />
              <div className="space-y-1.5">
                <div className="h-2.5 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </PullToRefresh>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — pull interaction turned off
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `disabled={true}` the pull gesture is completely ignored. Use this when another asynchronous operation is in flight and a concurrent refresh would cause data inconsistency.',
      },
    },
  },
  render: () => (
    <div className="h-screen overflow-auto">
      <PullToRefresh
        disabled
        onRefresh={() => new Promise<void>((r) => setTimeout(r, 1000))}
      >
        <div className="max-w-lg mx-auto p-4 space-y-3">
          <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-3 text-sm text-warning-700 dark:text-warning-300">
            Pull-to-refresh is disabled. The gesture will not respond even on a touch device.
          </div>
          {INITIAL_FEED.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </PullToRefresh>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// SlowRefresh — 3-second promise to observe the loading spinner
// ---------------------------------------------------------------------------
export const SlowRefresh: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The spinner stays visible for the entire duration of the returned promise. This 3-second delay simulates a slow network request so you can observe the loading state fully on a touch device.',
      },
    },
  },
  render: () => (
    <div className="h-screen overflow-auto">
      <PullToRefresh onRefresh={() => new Promise<void>((r) => setTimeout(r, 3000))}>
        <div className="max-w-lg mx-auto p-4 space-y-3">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
            Pull down on a touch device. The spinner will stay for <strong>3 seconds</strong> before the content refreshes.
          </div>
          {INITIAL_FEED.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </PullToRefresh>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithErrorRecovery — onRefresh rejects; error handled in callback
// ---------------------------------------------------------------------------
export const WithErrorRecovery: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'If `onRefresh` returns a rejecting promise, PullToRefresh itself does not show an error — the caller is responsible. Catch the rejection in the callback and update local state to display a contextual message to the user.',
      },
    },
  },
  render: () => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [attemptCount, setAttemptCount] = useState(0);

    const handleRefresh = () =>
      new Promise<void>((_, reject) => {
        setTimeout(() => {
          setAttemptCount((c) => c + 1);
          reject(new Error('Network request failed: ERR_CONNECTION_REFUSED'));
        }, 2000);
      }).catch((err: Error) => {
        setErrorMsg(err.message);
      });

    return (
      <div className="h-screen overflow-auto">
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="max-w-lg mx-auto p-4 space-y-3">
            {errorMsg ? (
              <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-3">
                <p className="text-sm font-medium text-danger-700 dark:text-danger-300">Refresh failed</p>
                <p className="text-xs text-danger-600 dark:text-danger-400 mt-0.5">{errorMsg}</p>
                <button
                  className="mt-2 text-xs text-danger-600 dark:text-danger-400 underline"
                  onClick={() => setErrorMsg(null)}
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                Pull down to trigger a failing refresh (2 s delay). Attempt count: <strong>{attemptCount}</strong>
              </div>
            )}
            {INITIAL_FEED.map((item) => <FeedCard key={item.id} item={item} />)}
          </div>
        </PullToRefresh>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// RealWorldFeed — full news feed experience with stateful refresh
// ---------------------------------------------------------------------------
export const RealWorldFeed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A complete news-feed experience: pull to prepend the latest article at the top, with a "last refreshed" timestamp. The category filter row demonstrates that inner content can still scroll horizontally without interfering with vertical pull.',
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<NewsItem[]>(INITIAL_FEED);
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const categories = ['All', 'Economy', 'Technology', 'Startup', 'Markets', 'Policy', 'Trade'];

    const handleRefresh = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setItems(REFRESHED_ITEMS);
          setLastRefreshed(new Date());
          resolve();
        }, 1800);
      });

    const filteredItems =
      activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

    return (
      <div className="h-screen overflow-auto bg-gray-50 dark:bg-gray-950">
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 px-4 pt-4 pb-3">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold text-gray-900 dark:text-white">Top Stories</h1>
                {lastRefreshed && (
                  <span className="text-xs text-gray-400">
                    Updated {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              {/* Category filter */}
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`shrink-0 text-xs px-3 py-1 rounded-full border transition-colors ${
                      activeCategory === cat
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Feed */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => <FeedCard key={item.id} item={item} />)
              ) : (
                <p className="text-sm text-gray-400 text-center py-12">No stories in this category yet.</p>
              )}
            </div>

            <p className="text-center text-xs text-gray-300 dark:text-gray-600 py-8">
              Pull from top to load newer stories (touch only)
            </p>
          </div>
        </PullToRefresh>
      </div>
    );
  },
};
