import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { useDebounce } from '../../hooks';

import { Table } from '../table/Table';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Preset/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SearchBar** is a controlled text input designed for filtering, querying, and live search. The caller manages the value via the \`value\` / \`onChange\` pair — SearchBar itself is stateless. Use it above tables, lists, command palettes, or anywhere a user needs to narrow down content by typing.

Optional props: \`showClear\` adds an ✕ button to reset the query; \`showCancel\` adds a labeled cancel action; \`size\` (sm / md / lg) adjusts the visual scale; \`disabled\` prevents input. \`placeholder\` defaults to \`'Search...'\`.

SearchBar is **not** a form field — it does **not** require a \`<Form>\` wrapper and should not be placed inside one.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    showCancel: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

/** Minimal controlled SearchBar — caller manages the value with useState. */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The simplest controlled usage: `value` + `onChange` wired to local state. SearchBar is always controlled — it does not manage its own value.',
      },
    },
  },
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div className="w-80">
        <SearchBar value={query} onChange={setQuery} />
        {query && (
          <p className="mt-2 text-xs text-gray-500">
            Searching for: <strong>{query}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** Custom placeholder replaces the default "Search..." hint text. */
export const WithPlaceholder: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div className="w-80">
        <SearchBar
          placeholder="Search by name or email..."
          value={query}
          onChange={setQuery}
        />
      </div>
    );
  },
};

/**
 * Debounced — the actual search callback fires 300 ms after the user
 * stops typing, reducing unnecessary re-renders or API calls.
 */
export const Debounced: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `useDebounce` hook from the library. The raw input updates instantly, but the "effective query" (used for filtering / API calls) only updates 300 ms after the user stops typing. Watch the label below the bar.',
      },
    },
  },
  render: () => {
    const [raw, setRaw] = useState('');
    const debounced = useDebounce(raw, 300);
    return (
      <div className="w-80 space-y-2">
        <SearchBar
          placeholder="Type to search…"
          value={raw}
          onChange={setRaw}
          showClear
          onClear={() => setRaw('')}
        />
        <p className="text-xs text-gray-500">
          Raw: <strong>{raw || '—'}</strong>
        </p>
        <p className="text-xs text-gray-500">
          Debounced (300 ms): <strong>{debounced || '—'}</strong>
        </p>
      </div>
    );
  },
};

/** Disabled — the input is non-interactive and visually dimmed. */
export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <SearchBar disabled value="" onChange={() => undefined} />
    </div>
  ),
};

/** showClear adds an ✕ button that appears when the field has a value. */
export const ClearButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showClear` (default `true`) renders an ✕ icon when the field has content. `onClear` resets the value. Try typing something then clicking the clear icon.',
      },
    },
  },
  render: () => {
    const [query, setQuery] = useState('Invoice #INV-2026-004');
    return (
      <div className="w-80">
        <SearchBar
          showClear
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />
      </div>
    );
  },
};

/** showCancel adds a labeled "Cancel" action for mobile-style dismiss. */
export const WithCancel: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div className="w-80">
        <SearchBar
          showCancel
          showClear
          value={query}
          onChange={setQuery}
          onCancel={() => setQuery('')}
          onClear={() => setQuery('')}
        />
      </div>
    );
  },
};

/** All three size variants stacked for visual comparison. */
export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three size variants (sm / md / lg) stacked. Sizes affect padding and font scale while the icon remains proportional.',
      },
    },
  },
  render: () => {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    return (
      <div className="w-80 space-y-3">
        <div>
          <p className="mb-1 text-xs text-gray-400">Small</p>
          <SearchBar size="sm" placeholder="Small" value={v1} onChange={setV1} />
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-400">Medium (default)</p>
          <SearchBar size="md" placeholder="Medium" value={v2} onChange={setV2} />
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-400">Large</p>
          <SearchBar size="lg" placeholder="Large" value={v3} onChange={setV3} />
        </div>
      </div>
    );
  },
};

/**
 * WithResults — SearchBar connected to a filtered list.
 * Shows the full controlled-search pattern without a Table.
 */
export const WithResults: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'SearchBar filters a static list of items in real time. The filtered results update on every keystroke. This pattern covers: search input → filter function → render subset.',
      },
    },
  },
  render: () => {
    const allItems = [
      'Alice Chen — alice@example.com',
      'Bob Smith — bob@example.com',
      'Carol Davis — carol@example.com',
      'Dave Wilson — dave@example.com',
      'Eve Martinez — eve@example.com',
      'Frank Lee — frank@example.com',
    ];
    const [query, setQuery] = useState('');
    const filtered = allItems.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <div className="w-80 space-y-3">
        <SearchBar
          showClear
          placeholder="Search members..."
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li key={item} className="px-3 py-2 text-sm">
                {item}
              </li>
            ))
          ) : (
            <li className="px-3 py-4 text-sm text-center text-gray-400">
              No results for &quot;{query}&quot;
            </li>
          )}
        </ul>
        <p className="text-xs text-gray-400 text-right">
          {filtered.length} of {allItems.length} members
        </p>
      </div>
    );
  },
};

/**
 * TableFilterCombo — SearchBar filtering a Table.
 * This is the most common production usage pattern.
 */
export const TableFilterCombo: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The canonical production pattern: SearchBar filters a Table component. The query is applied client-side against `name` and `email` fields. In real apps, replace the static filter with a debounced API call that passes the query as a query param.',
      },
    },
  },
  render: () => {
    type Employee = {
      id: string;
      name: string;
      email: string;
      department: string;
      status: string;
    };

    const allEmployees: Employee[] = [
      { id: '1', name: 'Alice Chen', email: 'alice@acme.com', department: 'Engineering', status: 'Active' },
      { id: '2', name: 'Bob Smith', email: 'bob@acme.com', department: 'Design', status: 'Active' },
      { id: '3', name: 'Carol Davis', email: 'carol@acme.com', department: 'Product', status: 'On Leave' },
      { id: '4', name: 'Dave Wilson', email: 'dave@acme.com', department: 'Engineering', status: 'Active' },
      { id: '5', name: 'Eve Martinez', email: 'eve@acme.com', department: 'Marketing', status: 'Inactive' },
      { id: '6', name: 'Frank Lee', email: 'frank@acme.com', department: 'Engineering', status: 'Active' },
    ];

    const columns = [
      { field: 'name' as const, dataType: 'string' as const, header: 'Name', sortable: true },
      { field: 'email' as const, dataType: 'string' as const, header: 'Email' },
      { field: 'department' as const, dataType: 'string' as const, header: 'Department', sortable: true },
      { field: 'status' as const, dataType: 'string' as const, header: 'Status' },
    ];

    const [query, setQuery] = useState('');
    const filtered = allEmployees.filter((emp) => {
      const q = query.toLowerCase();
      return emp.name.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q);
    });

    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Employees</h2>
          <div className="w-72">
            <SearchBar
              showClear
              placeholder="Search by name or email..."
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
            />
          </div>
        </div>
        <Table columns={columns} data={filtered} mode="infinite-scroll" />
        <p className="text-xs text-gray-400">
          Showing {filtered.length} of {allEmployees.length} employees
        </p>
      </div>
    );
  },
};
