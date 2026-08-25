import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StudioOps — a design studio that keeps you in the loop",
    template: "%s — StudioOps",
  },
  description:
    "Brand, websites and internal tools for companies that need the work handed over, not held hostage. Every client sees their own project as it moves.",
  openGraph: {
    title: "StudioOps — a design studio that keeps you in the loop",
    description:
      "Brand, websites and internal tools for companies that need the work handed over, not held hostage.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
