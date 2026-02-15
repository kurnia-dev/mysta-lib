import React from 'react';

import { ListItem } from 'lib/components';

import DocTitle from '../DocTitle';

const ListItemDocs: React.FC = () => {
  return (
    <div className="p-4 md:p-16 bg-white rounded-xl flex flex-col gap-8">
      <DocTitle name="List Item" />

      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50 border-gray-200">
        <h3 className="font-semibold text-lg">List Examples</h3>
        <div className="bg-white rounded border divide-y">
          <ListItem
            clickable
            icon="home"
            primary="Rent Payment"
            secondary="Due in 3 days"
            severity="primary"
            trailing="$1,200"
          />
          <ListItem
            clickable
            avatar="https://i.pravatar.cc/150?u=1"
            primary="John Doe"
            secondary="Sent you a message"
            trailing="2m ago"
          />
          <ListItem
            clickable
            icon="alert-triangle"
            primary="Overdraft Warning"
            severity="danger"
            trailing="!"
          />
          <ListItem
            clickable
            icon="check-circle"
            primary="Refund Processed"
            secondary="Successfully refunded $45.00"
            severity="success"
          />
        </div>
      </div>
    </div>
  );
};

export default ListItemDocs;
