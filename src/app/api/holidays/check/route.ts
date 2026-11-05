import { NextRequest, NextResponse } from "next/server";
import {
  getHolidayByDate,
  isValidDate,
} from "@/lib/holidays";

export function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !isValidDate(date)) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide a valid date in YYYY-MM-DD format.",
      },
      { status: 400 }
    );
  }

  const holiday = getHolidayByDate(date);

  return NextResponse.json({
    success: true,
    date,
    isPublicHoliday: holiday !== null,
    holiday,
  });
}
