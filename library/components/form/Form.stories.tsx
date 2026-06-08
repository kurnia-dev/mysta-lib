import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Dropdown } from '../dropdown/Dropdown';
import { InputPassword } from '../inputpassword/InputPassword';
import { InputText } from '../inputtext/InputText';
import { Form } from './Form';
import type { FormHandle, ButtonConfig } from './Form.d';

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Form** is the react-hook-form provider wrapper required by all field components in this library (\`InputText\`, \`Dropdown\`, \`Checkbox\`, and others). It manages form state, validation, and submission internally so individual fields do not need to wire up their own context.

Configure the footer button row via \`buttonsConfig\` — each entry picks a \`type\` (\`back\`, \`reset\`, \`submit-raw\`, \`submit\`) and optionally overrides the default label, severity, and style. Pass \`slots.footer\` to completely replace the default button row with a custom layout.

Obtain an imperative handle via \`useRef<FormHandle<T>>\` to call \`getValues\`, \`setValue\`, \`reset\`, or \`setError\` from outside the form. Set \`resetOnSubmit={false}\` to keep values after a successful submission.
        `,
      },
    },
  },
  argTypes: {
    columnPerRow: {
      control: 'radio',
      options: [1, 2, 3, 4],
      description: 'Number of form field columns per row.',
      table: { defaultValue: { summary: '2' } },
    },
    resetOnSubmit: {
      control: 'boolean',
      description: 'Whether the form resets to default values after a successful submit.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Form>;

// ---------------------------------------------------------------------------
// Default — two InputText fields + submit
// ---------------------------------------------------------------------------
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal usage: two text fields with a single Submit button. Fill both fields and click Submit to see the form values logged to the Actions panel.',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[{ type: 'submit' }]}
      onSubmit={(values) => console.log('Submitted:', values)}
    >
      <InputText fieldName="firstName" label="First Name" placeholder="Amelia" required />
      <InputText fieldName="lastName" label="Last Name" placeholder="Hartwell" required />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// AllButtonTypes — all 4 button types in one form footer
// ---------------------------------------------------------------------------
export const AllButtonTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: `Shows all four \`buttonsConfig\` types rendered with their default labels, severities, and styles.

| type | default label | severity | style |
|---|---|---|---|
| \`back\` | Cancel | secondary | text |
| \`reset\` | Clear | primary | text |
| \`submit-raw\` | Save | success | outlined |
| \`submit\` | Submit | success | fill |`,
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[
        { type: 'back' },
        { type: 'reset' },
        { type: 'submit-raw' },
        { type: 'submit' },
      ]}
      onSubmit={(values) => console.log('Submitted:', values)}
    >
      <InputText fieldName="projectName" label="Project Name" placeholder="Phoenix Platform" />
      <InputText fieldName="teamLead" label="Team Lead" placeholder="Amelia Hartwell" />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// CustomButtonLabels — override defaults on each button type
// ---------------------------------------------------------------------------
export const CustomButtonLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each button type accepts optional `label`, `severity`, and `style` overrides. Here every default is replaced: Back becomes "Go Back" (danger/outlined), Reset becomes "Clear All" (warning/fill), and Submit becomes "Publish" (primary/fill).',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[
        { type: 'back', label: 'Go Back', severity: 'danger', style: 'outlined' },
        { type: 'reset', label: 'Clear All', severity: 'warning', style: 'fill' },
        { type: 'submit', label: 'Publish', severity: 'primary', style: 'fill' },
      ]}
      onSubmit={(values) => console.log('Published:', values)}
    >
      <InputText fieldName="articleTitle" label="Article Title" placeholder="Exploring AI in Healthcare" />
      <InputText fieldName="author" label="Author" placeholder="Dr. Kenji Watanabe" />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// WithDefaultValues — pre-populated form
// ---------------------------------------------------------------------------
export const WithDefaultValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `defaultValues` to pre-populate fields. The keys must match the `fieldName` of each field component. Useful for edit forms where data is loaded from the server before rendering.',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[{ type: 'reset' }, { type: 'submit', label: 'Update Profile' }]}
      defaultValues={{
        displayName: 'Amelia Hartwell',
        email: 'amelia.hartwell@company.io',
        department: 'Product Engineering',
      }}
      onSubmit={(values) => console.log('Updated:', values)}
    >
      <InputText fieldName="displayName" label="Display Name" />
      <InputText fieldName="email" label="Email Address" />
      <InputText fieldName="department" label="Department" />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// ResetOnSubmitFalse — keep values after submit
// ---------------------------------------------------------------------------
export const ResetOnSubmitFalse: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With `resetOnSubmit={false}` the form retains its values after a successful submission. Suitable for search forms or multi-step wizards where the user needs to see what they just submitted.',
      },
    },
  },
  render: () => {
    const [lastSubmit, setLastSubmit] = useState<Record<string, string> | null>(null);
    return (
      <div className="space-y-4">
        <Form
          buttonsConfig={[{ type: 'submit', label: 'Search' }]}
          resetOnSubmit={false}
          onSubmit={(values: Record<string, string>) => {
            console.log('Search:', values);
            setLastSubmit(values);
          }}
        >
          <InputText fieldName="query" label="Search Query" placeholder="Invoice #2024-0891" />
          <InputText fieldName="clientId" label="Client ID" placeholder="CLT-00342" />
        </Form>
        {lastSubmit && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last search: <strong>{lastSubmit.query}</strong> — client <strong>{lastSubmit.clientId}</strong>
          </p>
        )}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// WithRef — imperative handle via useRef<FormHandle>
// ---------------------------------------------------------------------------
export const WithRef: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass a `ref` typed as `React.RefObject<FormHandle<T>>` to get imperative access to `getValues`, `setValue`, `reset`, `errors`, and more. The external buttons below demonstrate reading and writing form values without triggering a submit.',
      },
    },
  },
  render: () => {
    const formRef = useRef<FormHandle<{ username: string; role: string }>>(null);
    const [snapshot, setSnapshot] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Form
          ref={formRef}
          buttonsConfig={[{ type: 'submit', label: 'Save User' }]}
          defaultValues={{ username: '', role: '' }}
          onSubmit={(values) => console.log('Saved:', values)}
        >
          <InputText fieldName="username" label="Username" placeholder="j.nakamura" required />
          <InputText fieldName="role" label="Role" placeholder="Engineering Lead" />
        </Form>

        <div className="flex flex-wrap gap-2 border-t pt-4">
          <Button
            label="Read Values"
            severity="info"
            onClick={() => {
              const values = formRef.current?.getValues();
              setSnapshot(JSON.stringify(values, null, 2));
            }}
          />
          <Button
            label="Set Demo Values"
            severity="secondary"
            onClick={() => {
              formRef.current?.setValue('username', 'j.nakamura');
              formRef.current?.setValue('role', 'Engineering Lead');
            }}
          />
          <Button
            label="Reset"
            severity="warning"
            outlined
            onClick={() => {
              formRef.current?.reset();
              setSnapshot(null);
            }}
          />
        </div>

        {snapshot && (
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono">
            {snapshot}
          </pre>
        )}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// ValidationErrors — submit empty form to trigger errors
// ---------------------------------------------------------------------------
export const ValidationErrors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click Submit without filling any fields to trigger inline validation errors. All three fields are marked `required`. The `onError` callback fires when validation fails.',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[{ type: 'submit', label: 'Create Account' }]}
      onError={(errors) => console.warn('Validation errors:', errors)}
      onSubmit={(values) => console.log('Account created:', values)}
    >
      <InputText fieldName="fullName" label="Full Name" required placeholder="Your name" />
      <InputText
        fieldName="email"
        label="Work Email"
        required
        placeholder="you@company.com"
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <InputText
        fieldName="password"
        label="Password"
        required
        minLength={8}
        placeholder="At least 8 characters"
      />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// CustomFooterSlot — replace default button row via slots.footer
// ---------------------------------------------------------------------------
export const CustomFooterSlot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `slots={{ footer: <...> }}` to completely replace the default button row. The slot receives no automatic submit behaviour — wire your own `type="submit"` button or call `formRef.current?.getValues()` manually.',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[]}
      slots={{
        footer: (
          <div className="flex items-center justify-between border-t pt-4 mt-2">
            <p className="text-xs text-gray-400">All fields are required</p>
            <div className="flex gap-2">
              <Button label="Discard" severity="secondary" text />
              <Button label="Save Draft" severity="info" outlined />
              <Button label="Publish" severity="success" type="submit" />
            </div>
          </div>
        ),
      }}
      onSubmit={(values) => console.log('Published:', values)}
    >
      <InputText fieldName="title" label="Post Title" required placeholder="Year in Review: 2025" />
      <InputText fieldName="slug" label="URL Slug" required placeholder="year-in-review-2025" />
      <InputText fieldName="category" label="Category" placeholder="Engineering" />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// MultiColumnLayout — columnPerRow=3 with 6 fields
// ---------------------------------------------------------------------------
export const MultiColumnLayout: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `columnPerRow={3}` (or any integer) to arrange fields in a multi-column grid. The Form component distributes children evenly across columns using CSS grid.',
      },
    },
  },
  render: () => (
    <Form
      buttonsConfig={[{ type: 'reset' }, { type: 'submit', label: 'Register Asset' }]}
      columnPerRow={3}
      onSubmit={(values) => console.log('Asset registered:', values)}
    >
      <InputText fieldName="assetTag" label="Asset Tag" required placeholder="AST-20250001" />
      <InputText fieldName="serialNumber" label="Serial Number" placeholder="SN-XK9-4421" />
      <InputText fieldName="model" label="Model" placeholder="Dell OptiPlex 7090" />
      <InputText fieldName="location" label="Location" placeholder="HQ — Floor 3, Bay C" />
      <InputText fieldName="assignedTo" label="Assigned To" placeholder="Kenji Watanabe" />
      <InputText fieldName="purchaseDate" label="Purchase Date" placeholder="2025-01-15" />
    </Form>
  ),
};

// ---------------------------------------------------------------------------
// LoginFormTemplate — realistic email + password login
// ---------------------------------------------------------------------------
export const LoginFormTemplate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic login form composed with Form, InputText, Checkbox, and a custom footer slot. Demonstrates how multiple component types work together inside a single Form context.',
      },
    },
  },
  render: () => {
    const [submitted, setSubmitted] = useState(false);

    return submitted ? (
      <div className="text-center space-y-2 py-8">
        <p className="text-success-600 font-medium">Signed in successfully.</p>
        <Button label="Sign out" severity="secondary" text onClick={() => setSubmitted(false)} />
      </div>
    ) : (
      <div className="w-80 mx-auto space-y-2">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
        </div>
        <Form
          buttonsConfig={[{ type: 'submit', label: 'Sign in', severity: 'primary', style: 'fill' }]}
          columnPerRow={1}
          onSubmit={() => setSubmitted(true)}
        >
          <InputText
            fieldName="email"
            label="Email address"
            required
            placeholder="amelia@company.io"
            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          />
          <InputPassword
            fieldName="password"
            label="Password"
            required
            placeholder="Enter your password"
          />
          <Checkbox
            fieldName="rememberMe"
            label="Remember me for 30 days"
            mode="binary"
          />
        </Form>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// UserProfileTemplate — name, email, role dropdown, timezone
// ---------------------------------------------------------------------------
export const UserProfileTemplate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A user profile edit form showing InputText fields alongside a Dropdown for role and timezone selection. Pre-populated with realistic data via `defaultValues`.',
      },
    },
  },
  render: () => {
    const [saved, setSaved] = useState(false);
    const [profileValues, setProfileValues] = useState<Record<string, unknown> | null>(null);

    const roleOptions = [
      { label: 'Administrator', value: 'admin' },
      { label: 'Engineering Lead', value: 'eng-lead' },
      { label: 'Product Manager', value: 'product-manager' },
      { label: 'Designer', value: 'designer' },
      { label: 'Analyst', value: 'analyst' },
    ];

    const timezoneOptions = [
      { label: 'Asia/Jakarta (WIB, UTC+7)', value: 'Asia/Jakarta' },
      { label: 'Asia/Singapore (SGT, UTC+8)', value: 'Asia/Singapore' },
      { label: 'Asia/Tokyo (JST, UTC+9)', value: 'Asia/Tokyo' },
      { label: 'Europe/London (GMT/BST)', value: 'Europe/London' },
      { label: 'America/New_York (EST/EDT)', value: 'America/New_York' },
    ];

    return (
      <div className="w-full max-w-xl space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information and preferences.</p>
        </div>

        {saved && profileValues && (
          <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-3 text-sm text-success-700 dark:text-success-300">
            Profile updated for <strong>{String(profileValues.displayName)}</strong>.
          </div>
        )}

        <Form
          buttonsConfig={[
            { type: 'reset', label: 'Discard Changes' },
            { type: 'submit', label: 'Save Profile' },
          ]}
          defaultValues={{
            displayName: 'Kenji Watanabe',
            email: 'k.watanabe@company.io',
            role: 'eng-lead',
            timezone: 'Asia/Tokyo',
          }}
          resetOnSubmit={false}
          onSubmit={(values) => {
            setProfileValues(values);
            setSaved(true);
          }}
        >
          <InputText fieldName="displayName" label="Display Name" required />
          <InputText
            fieldName="email"
            label="Email Address"
            required
            pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          />
          <Dropdown
            fieldName="role"
            label="Role"
            options={roleOptions}
            required
          />
          <Dropdown
            fieldName="timezone"
            label="Timezone"
            options={timezoneOptions}
          />
        </Form>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// WithButtonTypesShowcase — static display of buttonsConfig array shapes
// ---------------------------------------------------------------------------
const buttonTypesConfig: ButtonConfig[] = [
  { type: 'back' },
  { type: 'reset' },
  { type: 'submit-raw' },
  { type: 'submit' },
];

export const ButtonTypesShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Static showcase of all button types using their unmodified defaults. Use the Controls tab to explore `columnPerRow` and `resetOnSubmit` props on this story.',
      },
    },
  },
  args: {
    buttonsConfig: buttonTypesConfig,
    columnPerRow: 2,
    resetOnSubmit: true,
  },
  render: (args) => (
    <Form {...args} onSubmit={(values) => console.log(values)}>
      <InputText fieldName="fieldA" label="Contact Name" placeholder="Amelia Hartwell" />
      <InputText fieldName="fieldB" label="Company" placeholder="Meridian Systems" />
    </Form>
  ),
};
