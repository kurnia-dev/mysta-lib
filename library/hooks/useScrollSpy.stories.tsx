import type { Meta, StoryObj } from '@storybook/react';

import { useScrollSpy } from './useScrollSpy';
import type { ScrollSpyItem, UseScrollSpyOptions } from './useScrollSpy';

const meta: Meta = {
  title: 'Hooks/useScrollSpy',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useScrollSpy** uses \`IntersectionObserver\` to track which section is currently in view and returns its id.

\`\`\`ts
const activeId = useScrollSpy(
  ids: string[],                // array of element ids to observe
  options?: {
    rootMargin?: string;        // default: '-40% 0px -40% 0px'
    threshold?: number;         // default: 0
  }
): string | null
\`\`\`

- Observes each \`document.getElementById(id)\` in the \`ids\` array.
- Returns the \`id\` of the first element that enters the intersection zone.
- The default \`rootMargin\` of \`-40% 0px -40% 0px\` creates a narrow band in the middle of the viewport — the section whose heading crosses this band becomes active.
- Initializes to \`ids[0]\` so the first section is pre-selected before scrolling begins.

**Common use cases:** sticky navigation sidebars, table-of-contents highlights, docs-style section tracking.

> **Note:** Scroll within the demo containers below — the active section updates as you scroll.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// Suppress unused import warning — types are used in JSDoc/parameter annotations
type _ScrollSpyItem = ScrollSpyItem;
type _ScrollSpyOptions = UseScrollSpyOptions;

// ---------------------------------------------------------------------------
// Default — 4 sections, sidebar shows active
// ---------------------------------------------------------------------------
const SECTIONS = [
  { id: 'getting-started', title: 'Getting Started', color: 'bg-violet-100 dark:bg-violet-900/20', icon: '🚀' },
  { id: 'installation', title: 'Installation', color: 'bg-blue-100 dark:bg-blue-900/20', icon: '📦' },
  { id: 'configuration', title: 'Configuration', color: 'bg-emerald-100 dark:bg-emerald-900/20', icon: '⚙️' },
  { id: 'api-reference', title: 'API Reference', color: 'bg-amber-100 dark:bg-amber-900/20', icon: '📚' },
] as const;

function DefaultDemo() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));

  return (
    <div className="flex gap-0 w-[640px] h-[400px] rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900">
      {/* Sidebar nav */}
      <nav className="w-48 shrink-0 border-r border-neutral-200 dark:border-neutral-700 p-4 space-y-1 bg-neutral-50 dark:bg-neutral-900">
        <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">Contents</p>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              activeId === section.id
                ? 'bg-violet-600 text-white font-medium'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <span className="text-base leading-none">{section.icon}</span>
            <span className="truncate">{section.title}</span>
          </a>
        ))}
      </nav>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-0">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className={`${section.color} rounded-xl p-6 mb-4 min-h-[200px] flex flex-col gap-3`}>
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>{section.icon}</span>
              {section.title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              This is the content for the <strong>{section.title}</strong> section. Scroll down to see the sidebar navigation highlight update as each section enters the middle of the viewport.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Scroll within the right panel — the active section in the sidebar updates automatically. The `-40% 0px -40% 0px` root margin means a section activates when its top edge crosses the 40% mark from the viewport edges.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// NavigationHighlight — sticky top nav bar
// ---------------------------------------------------------------------------
const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const;

function NavigationHighlightDemo() {
  const activeId = useScrollSpy(NAV_SECTIONS.map((s) => s.id), { rootMargin: '-20% 0px -70% 0px' });

  return (
    <div className="w-[600px] h-[400px] rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900 flex flex-col">
      {/* Sticky top nav */}
      <nav className="sticky top-0 z-10 flex items-center gap-1 px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        {NAV_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeId === section.id
                ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* Scrollable page content */}
      <div className="flex-1 overflow-y-auto">
        {NAV_SECTIONS.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            className={`px-8 py-10 min-h-[200px] border-b border-neutral-100 dark:border-neutral-800 ${i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-800/50'}`}
          >
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{section.label}</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
              Content for the {section.label} section. Scroll down to see the active nav link update as you move through the page sections.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NavigationHighlight: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Sticky top navigation bar where the active link updates as the user scrolls. Click any nav item to jump to that section. Uses a tighter `rootMargin` of `-20% 0px -70% 0px` to activate earlier.',
      },
    },
  },
  render: () => <NavigationHighlightDemo />,
};

// ---------------------------------------------------------------------------
// TableOfContents — docs-style TOC on the right
// ---------------------------------------------------------------------------
const DOC_SECTIONS = [
  { id: 'toc-intro', title: 'Introduction', description: 'What is mysta-commons and when to use it.' },
  { id: 'toc-install', title: 'Installation', description: 'Adding the library to your project via pnpm, npm, or yarn.' },
  { id: 'toc-provider', title: 'MystaLibProvider', description: 'Wrapping your app with the library context provider.' },
  { id: 'toc-components', title: 'Components', description: 'Overview of available components and their categories.' },
  { id: 'toc-hooks', title: 'Hooks', description: 'Utility hooks included with the library.' },
  { id: 'toc-theming', title: 'Theming & Presets', description: 'Customizing the look and feel using presets.' },
] as const;

function TableOfContentsDemo() {
  const activeId = useScrollSpy(DOC_SECTIONS.map((s) => s.id));

  return (
    <div className="flex gap-6 w-[680px] h-[420px]">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        {DOC_SECTIONS.map((section) => (
          <article key={section.id} id={section.id} className="px-6 py-8 border-b border-neutral-100 dark:border-neutral-800 last:border-0 min-h-[160px]">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{section.title}</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{section.description}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
              Detailed documentation content would appear here. This section expands on the topic with examples, API tables, and code snippets.
            </p>
          </article>
        ))}
      </div>

      {/* Table of contents sidebar */}
      <aside className="w-44 shrink-0">
        <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">On this page</p>
        <nav className="space-y-0.5">
          {DOC_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-all border-l-2 ${
                activeId === section.id
                  ? 'border-violet-600 text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 font-medium'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export const TableOfContents: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Documentation-style table of contents on the right. The active section link gets a violet left border and background highlight. Scroll the main content to see it update.',
      },
    },
  },
  render: () => <TableOfContentsDemo />,
};
