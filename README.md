
# 🇲🇿 Mozambique Public Holidays API

A free, open-source REST API for public holidays in Mozambique.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Overview

Mozambique Public Holidays API provides holiday information
through simple JSON endpoints.

It is designed for developers building calendars, scheduling
tools, business applications, and other integrations.

### Features

- National public holidays in Mozambique
- Holiday lookup by year, month, or date
- Public holiday validation
- Next upcoming holiday
- Observed holiday dates when holidays fall on Sundays
- Portuguese and English holiday names
- Interactive API playground
- Automated tests with Vitest
- No API key required

## API Reference

All endpoints use the GET method and return JSON.

### List holidays

GET /api/holidays?year=2027

Returns the public holidays for the specified year.

### Filter by month

GET /api/holidays?year=2027&month=6

Returns holidays for June 2027.

### Get holiday by date

GET /api/holidays/2027-06-25

Returns information about the holiday on the given date.

Returns HTTP 404 if the date has no holiday.

### Check a date

GET /api/holidays/check?date=2027-06-25

Example response:

```json
{
  "success": true,
  "date": "2027-06-25",
  "isPublicHoliday": true,
  "holiday": {
    "date": "2027-06-25",
    "name": "Dia da Independência Nacional",
    "nameEn": "Independence Day",
    "description": "Independência de Moçambique em 1975.",
    "type": "national",
    "countryCode": "MZ"
  }
}
```

### Get the next holiday

GET /api/holidays/next?date=2027-06-01

Returns the first holiday strictly after the specified date.

If no date is provided, the current date in Mozambique is used.

## Usage Examples

### cURL

```bash
curl "http://localhost:3000/api/holidays?year=2027"
```

### JavaScript

```javascript
async function getHolidays(year) {
  const response = await fetch(
    `http://localhost:3000/api/holidays?year=${year}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

getHolidays(2027)
  .then(console.log)
  .catch(console.error);
```

Replace localhost with your production URL after deployment.

## Holiday Data

Dates use the ISO format `YYYY-MM-DD`.

Holiday records include:

| Field | Description |
| --- | --- |
| date | Holiday date |
| name | Portuguese holiday name |
| nameEn | English holiday name |
| description | Holiday description |
| type | national or observed |
| countryCode | MZ |
| observedFor | Original date, for observed holidays |

The API models the current national holiday rules, including
Monday observances when a national holiday falls on Sunday.

Observed days are returned as separate records.

The supported year range is 2024–9998, but this does not imply
historical verification for every year.

Extraordinary holidays and occasional administrative
tolerances are not included.

Holiday information should be verified against official
publications before use in legal, payroll, or compliance systems.

## Getting Started

### Requirements

- Node.js 22.12 or later
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone github.com/oliviorui/mozambique-public-holidays-api
cd mozambique-public-holidays-api
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000

## Testing

Run automated tests:

```bash
npm run test:run
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Generate test coverage:

```bash
npm run test:coverage
```

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest
- GitHub Actions
- Vercel

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Run the tests.
5. Open a pull request describing your changes.

## License

Licensed under the MIT License. See the LICENSE file.

## Author

Olívio Cumbe

Made in Mozambique 🇲🇿
