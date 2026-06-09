import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface TimelineItem {
  period: string;
  role: string;
  color?: string;
  description?: string;
  current?: boolean;
  /** Bulleted list rendered below description */
  bullets?: string[];
  /** Small chips/tags rendered below bullets */
  tags?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps): JSX.Element {
  const preset =
    useComponentPreset('Timeline', {
      props: { items },
    }) ?? {};

  return (
    <div className={clsx(preset.root?.className, className)}>
      {items.map((item, i) => (
        <div className={clsx(preset.item?.className)} key={i}>
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                item.current ? preset.dotCurrent?.className : preset.dotPast?.className,
              )}
              style={item.color ? { backgroundColor: item.color } : undefined}
            />
            {i < items.length - 1 && (
              <div className={clsx(preset.connector?.className)} />
            )}
          </div>
          <div className="pb-4">
            <div className={clsx(preset.period?.className)}>
              {item.period}
            </div>
            <div className={clsx(preset.role?.className)}>
              {item.role}
            </div>
            {item.description && (
              <div className={clsx(preset.description?.className)}>{item.description}</div>
            )}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-1.5 space-y-0.5 list-disc list-inside">
                {item.bullets.map((b, bi) => (
                  <li key={bi} className={clsx(preset.bullet?.className)}>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={clsx(preset.tag?.className)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
