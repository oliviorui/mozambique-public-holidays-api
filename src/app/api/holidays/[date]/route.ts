import { NextResponse } from "next/server";
import {
  getHolidayByDate,
  isValidDate,
} from "@/lib/holidays";

interface RouteContext {
  params: Promise<{ date: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  const { date } = await params;

  if (!isValidDate(date)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid date. Use YYYY-MM-DD.",
      },
      { status: 400 }
    );
  }

  const holiday = getHolidayByDate(date);

  if (!holiday) {
    return NextResponse.json(
      {
        success: false,
        date,
        error: "No public holiday found on this date.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    holiday,
  });
}
