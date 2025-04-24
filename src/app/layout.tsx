import type { Metadata } from "next";
import ThemeRegistry from "../../theme/ThemeRegistry";
import "./globals.css";
import { MapContextProvider } from "./context";

export const metadata: Metadata = {
  title: "Map - Service Dogs Around Town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <MapContextProvider>{children}</MapContextProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
