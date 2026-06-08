import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Preset/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Calendar** is a standalone date-picker widget that renders a full month grid with navigation controls. It is a **controlled component** — the caller manages the selected date as a Unix timestamp in milliseconds via \`value\` / \`onChange\`.

Use it in date-of-birth fields, event schedulers, booking flows, date filters, or any UI where the user must pick a specific day. Limit selectable dates with \`minDate\` and \`maxDate\` (also timestamps). Pass \`disabled\` to make the entire grid non-interactive.

Calendar is a standalone component with its own controlled state. It does **not** depend on react-hook-form context and does not require a \`<Form>\` wrapper.
        `,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    showNavigation: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Calendar>;

/** Minimal usage — no date selected, full navigation available. */
export const Default: Story = {
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    return (
      <div className="w-96">
        <Calendar value={ts} onChange={setTs} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** Disabled — the grid is non-interactive and all days are visually dimmed. */
export const Disabled: Story = {
  render: () => {
    const [ts] = useState<number | null>(new Date('2026-06-15').getTime());
    return (
      <div className="w-96">
        <Calendar disabled value={ts} onChange={() => undefined} />
        <p className="mt-2 text-xs text-gray-400 text-center">
          The calendar is disabled — no day can be selected.
        </p>
      </div>
    );
  },
};

/** showNavigation=false hides the prev/next month buttons. */
export const WithoutNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showNavigation={false}` removes the month/year navigation header. Useful when the calendar is embedded in a fixed-month context.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    return (
      <div className="w-96">
        <Calendar showNavigation={false} value={ts} onChange={setTs} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** defaultViewDate controls which month is shown before any selection. */
export const WithDefaultViewDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`defaultViewDate` sets the initially displayed month without pre-selecting a date. Here it is set to December 2026 so the calendar opens on that month.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    return (
      <div className="w-96">
        <Calendar
          defaultViewDate={new Date('2026-12-01').getTime()}
          value={ts}
          onChange={setTs}
        />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** Pre-selected date — value is initialised with a specific timestamp. */
export const WithDefaultDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Initialise `value` with a timestamp to pre-select a date. The calendar opens on the month that contains the selected date.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(new Date('2026-07-04').getTime());
    return (
      <div className="w-96">
        <Calendar value={ts} onChange={setTs} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** minDate restricts selection to today or later — past days are greyed out. */
export const MinDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`minDate` set to today\'s midnight. All dates before today are disabled and cannot be selected. Navigate to previous months to see the disabled state.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    return (
      <div className="w-96">
        <p className="mb-2 text-xs text-gray-500">Selectable: today onwards</p>
        <Calendar value={ts} onChange={setTs} minDate={todayMidnight.getTime()} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** maxDate restricts selection to today or earlier — future days are greyed out. */
export const MaxDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`maxDate` set to today. All future dates are disabled. Useful for date-of-birth or historical-record fields.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    return (
      <div className="w-96">
        <p className="mb-2 text-xs text-gray-500">Selectable: today and earlier</p>
        <Calendar value={ts} onChange={setTs} maxDate={Date.now()} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/** MinMaxDate — a narrow window of selectable dates. */
export const MinMaxDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Both `minDate` and `maxDate` active: the selectable window is −3 days to +14 days from today. Days outside the range are disabled.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    const min = Date.now() - 3 * 24 * 60 * 60 * 1000;
    const max = Date.now() + 14 * 24 * 60 * 60 * 1000;
    return (
      <div className="w-96">
        <p className="mb-2 text-xs text-gray-500">
          Selectable window: −3 to +14 days from today
        </p>
        <Calendar value={ts} onChange={setTs} minDate={min} maxDate={max} />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Selected: <strong>{new Date(ts).toDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/**
 * BirthDateField — realistic date-of-birth scenario.
 * maxDate=today prevents future dates; the calendar opens near 1990.
 */
export const BirthDateField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Realistic date-of-birth field: `maxDate` is set to today so no future date can be chosen. `defaultViewDate` opens the calendar near 1990, which is a typical birth year range.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    return (
      <div className="w-96">
        <p className="mb-1 text-sm font-medium">Date of Birth</p>
        <p className="mb-2 text-xs text-gray-500">
          You must be at least 18 years old to register.
        </p>
        <Calendar
          defaultViewDate={new Date('1990-01-01').getTime()}
          maxDate={Date.now()}
          value={ts}
          onChange={setTs}
        />
        {ts && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            Date of Birth: <strong>{new Date(ts).toLocaleDateString()}</strong>
          </p>
        )}
      </div>
    );
  },
};

/**
 * EventScheduler — realistic event date selection.
 * minDate=today ensures only future events can be created.
 */
export const EventScheduler: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Event scheduling scenario: `minDate` is set to today so only future dates are selectable. Selecting a date shows a booking summary below the calendar.',
      },
    },
  },
  render: () => {
    const [ts, setTs] = useState<number | null>(null);
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    return (
      <div className="w-96">
        <p className="mb-1 text-sm font-medium">Event Date</p>
        <p className="mb-2 text-xs text-gray-500">
          Select a date for your upcoming event. Past dates are not available.
        </p>
        <Calendar
          value={ts}
          onChange={setTs}
          minDate={todayMidnight.getTime()}
        />
        {ts ? (
          <div className="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 mb-0.5">Scheduled for</p>
            <p className="text-sm font-semibold">
              {new Date(ts).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-400 text-center">
            No date selected yet.
          </p>
        )}
      </div>
    );
  },
};
