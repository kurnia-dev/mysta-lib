import React from 'react';

import { Table } from 'lib/components';
import { TableColumn } from 'lib/components/table/Table.d';

const TableDocs: React.FC = () => {
  type User = {
    id: string;
    name: string;
    email: string;
    age: number;
    role: 'Admin' | 'User' | 'Guest';
  };

  const columns: TableColumn<User>[] = [
    { field: 'name', dataType: 'string', header: 'Name' },
    { field: 'email', dataType: 'string', header: 'Email' },
    { field: 'age', dataType: 'number', header: 'Age' },
    { field: 'role', dataType: 'string', header: 'Role' },
  ];

  const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@mail.com', age: 25, role: 'Admin' },
    { id: '2', name: 'Bob', email: 'bob@mail.com', age: 30, role: 'User' },
    {
      id: '3',
      name: 'Charlie',
      email: 'charlie@mail.com',
      age: 28,
      role: 'User',
    },
    { id: '4', name: 'David', email: 'david@mail.com', age: 35, role: 'Admin' },
    { id: '5', name: 'Eve', email: 'eve@mail.com', age: 27, role: 'Guest' },
    { id: '6', name: 'Frank', email: 'frank@mail.com', age: 32, role: 'User' },
    { id: '7', name: 'Grace', email: 'grace@mail.com', age: 29, role: 'User' },
    {
      id: '8',
      name: 'Hannah',
      email: 'hannah@mail.com',
      age: 24,
      role: 'Guest',
    },
    { id: '9', name: 'Ivan', email: 'ivan@mail.com', age: 31, role: 'Admin' },
    { id: '10', name: 'Judy', email: 'judy@mail.com', age: 26, role: 'User' },
    { id: '11', name: 'Ken', email: 'ken@mail.com', age: 34, role: 'User' },
  ];

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Table Component</h2>
      <p className="text-gray-500">
        Flexible table component with support for pagination, sorting, and
        custom rendering.
      </p>

      <div className="overflow-x-auto">
        <Table<User>
          columns={columns}
          data={users}
          mode="paginate"
          selectionMode="single"
        />
      </div>
    </div>
  );
};

export default TableDocs;
