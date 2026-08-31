import type { Metadata, Viewport } from "next";
import { Theme } from "@radix-ui/themes";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteName} — public Grok Bot directory`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title: `${siteName} — public Grok Bot directory`,
    description: siteDescription,
    type: "website",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — public Grok Bot directory`,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Theme
          appearance="light"
          accentColor="olive"
          grayColor="sage"
          radius="small"
          scaling="95%"
          className="min-h-screen"
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </Theme>
      </body>
    </html>
  );
}
