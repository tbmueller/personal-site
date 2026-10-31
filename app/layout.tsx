import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trista Mueller",
  description: "Trista Mueller, senior software engineer specializing in billing, payments and monetization.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <Theme appearance="inherit" grayColor="slate" radius="medium" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
