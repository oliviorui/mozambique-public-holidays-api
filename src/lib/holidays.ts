import holidays from "@/data/holidays";
import type { Holiday } from "@/types/holiday";

export const MIN_YEAR = 2024;
export const MAX_YEAR = 9998;

export function isValidYear(year: number): boolean {
  return (
    Number.isInteger(year) &&
    year >= MIN_YEAR &&
    year <= MAX_YEAR
  );
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!isValidYear(year)) return false;

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function getTodayInMozambique(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Maputo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function getHolidaysByYear(year: number): Holiday[] {
  if (!isValidYear(year)) return [];

  const results: Holiday[] = [];

  for (const { day, month, ...holiday } of holidays) {
    const original = new Date(Date.UTC(year, month - 1, day));
    const date = formatDate(original);

    results.push({
      ...holiday,
      date,
      type: "national",
    });

    // Sunday: add an observed day on Monday.
    if (original.getUTCDay() === 0) {
      const observed = new Date(original);
      observed.setUTCDate(observed.getUTCDate() + 1);

      results.push({
        ...holiday,
        date: formatDate(observed),
        type: "observed",
        observedFor: date,
      });
    }
  }

  return results.sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

export function getHolidaysByMonth(
  year: number,
  month: number
): Holiday[] {
  return getHolidaysByYear(year).filter(
    (holiday) =>
      Number(holiday.date.slice(5, 7)) === month
  );
}

export function getHolidayByDate(
  date: string
): Holiday | null {
  if (!isValidDate(date)) return null;

  const year = Number(date.slice(0, 4));

  return (
    getHolidaysByYear(year).find(
      (holiday) => holiday.date === date
    ) ?? null
  );
}

export function isPublicHoliday(date: string): boolean {
  return getHolidayByDate(date) !== null;
}

export function getNextHoliday(
  fromDate: string = getTodayInMozambique()
): Holiday | null {
  if (!isValidDate(fromDate)) return null;

  const year = Number(fromDate.slice(0, 4));

  const currentYear = getHolidaysByYear(year);
  const nextYear =
    year < MAX_YEAR ? getHolidaysByYear(year + 1) : [];

  return (
    [...currentYear, ...nextYear].find(
      (holiday) => holiday.date > fromDate
    ) ?? null
  );
}
