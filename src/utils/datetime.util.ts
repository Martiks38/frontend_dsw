const ARGENTINA_TIME_ZONE = 'America/Argentina/Buenos_Aires';
const DATE_ONLY_ISO = /^\d{4}-\d{2}-\d{2}$/;

const dateTimeFormatter = new Intl.DateTimeFormat('es-AR', {
  timeZone: ARGENTINA_TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  timeZone: ARGENTINA_TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('es-AR', {
  timeZone: ARGENTINA_TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function parseISO(iso: string): Date | null {
  const value = DATE_ONLY_ISO.test(iso) ? `${iso}T00:00:00.000-03:00` : iso;
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function part(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
): string {
  const value = parts.find((item) => item.type === type)?.value ?? '';

  if (type === 'year') return value;

  return value.padStart(2, '0');
}

function formatDateParts(date: Date): string {
  const parts = dateFormatter.formatToParts(date);
  return `${part(parts, 'day')}/${part(parts, 'month')}/${part(parts, 'year')}`;
}

function formatTimeParts(date: Date, formatter = timeFormatter): string {
  const parts = formatter.formatToParts(date);
  return `${part(parts, 'hour')}:${part(parts, 'minute')}`;
}

/** DD/MM/AAAA en zona horaria de Argentina (Buenos Aires). */
export function formatDateAR(iso: string): string {
  const date = parseISO(iso);
  if (!date) return iso;

  return formatDateParts(date);
}

/** HH:mm en zona horaria de Argentina (Buenos Aires). */
export function formatTimeAR(iso: string): string {
  const date = parseISO(iso);
  if (!date) return iso;

  return formatTimeParts(date);
}

/** DD/MM/AAAA HH:mm en zona horaria de Argentina (Buenos Aires). */
export function formatDateTimeAR(iso: string): string {
  const date = parseISO(iso);
  if (!date) return iso;

  if (DATE_ONLY_ISO.test(iso)) return formatDateParts(date);

  return `${formatDateParts(date)} ${formatTimeParts(date, dateTimeFormatter)}`;
}

export function toArgentinaInputValue(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: ARGENTINA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(date)
    .replace(' ', 'T');
}

export function argentinaInputToDate(value: string): Date {
  return new Date(`${value}:00-03:00`);
}
