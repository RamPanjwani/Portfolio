import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ram Panjwani // YoRHa Systems Portfolio",
    template: "%s | Ram Panjwani",
  },
  description:
    "Full-Stack & Systems Engineer specializing in graph-native criminal network intelligence (NEXUS), agentic maritime reasoning (SAMUDRA/ISRO), and multimodal public goods.",
  openGraph: {
    title: "Ram Panjwani // YoRHa Systems Portfolio",
    description:
      "Full-Stack & Systems Engineer specializing in graph-native criminal network intelligence (NEXUS), agentic maritime reasoning (SAMUDRA/ISRO), and multimodal public goods.",
    url: baseUrl,
    siteName: "Ram Panjwani Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('nier_theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
