import clsx from 'clsx';
import { Children, CSSProperties, ReactNode } from 'react';

export interface StaggerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Stagger({ children, delay = 0.05, className }: StaggerProps): JSX.Element {
  return (
    <div className={clsx(className)}>
      {Children.map(children, (child, i) => (
        <div
          style={
            {
              '--stagger-index': i,
              animationDelay: `${delay * i}s`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
