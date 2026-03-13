import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binh Minh — Backend & DevOps Engineer",
  description:
    "Backend Developer & DevOps Engineer — system architecture, scalable deployments, and CI/CD.",
  openGraph: {
    title: "Binh Minh | Backend & DevOps",
    description: "System architecture, scalable deployments, and CI/CD. View my interactive portfolio.",
    url: "https://binhminh-devops.vercel.app",
    siteName: "Binh Minh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Binh Minh - Senior Backend & DevOps Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binh Minh | Backend & DevOps",
    description: "System architecture, scalable deployments, and CI/CD. View my interactive portfolio.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-black antialiased">
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
