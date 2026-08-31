import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${siteName} — Grok Bots worth sharing`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title: `${siteName} — Grok Bots worth sharing`,
    description: siteDescription,
    type: "website",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Grok Bots worth sharing`,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F8ED",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
