import type { Metadata } from "next";
import ThemeRegistry from "../../theme/ThemeRegistry";
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
      <ThemeRegistry>
        <body>{children}</body>
      </ThemeRegistry>
    </html>
  );
}
