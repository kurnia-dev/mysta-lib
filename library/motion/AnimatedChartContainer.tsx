import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

import { chartRevealVariant } from './variants';

export interface AnimatedChartContainerProps {
  children: ReactNode;
  className?: string;
  isReady?: boolean;
}

export function AnimatedChartContainer({
  children,
  className,
  isReady = true,
}: AnimatedChartContainerProps): JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate={isReady ? 'visible' : 'hidden'}
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      style={{ willChange: 'transform, opacity' }}
      variants={chartRevealVariant}
    >
      {children}
    </motion.div>
  );
}
