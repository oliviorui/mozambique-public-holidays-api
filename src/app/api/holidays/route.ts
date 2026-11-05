import { NextRequest, NextResponse } from "next/server";
import {
  getNextHoliday,
  getTodayInMozambique,
  isValidDate,
} from "@/lib/holidays";

export function GET(request: NextRequest) {
  const fromDate =
    request.nextUrl.searchParams.get("date") ??
    getTodayInMozambique();

  if (!isValidDate(fromDate)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid date. Use YYYY-MM-DD.",
      },
      { status: 400 }
    );
  }

  const holiday = getNextHoliday(fromDate);

  if (!holiday) {
    return NextResponse.json(
      {
        success: false,
        error: "No next holiday available in the supported range.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    fromDate,
    holiday,
  });
}
