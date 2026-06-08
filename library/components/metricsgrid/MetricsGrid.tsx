import clsx from 'clsx';

import { useStaggerReady } from 'lib/hooks';

import { StatCard } from '../statcard/StatCard';
import { StatCardProps } from '../statcard/StatCard.d';

export interface MetricItem extends Omit<StatCardProps, 'pt'> {
  id: string;
}

export interface MetricsGridProps {
  items: MetricItem[];
  cols?: 2 | 3 | 4;
  stagger?: boolean;
  className?: string;
}

const colsMap = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function MetricsGrid({
  items,
  cols = 3,
  stagger = true,
  className,
}: MetricsGridProps): JSX.Element {
  const ready = useStaggerReady(50);

  return (
    <div className={clsx('grid gap-4', colsMap[cols], className)}>
      {items.map(({ id, ...cardProps }, i) => (
        <div
          className={clsx(
            'transition-all duration-500',
            stagger
              ? ready
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
              : '',
          )}
          key={id}
          style={stagger ? { transitionDelay: `${i * 60}ms` } : undefined}
        >
          <StatCard {...cardProps} />
        </div>
      ))}
    </div>
  );
}
