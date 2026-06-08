import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Preset/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Dialog** is a modal overlay that focuses the user's attention on a critical decision or supplementary content. It blocks the underlying page until dismissed.

**Key behaviors:**
- Controlled via \`visible\` + \`onVisibleChange\` — always use \`useState\` in parent.
- \`useCloseIcon\` adds an × button in the header for easy dismissal.
- \`closeOnBlur\` closes on backdrop click — use only for low-stakes dialogs.
- \`closeOnEscape\` (default behavior) dismisses on Escape key.
- \`modal={false}\` removes the backdrop — the page remains interactive.
- The \`slots.footer\` slot renders outside the scroll area, ideal for action buttons.

**Sizes:** \`xs\` → \`sm\` → \`md\` → \`lg\` → \`xl\` → \`2xl\`–\`7xl\` → \`full\`. Default is \`md\`.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
      description: 'Width preset of the dialog panel.',
      table: { defaultValue: { summary: 'md' } },
    },
    useCloseIcon: {
      control: 'boolean',
      description: 'Shows an × icon button in the dialog header.',
      table: { defaultValue: { summary: 'false' } },
    },
    closeOnBlur: {
      control: 'boolean',
      description: 'Closes the dialog when the backdrop is clicked.',
      table: { defaultValue: { summary: 'false' } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Closes the dialog on Escape key press.',
      table: { defaultValue: { summary: 'true' } },
    },
    modal: {
      control: 'boolean',
      description: 'When false, removes the backdrop and leaves the page interactive.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Open Dialog" onClick={() => setVisible(true)} />
        <Dialog header="Confirm Action" visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Are you sure you want to proceed? This will apply to the entire workspace.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
            <Button label="Confirm" severity="primary" onClick={() => setVisible(false)} />
          </div>
        </Dialog>
      </>
    );
  },
};

// ─── Dismiss behaviors ────────────────────────────────────────────────────────

export const WithCloseIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The × icon in the header gives users an obvious escape hatch. Recommended for most dialogs.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Open (with × button)" onClick={() => setVisible(true)} />
        <Dialog header="Session Settings" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Click the × icon in the header to close this dialog.</p>
        </Dialog>
      </>
    );
  },
};

export const CloseOnBlur: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the backdrop to dismiss. Use only for non-critical dialogs where accidental dismissal has no negative consequence.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Open (click outside to close)" severity="secondary" onClick={() => setVisible(true)} />
        <Dialog closeOnBlur header="Quick Info" visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Click anywhere outside this dialog to dismiss it.</p>
        </Dialog>
      </>
    );
  },
};

// ─── Footer slot ──────────────────────────────────────────────────────────────

export const WithFooterSlot: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `slots.footer` renders outside the scroll area — always visible regardless of content height. Ideal for action buttons.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Open with Footer" onClick={() => setVisible(true)} />
        <Dialog
          header="Edit Workspace Settings"
          slots={{
            footer: (
              <div className="flex justify-end gap-2">
                <Button label="Discard Changes" severity="secondary" text onClick={() => setVisible(false)} />
                <Button label="Save Settings" severity="primary" onClick={() => setVisible(false)} />
              </div>
            ),
          }}
          visible={visible}
          onVisibleChange={setVisible}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">Footer slot renders below content, always visible even when the body scrolls.</p>
        </Dialog>
      </>
    );
  },
};

// ─── Size variants ────────────────────────────────────────────────────────────

export const SizeXS: Story = {
  parameters: {
    docs: {
      description: {
        story: '`xs` — the most compact size. Use for short confirmations with minimal copy.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="size=xs" severity="secondary" onClick={() => setVisible(true)} />
        <Dialog header="Remove Tag" size="xs" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Remove the "Hardware" tag from this asset?</p>
          <div className="flex justify-end gap-2 mt-3">
            <Button label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
            <Button label="Remove" severity="danger" onClick={() => setVisible(false)} />
          </div>
        </Dialog>
      </>
    );
  },
};

export const SizeSM: Story = {
  parameters: {
    docs: {
      description: {
        story: '`sm` — suitable for short forms or confirmations with a bit more context.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="size=sm" severity="secondary" onClick={() => setVisible(true)} />
        <Dialog header="Rename Collection" size="sm" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Enter a new name for the "Q1 Assets" collection.</p>
          <input
            className="mt-3 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm bg-transparent"
            defaultValue="Q1 Assets"
          />
          <div className="flex justify-end gap-2 mt-3">
            <Button label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
            <Button label="Rename" severity="primary" onClick={() => setVisible(false)} />
          </div>
        </Dialog>
      </>
    );
  },
};

export const SizeLG: Story = {
  parameters: {
    docs: {
      description: {
        story: '`lg` — use for wider content: multi-column forms, rich text editors, or detail views.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="size=lg" severity="info" onClick={() => setVisible(true)} />
        <Dialog header="Import Assets from CSV" size="lg" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">Upload a CSV file to bulk-import assets into this workspace.</p>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center text-sm text-gray-400">
              Drop CSV here or <span className="text-indigo-500 cursor-pointer">browse files</span>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};

export const SizeXL: Story = {
  parameters: {
    docs: {
      description: {
        story: '`xl` — for complex dialogs such as data tables within overlays or multi-step wizards.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="size=xl" severity="info" onClick={() => setVisible(true)} />
        <Dialog header="Asset Comparison" size="xl" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Extra-large dialog for wide content like data tables or multi-column comparisons.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {['Asset A', 'Asset B', 'Asset C'].map((name) => (
              <div key={name} className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-gray-400 mt-1">RFID — Active — Floor 3</p>
              </div>
            ))}
          </div>
        </Dialog>
      </>
    );
  },
};

export const FullScreen: Story = {
  parameters: {
    docs: {
      description: {
        story: '`size="full"` occupies the entire viewport. Use for immersive flows on mobile or full-page editors.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Full Screen" severity="danger" onClick={() => setVisible(true)} />
        <Dialog header="Asset Detail View" size="full" useCloseIcon visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">Full-screen dialog occupies the entire viewport. Ideal for complex detail pages or mobile-first flows.</p>
        </Dialog>
      </>
    );
  },
};

export const NonModal: Story = {
  parameters: {
    docs: {
      description: {
        story: '`modal={false}` removes the backdrop — the page behind remains interactive. Use for non-blocking notifications or help panels.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button label="Non-modal Dialog" severity="secondary" onClick={() => setVisible(true)} />
        <Dialog header="Keyboard Shortcuts" modal={false} visible={visible} onVisibleChange={setVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300">No backdrop — the page behind this dialog remains interactive.</p>
          <div className="mt-4">
            <Button label="Close" severity="secondary" onClick={() => setVisible(false)} />
          </div>
        </Dialog>
      </>
    );
  },
};

// ─── Advanced stories ─────────────────────────────────────────────────────────

export const WithScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Long content scrolls inside the dialog body while the header and footer remain pinned. Test with `size="sm"` to force the overflow.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    const terms = Array.from({ length: 20 }, (_, i) => `Section ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel arcu at justo tristique commodo ut a metus.`);
    return (
      <>
        <Button label="Open scrollable dialog" onClick={() => setVisible(true)} />
        <Dialog
          header="Terms and Conditions"
          size="sm"
          useCloseIcon
          visible={visible}
          onVisibleChange={setVisible}
          slots={{
            footer: (
              <div className="flex justify-end gap-2">
                <Button label="Decline" severity="secondary" onClick={() => setVisible(false)} />
                <Button label="Accept & Continue" severity="primary" onClick={() => setVisible(false)} />
              </div>
            ),
          }}
        >
          <div className="space-y-3">
            {terms.map((t) => (
              <p key={t.slice(0, 20)} className="text-sm text-gray-600 dark:text-gray-300">{t}</p>
            ))}
          </div>
        </Dialog>
      </>
    );
  },
};

export const NestedDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A button inside the first dialog opens a second (nested) dialog. Both maintain independent visibility state.',
      },
    },
  },
  render: () => {
    const [outerVisible, setOuterVisible] = useState(false);
    const [innerVisible, setInnerVisible] = useState(false);
    return (
      <>
        <Button label="Open Outer Dialog" onClick={() => setOuterVisible(true)} />
        <Dialog header="Settings" useCloseIcon visible={outerVisible} onVisibleChange={setOuterVisible}>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Configure your workspace settings below.</p>
          <Button label="Delete Workspace…" severity="danger" outlined onClick={() => setInnerVisible(true)} />
          <Dialog
            closeOnBlur
            header="Delete Workspace"
            size="xs"
            useCloseIcon
            visible={innerVisible}
            onVisibleChange={setInnerVisible}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">This action is permanent and cannot be undone. All data will be lost.</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button label="Cancel" severity="secondary" onClick={() => setInnerVisible(false)} />
              <Button label="Delete Forever" severity="danger" onClick={() => { setInnerVisible(false); setOuterVisible(false); }} />
            </div>
          </Dialog>
        </Dialog>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic destructive confirmation pattern. Uses `size="xs"`, danger severity, and clear consequences copy.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    const [deleted, setDeleted] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <Button
          disabled={deleted}
          icon="trash"
          label={deleted ? 'User deleted' : 'Delete User'}
          severity="danger"
          onClick={() => setVisible(true)}
        />
        <Dialog header="Delete User" size="xs" visible={visible} onVisibleChange={setVisible}>
          <div className="space-y-2">
            <p className="text-sm font-medium">Delete Alice Johnson?</p>
            <p className="text-sm text-gray-500">This action cannot be undone. The user will immediately lose access to all workspaces and their data will be permanently removed.</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
            <Button label="Delete User" severity="danger" onClick={() => { setDeleted(true); setVisible(false); }} />
          </div>
        </Dialog>
      </div>
    );
  },
};

export const FormDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog containing native form elements — demonstrates the form-in-dialog pattern. For react-hook-form integration, use DialogForm instead.',
      },
    },
  },
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button icon="plus" label="Invite Member" severity="primary" onClick={() => setVisible(true)} />
        <Dialog
          header="Invite Team Member"
          size="sm"
          useCloseIcon
          visible={visible}
          onVisibleChange={setVisible}
          slots={{
            footer: (
              <div className="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" onClick={() => setVisible(false)} />
                <Button label="Send Invitation" severity="primary" onClick={() => setVisible(false)} />
              </div>
            ),
          }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm bg-transparent"
                placeholder="colleague@company.com"
                type="email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
              <select className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm bg-transparent">
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};
