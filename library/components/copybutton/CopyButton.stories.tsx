import type { Meta, StoryObj } from '@storybook/react';

import { CopyButton } from './CopyButton';

const meta: Meta<typeof CopyButton> = {
  title: 'Actions/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**CopyButton** is a single-purpose button that writes a \`text\` value to the user's clipboard when clicked.

On success it switches its label to \`successLabel\` (default: "Copied!") and shows a checkmark icon, then automatically resets after a short delay.
Use it inline next to code blocks, API keys, URLs, tokens, or any text the user needs to copy without selecting manually.
The button renders as a \`<button>\` element and does not require any external state.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: { text: 'npm install @mystaline/mysta-commons' },
};

export const WithLabel: Story = {
  args: { label: 'Copy token', text: 'sk-abc123def456' },
};

export const WithSuccessLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom `successLabel` shown after copying — useful when the action context should be clear (e.g. "Link copied!" instead of the generic "Copied!").',
      },
    },
  },
  args: { label: 'Copy link', successLabel: 'Link copied!', text: 'https://example.com/share/abc123' },
};

export const ShortToken: Story = {
  args: { label: 'Copy API key', successLabel: 'Key copied!', text: 'mystaline-key-x9z2' },
};

export const CodeSnippet: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CopyButton embedded in a dark code block — the most common usage pattern for installation instructions.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2 bg-gray-900 text-gray-100 px-4 py-3 rounded-lg text-sm font-mono">
      <code className="flex-1">pnpm add @mystaline/mysta-commons</code>
      <CopyButton className="text-gray-400 hover:text-gray-100 border-gray-700" text="pnpm add @mystaline/mysta-commons" />
    </div>
  ),
};

export const CopyCode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Copying a bash command — realistic developer tooling pattern where the user needs the exact command without typos.',
      },
    },
  },
  render: () => (
    <div className="w-full max-w-lg space-y-2">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Quick Install</p>
      {[
        { label: 'npm', cmd: 'npm install @mystaline/mysta-commons' },
        { label: 'pnpm', cmd: 'pnpm add @mystaline/mysta-commons' },
        { label: 'yarn', cmd: 'yarn add @mystaline/mysta-commons' },
      ].map(({ label, cmd }) => (
        <div key={label} className="flex items-center gap-2 bg-gray-950 text-gray-200 px-4 py-2.5 rounded-lg text-sm font-mono">
          <span className="text-gray-500 text-xs w-8 shrink-0">{label}</span>
          <code className="flex-1 text-xs">{cmd}</code>
          <CopyButton
            className="text-gray-500 hover:text-gray-200 border-gray-700 text-xs"
            label="Copy"
            successLabel="Copied!"
            text={cmd}
          />
        </div>
      ))}
    </div>
  ),
};

export const CopyLink: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Copying a share URL — the label makes it explicit what is being copied so users are not surprised.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg w-96">
      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span className="flex-1 text-sm text-gray-600 dark:text-gray-300 truncate font-mono">
        https://mystaline.dev/share/r3Fk2Xm9
      </span>
      <CopyButton
        label="Copy link"
        successLabel="Link copied!"
        text="https://mystaline.dev/share/r3Fk2Xm9"
      />
    </div>
  ),
};

export const CopyApiKey: Story = {
  parameters: {
    docs: {
      description: {
        story: 'API key display with masked value — the copy button copies the real key while the UI shows a masked version for security. Click to copy and verify in clipboard.',
      },
    },
  },
  render: () => (
    <div className="w-96 space-y-3">
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">API Key</p>
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-2.5 rounded-lg">
          <span className="flex-1 font-mono text-sm text-gray-700 dark:text-gray-300 tracking-widest">
            sk-••••••••••••••••••••3f9a
          </span>
          <CopyButton
            label="Copy key"
            successLabel="Key copied!"
            text="sk-prod-live-x7Km9nRq2pL4wZ8vA1eT3f9a"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Keep this key secret. Rotate it in Settings if compromised.
      </p>
    </div>
  ),
};

export const InInputField: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CopyButton positioned at the trailing edge of an input — common for referral codes, webhook URLs, and read-only token fields.',
      },
    },
  },
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1" htmlFor="webhook-url">
          Webhook URL
        </label>
        <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <input
            readOnly
            className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 outline-none font-mono"
            id="webhook-url"
            value="https://api.mystaline.dev/webhooks/evt_x9z2"
          />
          <div className="border-l border-gray-200 dark:border-gray-700 px-1">
            <CopyButton
              className="border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
              label="Copy"
              successLabel="Copied!"
              text="https://api.mystaline.dev/webhooks/evt_x9z2"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 block mb-1" htmlFor="referral-code">
          Referral Code
        </label>
        <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <input
            readOnly
            className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 outline-none font-mono tracking-widest"
            id="referral-code"
            value="MYSTA-PROMO-2026"
          />
          <div className="border-l border-gray-200 dark:border-gray-700 px-1">
            <CopyButton
              className="border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
              label="Copy"
              successLabel="Copied!"
              text="MYSTA-PROMO-2026"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithSuccessFeedback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the automatic success state — click any button and the icon switches to a checkmark with the success label. It resets automatically after 2 seconds.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <CopyButton label="Copy email" successLabel="Email copied!" text="priyabagus@example.com" />
      <CopyButton label="Copy username" successLabel="Username copied!" text="mystaline-dev" />
      <CopyButton label="Copy bearer token" successLabel="Token copied!" text="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test" />
    </div>
  ),
};
