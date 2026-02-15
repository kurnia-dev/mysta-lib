import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { useComponentPreset } from 'lib/hooks';

import { PullToRefreshProps } from './PullToRefresh.d';

export const PullToRefresh = (props: PullToRefreshProps): JSX.Element => {
  const {
    children,
    onRefresh,
    threshold = 80,
    disabled = false,
    className,
    pt,
  } = props;

  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const startY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const preset =
    useComponentPreset('PullToRefresh', {
      context: { isPulling, isRefreshing, pullDistance, threshold },
    }) ?? {};

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || isRefreshing) return;

      // Only activate if scrolled to top
      if (contentRef.current && contentRef.current.scrollTop === 0) {
        startY.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    },
    [disabled, isRefreshing],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isPulling || disabled || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY.current);

      // Apply resistance (diminishing pull distance)
      const resistedDistance = distance * 0.5;
      setPullDistance(Math.min(resistedDistance, threshold * 1.5));
    },
    [isPulling, disabled, isRefreshing, threshold],
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || disabled) return;

    setIsPulling(false);

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [isPulling, disabled, pullDistance, threshold, isRefreshing, onRefresh]);

  const showIndicator = isPulling || isRefreshing;
  const indicatorOpacity = Math.min(pullDistance / threshold, 1);

  return (
    <div
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: {} })?.className,
      )}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {/* Pull Indicator */}
      {showIndicator && (
        <div
          className={clsx(
            preset.indicator?.className,
            pt?.indicator?.({ props: {} })?.className,
          )}
          style={{
            opacity: isRefreshing ? 1 : indicatorOpacity,
            transform: `translateY(${
              isRefreshing ? 0 : pullDistance - threshold
            }px)`,
          }}
        >
          <BiLoaderAlt
            className={clsx(
              preset.spinner?.className,
              pt?.spinner?.({ props: {} })?.className,
              isRefreshing && 'animate-spin',
            )}
          />
        </div>
      )}

      {/* Content */}
      <div
        className={clsx(
          preset.content?.className,
          pt?.content?.({ props: {} })?.className,
        )}
        ref={contentRef}
        style={{
          transform: isPulling ? `translateY(${pullDistance}px)` : undefined,
          transition: isPulling ? 'none' : 'transform 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
};

PullToRefresh.displayName = 'PullToRefresh';
