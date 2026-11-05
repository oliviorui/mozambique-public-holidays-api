import { describe, it, expect } from "vitest";

import {
  formatDate,
  isValidYear,
  isValidDate,
  getHolidaysByYear,
  getHolidaysByMonth,
  getHolidayByDate,
  isPublicHoliday,
  getNextHoliday,
} from "@/lib/holidays";

describe("Mozambique Public Holidays", () => {
  describe("Date utilities", () => {
    it("formats dates as YYYY-MM-DD", () => {
      const date = new Date(Date.UTC(2027, 5, 25));

      expect(formatDate(date)).toBe("2027-06-25");
    });

    it("validates supported years", () => {
      expect(isValidYear(2027)).toBe(true);
      expect(isValidYear(1900)).toBe(false);
      expect(isValidYear(2027.5)).toBe(false);
    });

    it("accepts valid dates", () => {
      expect(isValidDate("2027-06-25")).toBe(true);
      expect(isValidDate("2028-02-29")).toBe(true);
    });

    it("rejects invalid dates", () => {
      expect(isValidDate("2027-02-29")).toBe(false);
      expect(isValidDate("2027-02-30")).toBe(false);
      expect(isValidDate("2027-13-01")).toBe(false);
      expect(isValidDate("25-06-2027")).toBe(false);
      expect(isValidDate("hello")).toBe(false);
    });
  });

  describe("getHolidaysByYear", () => {
    it("returns nine holidays in 2027", () => {
      const holidays = getHolidaysByYear(2027);

      expect(holidays).toHaveLength(9);
    });

    it("includes Independence Day", () => {
      const holidays = getHolidaysByYear(2027);

      const independence = holidays.find(
        (holiday) => holiday.date === "2027-06-25"
      );

      expect(independence).toBeDefined();
      expect(independence?.type).toBe("national");
      expect(independence?.countryCode).toBe("MZ");
    });

    it("returns holidays in chronological order", () => {
      const holidays = getHolidaysByYear(2027);
      const dates = holidays.map((holiday) => holiday.date);

      expect(dates).toEqual([...dates].sort());
    });

    it("returns no holidays for unsupported years", () => {
      expect(getHolidaysByYear(1900)).toEqual([]);
    });
  });

  describe("Observed holidays", () => {
    it("transfers Sunday holidays to Monday", () => {
      const holidays = getHolidaysByYear(2026);

      const observed = holidays.find(
        (holiday) => holiday.date === "2026-10-05"
      );

      expect(observed).toBeDefined();
      expect(observed?.type).toBe("observed");
      expect(observed?.observedFor).toBe("2026-10-04");
    });

    it("preserves the original holiday", () => {
      const holiday = getHolidayByDate("2026-10-04");

      expect(holiday?.type).toBe("national");
    });

    it("returns ten records for 2026", () => {
      expect(getHolidaysByYear(2026)).toHaveLength(10);
    });
  });

  describe("Holiday queries", () => {
    it("filters holidays by month", () => {
      const holidays = getHolidaysByMonth(2027, 6);

      expect(holidays).toHaveLength(1);
      expect(holidays[0].date).toBe("2027-06-25");
    });

    it("finds a holiday by date", () => {
      const holiday = getHolidayByDate("2027-06-25");

      expect(holiday).not.toBeNull();
      expect(holiday?.nameEn).toBe("Independence Day");
    });

    it("returns null when no holiday exists", () => {
      expect(getHolidayByDate("2027-06-24")).toBeNull();
    });

    it("checks public holidays", () => {
      expect(isPublicHoliday("2027-06-25")).toBe(true);
      expect(isPublicHoliday("2027-06-24")).toBe(false);
    });
  });

  describe("Next holiday", () => {
    it("finds the next holiday", () => {
      const holiday = getNextHoliday("2027-06-01");

      expect(holiday?.date).toBe("2027-06-25");
    });

    it("excludes the starting date", () => {
      const holiday = getNextHoliday("2027-06-25");

      expect(holiday?.date).toBe("2027-09-07");
    });

    it("finds holidays in the following year", () => {
      const holiday = getNextHoliday("2027-12-31");

      expect(holiday?.date).toBe("2028-01-01");
    });

    it("rejects invalid starting dates", () => {
      expect(getNextHoliday("invalid")).toBeNull();
    });
  });
});
