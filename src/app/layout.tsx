import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const barlowCondensed = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/BarlowCondensed-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-display-local",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://binhminh.thinkai.id.vn"),
  title: "Bình Minh — DevOps Engineer",
  description: "DevOps Engineer portfolio: containerization, CI/CD, Linux infrastructure and reliability-focused delivery.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    title: "Bình Minh | DevOps Engineer",
    description: "Containerization, CI/CD, Linux infrastructure and reliable delivery.",
    url: "/",
    siteName: "Binh Minh Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MINH.OPS — DevOps Engineer, systems that ship, observe and recover" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bình Minh | DevOps Engineer",
    description: "Containerization, CI/CD, Linux infrastructure and reliable delivery.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={barlowCondensed.variable}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
