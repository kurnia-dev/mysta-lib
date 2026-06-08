import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Pagination** is a controlled page navigation bar. The caller passes \`page\` (1-based current page) and \`totalPages\`, and handles \`onPageChange\` to update its own state.
When \`total\` and \`pageSize\` are provided, the bar shows a "start–end of total" record count instead of "Page X of Y".
The component always shows up to five page buttons centred around the current page — no separate ellipsis prop is needed; window sliding is built-in.
Use it below any data table or list that supports server-side or client-side pagination.
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal controlled usage: 10 pages, first page selected. Click page buttons or prev/next arrows to navigate.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FirstPage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page 1 selected — the "Previous" arrow is disabled. With `total` and `pageSize`, shows "1–25 of 250".',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={25} total={250} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const LastPage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Last page selected — the "Next" arrow is disabled.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={25} total={250} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FewPages: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Only 3 pages — all buttons are visible simultaneously, no window sliding needed.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={20} total={52} totalPages={3} onPageChange={setPage} />
      </div>
    );
  },
};

export const ManyPages: Story = {
  parameters: {
    docs: {
      description: {
        story: '53 total pages — the component shows a 5-button window centred on the current page. Navigate to see how the window slides.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(26);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={10} total={523} totalPages={53} onPageChange={setPage} />
      </div>
    );
  },
};

export const WithTotal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When `total` and `pageSize` are provided the left side shows "start–end of total" instead of "Page X of Y".',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={20} total={187} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const ZeroResults: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: 0 total results. The component gracefully shows "0 results" and disables both arrows.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={20} total={0} totalPages={1} onPageChange={setPage} />
      </div>
    );
  },
};

export const SinglePage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Only one page — both Previous and Next are disabled. Useful when a filtered result fits on one page.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="w-full max-w-lg">
        <Pagination page={page} pageSize={50} total={12} totalPages={1} onPageChange={setPage} />
      </div>
    );
  },
};

export const WithTableCombo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination is almost always used alongside a data table — this shows the full wired pattern: a client-side sliced list of transactions controlled by Pagination below it.',
      },
    },
  },
  render: () => {
    const PAGE_SIZE = 5;
    const allRows = [
      { id: 'TXN-001', date: '2026-05-01', description: 'Stripe subscription renewal', amount: '$49.00' },
      { id: 'TXN-002', date: '2026-05-03', description: 'AWS infrastructure invoice', amount: '$312.40' },
      { id: 'TXN-003', date: '2026-05-05', description: 'Figma team plan', amount: '$75.00' },
      { id: 'TXN-004', date: '2026-05-07', description: 'GitHub Enterprise seat', amount: '$21.00' },
      { id: 'TXN-005', date: '2026-05-09', description: 'Vercel Pro plan', amount: '$20.00' },
      { id: 'TXN-006', date: '2026-05-10', description: 'Linear annual license', amount: '$96.00' },
      { id: 'TXN-007', date: '2026-05-12', description: 'Notion team plan', amount: '$16.00' },
      { id: 'TXN-008', date: '2026-05-14', description: 'Slack pro workspace', amount: '$87.50' },
      { id: 'TXN-009', date: '2026-05-16', description: 'Loom business plan', amount: '$15.00' },
      { id: 'TXN-010', date: '2026-05-18', description: 'Intercom starter plan', amount: '$74.00' },
      { id: 'TXN-011', date: '2026-05-19', description: 'PagerDuty Essential', amount: '$21.00' },
      { id: 'TXN-012', date: '2026-05-20', description: 'Datadog APM monthly', amount: '$189.00' },
    ];

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allRows.length / PAGE_SIZE);
    const rows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <div className="w-full max-w-2xl space-y-0">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-gray-600 dark:text-gray-300">ID</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-600 dark:text-gray-300">Date</th>
              <th className="text-left px-4 py-2.5 font-medium text-gray-600 dark:text-gray-300">Description</th>
              <th className="text-right px-4 py-2.5 font-medium text-gray-600 dark:text-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}
                key={row.id}
              >
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{row.id}</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">{row.date}</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-gray-100">{row.description}</td>
                <td className="px-4 py-2.5 text-right font-medium">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={allRows.length}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    );
  },
};
