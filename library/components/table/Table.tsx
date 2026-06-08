import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { useToast } from 'lib/context/ToastContext';
import { useComponentPreset } from 'lib/hooks';

import { TableProps } from './Table.d';

export const Table = <T extends Record<string, unknown>>(
  props: TableProps<T>,
) => {
  const { mode, data, columns, lazy, fetchFunction, pt } = props;

  const { showToast } = useToast();
  const [allData, setAllData] = useState<T[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const preset =
    useComponentPreset('Table', {
      props,
    }) ?? {};

  const getData = useCallback(async () => {
    if (fetchFunction && lazy) {
      try {
        const response = await fetchFunction();
        setAllData(response.data.data);
        setTotalRecords(response.data.totalRecords);
        return;
      } catch (error) {
        console.error(error);
        showToast({ message: error instanceof Error ? error.message : String(error), severity: 'danger', icon: 'x' });
      }
    }
    if (data) setAllData(data);
  }, [fetchFunction, lazy, data, showToast]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div
      className={clsx(
        'flex flex-col gap-2',
        preset.root?.className,
        pt?.root?.({ props })?.className,
      )}
      style={pt?.root?.({ props })?.style}
    >
      <div className="flex items-center">
        <span>Bulk action</span>
        <div className="flex gap-1 ml-auto">Config</div>
      </div>

      <div className="overflow-auto w-full">
        <table
          className={clsx(
            'border-spacing-1 min-w-[1000px] scrollbar-thin table-auto w-full overflow-hidden rounded-lg',
            preset.table?.className,
            pt?.table?.({ props })?.className,
          )}
          style={pt?.table?.({ props })?.style}
        >
          <thead
            className={clsx(
              'bg-primary-300 text-md',
              preset.header?.className,
              pt?.header?.({ props })?.className,
            )}
            style={pt?.header?.({ props })?.style}
          >
            <tr
              className={clsx(
                preset.headerRow?.className,
                pt?.headerRow?.({ props })?.className,
              )}
              style={pt?.headerRow?.({ props })?.style}
            >
              {columns.map((each) =>
                each.headerCellRender ? (
                  <th key={String(each.field)}>{each.headerCellRender()}</th>
                ) : (
                  <th
                    className={clsx(
                      '!font-medium py-2 text-white',
                      preset.headerCell?.className,
                      pt?.headerCell?.({ props })?.className,
                    )}
                    key={String(each.field)}
                    style={pt?.headerCell?.({ props })?.style}
                  >
                    {each.header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody
            className={clsx(
              'divide-y divide-secondary-300',
              preset.body?.className,
              pt?.body?.({ props })?.className,
            )}
            style={pt?.body?.({ props })?.style}
          >
            {allData.map((datum, index) => (
              <tr
                className={clsx(
                  'h-10 items-center',
                  preset.bodyRow?.className,
                  pt?.bodyRow?.({ props })?.className,
                )}
                key={String((datum as T)._id ?? index)}
                style={pt?.bodyRow?.({ props })?.style}
              >
                {columns.map((each) =>
                  each.bodyCellRender ? (
                    <td key={String(each.field)}>
                      {each.bodyCellRender(datum, index)}
                    </td>
                  ) : (
                    <td
                      className={clsx(
                        preset.bodyCell?.className,
                        pt?.bodyCell?.({ props })?.className,
                      )}
                      key={String(each.field)}
                      style={pt?.bodyCell?.({ props })?.style}
                    >
                      {String(datum[each.field])}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
