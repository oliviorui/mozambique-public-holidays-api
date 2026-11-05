import { NextRequest, NextResponse } from "next/server";
import {
  getTodayInMozambique,
  getHolidaysByYear,
  getHolidaysByMonth,
  isValidYear,
  MIN_YEAR,
  MAX_YEAR,
} from "@/lib/holidays";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const yearParam = params.get("year");
  const monthParam = params.get("month");

  const year = yearParam === null
    ? Number(getTodayInMozambique().slice(0, 4))
    : Number(yearParam);

  if (
    yearParam === "" ||
    !isValidYear(year)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: `Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`,
      },
      { status: 400 }
    );
  }

  let month: number | null = null;

  if (monthParam !== null) {
    month = Number(monthParam);

    if (
      monthParam.trim() === "" ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Month must be between 1 and 12.",
        },
        { status: 400 }
      );
    }
  }

  const holidays = month === null
    ? getHolidaysByYear(year)
    : getHolidaysByMonth(year, month);

  return NextResponse.json({
    success: true,
    country: "Mozambique",
    countryCode: "MZ",
    year,
    ...(month !== null && { month }),
    total: holidays.length,
    holidays,
  });
}
