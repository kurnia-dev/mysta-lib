export type Severities =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

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

const colorMap: Record<Severities, string> = {
  primary: '!text-primary-500 hover:!text-white',
  secondary: '!text-secondary-500 hover:!text-white',
  danger: '!text-danger-500 hover:!text-white',
  success: '!text-success-500 hover:!text-white',
  warning: '!text-warning-500 hover:!text-white',
  info: '!text-info-500 hover:!text-white',
};

const backgroundMap: Record<Severities, string> = {
  primary: '!bg-primary-500 hover:!bg-white',
  secondary: '!bg-secondary-500 hover:!bg-white',
  danger: '!bg-danger-500 hover:!bg-white',
  success: '!bg-success-500 hover:!bg-white',
  warning: '!bg-warning-500 hover:!bg-white',
  info: '!bg-info-500 hover:!bg-white',
};

interface GetSeverityOptions {
  outlined?: boolean;
  text?: boolean;
  color?: boolean;
  background?: boolean;
}

const getSeverity = (
  severity: Severities = 'primary',
  options?: GetSeverityOptions,
): string => {
  const { outlined, text, color, background } = options ?? {};

  if (text) return textMap[severity];
  if (outlined) return outlinedMap[severity];
  if (color) return colorMap[severity];
  if (background) return backgroundMap[severity];
  return severityBaseMap[severity];
};

export default getSeverity;
