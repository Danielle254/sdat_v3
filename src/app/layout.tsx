import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Service Dogs Around Town",
  description: "project by Danielle Lindblom",
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
