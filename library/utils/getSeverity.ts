export type Severities =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

type Variant = 'solid' | 'outlined' | 'text';

const severityBaseMap: Record<Severities, string> = {
  primary: 'text-white bg-primary-500 hover:bg-primary-600',
  secondary: 'text-white bg-secondary-500 hover:bg-secondary-600',
  danger: 'text-white bg-danger-500 hover:bg-danger-600',
  success: 'text-white bg-success-500 hover:bg-success-600',
  warning: 'text-white bg-warning-500 hover:bg-warning-600',
  info: 'text-white bg-info-500 hover:bg-info-600',
};

const outlinedMap: Record<Severities, string> = {
  primary: 'text-primary-500 ring-primary-500 hover:bg-primary-50',
  secondary: 'text-secondary-500 ring-secondary-500 hover:bg-secondary-50',
  danger: 'text-danger-500 ring-danger-500 hover:bg-danger-50',
  success: 'text-success-500 ring-success-500 hover:bg-success-50',
  warning: 'text-warning-500 ring-warning-500 hover:bg-warning-50',
  info: 'text-info-500 ring-info-500 hover:bg-info-50',
};

const textMap: Record<Severities, string> = {
  primary: 'text-primary-500 ring-transparent hover:bg-primary-50',
  secondary: 'text-secondary-500 ring-transparent hover:bg-secondary-50',
  danger: 'text-danger-500 ring-transparent hover:bg-danger-50',
  success: 'text-success-500 ring-transparent hover:bg-success-50',
  warning: 'text-warning-500 ring-transparent hover:bg-warning-50',
  info: 'text-info-500 ring-transparent hover:bg-info-50',
};

interface GetSeverityOptions {
  outlined?: boolean;
  text?: boolean;
}

const getSeverity = (
  severity: Severities = 'primary',
  options?: GetSeverityOptions,
): string => {
  const { outlined, text } = options ?? {};

  if (text) return textMap[severity];
  if (outlined) return outlinedMap[severity];
  return severityBaseMap[severity];
};

export default getSeverity;
