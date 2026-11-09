import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Makes link-preview and other metadata URLs absolute, on the real domain.
  metadataBase: new URL(SITE_URL),
  title: profile.name,
  description: `${profile.name}, ${profile.headline.charAt(0).toLowerCase()}${profile.headline.slice(1)}`,
  // The same page as Markdown, for AI agents (see /llms.txt).
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
  // og:url, og:type and og:site_name for link previews; the image comes from app/opengraph-image.tsx.
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: profile.name,
    description: `${profile.name}, ${profile.headline.charAt(0).toLowerCase()}${profile.headline.slice(1)}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next-themes sets the class on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" type="text/markdown" href="/llms.txt" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Theme appearance="inherit" grayColor="slate" radius="medium" scaling="100%">
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
