import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ontos × SentimenTrader — Autonomous Reasoning for Capital Markets",
  description: "We built autonomous reasoning engines for telecom networks. Now we've compiled the same architecture for Wall Street.",
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
