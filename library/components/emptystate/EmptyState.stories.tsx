import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Table } from '../table/Table';
import { EmptyState, ErrorState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**EmptyState** communicates that a section has no data to show yet. Use it as a first-class content state — not a hidden fallback — and pair it with an action whenever possible to guide the user toward filling the gap.

**ErrorState** is a specialised variant with a red icon and an optional "Try again" button for failed data loads.

### When to use
- Zero rows in a table or list
- Search / filter returns no matches
- A feature section the user hasn't set up yet
- A permission-gated resource the user cannot access

### Rules of thumb
- Always provide a \`description\` — one sentence explaining why there's nothing here.
- Always provide an \`action\` when the user can do something about it (create, invite, upload).
- Use \`ErrorState\` (not \`EmptyState\`) when the absence is due to a failure, not a data gap.
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

// ---------------------------------------------------------------------------
// Core / variants
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
  },
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Always pair an EmptyState with a CTA button when the user can create the missing content.',
      },
    },
  },
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    action: <Button label="Create project" severity="primary" />,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'No documents',
    description: 'Upload your first document to get started.',
    icon: (
      <svg fill="none" height="48" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="48">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const SearchNoResults: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Show when a search or filter returns no matching rows. Reflect the search term in the description if possible.',
      },
    },
  },
  args: {
    title: 'No results for "quantum computing"',
    description: "We couldn't find any items matching that query. Try a different search term or clear your filters.",
  },
};

export const NoPermission: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use when the user lacks permission to view a resource. Avoid showing an error — a permission boundary is expected, not broken.',
      },
    },
  },
  args: {
    title: 'Access restricted',
    description: "You don't have permission to view this resource. Contact your administrator to request access.",
    icon: (
      <svg fill="none" height="48" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="48">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const Inbox: Story = {
  args: {
    title: 'Your inbox is empty',
    description: 'When you receive messages, they will appear here.',
    action: <Button label="Compose" severity="primary" />,
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const ErrorVariant: Story = {
  name: 'ErrorState',
  parameters: {
    docs: {
      description: {
        story: 'Use `ErrorState` (not `EmptyState`) when data failed to load. It renders a red triangle icon and an optional "Try again" button.',
      },
    },
  },
  render: () => (
    <ErrorState
      description="We couldn't load your data. Check your connection and try again."
      title="Failed to load"
      onRetry={() => alert('Retrying…')}
    />
  ),
};

export const ErrorWithMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Show the raw error `message` for developer-facing error states or debug views.',
      },
    },
  },
  render: () => (
    <ErrorState
      description="Contact support if this problem persists."
      message="TypeError: Cannot read properties of undefined (reading 'data')"
      title="Unexpected error"
      onRetry={() => alert('Retrying…')}
    />
  ),
};

// ---------------------------------------------------------------------------
// Composition stories
// ---------------------------------------------------------------------------

export const InTable: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Composition: the Table component renders EmptyState automatically when `data` is an empty array.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        { field: 'name' as const,  dataType: 'string' as const, header: 'Name' },
        { field: 'email' as const, dataType: 'string' as const, header: 'Email' },
        { field: 'role' as const,  dataType: 'string' as const, header: 'Role' },
      ]}
      data={[]}
      mode="infinite-scroll"
    />
  ),
};

export const InCard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'EmptyState inside a Card — the typical pattern for dashboard widgets with no data yet.',
      },
    },
  },
  render: () => (
    <Card
      mode="container"
      size="md"
      slots={{
        header: <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Recent Activity</span>,
        content: (
          <EmptyState
            description="Your recent activity will appear here once you start using the platform."
            title="No activity yet"
          />
        ),
      }}
    />
  ),
};

export const TeamMembers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Domain-specific EmptyState for a team members page — always offer an invite action so the user has a clear next step.',
      },
    },
  },
  render: () => (
    <div className="max-w-sm">
      <EmptyState
        action={<Button label="Invite teammate" severity="primary" />}
        description="Collaborating is better together. Invite your colleagues to join this workspace."
        icon={(
          <svg fill="none" height="48" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="48">
            <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        title="No team members yet"
      />
    </div>
  ),
};
