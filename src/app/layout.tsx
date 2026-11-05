import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mozambique Public Holidays API",
  description:
    "A free and open-source REST API for public holidays in Mozambique. Get national holidays, observed holidays and calendar information.",
  keywords: [
    "Mozambique",
    "Mozambique Holidays",
    "Public Holidays API",
    "REST API",
    "Moçambique",
    "Feriados Nacionais",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
