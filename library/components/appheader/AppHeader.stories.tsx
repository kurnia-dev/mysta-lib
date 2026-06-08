import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { AppHeaderAction } from './AppHeader.d';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Preset/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**AppHeader** is a top-of-screen navigation header for mobile and desktop applications.
It renders a title (with optional subtitle), an optional back button, and an array of icon action buttons on the right side.
Action buttons support an optional \`badge\` count — values above 99 are clamped to "99+".
Pass \`transparent\` to render without a background (useful over hero images or translucent surfaces).
Use the \`children\` slot to replace the title/subtitle with custom content such as a search bar or breadcrumbs.
        `,
      },
    },
  },
  argTypes: {
    transparent: {
      control: 'boolean',
      description: 'Removes the background, making the header translucent.',
      table: { defaultValue: { summary: 'false' } },
    },
    showBackButton: {
      control: 'boolean',
      description: 'Shows a chevron-left back button on the leading edge.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AppHeader>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Minimal header: title only, no back button, no actions.' },
    },
  },
  args: { title: 'My App' },
};

export const WithSubtitle: Story = {
  parameters: {
    docs: {
      description: { story: 'Title with a subtitle line for additional page context.' },
    },
  },
  args: { subtitle: 'Dashboard overview', title: 'Analytics' },
};

export const WithBack: Story = {
  parameters: {
    docs: {
      description: { story: 'Back button enabled — clicking it calls `onBack`. Used on detail or nested screens.' },
    },
  },
  args: { showBackButton: true, title: 'Order Details', onBack: () => {} },
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: { story: 'Three action buttons in the trailing position: Search, Notifications (with badge), and Account.' },
    },
  },
  args: {
    title: 'Workspace Pro',
    actions: [
      { id: 'search', icon: 'search', label: 'Search', onClick: () => {} },
      { id: 'notifications', icon: 'check-circle', label: 'Notifications', badge: 5, onClick: () => {} },
      { id: 'user', icon: 'user', label: 'Account', onClick: () => {} },
    ],
  },
};

export const MinimalHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Just the title — the simplest possible header, ideal for inner pages with no navigation needs.',
      },
    },
  },
  args: {
    title: 'Notifications',
  },
};

export const WithNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Header with back button and subtitle — typical for a detail page navigated from a list.',
      },
    },
  },
  args: {
    showBackButton: true,
    title: 'User Profile',
    subtitle: 'Personal information',
    onBack: () => {},
  },
};

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Search icon in the action bar — tapping it would open a search overlay or expand a search input.',
      },
    },
  },
  args: {
    title: 'Products',
    subtitle: '1,284 items',
    actions: [
      { id: 'search', icon: 'search', label: 'Search products', onClick: () => {} },
      { id: 'filter', icon: 'menu', label: 'Filter', onClick: () => {} },
    ],
  },
};

export const WithNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Notification bell with a badge count of 12. Badge values above 99 are capped at "99+".',
      },
    },
  },
  args: {
    title: 'Inbox',
    actions: [
      { id: 'notifications', icon: 'check-circle', label: 'Notifications', badge: 12, onClick: () => {} },
    ],
  },
};

export const WithHighBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge count exceeds 99 — the component renders "99+" to avoid layout overflow.',
      },
    },
  },
  args: {
    title: 'Messages',
    actions: [
      { id: 'messages', icon: 'circle-fill', label: 'Messages', badge: 142, onClick: () => {} },
    ],
  },
};

export const WithUserMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User avatar action button in the trailing position — clicking it would open a profile/logout dropdown.',
      },
    },
  },
  args: {
    title: 'Workspace Pro',
    subtitle: 'Marketing team',
    actions: [
      { id: 'user', icon: 'user', label: 'Priya Bagus', onClick: () => {} },
    ],
  },
};

export const Transparent: Story = {
  parameters: {
    docs: {
      description: {
        story: '`transparent` mode — the header has no background, suitable for rendering over hero images or coloured surfaces.',
      },
    },
  },
  render: () => (
    <div
      className="relative h-48"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <AppHeader
        transparent
        actions={[
          { id: 'menu', icon: 'menu', label: 'Menu', onClick: () => {} },
        ]}
        title="Discover"
      />
    </div>
  ),
};

export const FullFeaturedHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic SaaS app header: title + subtitle + search + notification bell with badge (click to clear) + user profile button — all composed together.',
      },
    },
  },
  render: () => {
    const [notifCount, setNotifCount] = useState(7);

    const actions: AppHeaderAction[] = [
      {
        id: 'search',
        icon: 'search',
        label: 'Search',
        onClick: () => {},
      },
      {
        id: 'notifications',
        icon: 'check-circle',
        label: 'Notifications',
        badge: notifCount,
        onClick: () => setNotifCount(0),
      },
      {
        id: 'user',
        icon: 'user',
        label: 'Priya Bagus',
        onClick: () => {},
      },
    ];

    return (
      <div className="space-y-4">
        <AppHeader
          actions={actions}
          subtitle="Marketing workspace"
          title="Workspace Pro"
        />
        {notifCount > 0 && (
          <p className="text-xs text-gray-400 px-4">
            Click the notification bell to clear the badge count.
          </p>
        )}
      </div>
    );
  },
};

export const WithCustomContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `children` slot replaces the title/subtitle area with custom content — here a styled search input.',
      },
    },
  },
  render: () => (
    <AppHeader
      actions={[
        { id: 'notifications', icon: 'check-circle', label: 'Notifications', badge: 3, onClick: () => {} },
        { id: 'user', icon: 'user', label: 'Account', onClick: () => {} },
      ]}
      title="Search"
    >
      <div className="flex items-center gap-2 flex-1 max-w-xs bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          placeholder="Search…"
        />
      </div>
    </AppHeader>
  ),
};
