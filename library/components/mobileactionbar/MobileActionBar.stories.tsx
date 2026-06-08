import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { MobileActionBar } from './MobileActionBar';

const meta: Meta<typeof MobileActionBar> = {
  title: 'Actions/MobileActionBar',
  component: MobileActionBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**MobileActionBar** is a fixed bottom bar designed for mobile-first UIs, providing persistent access to primary actions without scrolling.

It accepts an \`action\` slot (right side) for buttons and an optional \`info\` slot (left side) for contextual text like totals, step indicators, or status.
The bar sticks to the bottom of the viewport (\`position: fixed\`), sits above the safe area, and includes a subtle top border and shadow for visual separation.
Use it as a mobile alternative to right-click menus, floating action bars in forms, shopping cart totals, and multi-step wizard navigation.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MobileActionBar>;

export const Default: Story = {
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Page content here…</p>
      <MobileActionBar
        action={<Button label="Checkout" severity="primary" />}
        info={<span className="text-sm font-semibold">3 items · $87.00</span>}
      />
    </div>
  ),
};

export const ActionOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When no `info` is provided, the action takes full width. Use for simple confirmation screens or final submission steps.',
      },
    },
  },
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">No info slot, just action.</p>
      <MobileActionBar
        action={<Button className="w-full" label="Continue" severity="primary" />}
      />
    </div>
  ),
};

export const WithTwoActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cancel + confirm pattern — two side-by-side buttons in the action slot, plus an info label for context.',
      },
    },
  },
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Multiple action buttons.</p>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="Cancel" severity="secondary" />
            <Button label="Save" severity="primary" />
          </div>
        }
        info={<span className="text-xs text-gray-500">Unsaved changes</span>}
      />
    </div>
  ),
};

export const CartBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart sticky bar — shows subtotal on the left and a cart CTA on the right. Common in mobile e-commerce.',
      },
    },
  },
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Shopping cart pattern.</p>
      <MobileActionBar
        action={<Button label="View Cart (5)" severity="primary" />}
        info={
          <div>
            <p className="text-xs text-gray-400">Subtotal</p>
            <p className="text-sm font-bold">$142.50</p>
          </div>
        }
      />
    </div>
  ),
};

export const FormSubmit: Story = {
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Form submit pattern.</p>
      <MobileActionBar
        action={<Button label="Submit Application" severity="success" />}
        info={<span className="text-xs text-gray-400">Step 3 of 4</span>}
      />
    </div>
  ),
};

export const ShareActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Share sheet pattern — shows contextual title on the left and a row of share action buttons on the right. Common after completing a task.',
      },
    },
  },
  render: () => (
    <div className="relative h-72 bg-gray-50 dark:bg-gray-950">
      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Your report is ready</h2>
        <p className="text-sm text-gray-500">May 2026 Analytics Summary — 14 pages</p>
      </div>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="Copy Link" severity="secondary" />
            <Button label="Download" severity="secondary" />
            <Button label="Share" severity="primary" />
          </div>
        }
        info={
          <div>
            <p className="text-xs text-gray-400">Report ready</p>
            <p className="text-xs font-medium text-emerald-600">May 20, 2026</p>
          </div>
        }
      />
    </div>
  ),
};

export const EditActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Item editing context — Duplicate and Delete as secondary actions, with the primary Edit CTA. Shows the selected item info on the left.',
      },
    },
  },
  render: () => (
    <div className="relative h-72 bg-gray-50 dark:bg-gray-950">
      <div className="p-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Asset #A-00421</p>
          <p className="text-xs text-gray-400">MacBook Pro 14&quot; — Engineering Dept.</p>
          <span className="mt-2 inline-block text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Active</span>
        </div>
      </div>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="Duplicate" severity="secondary" />
            <Button label="Delete" severity="danger" />
            <Button label="Edit" severity="primary" />
          </div>
        }
        info={
          <p className="text-xs text-gray-500">1 item selected</p>
        }
      />
    </div>
  ),
};

export const MediaActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Media picker action bar — Camera, Gallery, and Files as distinct source options. Common in mobile attachment flows.',
      },
    },
  },
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Attach a document to your report.</p>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="📷 Camera" severity="secondary" />
            <Button label="🖼 Gallery" severity="secondary" />
            <Button label="📁 Files" severity="primary" />
          </div>
        }
        info={
          <p className="text-xs text-gray-400">Max 10 MB · PDF, JPG, PNG</p>
        }
      />
    </div>
  ),
};

export const ContextMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mobile equivalent of a right-click context menu — triggered by long-pressing a list item. Shows actions relevant to the selected content.',
      },
    },
  },
  render: () => (
    <div className="relative h-72 bg-gray-50 dark:bg-gray-950">
      <div className="p-4 space-y-2">
        <div className="bg-white dark:bg-gray-900 border border-blue-300 dark:border-blue-700 rounded-xl p-4 ring-2 ring-blue-200 dark:ring-blue-900">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">Invoice #INV-2026-0048</p>
          <p className="text-xs text-gray-400">$3,200.00 · Pending · Due Jun 1</p>
        </div>
        <p className="text-xs text-center text-gray-400">Long-pressed to reveal actions</p>
      </div>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="Mark Paid" severity="success" />
            <Button label="Send Reminder" severity="secondary" />
            <Button label="Delete" severity="danger" />
          </div>
        }
        info={
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">Invoice #INV-2026-0048</p>
        }
      />
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action items labeled with emoji icons for quick recognition — useful in contexts where text space is tight on small screens.',
      },
    },
  },
  render: () => (
    <div className="relative h-64 bg-gray-50 dark:bg-gray-950">
      <p className="p-4 text-sm text-gray-500">Review your order before placing it.</p>
      <MobileActionBar
        action={
          <div className="flex gap-2">
            <Button label="🛒 Edit Cart" severity="secondary" />
            <Button label="✅ Place Order" severity="primary" />
          </div>
        }
        info={
          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">$249.00</p>
          </div>
        }
      />
    </div>
  ),
};
