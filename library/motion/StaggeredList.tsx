import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

import { staggerContainerVariant, staggerItemVariant } from './variants';

export interface StaggeredListProps {
  children: ReactNode[];
  isReady?: boolean;
  className?: string;
  itemClassName?: string;
}

export function StaggeredList({
  children,
  isReady = true,
  className,
  itemClassName,
}: StaggeredListProps): JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        animate={isReady ? 'visible' : 'hidden'}
        className={className}
        initial={shouldReduce ? false : 'hidden'}
        variants={staggerContainerVariant}
      >
        {children.map((child, i) => (
          <motion.li className={itemClassName} key={i} variants={staggerItemVariant}>
            {child}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
