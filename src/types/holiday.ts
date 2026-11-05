export type HolidayType = "national" | "observed";

export interface Holiday {
  date: string;
  name: string;
  nameEn: string;
  description: string;
  type: HolidayType;
  countryCode: "MZ";
  observedFor?: string;
}
