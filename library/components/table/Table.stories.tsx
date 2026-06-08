import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '../searchbar/SearchBar';
import { Table } from './Table';
import type { TableColumn } from './Table.d';

// ---------------------------------------------------------------------------
// Domain types & fixture data
// ---------------------------------------------------------------------------

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  joinedAt: string;
};

const users: User[] = [
  { id: '1', name: 'Alice Chen',     email: 'alice@acme.com',   role: 'Admin',   status: 'Active',   department: 'Engineering', joinedAt: '2022-03-14' },
  { id: '2', name: 'Bob Smith',      email: 'bob@acme.com',     role: 'Editor',  status: 'Active',   department: 'Marketing',   joinedAt: '2022-07-01' },
  { id: '3', name: 'Carol Davis',    email: 'carol@acme.com',   role: 'Viewer',  status: 'Inactive', department: 'Finance',     joinedAt: '2021-11-20' },
  { id: '4', name: 'Dave Wilson',    email: 'dave@acme.com',    role: 'Editor',  status: 'Active',   department: 'Engineering', joinedAt: '2023-01-08' },
  { id: '5', name: 'Eve Martinez',   email: 'eve@acme.com',     role: 'Viewer',  status: 'Pending',  department: 'HR',          joinedAt: '2023-06-15' },
  { id: '6', name: 'Frank Lee',      email: 'frank@acme.com',   role: 'Admin',   status: 'Active',   department: 'Engineering', joinedAt: '2021-04-22' },
  { id: '7', name: 'Grace Kim',      email: 'grace@acme.com',   role: 'Editor',  status: 'Active',   department: 'Design',      joinedAt: '2022-09-10' },
  { id: '8', name: 'Henry Taylor',   email: 'henry@acme.com',   role: 'Viewer',  status: 'Inactive', department: 'Sales',       joinedAt: '2020-12-01' },
  { id: '9', name: 'Irene Wang',     email: 'irene@acme.com',   role: 'Editor',  status: 'Active',   department: 'Marketing',   joinedAt: '2023-03-27' },
  { id: '10', name: 'James Brown',   email: 'james@acme.com',   role: 'Viewer',  status: 'Pending',  department: 'Finance',     joinedAt: '2023-08-05' },
];

const baseColumns: TableColumn<User>[] = [
  { field: 'name',  dataType: 'string', header: 'Name' },
  { field: 'email', dataType: 'string', header: 'Email' },
  { field: 'role',  dataType: 'string', header: 'Role' },
];

const statusBadge = (status: string): JSX.Element => {
  const map: Record<string, string> = {
    Active:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Inactive: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    Pending:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Table<User>> = {
  title: 'Preset/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Table** is a data-grid component that supports two display modes:

- **\`infinite-scroll\`** — renders all rows at once; ideal for small-to-medium static datasets.
- **\`paginate\`** — adds a built-in pagination toolbar; use with larger datasets or server-side fetch.

### Column definition (\`TableColumn<T>\`)
| Field | Type | Description |
|---|---|---|
| \`field\` | \`keyof T\` | Data key to read from each row |
| \`dataType\` | \`'string' \\| 'number' \\| 'boolean' \\| 'array'\` | Controls sort/display logic |
| \`header\` | \`string\` | Column header label |
| \`sortable\` | \`boolean\` | Enables click-to-sort on this column |
| \`headerCellRender\` | \`() => ReactNode\` | Custom header cell renderer |
| \`bodyCellRender\` | \`(row, index) => ReactNode\` | Custom body cell renderer |

### Selection modes
| \`selectionMode\` | Behaviour |
|---|---|
| \`'none'\` (default) | No row selection |
| \`'single'\` | Single row; use \`selection\` (ModelValue) |
| \`'multi'\` | Checkbox per row; use \`selection\` (ModelValue) |

Pass static data via \`data\` or an async \`fetchFunction\` for server-driven tables.
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['infinite-scroll', 'paginate'],
      description: 'Pagination mode.',
      table: { defaultValue: { summary: 'infinite-scroll' } },
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multi'],
      description: 'Row selection behaviour.',
      table: { defaultValue: { summary: 'none' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Table<User>>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal table: three string columns, static data, no selection, infinite-scroll mode.',
      },
    },
  },
  render: () => <Table columns={baseColumns} data={users.slice(0, 5)} mode="infinite-scroll" />,
};

export const Sortable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add `sortable: true` to any column to enable click-to-sort on that column.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        { field: 'name',  dataType: 'string', header: 'Name',   sortable: true },
        { field: 'email', dataType: 'string', header: 'Email',  sortable: true },
        { field: 'role',  dataType: 'string', header: 'Role',   sortable: true },
        { field: 'status', dataType: 'string', header: 'Status', sortable: false },
      ]}
      data={users}
      mode="infinite-scroll"
    />
  ),
};

export const WithCustomCells: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `bodyCellRender` to replace any cell with a custom React element — here a colored status badge.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        { field: 'name',  dataType: 'string', header: 'Name' },
        { field: 'email', dataType: 'string', header: 'Email' },
        {
          field: 'status',
          dataType: 'string',
          header: 'Status',
          bodyCellRender: (row) => statusBadge(row.status),
        },
      ]}
      data={users}
      mode="infinite-scroll"
    />
  ),
};

export const WithCustomHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `headerCellRender` to render a custom element inside the column header — useful for adding icons, tooltips, or filter toggles.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        {
          field: 'name',
          dataType: 'string',
          header: 'Name',
          headerCellRender: () => <span className="text-primary-500 font-bold">★ Name</span>,
        },
        { field: 'email', dataType: 'string', header: 'Email' },
        { field: 'role',  dataType: 'string', header: 'Role' },
      ]}
      data={users}
      mode="infinite-scroll"
    />
  ),
};

export const SingleSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click a row to select it. `selectionMode="single"` adds a radio indicator and highlights the active row.',
      },
    },
  },
  render: () => (
    <Table columns={baseColumns} data={users} mode="infinite-scroll" selectionMode="single" />
  ),
};

export const MultiSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each row gets a checkbox. `selectionMode="multi"` enables bulk operations.',
      },
    },
  },
  render: () => (
    <Table columns={baseColumns} data={users} mode="infinite-scroll" selectionMode="multi" />
  ),
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When `data` is an empty array the table renders its built-in empty state.',
      },
    },
  },
  render: () => <Table columns={baseColumns} data={[]} mode="infinite-scroll" />,
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Switch to `mode="paginate"` to activate the pagination toolbar. `rowsOptions` controls the page-size selector.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        ...baseColumns,
        { field: 'department', dataType: 'string', header: 'Department' },
        { field: 'joinedAt',   dataType: 'string', header: 'Joined' },
      ]}
      data={users}
      defaultRow={10}
      mode="paginate"
      rowsOptions={[5, 10, 25]}
    />
  ),
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add a trailing actions column using `bodyCellRender` — no `field` data is read, just buttons for Edit and Delete.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        { field: 'name',  dataType: 'string', header: 'Name' },
        { field: 'email', dataType: 'string', header: 'Email' },
        { field: 'role',  dataType: 'string', header: 'Role' },
        {
          field: 'id',
          dataType: 'string',
          header: 'Actions',
          bodyCellRender: (row) => (
            <div className="flex items-center gap-2">
              <button
                className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                type="button"
                onClick={() => alert(`Edit ${row.name}`)}
              >
                Edit
              </button>
              <button
                className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
                type="button"
                onClick={() => alert(`Delete ${row.name}`)}
              >
                Delete
              </button>
            </div>
          ),
        },
      ]}
      data={users}
      mode="infinite-scroll"
    />
  ),
};

export const WithStatusBadge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Colorised status badges via `bodyCellRender`. Active = green, Inactive = red, Pending = yellow.',
      },
    },
  },
  render: () => (
    <Table
      columns={[
        { field: 'name',       dataType: 'string', header: 'Name' },
        { field: 'email',      dataType: 'string', header: 'Email' },
        { field: 'department', dataType: 'string', header: 'Department' },
        {
          field: 'status',
          dataType: 'string',
          header: 'Status',
          bodyCellRender: (row) => statusBadge(row.status),
        },
      ]}
      data={users}
      mode="infinite-scroll"
    />
  ),
};

export const WithSearchFilter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Composition story: SearchBar filters table rows client-side by name or email. Type to narrow results.',
      },
    },
  },
  render: () => {
    const [query, setQuery] = useState('');
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <div className="space-y-3">
        <SearchBar placeholder="Search by name or email…" value={query} onChange={setQuery} />
        <Table
          columns={[
            { field: 'name',   dataType: 'string', header: 'Name' },
            { field: 'email',  dataType: 'string', header: 'Email' },
            { field: 'role',   dataType: 'string', header: 'Role' },
            { field: 'status', dataType: 'string', header: 'Status', bodyCellRender: (row) => statusBadge(row.status) },
          ]}
          data={filtered}
          mode="infinite-scroll"
        />
      </div>
    );
  },
};

export const UserManagementTable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full user management scenario: 10 users, 6 columns including status badge and action buttons, multi-select enabled.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <div className="space-y-2">
        {selected.length > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {selected.length} row{selected.length > 1 ? 's' : ''} selected
          </div>
        )}
        <Table
          columns={[
            { field: 'name',       dataType: 'string', header: 'Name', sortable: true },
            { field: 'email',      dataType: 'string', header: 'Email' },
            { field: 'role',       dataType: 'string', header: 'Role', sortable: true },
            { field: 'department', dataType: 'string', header: 'Department' },
            { field: 'joinedAt',   dataType: 'string', header: 'Joined' },
            {
              field: 'status',
              dataType: 'string',
              header: 'Status',
              bodyCellRender: (row) => statusBadge(row.status),
            },
            {
              field: 'id',
              dataType: 'string',
              header: '',
              bodyCellRender: (row) => (
                <div className="flex items-center gap-1.5">
                  <button
                    className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    type="button"
                    onClick={() => alert(`Edit ${row.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 transition-colors"
                    type="button"
                    onClick={() => alert(`Delete ${row.name}`)}
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
          data={users}
          mode="paginate"
          rowsOptions={[5, 10, 25]}
          selectionMode="multi"
          selection={{ value: selected, onChange: setSelected }}
        />
      </div>
    );
  },
};
