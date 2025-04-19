import { useComponentPreset } from 'lib/hooks';
import { FieldWrapperProps } from './FieldWrapper.d';
import clsx from 'clsx';

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  className,
  context,
}) => {
  const preset =
    useComponentPreset('fieldwrapper', { context, className }) ?? {};

  return (
    <div {...preset.root} className={clsx([preset.root?.className, className])}>
      {children}
    </div>
  );
};
