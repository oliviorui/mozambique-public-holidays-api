import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

import { GET as getHolidays } from
  "@/app/api/holidays/route";

import { GET as getHolidayByDate } from
  "@/app/api/holidays/[date]/route";

import { GET as checkHoliday } from
  "@/app/api/holidays/check/route";

import { GET as getNextHoliday } from
  "@/app/api/holidays/next/route";

const BASE_URL = "http://localhost:3000";

function request(path: string): NextRequest {
  return new NextRequest(`${BASE_URL}${path}`);
}

describe("Holidays API", () => {
  describe("GET /api/holidays", () => {
    it("returns all holidays for 2027", async () => {
      const response = getHolidays(
        request("/api/holidays?year=2027")
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.countryCode).toBe("MZ");
      expect(data.total).toBe(9);
    });

    it("filters by month", async () => {
      const response = getHolidays(
        request("/api/holidays?year=2027&month=6")
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.total).toBe(1);
      expect(data.holidays[0].date).toBe("2027-06-25");
    });

    it("rejects invalid years", async () => {
      const response = getHolidays(
        request("/api/holidays?year=abc")
      );

      expect(response.status).toBe(400);
    });

    it("rejects invalid months", async () => {
      const response = getHolidays(
        request("/api/holidays?year=2027&month=13")
      );

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/holidays/:date", () => {
    it("returns a holiday", async () => {
      const response = await getHolidayByDate(
        request("/api/holidays/2027-06-25"),
        {
          params: Promise.resolve({
            date: "2027-06-25",
          }),
        }
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.holiday.type).toBe("national");
    });

    it("returns 404 for a non-holiday date", async () => {
      const response = await getHolidayByDate(
        request("/api/holidays/2027-06-24"),
        {
          params: Promise.resolve({
            date: "2027-06-24",
          }),
        }
      );

      expect(response.status).toBe(404);
    });

    it("rejects malformed dates", async () => {
      const response = await getHolidayByDate(
        request("/api/holidays/2027-02-30"),
        {
          params: Promise.resolve({
            date: "2027-02-30",
          }),
        }
      );

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/holidays/check", () => {
    it("confirms a public holiday", async () => {
      const response = checkHoliday(
        request(
          "/api/holidays/check?date=2027-06-25"
        )
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.isPublicHoliday).toBe(true);
    });

    it("identifies an ordinary date", async () => {
      const response = checkHoliday(
        request(
          "/api/holidays/check?date=2027-06-24"
        )
      );

      const data = await response.json();

      expect(data.isPublicHoliday).toBe(false);
      expect(data.holiday).toBeNull();
    });

    it("recognizes observed holidays", async () => {
      const response = checkHoliday(
        request(
          "/api/holidays/check?date=2026-10-05"
        )
      );

      const data = await response.json();

      expect(data.isPublicHoliday).toBe(true);
      expect(data.holiday.type).toBe("observed");
    });

    it("requires a valid date", async () => {
      const response = checkHoliday(
        request("/api/holidays/check")
      );

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/holidays/next", () => {
    it("returns the next holiday", async () => {
      const response = getNextHoliday(
        request(
          "/api/holidays/next?date=2027-06-01"
        )
      );

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.holiday.date).toBe("2027-06-25");
    });

    it("rejects an invalid date", async () => {
      const response = getNextHoliday(
        request(
          "/api/holidays/next?date=invalid"
        )
      );

      expect(response.status).toBe(400);
    });
  });
});
