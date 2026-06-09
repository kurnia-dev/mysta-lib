import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { useModelValue } from '../../hooks';

import type { TabMenuItem } from './TabMenu.d';
import { TabMenu } from './TabMenu';

const meta: Meta<typeof TabMenu> = {
  title: 'Preset/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**TabMenu** is a controlled tab navigation component that lets callers switch between labelled sections.
The caller owns the active index via a \`ModelValue\` object (from \`useModelValue\`), making it composable with any state management pattern.
Tabs can optionally display icons and support five visual types: \`pill\`, \`box\`, \`thin-underline\`, \`bold-underline\`, and \`segmented\`. Icons are hidden when \`type="pill"\`.
Use it at the top of a content panel to let users switch between related views — dashboard sections, profile settings tabs, or report categories.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['pill', 'box', 'thin-underline', 'bold-underline', 'segmented'],
      description: 'Visual style variant of the tab bar.',
      table: { defaultValue: { summary: 'pill' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TabMenu>;

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const overviewMenus: TabMenuItem[] = [
  { label: 'Overview' },
  { label: 'Analytics' },
  { label: 'Settings' },
];

const dashboardMenus: TabMenuItem[] = [
  { label: 'Overview' },
  { label: 'Analytics' },
  { label: 'Users' },
  { label: 'Settings' },
];

const profileMenus: TabMenuItem[] = [
  { label: 'Personal Info' },
  { label: 'Security' },
  { label: 'Notifications' },
  { label: 'Billing' },
];

const menusWithIcons: TabMenuItem[] = [
  { icon: 'user', label: 'Profile' },
  { icon: 'check-circle', label: 'Tasks' },
  { icon: 'circle-fill', label: 'Reports' },
  { icon: 'menu', label: 'More' },
];

const manyMenus: TabMenuItem[] = [
  { label: 'Dashboard' },
  { label: 'Transactions' },
  { label: 'Customers' },
  { label: 'Products' },
  { label: 'Analytics' },
  { label: 'Marketing' },
  { label: 'Reports' },
  { label: 'Settings' },
];

// ---------------------------------------------------------------------------
// Helper: renders a controlled TabMenu (hooks cannot be used in args objects)
// ---------------------------------------------------------------------------

type TabMenuType = 'pill' | 'box' | 'thin-underline' | 'bold-underline' | 'segmented';

function ControlledTabMenu({
  type,
  menus,
  initialIndex = 0,
}: {
  type: TabMenuType;
  menus: TabMenuItem[];
  initialIndex?: number;
}) {
  const active = useModelValue<number>(initialIndex);
  return <TabMenu activeIndex={active} menus={menus} type={type} />;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal controlled usage: three tabs, first tab active. The `activeIndex` ModelValue is managed by `useModelValue`.',
      },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="pill" />,
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs with leading icons. Icons are rendered for all types except `pill` — they are intentionally suppressed in pill mode.',
      },
    },
  },
  render: () => {
    const active = useModelValue<number>(0);
    return <TabMenu activeIndex={active} menus={menusWithIcons} type="box" />;
  },
};

export const Pill: Story = {
  parameters: {
    docs: {
      description: { story: '`type="pill"` — rounded pill tabs, the default style.' },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="pill" />,
};

export const Box: Story = {
  parameters: {
    docs: {
      description: { story: '`type="box"` — rectangular tabs with a bounding box.' },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="box" />,
};

export const ThinUnderline: Story = {
  parameters: {
    docs: {
      description: { story: '`type="thin-underline"` — minimal underline style, common in editorial UIs.' },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="thin-underline" />,
};

export const BoldUnderline: Story = {
  parameters: {
    docs: {
      description: { story: '`type="bold-underline"` — thicker underline indicator, high visual weight.' },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="bold-underline" />,
};

export const Segmented: Story = {
  parameters: {
    docs: {
      description: { story: '`type="segmented"` — full-width segmented control, similar to iOS style.' },
    },
  },
  render: () => <ControlledTabMenu menus={overviewMenus} type="segmented" />,
};

export const AllTypes: Story = {
  name: 'AllTypes — Visual Comparison',
  parameters: {
    docs: {
      description: {
        story: 'All five visual type variants rendered side-by-side for easy comparison. Each is independently controlled.',
      },
    },
  },
  render: () => (
    <div className="space-y-8">
      {(['pill', 'box', 'thin-underline', 'bold-underline', 'segmented'] as const).map((type) => (
        <div key={type}>
          <p className="text-xs font-mono text-gray-400 mb-2">type="{type}"</p>
          <ControlledTabMenu menus={overviewMenus} type={type} />
        </div>
      ))}
    </div>
  ),
};

export const ManyTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Eight tabs — validates overflow behaviour on narrower viewports.',
      },
    },
  },
  render: () => <ControlledTabMenu menus={manyMenus} type="pill" />,
};

export const SecondTabActive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-selected to the second tab (index 1) — useful when a deep-link or route initialises a non-first tab.',
      },
    },
  },
  render: () => <ControlledTabMenu menus={dashboardMenus} type="pill" initialIndex={1} />,
};

export const DashboardTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic SaaS dashboard navigation: Overview / Analytics / Users / Settings with bold-underline style.',
      },
    },
  },
  render: () => <ControlledTabMenu menus={dashboardMenus} type="bold-underline" initialIndex={0} />,
};

export const ProfileTabs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typical account settings layout: Personal Info / Security / Notifications / Billing with thin-underline style.',
      },
    },
  },
  render: () => <ControlledTabMenu menus={profileMenus} type="thin-underline" />,
};

export const SegmentedWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Segmented control with icon tabs — icons are rendered because the type is not `pill`.',
      },
    },
  },
  render: () => {
    const active = useModelValue<number>(0);
    return <TabMenu activeIndex={active} menus={menusWithIcons} type="segmented" />;
  },
};

export const InteractiveControlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two-way binding demo: the active tab index is tracked in component state and displayed below. Shows the raw ModelValue pattern.',
      },
    },
  },
  render: () => {
    const [index, setIndex] = useState(0);
    const active = { get: () => index, set: setIndex };
    return (
      <div className="space-y-4">
        <TabMenu activeIndex={active} menus={profileMenus} type="bold-underline" />
        <p className="text-xs text-gray-400">
          Active index: {index} — "{profileMenus[index]?.label}"
        </p>
      </div>
    );
  },
};

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full stateful pattern: tabs control the content panel rendered below them. This is the canonical real-world usage — TabMenu drives visible content.',
      },
    },
  },
  render: () => {
    const active = useModelValue<number>(0);
    const panels = [
      {
        title: 'Overview',
        body: 'Your workspace had 1,842 active sessions this week, up 12% from last week.',
      },
      {
        title: 'Analytics',
        body: 'Top traffic source: organic search (54%). Bounce rate: 32%. Avg. session: 4m 12s.',
      },
      {
        title: 'Users',
        body: '3,241 registered users. 284 new sign-ups this month. 97 users are currently online.',
      },
      {
        title: 'Settings',
        body: 'Configure workspace name, timezone, default language, and notification preferences.',
      },
    ];
    const idx = active.get();
    return (
      <div className="space-y-4 w-full max-w-lg">
        <TabMenu activeIndex={active} menus={dashboardMenus} type="pill" />
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <h2 className="text-sm font-semibold mb-2">{panels[idx].title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{panels[idx].body}</p>
        </div>
      </div>
    );
  },
};
