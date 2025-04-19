import { BiLoaderAlt } from 'react-icons/bi';
import { useComponentPreset } from 'lib/hooks';
import { getSeverity } from 'lib/utils';
import { ButtonProps } from './Button.d';
import clsx from 'clsx';
import { Icon } from '../icon/Icon';

export const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  severity,
  onClick = () => {},
  disabled = false,
  height = 26,
  loading = false,
  outlined = false,
  text = false,
  width = 'max-content',
  type = 'button',
}) => {
  const preset =
    useComponentPreset('button', {
      context: { disabled: !!loading || !!disabled },
      props: {
        height,
        width,
        label,
        outlined,
        text,
        severityClass: getSeverity(severity, { outlined, text }),
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
    <button {...preset.root} onClick={onClick} type={type}>
      {iconComponent}
      {labelComponent}
    </button>
  );
};
