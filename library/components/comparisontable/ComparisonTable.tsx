import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

export type CellValue = boolean | string | number;

export interface ComparisonRow {
  name: string;
  [col: string]: CellValue;
}

export interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  className?: string;
}

function Cell({ value }: { value: CellValue }): JSX.Element {
  if (value === true) return <span className="text-emerald-500 font-bold">✓</span>;
  if (value === false) return <span className="text-secondary-200">—</span>;
  return <span className="text-sm text-secondary-400">{value}</span>;
}

export function ComparisonTable({ columns, rows, className }: ComparisonTableProps): JSX.Element {
  const preset =
    useComponentPreset('ComparisonTable', {
      props: { columns, rows },
    }) ?? {};

  const [featureCol, ...restCols] = columns;

  return (
    <div className={clsx(preset.root?.className, className)}>
      <table className={clsx(preset.table?.className)}>
        <thead>
          <tr>
            <th className={clsx(preset.headerCell?.className)}>
              {featureCol}
            </th>
            {restCols.map((col) => (
              <th
                className={clsx(preset.headerCell?.className, 'text-center w-24')}
                key={col}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className={clsx(preset.row?.className)} key={row.name}>
              <td className={clsx(preset.featureCell?.className)}>{row.name}</td>
              {restCols.map((col) => (
                <td className={clsx(preset.valueCell?.className)} key={col}>
                  <Cell value={row[col] as CellValue} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
