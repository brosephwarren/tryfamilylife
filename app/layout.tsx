import type { Metadata } from "next";
// import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

/*
const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});
*/

export const metadata: Metadata = {
  title: "Future Covered | Life Insurance That Protects Your Future Today",
  description:
    "Get affordable life insurance and mortgage protection from A-rated carriers. Protect your family's future with coverage starting at just dollars a day.",
  keywords: [
    "life insurance",
    "mortgage protection",
    "term life insurance",
    "family protection",
    "affordable life insurance",
  ],
  openGraph: {
    title: "Future Covered | Life Insurance That Protects Your Future Today",
    description:
      "Get affordable life insurance and mortgage protection from A-rated carriers. Protect your family's future with coverage starting at just dollars a day.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Future Covered - Life Insurance Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Covered | Life Insurance Protection",
    description:
      "Get affordable life insurance from A-rated carriers. Protect your family's future today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Script
          defer
          src="https://futurecovered.com/~flock.js"
          data-proxy-url="https://futurecovered.com/~api/analytics"
        />
      </body>
    </html>
  );
}
