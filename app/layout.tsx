import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GrainOverlay from "@/components/ui/GrainOverlay";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name — Designer & Developer",
  description:
    "Full-stack engineer and creative technologist crafting immersive digital experiences that live at the intersection of design and engineering.",
  keywords: [
    "portfolio",
    "developer",
    "designer",
    "full-stack",
    "creative technologist",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourname.dev",
    title: "Your Name — Designer & Developer",
    description:
      "Full-stack engineer crafting immersive digital experiences.",
    siteName: "Your Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Designer & Developer",
    description:
      "Full-stack engineer crafting immersive digital experiences.",
    creator: "@yourhandle",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
