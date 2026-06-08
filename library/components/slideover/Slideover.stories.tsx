import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { Form } from '../form/Form';
import { InputEmail } from '../inputemail/InputEmail';
import { InputText } from '../inputtext/InputText';

import { Slideover } from './Slideover';

const meta: Meta<typeof Slideover> = {
  title: 'Layout/Slideover',
  component: Slideover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Slideover** is a panel that animates in from the left or right edge of the screen, overlaying the current page. It is ideal for detail views, edit forms, navigation drawers, and filter panels — keeping context visible behind the overlay.

**Key behaviors:**
- Controlled via \`open\` + \`onClose\` — always manage state with \`useState\`.
- \`side\` (default \`right\`) controls which edge the panel slides from.
- \`width\` accepts a number (pixels) or CSS string. Default is 400 px.
- Closes on Escape key, backdrop click, or the built-in × button.
- Scroll is locked on the underlying page while the panel is open.

**When to use:** Edit forms and detail panels on desktop (where a full-page navigation would break context), navigation drawers on mobile, and filter/settings panels that should not block the primary view completely.
        `,
      },
    },
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Edge from which the panel slides in.',
      table: { defaultValue: { summary: 'right' } },
    },
    width: {
      control: 'number',
      description: 'Panel width in pixels (or any CSS string).',
      table: { defaultValue: { summary: '400' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Slideover>;

// ─── Side variants ────────────────────────────────────────────────────────────

export const Right: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default — slides in from the right. Best for detail panels and edit forms.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button label="Open right →" onClick={() => setOpen(true)} />
        <Slideover open={open} side="right" onClose={() => setOpen(false)}>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Details Panel</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Slides in from the right. Press Escape or click outside to close.</p>
          </div>
        </Slideover>
      </div>
    );
  },
};

export const Left: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Slides in from the left — best for navigation drawers.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button label="← Open left" onClick={() => setOpen(true)} />
        <Slideover open={open} side="left" onClose={() => setOpen(false)}>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Slides in from the left.</p>
          </div>
        </Slideover>
      </div>
    );
  },
};

// ─── Width variants ───────────────────────────────────────────────────────────

export const NarrowWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: '`width=240` — narrow panel suitable for simple navigation menus or quick-access lists.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button label="Open narrow (240 px)" severity="secondary" onClick={() => setOpen(true)} />
        <Slideover open={open} width={240} onClose={() => setOpen(false)}>
          <div>
            <h3 className="text-sm font-semibold mb-4">Narrow Drawer</h3>
            <p className="text-sm text-gray-500">width=240</p>
          </div>
        </Slideover>
      </div>
    );
  },
};

export const WideWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: '`width=600` — wide panel for detail views or forms that need more horizontal space.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button label="Open wide (600 px)" severity="info" onClick={() => setOpen(true)} />
        <Slideover open={open} width={600} onClose={() => setOpen(false)}>
          <div>
            <h3 className="text-base font-semibold mb-4">Wide Details Panel</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Useful for forms or large content. width=600</p>
          </div>
        </Slideover>
      </div>
    );
  },
};

// ─── Real-world patterns ──────────────────────────────────────────────────────

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edit user profile form inside a slideover — the recommended pattern for inline editing without leaving the current page.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button icon="edit" label="Edit Profile" severity="secondary" onClick={() => setOpen(true)} />
        <Slideover open={open} width={480} onClose={() => setOpen(false)}>
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold">Edit User Profile</h2>
              <p className="text-xs text-gray-500 mt-0.5">Changes will apply immediately after saving.</p>
            </div>
            <Form
              buttonsConfig={[
                { type: 'submit', label: 'Save Changes', severity: 'success' },
                { type: 'back', label: 'Cancel' },
              ]}
              defaultValues={{
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice@qtera.io',
                department: 'iam',
              }}
              onSubmit={() => setOpen(false)}
            >
              <InputText fieldName="firstName" label="First Name" required />
              <InputText fieldName="lastName" label="Last Name" required />
              <InputEmail fieldName="email" label="Work Email" required />
              <Dropdown
                fieldName="department"
                label="Department"
                options={[
                  { label: 'IAM Team', value: 'iam' },
                  { label: 'Assets Team', value: 'assets' },
                  { label: 'Platform Team', value: 'platform' },
                  { label: 'Analytics Team', value: 'analytics' },
                ]}
                required
              />
            </Form>
          </div>
        </Slideover>
      </div>
    );
  },
};

export const NavigationDrawer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Left-side navigation drawer pattern — a list of sections and actions. Slides from the left at a narrow width.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('dashboard');
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'assets', label: 'Assets', icon: '📦' },
      { id: 'users', label: 'Users', icon: '👥' },
      { id: 'approvals', label: 'Approvals', icon: '✅', badge: '5' },
      { id: 'reports', label: 'Reports', icon: '📊' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    return (
      <div className="p-6">
        <Button icon="menu" label="Menu" onClick={() => setOpen(true)} />
        <Slideover open={open} side="left" width={260} onClose={() => setOpen(false)}>
          <div className="space-y-1">
            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Navigation</p>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                type="button"
                onClick={() => { setActive(item.id); setOpen(false); }}
              >
                <span className="flex items-center gap-2.5">
                  <span>{item.icon}</span>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge label={item.badge} severity="danger" type="filled" />
                )}
              </button>
            ))}
          </div>
        </Slideover>
      </div>
    );
  },
};

export const NotificationsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Right-side notification list — shows recent activity with timestamps. Slides from the right at default width.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const notifications = [
      { id: '1', title: 'Asset #A-00142 approved', body: 'David Osei approved the RFID tag request.', time: '2 min ago', read: false, severity: 'success' as const },
      { id: '2', title: 'Approval pending — 5 requests', body: 'You have 5 approval requests awaiting review.', time: '15 min ago', read: false, severity: 'warning' as const },
      { id: '3', title: 'Import completed', body: 'CSV import finished — 243 assets added to inventory.', time: '1 hour ago', read: true, severity: 'info' as const },
      { id: '4', title: 'User Alice Johnson added', body: 'A new Admin account was created by Super Admin.', time: '3 hours ago', read: true, severity: 'primary' as const },
    ];
    return (
      <div className="p-6">
        <div className="relative inline-flex">
          <Button icon="bell" label="Notifications" onClick={() => setOpen(true)} />
          <span className="absolute -top-1.5 -right-1.5">
            <Badge label="2" severity="danger" type="filled" />
          </span>
        </div>
        <Slideover open={open} width={420} onClose={() => setOpen(false)}>
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Notifications</h2>
              <button className="text-xs text-indigo-500 hover:underline" type="button">Mark all read</button>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-lg transition-colors ${n.read ? 'bg-transparent' : 'bg-indigo-50 dark:bg-indigo-950/40'}`}
              >
                <div className="flex items-start gap-2">
                  <Badge label={n.read ? 'Read' : 'New'} severity={n.read ? 'secondary' : n.severity} type="dot" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Slideover>
      </div>
    );
  },
};

export const FilterPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Right-side filter panel — apply multiple filters without leaving the current list view. Use this pattern when filters are complex enough to warrant a dedicated panel.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button icon="filter" label="Filters" outlined severity="secondary" onClick={() => setOpen(true)} />
        <Slideover open={open} width={380} onClose={() => setOpen(false)}>
          <div className="flex flex-col h-full">
            <h2 className="text-base font-semibold mb-6">Filter Assets</h2>
            <Form
              buttonsConfig={[
                { type: 'submit', label: 'Apply Filters', severity: 'primary' },
                { type: 'reset', label: 'Reset', style: 'outlined' },
              ]}
              onSubmit={() => setOpen(false)}
            >
              <Dropdown
                fieldName="status"
                label="Status"
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Archived', value: 'archived' },
                  { label: 'Rejected', value: 'rejected' },
                ]}
                placeholder="All statuses"
              />
              <Dropdown
                fieldName="category"
                label="Category"
                options={[
                  { label: 'Server', value: 'server' },
                  { label: 'Network Equipment', value: 'network' },
                  { label: 'Workstation', value: 'workstation' },
                  { label: 'Peripheral', value: 'peripheral' },
                ]}
                placeholder="All categories"
              />
              <Dropdown
                fieldName="location"
                label="Location"
                options={[
                  { label: 'Floor 1', value: 'floor1' },
                  { label: 'Floor 2', value: 'floor2' },
                  { label: 'Server Room A', value: 'serverA' },
                  { label: 'Warehouse B', value: 'warehouseB' },
                ]}
                placeholder="All locations"
              />
              <InputText fieldName="assignee" label="Assigned To" placeholder="Search by name…" />
            </Form>
          </div>
        </Slideover>
      </div>
    );
  },
};
