import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { BottomNavigationItem } from './BottomNavigation.d';
import { BottomNavigation } from './BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Preset/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**BottomNavigation** is a fixed bottom navigation bar designed for mobile-first applications.
It renders 3–5 icon+label tab items and highlights the currently active one via \`activePath\`.
Call \`onNavigate\` to update the active path in the parent — the component is fully controlled.
Items optionally show a numeric badge (e.g. unread message count); values above 99 are capped at "99+".
Follow the mobile UX convention of 3–5 items: fewer makes it redundant, more than 5 causes crowding.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BottomNavigation>;

// ---------------------------------------------------------------------------
// Shared page wrapper to simulate a mobile screen
// ---------------------------------------------------------------------------

function MobilePage({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="relative h-72 w-full bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {label && (
        <p className="absolute top-4 left-4 text-xs text-gray-400">{label}</p>
      )}
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared item sets
// ---------------------------------------------------------------------------

const appNavItems: BottomNavigationItem[] = [
  { id: 'home', icon: 'check-circle', label: 'Home', path: '/' },
  { id: 'explore', icon: 'search', label: 'Explore', path: '/explore' },
  { id: 'notifications', icon: 'circle-fill', label: 'Alerts', path: '/alerts' },
  { id: 'profile', icon: 'user', label: 'Profile', path: '/profile' },
];

const ecomNavItems: BottomNavigationItem[] = [
  { id: 'home', icon: 'check-circle', label: 'Home', path: '/' },
  { id: 'shop', icon: 'menu', label: 'Shop', path: '/shop' },
  { id: 'cart', icon: 'circle-fill', label: 'Cart', path: '/cart', badge: 3 },
  { id: 'wishlist', icon: 'x', label: 'Wishlist', path: '/wishlist' },
  { id: 'account', icon: 'user', label: 'Account', path: '/account' },
];

const threeItems: BottomNavigationItem[] = [
  { id: 'home', icon: 'check-circle', label: 'Home', path: '/' },
  { id: 'search', icon: 'search', label: 'Search', path: '/search' },
  { id: 'profile', icon: 'user', label: 'Profile', path: '/profile' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four navigation items, Home active. Click any item to switch the active path.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label={`Active: ${active}`}>
        <BottomNavigation activePath={active} items={appNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const WithBadges: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge counts on navigation items — typically used for unread notifications or cart item count.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    const badgedItems: BottomNavigationItem[] = [
      { id: 'home', icon: 'check-circle', label: 'Home', path: '/' },
      { id: 'explore', icon: 'search', label: 'Explore', path: '/explore' },
      { id: 'notifications', icon: 'circle-fill', label: 'Alerts', path: '/alerts', badge: 8 },
      { id: 'messages', icon: 'menu', label: 'Messages', path: '/messages', badge: 24 },
      { id: 'profile', icon: 'user', label: 'Profile', path: '/profile' },
    ];
    return (
      <MobilePage label="With badge counts">
        <BottomNavigation activePath={active} items={badgedItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const ThreeItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimum recommended density: 3 items. Each item gets more horizontal space.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label="3 items">
        <BottomNavigation activePath={active} items={threeItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const FourItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four items — the most common mobile navigation pattern.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label="4 items">
        <BottomNavigation activePath={active} items={appNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const FiveItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Five items — the maximum recommended count before tap targets become too small.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label="5 items">
        <BottomNavigation activePath={active} items={ecomNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled navigation: active path is tracked in state and displayed as a simulated page title, mimicking a router.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    const pageLabels: Record<string, string> = {
      '/': 'Home — Welcome back, Priya!',
      '/explore': 'Explore — Discover new content',
      '/alerts': 'Alerts — 8 unread notifications',
      '/profile': 'Profile — Priya Bagus Amanullah',
    };
    return (
      <MobilePage>
        <div className="p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {pageLabels[active] ?? active}
          </p>
        </div>
        <BottomNavigation activePath={active} items={appNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const AppNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic mobile social/productivity app: Home / Explore / Alerts / Profile.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label="Social app navigation">
        <BottomNavigation activePath={active} items={appNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const EcommerceNav: Story = {
  parameters: {
    docs: {
      description: {
        story: 'E-commerce app navigation: Home / Shop / Cart (with badge) / Wishlist / Account.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    return (
      <MobilePage label="E-commerce navigation">
        <BottomNavigation activePath={active} items={ecomNavItems} onNavigate={setActive} />
      </MobilePage>
    );
  },
};

export const HighBadgeCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge count exceeding 99 — the component renders "99+" to avoid overflow.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('/');
    const items: BottomNavigationItem[] = [
      { id: 'home', icon: 'check-circle', label: 'Home', path: '/' },
      { id: 'messages', icon: 'circle-fill', label: 'Messages', path: '/messages', badge: 142 },
      { id: 'profile', icon: 'user', label: 'Profile', path: '/profile' },
    ];
    return (
      <MobilePage label="Badge > 99 → shows 99+">
        <BottomNavigation activePath={active} items={items} onNavigate={setActive} />
      </MobilePage>
    );
  },
};
