import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: profile.name,
  description: `${profile.name}, ${profile.headline.charAt(0).toLowerCase()}${profile.headline.slice(1)}`,
  // The same page as Markdown, for AI agents (see /llms.txt).
  alternates: { types: { "text/markdown": "/index.md" } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="describedby" type="text/markdown" href="/llms.txt" />
      </head>
      <body>
        <Theme appearance="inherit" grayColor="slate" radius="medium" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
