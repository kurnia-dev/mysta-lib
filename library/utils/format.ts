export function formatCurrency(
  value: number,
  locale = 'en-US',
  currency = 'USD',
  decimals = 0,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPct(value: number, showSign = false, decimals = 2): string {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatDate(
  iso: string | Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' },
): string {
  return new Date(iso).toLocaleDateString(locale, options);
}

export function formatDateTime(
  iso: string | Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
): string {
  return new Date(iso).toLocaleString(locale, options);
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
}
