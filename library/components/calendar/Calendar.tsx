import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { CalendarProps } from './Calendar.d';

export const Calendar = (props: CalendarProps): JSX.Element => {
  const {
    className,
    defaultViewDate,
    disabled = false,
    maxDate,
    minDate,
    onChange,
    pt,
    showNavigation = true,
    value,
  } = props;

  // Initialize view date (year/month)
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value);
    if (defaultViewDate) return new Date(defaultViewDate);
    return new Date();
  });

  const preset =
    useComponentPreset('Calendar', {
      props: { disabled },
    }) ?? {};

  // Update view if value changes externally and is valid
  useEffect(() => {
    if (value) {
      setViewDate(new Date(value));
    }
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 0 = Sunday, 1 = Monday, etc.
    const startDay = firstDayOfMonth.getDay();

    // Days from previous month to fill the first row
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Days from next month to fill the last row (6 rows * 7 days = 42 cells total usually standard)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    return isSameDay(new Date(value), date);
  };

  const isToday = (date: Date) => {
    return isSameDay(new Date(), date);
  };

  const isDisabled = (date: Date) => {
    if (disabled) return true;
    const time = date.getTime();
    if (minDate && time < new Date(minDate).setHours(0, 0, 0, 0)) return true;
    if (maxDate && time > new Date(maxDate).setHours(23, 59, 59, 999))
      return true;
    return false;
  };

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return;
    onChange(date.getTime());
    // Auto-switch view if clicking prev/next month day
    if (date.getMonth() !== month) {
      setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { disabled } })?.className,
      )}
      style={pt?.root?.({ props: { disabled } })?.style}
    >
      {/* Header */}
      {showNavigation && (
        <div
          className={clsx(
            preset.header?.className,
            pt?.header?.({ props: { disabled } })?.className,
          )}
          style={pt?.header?.({ props: { disabled } })?.style}
        >
          <button
            aria-label="Previous month"
            className={clsx(
              preset.navButton?.className,
              pt?.navButton?.({ props: { disabled } })?.className,
            )}
            disabled={disabled}
            style={pt?.navButton?.({ props: { disabled } })?.style}
            type="button"
            onClick={handlePrevMonth}
          >
            <Icon name="chevron-left" />
          </button>

          <span
            className={clsx(
              preset.title?.className,
              pt?.title?.({ props: { disabled } })?.className,
            )}
            style={pt?.title?.({ props: { disabled } })?.style}
          >
            {viewDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>

          <button
            aria-label="Next month"
            className={clsx(
              preset.navButton?.className,
              pt?.navButton?.({ props: { disabled } })?.className,
            )}
            disabled={disabled}
            type="button"
            onClick={handleNextMonth}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      )}

      {/* Calendar Grid */}
      <table
        className={clsx(
          preset.table?.className,
          pt?.table?.({ props: { disabled } })?.className,
        )}
        style={pt?.table?.({ props: { disabled } })?.style}
      >
        <thead
          className={clsx(
            preset.thead?.className,
            pt?.thead?.({ props: { disabled } })?.className,
          )}
          style={pt?.thead?.({ props: { disabled } })?.style}
        >
          <tr>
            {weekDays.map((day) => (
              <th
                className={clsx(
                  preset.headCell?.className,
                  pt?.headCell?.({ props: { disabled } })?.className,
                )}
                key={day}
                style={pt?.headCell?.({ props: { disabled } })?.style}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={clsx(
            preset.tbody?.className,
            pt?.tbody?.({ props: { disabled } })?.className,
          )}
          style={pt?.tbody?.({ props: { disabled } })?.style}
        >
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <tr
              className={clsx(
                preset.row?.className,
                pt?.row?.({ props: { disabled } })?.className,
              )}
              key={rowIndex}
              style={pt?.row?.({ props: { disabled } })?.style}
            >
              {calendarDays
                .slice(rowIndex * 7, (rowIndex + 1) * 7)
                .map((dayObj, colIndex) => {
                  const selected = isSelected(dayObj.date);
                  const disabledDay = isDisabled(dayObj.date);
                  const today = isToday(dayObj.date);

                  return (
                    <td
                      className={clsx(
                        preset.cell?.className,
                        pt?.cell?.({ props: { disabled } })?.className,
                      )}
                      key={colIndex}
                      style={pt?.cell?.({ props: { disabled } })?.style}
                    >
                      <button
                        className={clsx(
                          preset.day?.className,
                          pt?.day?.({ props: { disabled } })?.className,
                        )}
                        data-disabled={disabledDay}
                        data-other-month={!dayObj.isCurrentMonth}
                        data-selected={selected}
                        data-today={today}
                        disabled={disabledDay}
                        style={pt?.day?.({ props: { disabled } })?.style}
                        type="button"
                        onClick={() => handleDayClick(dayObj.date)}
                      >
                        {dayObj.date.getDate()}
                      </button>
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Calendar.displayName = 'Calendar';
