export type Severities =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

type SeverityKey = `${string}-${Severities}`;
type SeverityValue = `${string}-${Severities}-${string}`;

const severityBaseMap: Record<Severities, string> = {
  primary: 'text-white bg-primary-500 hover:bg-primary-600',
  secondary: 'text-white bg-secondary-500 hover:bg-secondary-600',
  danger: 'text-white bg-danger-500 hover:bg-danger-600',
  success: 'text-white bg-success-500 hover:bg-success-600',
  warning: 'text-white bg-warning-500 hover:bg-warning-600',
  info: 'text-white bg-info-500 hover:bg-info-600',
};

const createUtilityMap = (
  prefix: string,
): Record<SeverityKey, SeverityValue> => {
  return {
    'medium-primary': ` ${prefix}-primary-500`,
    'light-primary': ` ${prefix}-primary-100`,
    'dark-primary': ` ${prefix}-primary-800`,
    'medium-secondary': ` ${prefix}-secondary-500`,
    'light-secondary': ` ${prefix}-secondary-100`,
    'dark-secondary': ` ${prefix}-secondary-800`,
    'medium-danger': ` ${prefix}-danger-500`,
    'light-danger': ` ${prefix}-danger-100`,
    'dark-danger': ` ${prefix}-danger-800`,
    'medium-success': ` ${prefix}-success-500`,
    'light-success': ` ${prefix}-success-100`,
    'dark-success': ` ${prefix}-success-800`,
    'medium-warning': ` ${prefix}-warning-500`,
    'light-warning': ` ${prefix}-warning-100`,
    'dark-warning': ` ${prefix}-warning-800`,
    'medium-info': ` ${prefix}-info-500`,
    'light-info': ` ${prefix}-info-100`,
    'dark-info': ` ${prefix}-info-800`,
  };
};

const hoverTextMap: Record<SeverityKey, SeverityValue> =
  createUtilityMap('hover:text');

const hoverBackgroundMap: Record<SeverityKey, SeverityValue> =
  createUtilityMap('hover:bg');

const textMap: Record<SeverityKey, SeverityValue> = createUtilityMap('text');

const backgroundMap: Record<SeverityKey, SeverityValue> =
  createUtilityMap('bg');

const outlineMap: Record<SeverityKey, SeverityValue> =
  createUtilityMap('outline');

const ringMap: Record<SeverityKey, SeverityValue> = createUtilityMap('ring');

interface GetSeverityOptions {
  outline?: 'medium' | 'dark' | 'light';
  ring?: 'medium' | 'dark' | 'light';
  text?: 'medium' | 'dark' | 'light';
  color?: 'medium' | 'dark' | 'light';
  background?: 'medium' | 'dark' | 'light';

  hoverText?: 'medium' | 'dark' | 'light';
  hoverBackground?: 'medium' | 'dark' | 'light';

  transparent?: boolean;
}

const getSeverity = (
  severity: Severities = 'primary',
  options?: GetSeverityOptions,
): string => {
  const {
    outline,
    text,
    ring,
    background,
    transparent,
    hoverBackground,
    hoverText,
  } = options ?? {};
  if (!options) return severityBaseMap[severity];
  if (transparent) return '';

  let severityValue = '';

  if (text) severityValue += textMap[`${text}-${severity}`];
  if (outline) severityValue += outlineMap[`${outline}-${severity}`];
  if (ring) severityValue += ringMap[`${ring}-${severity}`];
  if (background) severityValue += backgroundMap[`${background}-${severity}`];
  if (hoverBackground)
    severityValue += hoverBackgroundMap[`${hoverBackground}-${severity}`];
  if (hoverText) severityValue += hoverTextMap[`${hoverText}-${severity}`];

  return severityValue.trim();
};

export default getSeverity;
