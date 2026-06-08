import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Preset/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Separator** is a thin visual divider built on Radix UI's \`Separator.Root\` primitive.
It renders as a horizontal line by default; pass \`orientation="vertical"\` for an inline divider.
Set \`decorative\` to remove the element from the accessibility tree when it is purely presentational.
Use it between form sections, between navigation items in a toolbar, or as an "OR" divider in authentication flows.
All standard HTML div attributes (including \`className\` and \`style\`) pass through directly.
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator line.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    decorative: {
      control: 'boolean',
      description: 'When true, the element is hidden from assistive technologies.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal separator between two content blocks — the default orientation.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-72">
      <p className="text-sm text-gray-700 dark:text-gray-200">Section one content</p>
      <Separator />
      <p className="text-sm text-gray-700 dark:text-gray-200">Section two content</p>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical separator used to divide inline elements — set an explicit height via `className` to control the line length.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm text-gray-700 dark:text-gray-200">Home</span>
      <Separator className="h-full" orientation="vertical" />
      <span className="text-sm text-gray-700 dark:text-gray-200">About</span>
      <Separator className="h-full" orientation="vertical" />
      <span className="text-sm text-gray-700 dark:text-gray-200">Contact</span>
    </div>
  ),
};

export const Decorative: Story = {
  parameters: {
    docs: {
      description: {
        story: '`decorative` removes the separator from the accessibility tree. Use this when the line is purely visual and conveys no structural meaning.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-72">
      <p className="text-sm text-gray-700 dark:text-gray-200">Content above</p>
      <Separator decorative />
      <p className="text-sm text-gray-500 dark:text-gray-400 text-xs">
        This separator is aria-hidden — screen readers skip it.
      </p>
    </div>
  ),
};

export const WithColor: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom color applied via `className`. The Separator passes all HTML attributes through, so any Tailwind border color class works.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 w-72">
      {[
        { label: 'Default (gray)', className: undefined },
        { label: 'Brand blue', className: 'bg-blue-500' },
        { label: 'Danger red', className: 'bg-red-400' },
        { label: 'Success green', className: 'bg-green-400' },
      ].map(({ label, className }) => (
        <div className="space-y-3" key={label}>
          <p className="text-xs text-gray-400">{label}</p>
          <Separator className={className} />
        </div>
      ))}
    </div>
  ),
};

export const InNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical separators dividing navigation links in a toolbar — a common breadcrumb or horizontal nav pattern.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg w-fit">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Dashboard</span>
      <Separator className="h-4" orientation="vertical" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Reports</span>
      <Separator className="h-4" orientation="vertical" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Settings</span>
    </div>
  ),
};

export const InForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal separators between form sections — improves visual grouping without card borders.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-5">
      {[
        { heading: 'Personal Information', body: 'Full name, date of birth, nationality' },
        { heading: 'Contact Details', body: 'Email address, phone number, mailing address' },
        { heading: 'Security', body: 'Password, two-factor authentication, session management' },
        { heading: 'Notifications', body: 'Email digests, push alerts, marketing preferences' },
      ].map((section, i, arr) => (
        <div key={section.heading}>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{section.heading}</h3>
            <p className="text-xs text-gray-500 mt-1">{section.body}</p>
          </div>
          {i < arr.length - 1 && <Separator className="mt-5" />}
        </div>
      ))}
    </div>
  ),
};

export const OrDivider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic "OR" divider used in authentication screens between a credential form and a social login button.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-4">
      {/* Sign-in form mock */}
      <div className="space-y-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-400">
          email@example.com
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-400">
          ••••••••
        </div>
        <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium py-2.5 rounded-lg" type="button">
          Sign In
        </button>
      </div>

      {/* OR separator */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" decorative />
        <span className="text-xs text-gray-400 font-medium shrink-0">OR</span>
        <Separator className="flex-1" decorative />
      </div>

      {/* Social login */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" type="button">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  ),
};

export const SectionDivider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Labelled separator ("Additional Information") used to introduce optional or secondary form sections.',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-5">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Full Name</p>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-400">Priya Bagus Amanullah</div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</p>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-400">priya@example.com</div>
        </div>
      </div>

      {/* Labelled section separator */}
      <div className="flex items-center gap-3">
        <Separator className="flex-1" decorative />
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider shrink-0">Additional Information</span>
        <Separator className="flex-1" decorative />
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Company (optional)</p>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-400">Qtera Technologies</div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Job Title (optional)</p>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-400">Backend Engineer</div>
        </div>
      </div>
    </div>
  ),
};
