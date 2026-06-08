import clsx from 'clsx';

import { useComponentPreset } from 'lib/hooks';

export interface PaginationProps {
  page: number;
  totalPages: number;
  total?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  className,
}: PaginationProps): JSX.Element {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const preset =
    useComponentPreset('Pagination', {
      props: { page, totalPages, total, pageSize },
      context: { isFirst, isLast },
    }) ?? {};

  const start = total !== null && total !== undefined && pageSize !== null && pageSize !== undefined && total > 0 ? (page - 1) * pageSize + 1 : null;
  const end = total !== null && total !== undefined && pageSize !== null && pageSize !== undefined ? Math.min(page * pageSize, total) : null;

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    const p = totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i;
    return p <= totalPages ? p : null;
  }).filter(Boolean) as number[];

  return (
    <div className={clsx(preset.root?.className, className)}>
      {total !== null && total !== undefined && start !== null && end !== null ? (
        <span className={clsx(preset.info?.className)}>
          {total === 0 ? '0 results' : `${start}–${end} of ${total}`}
        </span>
      ) : (
        <span className={clsx(preset.info?.className)}>
          Page {page} of {totalPages}
        </span>
      )}
      <div className="flex items-center gap-1">
        <button
          aria-label="Previous page"
          className={clsx(preset.prevButton?.className)}
          disabled={isFirst}
          type="button"
          onClick={() => onPageChange(page - 1)}
        >
          <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {pages.map((p) => (
          <button
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Page ${p}`}
            className={clsx(
              p === page ? preset.activePageButton?.className : preset.pageButton?.className,
            )}
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        <button
          aria-label="Next page"
          className={clsx(preset.nextButton?.className)}
          disabled={isLast}
          type="button"
          onClick={() => onPageChange(page + 1)}
        >
          <svg fill="none" height="14" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="14">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
