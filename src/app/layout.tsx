import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "./_sections/Navbar";
import { Footer } from "./_sections/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Variable fonts: Plus Jakarta Sans 700 and 800 for display, JetBrains Mono for codes and times.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://d1o7nnm2soozyn.cloudfront.net"),
  title: "ACCS for the QCU College of Computer Studies",
  description:
    "ACCS is the workspace for QCU BSIT, BSCS and BSIS students and faculty. Join forums, book consultations and send confidential reports with one sign-in.",
  openGraph: {
    title: "ACCS for the QCU College of Computer Studies",
    description: "Your access to the College of Computer Studies.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#070D1C" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="ds-body">
        <Providers><a className="skip-link" href="#main">Skip to content</a><Navbar />{children}<Footer /></Providers>
      </body>
    </html>
  );
}
