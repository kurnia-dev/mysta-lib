import type { Meta, StoryObj } from '@storybook/react';

import { useCopyToClipboard } from './useCopyToClipboard';

const meta: Meta = {
  title: 'Hooks/useCopyToClipboard',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**useCopyToClipboard** writes text to the clipboard via the Clipboard API and temporarily flips a \`copied\` boolean for UI feedback.

\`\`\`ts
const [copied, copy] = useCopyToClipboard(resetDelay?: number);
// copied: boolean — true for \`resetDelay\`ms after a successful copy
// copy: (text: string) => Promise<void>
\`\`\`

- \`resetDelay\` — how long (in milliseconds) \`copied\` stays \`true\` before resetting to \`false\`. Defaults to \`2000\`.
- \`copied\` is set to \`false\` silently on clipboard failure (e.g. permission denied, insecure context).
- Call \`copy(text)\` to write any string to the clipboard.

> **Browser-only:** Requires \`navigator.clipboard\` (HTTPS or localhost). Clipboard write permission may be required in some browsers.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------
function DefaultDemo() {
  const [copied, copy] = useCopyToClipboard(2000);

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-72">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Copy to clipboard</h3>
      <div className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-3 text-sm font-mono text-neutral-700 dark:text-neutral-300 text-center">
        Hello, World!
      </div>
      <button
        onClick={() => copy('Hello, World!')}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-violet-600 hover:bg-violet-700 text-white'
        }`}
      >
        {copied ? '✓ Copied!' : '📋 Copy to clipboard'}
      </button>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center">
        {copied ? 'Paste anywhere (Ctrl+V / ⌘V) to verify.' : 'Click the button to copy the text above.'}
      </p>
    </div>
  );
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click "Copy to clipboard". The button turns green for 2 seconds, then resets. Paste anywhere to confirm the text was copied.',
      },
    },
  },
  render: () => <DefaultDemo />,
};

// ---------------------------------------------------------------------------
// CopyApiKey
// ---------------------------------------------------------------------------
const MOCK_API_KEY = 'sk-mysta-a8f3d9c1e4b72f06a5d8e3c1b9f4a720';

function CopyApiKeyDemo() {
  const [copied, copy] = useCopyToClipboard(3000);
  const maskedKey = MOCK_API_KEY.slice(0, 12) + '•'.repeat(20) + MOCK_API_KEY.slice(-4);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">API Key</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Keep this secret. Do not share it publicly.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-2.5">
        <code className="flex-1 text-xs font-mono text-neutral-700 dark:text-neutral-300 truncate">
          {maskedKey}
        </code>
        <button
          onClick={() => copy(MOCK_API_KEY)}
          title="Copy API key"
          className={`shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all ${
            copied
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
              : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {copied && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-xs text-green-700 dark:text-green-400">
          Full API key copied to clipboard. Remember to keep it secret!
        </div>
      )}

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        The displayed key is masked. The full key is copied to your clipboard.
      </p>
    </div>
  );
}

export const CopyApiKey: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic API key row with a masked display. The "Copy" button copies the full unmasked key. The `copied` state stays `true` for 3 seconds.',
      },
    },
  },
  render: () => <CopyApiKeyDemo />,
};

// ---------------------------------------------------------------------------
// CopyCodeSnippet
// ---------------------------------------------------------------------------
const INSTALL_COMMANDS = [
  { label: 'pnpm', cmd: 'pnpm add @mystaline/mysta-commons' },
  { label: 'npm', cmd: 'npm install @mystaline/mysta-commons' },
  { label: 'yarn', cmd: 'yarn add @mystaline/mysta-commons' },
] as const;

function CopyCodeSnippetDemo() {
  const [copied, copy] = useCopyToClipboard(2000);
  const [activeCopied, setActiveCopied] = useState<string | null>(null);

  const handleCopy = (label: string, cmd: string) => {
    copy(cmd);
    setActiveCopied(label);
    setTimeout(() => setActiveCopied(null), 2100);
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">Installation</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Copy the install command for your package manager.</p>
      </div>

      <div className="flex flex-col gap-2">
        {INSTALL_COMMANDS.map(({ label, cmd }) => {
          const isCopied = activeCopied === label && copied;
          return (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 px-4 py-3"
            >
              <span className="text-xs text-neutral-500 w-8 shrink-0">{label}</span>
              <code className="flex-1 text-xs font-mono text-neutral-200 truncate">{cmd}</code>
              <button
                onClick={() => handleCopy(label, cmd)}
                title={`Copy ${label} command`}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-md transition-all font-medium ${
                  isCopied
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {isCopied ? '✓' : '⎘'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function useState<T>(arg: T): [T, (v: T) => void] {
  const [s, ss] = (window as unknown as { React: { useState: typeof import('react').useState } }).React.useState(arg);
  return [s, ss as (v: T) => void];
}

// Inline useState from React
import { useState as useStateReact } from 'react';

function CopyCodeSnippetInner() {
  const [copied, copy] = useCopyToClipboard(2000);
  const [activeCopied, setActiveCopied] = useStateReact<string | null>(null);

  const handleCopy = (label: string, cmd: string) => {
    copy(cmd);
    setActiveCopied(label);
    setTimeout(() => setActiveCopied(null), 2100);
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-96">
      <div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">Installation</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Copy the install command for your package manager.</p>
      </div>
      <div className="flex flex-col gap-2">
        {INSTALL_COMMANDS.map(({ label, cmd }) => {
          const isCopied = activeCopied === label && copied;
          return (
            <div key={label} className="flex items-center gap-2 rounded-lg bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 px-4 py-3">
              <span className="text-xs text-neutral-500 w-8 shrink-0">{label}</span>
              <code className="flex-1 text-xs font-mono text-neutral-200 truncate">{cmd}</code>
              <button
                onClick={() => handleCopy(label, cmd)}
                title={`Copy ${label} command`}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-md transition-all font-medium ${isCopied ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}
              >
                {isCopied ? '✓' : '⎘'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const CopyCodeSnippet: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A multi-row code block where each row has its own copy button. Each button shows a checkmark for 2 seconds after copying.',
      },
    },
  },
  render: () => <CopyCodeSnippetInner />,
};

// ---------------------------------------------------------------------------
// WithErrorHandling
// ---------------------------------------------------------------------------
function WithErrorHandlingDemo() {
  const [copied, copy] = useCopyToClipboard(2000);
  const [attempted, setAttempted] = useStateReact(false);

  const handleAttemptCopy = async () => {
    setAttempted(true);
    await copy('sensitive data');
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-80">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Error handling</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        The hook silently catches clipboard errors. If the browser blocks access (insecure context or denied permission), <code>copied</code> stays <code>false</code>.
      </p>

      <button
        onClick={handleAttemptCopy}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
          copied ? 'bg-green-500 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'
        }`}
      >
        {copied ? '✓ Copied!' : 'Attempt copy'}
      </button>

      {attempted && (
        <div className={`rounded-md p-3 text-xs border ${
          copied
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
        }`}>
          {copied ? (
            <>copied = <strong>true</strong> — clipboard write succeeded.</>
          ) : (
            <>copied = <strong>false</strong> — clipboard write failed (blocked or not supported). No exception was thrown — the hook swallowed the error silently.</>
          )}
        </div>
      )}

      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        <span className="text-neutral-400">// catch block in hook:</span>
        <br />
        {'catch { setCopied(false); }'}
      </div>
    </div>
  );
}

export const WithErrorHandling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates that `useCopyToClipboard` never throws. On failure (denied permission, insecure context), `copied` stays `false` and the error is silently swallowed.',
      },
    },
  },
  render: () => <WithErrorHandlingDemo />,
};
