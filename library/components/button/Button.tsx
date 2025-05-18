import clsx from 'clsx';
import { BiLoaderAlt } from 'react-icons/bi';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { ButtonProps } from './Button.d';

export const Button = ({
  icon,
  label,
  severity = 'primary',
  onClick = () => {},
  disabled = false,
  height = 26,
  loading = false,
  outlined = false,
  text = false,
  width = 'max-content',
  type = 'button',
}: ButtonProps): JSX.Element => {
  const preset =
    useComponentPreset('Button', {
      context: { disabled: !!loading || !!disabled },
      props: {
        height,
        width,
        label,
        outlined,
        text,
        severity,
      },
    }) ?? {};

  const createLabel = () => {
    if (label) return <span {...preset.label}>{label}</span>;
  };

  const createIcon = () => {
    if (!icon && !loading) return <span {...preset.icon} />;
    else if (icon && !loading) return <Icon name={icon} />;
    return <BiLoaderAlt className={clsx(preset.loadingIcon?.className)} />;
  };

  const iconComponent = createIcon();
  const labelComponent = createLabel();

  return (
    <button {...preset.root} type={type} onClick={onClick}>
      {iconComponent}
      {labelComponent}
    </button>
  );
};
