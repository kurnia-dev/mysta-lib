import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { InputEmail } from '../inputemail/InputEmail';
import { InputNumber } from '../inputnumber/InputNumber';
import { InputText } from '../inputtext/InputText';

import { DialogForm } from './DialogForm';

const meta: Meta<typeof DialogForm> = {
  title: 'Preset/DialogForm',
  component: DialogForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**DialogForm** combines a Dialog with a react-hook-form-powered Form in a single component. It is the recommended pattern for create/edit flows that live inside a modal.

**DialogForm vs Dialog + Form:**
- Use **DialogForm** when the entire dialog content is a managed form (create/edit entities).
- Use **Dialog** with manual children when the dialog contains mixed content (text + form, multi-step, etc.).

**Key props shared from FormProps:**
- \`buttonsConfig\` — configures the submit/cancel buttons rendered in the form footer
- \`defaultValues\` — pre-populates fields for edit workflows
- \`onSubmit\` — called with validated form data
- \`closeOnSubmit\` — automatically closes the dialog after a successful submit

All field components (\`InputText\`, \`Dropdown\`, etc.) are already in a Form context — no extra wrapper needed.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Width preset of the dialog panel.',
      table: { defaultValue: { summary: 'md' } },
    },
    closeOnSubmit: {
      control: 'boolean',
      description: 'Close the dialog automatically after successful form submission.',
      table: { defaultValue: { summary: 'false' } },
    },
    useCloseIcon: {
      control: 'boolean',
      description: 'Shows an × icon button in the dialog header.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DialogForm>;

// ─── Default ──────────────────────────────────────────────────────────────────

function CreateUserDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button label="Create User" severity="primary" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Create User' }, { type: 'back', label: 'Cancel' }]}
        header="Create User"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText fieldName="name" label="Full Name" placeholder="Alice Johnson" required />
        <InputEmail fieldName="email" label="Work Email" placeholder="alice@company.com" required />
      </DialogForm>
    </>
  );
}

export const Default: Story = { render: () => <CreateUserDemo /> };

// ─── Default values (edit mode) ───────────────────────────────────────────────

function WithDefaultValuesDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button label="Edit User" severity="secondary" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Save Changes' }, { type: 'back', label: 'Cancel' }]}
        defaultValues={{ name: 'Alice Johnson', email: 'alice@qtera.io' }}
        header="Edit User"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText fieldName="name" label="Full Name" required />
        <InputEmail fieldName="email" label="Work Email" required />
      </DialogForm>
    </>
  );
}

export const WithDefaultValues: Story = {
  render: () => <WithDefaultValuesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Edit mode — `defaultValues` pre-populates the form fields. Combine with your GET API response for a typical edit dialog.',
      },
    },
  },
};

// ─── Close on submit ──────────────────────────────────────────────────────────

function CloseOnSubmitDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button label="Quick Create" onClick={() => setVisible(true)} />
      <DialogForm
        closeOnSubmit
        buttonsConfig={[{ type: 'submit', label: 'Create Tag' }, { type: 'back', label: 'Cancel' }]}
        header="New Asset Tag"
        visible={visible}
        onVisibleChange={setVisible}
        onSubmit={() => {}}
      >
        <InputText fieldName="tagId" label="Tag ID" placeholder="RFID-00142" required />
      </DialogForm>
    </>
  );
}

export const CloseOnSubmit: Story = {
  render: () => <CloseOnSubmitDemo />,
  parameters: {
    docs: {
      description: {
        story: '`closeOnSubmit` automatically dismisses the dialog after the form validates and the submit handler completes.',
      },
    },
  },
};

// ─── Validation ───────────────────────────────────────────────────────────────

function WithValidationDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button label="Open (try submitting empty)" severity="warning" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Submit' }, { type: 'back', label: 'Cancel' }]}
        header="Register Device"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText fieldName="deviceId" label="Device ID" placeholder="e.g. DEV-2024-001" required />
        <InputText fieldName="location" label="Physical Location" placeholder="e.g. Server Room B — Rack 3" required />
        <InputEmail fieldName="ownerEmail" label="Owner Email" placeholder="owner@company.com" required />
      </DialogForm>
    </>
  );
}

export const WithValidation: Story = {
  render: () => <WithValidationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Submit the form without filling any fields to see inline validation error messages. All fields are `required`.',
      },
    },
  },
};

// ─── Larger form with Dropdown ────────────────────────────────────────────────

function LargeFormDemo() {
  const [visible, setVisible] = useState(false);
  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
  return (
    <>
      <Button label="New Team Member" severity="info" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Send Invitation' }, { type: 'back', label: 'Cancel' }]}
        header="Invite Team Member"
        size="lg"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText fieldName="firstName" label="First Name" placeholder="Alice" required />
        <InputText fieldName="lastName" label="Last Name" placeholder="Johnson" required />
        <InputEmail fieldName="email" label="Work Email" placeholder="alice@company.com" required />
        <Dropdown fieldName="role" label="Role" options={roleOptions} placeholder="Select a role" required />
      </DialogForm>
    </>
  );
}

export const LargeForm: Story = {
  render: () => <LargeFormDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Larger `size="lg"` form with four fields including a Dropdown. Demonstrates multi-field create flows.',
      },
    },
  },
};

// ─── Real-world templates ─────────────────────────────────────────────────────

function EditUserDialogDemo() {
  const [visible, setVisible] = useState(false);
  const roleOptions = [
    { label: 'Super Admin', value: 'super_admin' },
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'Staff', value: 'staff' },
    { label: 'Auditor', value: 'auditor' },
  ];
  return (
    <>
      <Button label="Edit User Profile" severity="secondary" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Update Profile' }, { type: 'back', label: 'Cancel' }]}
        defaultValues={{ firstName: 'Alice', lastName: 'Johnson', email: 'alice@qtera.io', role: 'admin' }}
        header="Edit User Profile"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText fieldName="firstName" label="First Name" required />
        <InputText fieldName="lastName" label="Last Name" required />
        <InputEmail fieldName="email" label="Work Email" required />
        <Dropdown fieldName="role" label="System Role" options={roleOptions} required />
      </DialogForm>
    </>
  );
}

export const EditUserDialog: Story = {
  render: () => <EditUserDialogDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Realistic edit-user dialog pre-populated with existing data. Covers name, email, and role in a single `lg` dialog.',
      },
    },
  },
};

function CreateProjectDialogDemo() {
  const [visible, setVisible] = useState(false);
  const teamOptions = [
    { label: 'IAM Team', value: 'iam' },
    { label: 'Assets Team', value: 'assets' },
    { label: 'Platform Team', value: 'platform' },
    { label: 'Analytics Team', value: 'analytics' },
  ];
  return (
    <>
      <Button label="New Project" severity="primary" onClick={() => setVisible(true)} />
      <DialogForm
        closeOnSubmit
        buttonsConfig={[{ type: 'submit', label: 'Create Project' }, { type: 'back', label: 'Cancel' }]}
        header="Create Project"
        size="lg"
        visible={visible}
        onVisibleChange={setVisible}
        onSubmit={() => {}}
      >
        <InputText fieldName="name" label="Project Name" placeholder="Q3 Asset Audit" required />
        <InputText fieldName="description" label="Description" placeholder="Brief description of the project scope" />
        <Dropdown fieldName="team" label="Owning Team" options={teamOptions} placeholder="Select team" required />
        <InputNumber fieldName="targetAssets" label="Target Asset Count" placeholder="0" />
      </DialogForm>
    </>
  );
}

export const CreateProjectDialog: Story = {
  render: () => <CreateProjectDialogDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Create-project dialog with name, description, team picker, and numeric target. Demonstrates mixed field types.',
      },
    },
  },
};

function ConfirmActionDialogDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button label="Reject Request" severity="warning" onClick={() => setVisible(true)} />
      <DialogForm
        buttonsConfig={[{ type: 'submit', label: 'Reject Request', severity: 'danger' }, { type: 'back', label: 'Cancel' }]}
        header="Reject Approval Request"
        size="sm"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <InputText
          fieldName="reason"
          label="Rejection Reason"
          placeholder="e.g. Missing supporting documentation"
          required
        />
      </DialogForm>
    </>
  );
}

export const ConfirmActionDialog: Story = {
  render: () => <ConfirmActionDialogDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Minimalist single-field confirmation dialog — captures a reason before performing a destructive or gated action.',
      },
    },
  },
};
