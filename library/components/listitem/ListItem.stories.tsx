import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Preset/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**ListItem** is a flexible row component for building lists, menus, navigation sidebars, and user tables.
It supports a leading icon or avatar image, a primary + optional secondary text block, and a trailing slot that accepts custom content or an icon.
Setting \`clickable\` renders the item as a \`<button>\` element with hover styles and an \`onClick\` handler.
The \`selected\` prop highlights the active item, and \`disabled\` prevents interaction.
Use \`divider={false}\` to suppress the bottom border on the last item in a group.
        `,
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Color severity applied to the leading icon.',
      table: { defaultValue: { summary: 'secondary' } },
    },
    icon: {
      control: 'select',
      options: ['user', 'check-circle', 'x', 'circle-fill', 'chevron-right', 'menu', 'search', 'plus'],
      description: 'Leading icon name.',
    },
    trailingIcon: {
      control: 'select',
      options: ['chevron-right', 'x', 'check-circle', 'menu'],
      description: 'Trailing icon name.',
    },
    clickable: {
      control: 'boolean',
      description: 'Renders the item as a button with hover/focus styles.',
      table: { defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Applies the active/selected highlight.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables clicks and applies reduced opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    divider: {
      control: 'boolean',
      description: 'Shows a bottom border below the item.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ListItem>;

// ---------------------------------------------------------------------------
// Simple args stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Minimal usage: primary text and supporting secondary text, no icon.' },
    },
  },
  args: { primary: 'Unread messages', secondary: '12 new since yesterday' },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: { story: 'Leading icon in secondary severity (the default).' },
    },
  },
  args: {
    icon: 'user',
    primary: 'User profile',
    secondary: 'Manage your account settings',
  },
};

export const WithAvatar: Story = {
  parameters: {
    docs: {
      description: { story: 'Leading avatar image — pass a URL to `avatar`. Icon and avatar are mutually exclusive; `avatar` takes precedence.' },
    },
  },
  args: {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    primary: 'Alice Johnson',
    secondary: 'alice.johnson@example.com',
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: { story: '`selected` highlights the active item — used together with `clickable` in navigation menus.' },
    },
  },
  args: {
    icon: 'check-circle',
    primary: 'Dashboard',
    secondary: 'Currently active',
    selected: true,
    clickable: true,
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: { story: '`clickable` renders the row as a `<button>` with hover/focus styles and a trailing chevron.' },
    },
  },
  args: {
    clickable: true,
    icon: 'circle-fill',
    primary: 'Navigate to order details',
    secondary: 'Tap to open',
    trailingIcon: 'chevron-right',
    onClick: () => {},
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: '`disabled` prevents interaction and applies reduced opacity — clicks are silently ignored.' },
    },
  },
  args: {
    clickable: true,
    disabled: true,
    icon: 'x',
    primary: 'Delete account',
    secondary: 'Contact support to proceed',
  },
};

export const NoDivider: Story = {
  parameters: {
    docs: {
      description: { story: '`divider={false}` removes the bottom border — use on the last item in a group.' },
    },
  },
  args: {
    divider: false,
    primary: 'Last item in group',
    secondary: 'divider={false} removes the bottom border',
  },
};

export const WithTrailing: Story = {
  parameters: {
    docs: {
      description: { story: 'Custom trailing content — here a red badge count. Use any ReactNode in the `trailing` slot.' },
    },
  },
  args: {
    primary: 'Unread messages',
    secondary: '12 new since yesterday',
    trailing: (
      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">12</span>
    ),
  },
};

export const WithTrailingIcon: Story = {
  parameters: {
    docs: {
      description: { story: '`trailingIcon` renders a named icon in the trailing slot without custom JSX.' },
    },
  },
  args: {
    icon: 'check-circle',
    primary: 'Next step',
    secondary: 'Continue to confirmation',
    trailingIcon: 'chevron-right',
  },
};

export const AllSeverities: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six severity color variants applied to the leading icon.',
      },
    },
  },
  render: () => (
    <div className="w-80 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <ListItem
          key={s}
          icon="circle-fill"
          primary={s.charAt(0).toUpperCase() + s.slice(1)}
          secondary={`severity="${s}"`}
          severity={s}
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Composition stories
// ---------------------------------------------------------------------------

export const NavigationList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar navigation: clickable items with icon + label + active state. Click items to toggle selection.',
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('dashboard');
    const navItems = [
      { id: 'dashboard', icon: 'check-circle' as const, label: 'Dashboard', desc: 'Overview and metrics' },
      { id: 'users', icon: 'user' as const, label: 'Users', desc: 'Manage team members' },
      { id: 'reports', icon: 'circle-fill' as const, label: 'Reports', desc: 'Analytics and exports' },
      { id: 'settings', icon: 'menu' as const, label: 'Settings', desc: 'Workspace configuration' },
      { id: 'help', icon: 'x' as const, label: 'Help & Support', desc: 'Documentation and FAQs' },
    ];
    return (
      <div className="w-72 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {navItems.map((item, i) => (
          <ListItem
            key={item.id}
            clickable
            divider={i < navItems.length - 1}
            icon={item.icon}
            primary={item.label}
            secondary={item.desc}
            selected={active === item.id}
            trailingIcon={active === item.id ? 'chevron-right' : undefined}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>
    );
  },
};

export const UserList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Team member list: avatar + full name + email, with a trailing action icon.',
      },
    },
  },
  render: () => {
    const users = [
      { id: 'alice', name: 'Alice Johnson', email: 'alice.johnson@acme.com' },
      { id: 'bob', name: 'Bob Martinez', email: 'bob.martinez@acme.com' },
      { id: 'carol', name: 'Carol Chen', email: 'carol.chen@acme.com' },
      { id: 'dan', name: 'Dan Whitfield', email: 'dan.whitfield@acme.com' },
      { id: 'eve', name: 'Eve Nakamura', email: 'eve.nakamura@acme.com' },
    ];
    return (
      <div className="w-80 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {users.map((user, i) => (
          <ListItem
            key={user.id}
            clickable
            avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
            divider={i < users.length - 1}
            primary={user.name}
            secondary={user.email}
            trailingIcon="chevron-right"
            onClick={() => {}}
          />
        ))}
      </div>
    );
  },
};

export const SettingsList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Settings rows with trailing toggle switches — a common mobile settings pattern.',
      },
    },
  },
  render: () => {
    const [states, setStates] = useState<Record<string, boolean>>({
      notifications: true,
      darkMode: false,
      analytics: true,
      marketing: false,
    });

    const settings = [
      { id: 'notifications', icon: 'check-circle' as const, label: 'Push Notifications', desc: 'Receive alerts when important events occur' },
      { id: 'darkMode', icon: 'circle-fill' as const, label: 'Dark Mode', desc: 'Use dark colour scheme' },
      { id: 'analytics', icon: 'menu' as const, label: 'Usage Analytics', desc: 'Help us improve the product' },
      { id: 'marketing', icon: 'x' as const, label: 'Marketing Emails', desc: 'Receive product news and updates' },
    ];

    return (
      <div className="w-80 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {settings.map((s, i) => (
          <ListItem
            key={s.id}
            clickable
            divider={i < settings.length - 1}
            icon={s.icon}
            primary={s.label}
            secondary={s.desc}
            trailing={
              <button
                aria-label={`Toggle ${s.label}`}
                className={`w-9 h-5 rounded-full transition-colors relative ${states[s.id] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                type="button"
                onClick={() => setStates((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${states[s.id] ? 'translate-x-4' : ''}`}
                />
              </button>
            }
            onClick={() => setStates((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
          />
        ))}
      </div>
    );
  },
};

export const NotificationList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Notification feed: each item shows an icon, message text, and timestamp in the trailing slot.',
      },
    },
  },
  render: () => {
    const notifications = [
      { id: 'n1', icon: 'check-circle' as const, title: 'Build succeeded', body: 'v2.4.1 deployed to production', time: '2 min ago', severity: 'success' as const },
      { id: 'n2', icon: 'x' as const, title: 'Payment failed', body: 'Stripe charge for Team Pro declined', time: '14 min ago', severity: 'danger' as const },
      { id: 'n3', icon: 'user' as const, title: 'New team member', body: 'Bob Martinez joined the workspace', time: '1 hr ago', severity: 'info' as const },
      { id: 'n4', icon: 'circle-fill' as const, title: 'Storage 90% full', body: 'Upgrade your plan to continue', time: '3 hr ago', severity: 'warning' as const },
    ];

    return (
      <div className="w-96 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {notifications.map((n, i) => (
          <ListItem
            key={n.id}
            clickable
            divider={i < notifications.length - 1}
            icon={n.icon}
            primary={n.title}
            secondary={n.body}
            severity={n.severity}
            trailing={
              <span className="text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
            }
            onClick={() => {}}
          />
        ))}
      </div>
    );
  },
};

export const MenuItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown-style action menu: clickable items with icons, the last item uses danger severity for a destructive action.',
      },
    },
  },
  render: () => (
    <div className="w-56 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
      <ListItem clickable icon="user" primary="View Profile" onClick={() => {}} />
      <ListItem clickable icon="menu" primary="Account Settings" onClick={() => {}} />
      <ListItem clickable icon="check-circle" primary="Invite Team Member" onClick={() => {}} />
      <ListItem clickable divider={false} icon="x" primary="Sign Out" severity="danger" onClick={() => {}} />
    </div>
  ),
};
