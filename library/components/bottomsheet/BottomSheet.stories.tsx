import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Dropdown } from '../dropdown/Dropdown';
import { Form } from '../form/Form';
import { InputText } from '../inputtext/InputText';

import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Preset/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**BottomSheet** slides up from the bottom of the screen as a modal panel. It is the mobile-first alternative to Dialog — optimized for touch interaction on small viewports while remaining usable on desktop.

**Key behaviors:**
- Controlled via \`visible\` + \`onHide\` — always manage visibility with \`useState\`.
- \`dismissable\` (default true) — allows closing by tapping the backdrop or pressing Escape.
- \`showHandle\` (default true) — displays a visual drag handle at the top of the sheet.
- \`size\` controls height: \`sm\` / \`md\` / \`lg\` / \`full\`.
- \`footer\` prop pins content at the bottom of the sheet, ideal for action buttons.

**When to use:** Action sheets, filter panels, quick forms, image pickers, and any flow that should feel "native" on mobile. Prefer Dialog for desktop-only or complex multi-step flows.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Height size variant of the sheet.',
      table: { defaultValue: { summary: 'md' } },
    },
    dismissable: {
      control: 'boolean',
      description: 'Allow closing by tapping the backdrop or pressing Escape.',
      table: { defaultValue: { summary: 'true' } },
    },
    showHandle: {
      control: 'boolean',
      description: 'Display the visual drag handle indicator at the top.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BottomSheet>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal usage — only `visible`, `onHide`, and `children` are required.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Open Sheet" onClick={() => setVisible(true)} />
        <BottomSheet header="Options" visible={visible} onHide={() => setVisible(false)}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Sheet content goes here.</p>
        </BottomSheet>
      </div>
    );
  },
};

// ─── Size variants ────────────────────────────────────────────────────────────

export const SizeSM: Story = {
  parameters: {
    docs: {
      description: {
        story: '`sm` — compact height, ideal for quick confirmations with minimal content.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Small sheet" severity="secondary" onClick={() => setVisible(true)} />
        <BottomSheet header="Quick action" size="sm" visible={visible} onHide={() => setVisible(false)}>
          <p className="text-sm">Small (sm) sheet — compact height.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const SizeLG: Story = {
  parameters: {
    docs: {
      description: {
        story: '`lg` — tall sheet with more vertical room for forms or lists.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Large sheet" onClick={() => setVisible(true)} />
        <BottomSheet header="Large Sheet" size="lg" visible={visible} onHide={() => setVisible(false)}>
          <p className="text-sm">Large (lg) sheet — more vertical space for content.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const FullSize: Story = {
  parameters: {
    docs: {
      description: {
        story: '`full` — occupies the entire screen height. Use for immersive mobile flows.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Full sheet" severity="info" onClick={() => setVisible(true)} />
        <BottomSheet header="Full Sheet" size="full" visible={visible} onHide={() => setVisible(false)}>
          <p className="text-sm">Full-height sheet — occupies entire screen.</p>
        </BottomSheet>
      </div>
    );
  },
};

// ─── Behavior variants ────────────────────────────────────────────────────────

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer prop pins action buttons at the bottom of the sheet, outside the scrollable content area.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Sheet with footer" onClick={() => setVisible(true)} />
        <BottomSheet
          footer={
            <div className="flex gap-2 p-4">
              <Button className="flex-1" label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
              <Button className="flex-1" label="Confirm" severity="primary" onClick={() => setVisible(false)} />
            </div>
          }
          header="Confirm Action"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">Are you sure you want to delete this item?</p>
        </BottomSheet>
      </div>
    );
  },
};

export const NonDismissable: Story = {
  parameters: {
    docs: {
      description: {
        story: '`dismissable=false` prevents closing via backdrop tap or Escape key — the user must complete the action. Use for required steps in a flow.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="Non-dismissable sheet" severity="warning" onClick={() => setVisible(true)} />
        <BottomSheet
          dismissable={false}
          footer={
            <div className="p-4">
              <Button className="w-full" label="I understand" severity="primary" onClick={() => setVisible(false)} />
            </div>
          }
          header="Required Action"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">You must complete this step to continue. Cannot be dismissed by tapping outside.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const NoHandle: Story = {
  parameters: {
    docs: {
      description: {
        story: '`showHandle=false` hides the visual drag handle. Use when the sheet has its own prominent header that makes the handle redundant.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button label="No handle" severity="secondary" onClick={() => setVisible(true)} />
        <BottomSheet header="No drag handle" showHandle={false} visible={visible} onHide={() => setVisible(false)}>
          <p className="text-sm">showHandle=false hides the visual handle indicator.</p>
        </BottomSheet>
      </div>
    );
  },
};

// ─── Real-world patterns ──────────────────────────────────────────────────────

export const ActionSheet: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Action sheet pattern — a list of tap targets for contextual operations. Common on mobile for share, copy, or report flows.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    const actions = [
      { label: 'Share Link', icon: '🔗', color: 'text-indigo-600 dark:text-indigo-400' },
      { label: 'Copy to Clipboard', icon: '📋', color: 'text-gray-700 dark:text-gray-300' },
      { label: 'Download PDF', icon: '⬇️', color: 'text-gray-700 dark:text-gray-300' },
      { label: 'Report Issue', icon: '🚩', color: 'text-red-600 dark:text-red-400' },
    ];
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button icon="more-horizontal" label="More actions" severity="secondary" onClick={() => setVisible(true)} />
        <BottomSheet
          footer={
            <div className="px-4 pb-6">
              <Button label="Cancel" severity="secondary" width="100%" onClick={() => setVisible(false)} />
            </div>
          }
          header="Actions"
          size="sm"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {actions.map((action) => (
              <button
                key={action.label}
                className={`flex items-center gap-3 w-full px-1 py-3.5 text-sm font-medium ${action.color} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                type="button"
                onClick={() => setVisible(false)}
              >
                <span className="text-lg">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const FilterSheet: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Filter panel in a bottom sheet — common in mobile list/table views. Apply filters via the primary button in the footer.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    const statusOptions = [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Archived', value: 'archived' },
      { label: 'Rejected', value: 'rejected' },
    ];
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button icon="filter" label="Filter Assets" outlined severity="secondary" onClick={() => setVisible(true)} />
        <BottomSheet
          footer={
            <div className="flex gap-3 p-4">
              <Button label="Reset" outlined severity="secondary" width="100%" onClick={() => setVisible(false)} />
              <Button label="Apply Filters" severity="primary" width="100%" onClick={() => setVisible(false)} />
            </div>
          }
          header="Filter Assets"
          size="lg"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <Form buttonsConfig={[]}>
            <Dropdown
              fieldName="status"
              label="Status"
              options={statusOptions}
              placeholder="All statuses"
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
            <Checkbox fieldName="overdue" label="Show overdue items only" />
          </Form>
        </BottomSheet>
      </div>
    );
  },
};

export const ImagePicker: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image picker action sheet — gives users a choice between capturing a photo or selecting from the library. Common for avatar/document upload flows.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">
            {selected ? '📸' : '👤'}
          </div>
          <Button label="Change Photo" outlined severity="secondary" onClick={() => setVisible(true)} />
        </div>
        {selected && <p className="text-xs text-gray-500">Selected: {selected}</p>}
        <BottomSheet
          footer={
            <div className="px-4 pb-6">
              <Button label="Cancel" severity="secondary" width="100%" onClick={() => setVisible(false)} />
            </div>
          }
          header="Profile Photo"
          size="sm"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="space-y-1 pb-2">
            {[
              { label: 'Take Photo', icon: '📷', value: 'camera' },
              { label: 'Choose from Library', icon: '🖼️', value: 'library' },
              { label: 'Remove Photo', icon: '🗑️', value: 'remove' },
            ].map((option) => (
              <button
                key={option.value}
                className="flex items-center gap-3 w-full px-1 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                type="button"
                onClick={() => { setSelected(option.label); setVisible(false); }}
              >
                <span className="text-xl">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bottom sheet containing a react-hook-form Form with required fields. The footer action buttons are pinned below the form content.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative h-screen bg-gray-50 dark:bg-gray-950 p-6">
        <Button icon="plus" label="Quick Add Asset" severity="primary" onClick={() => setVisible(true)} />
        <BottomSheet
          footer={
            <div className="flex gap-3 p-4">
              <Button label="Cancel" severity="secondary" width="100%" onClick={() => setVisible(false)} />
              <Button label="Add Asset" severity="success" width="100%" onClick={() => setVisible(false)} />
            </div>
          }
          header="Add Asset"
          size="lg"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <Form buttonsConfig={[]}>
            <InputText fieldName="assetName" label="Asset Name" placeholder="e.g. Dell PowerEdge R750" required />
            <InputText fieldName="serialNumber" label="Serial Number" placeholder="e.g. SRV-2024-0042" required />
            <Dropdown
              fieldName="category"
              label="Category"
              options={[
                { label: 'Server', value: 'server' },
                { label: 'Network Equipment', value: 'network' },
                { label: 'Workstation', value: 'workstation' },
                { label: 'Peripheral', value: 'peripheral' },
              ]}
              placeholder="Select category"
              required
            />
          </Form>
        </BottomSheet>
      </div>
    );
  },
};
