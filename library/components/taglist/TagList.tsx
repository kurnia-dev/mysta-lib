import clsx from 'clsx';

import { Severities } from '../../utils';
import { Chip } from '../chip/Chip';

export interface TagListProps {
  tags: string[];
  onRemove?: (tag: string) => void;
  severity?: Severities;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Returns an href for each tag, or undefined to render as non-link */
  href?: (tag: string) => string | undefined;
}

export function TagList({
  tags,
  onRemove,
  href,
  severity = 'secondary',
  size = 'sm',
  className,
}: TagListProps): JSX.Element {
  return (
    <div className={clsx('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          href={href ? href(tag) : undefined}
          removable={!!onRemove}
          severity={severity}
          size={size}
          onRemove={onRemove ? () => onRemove(tag) : undefined}
        />
      ))}
    </div>
  );
}

TagList.displayName = 'TagList';
