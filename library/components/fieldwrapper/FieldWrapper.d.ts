// FieldWrapper.d.ts

import { ReactNode, FC } from 'react';

export interface FieldWrapperProps {
  /**
   * FieldWrapper children
   */
  children?: ReactNode;

  className?: string;

  context?: Record<'invalid' | 'disabled' | 'containerless', boolean>;
}

/**
 * FieldWrapper component.
 */
export const FieldWrapper: FC<FieldWrapperProps>;
