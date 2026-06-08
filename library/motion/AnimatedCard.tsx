import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

import { fadeUpVariant } from './variants';

export interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps): JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      animate="visible"
      className={className}
      initial={shouldReduce ? false : 'hidden'}
      transition={{ delay }}
      variants={fadeUpVariant}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
