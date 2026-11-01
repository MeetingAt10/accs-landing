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

// Variable fonts: the design system uses Plus Jakarta Sans 700 and 800 and JetBrains Mono for time codes.
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
  title: "ACCS - Access for College of Computer Studies",
  description:
    "ACCS is the workspace for the QCU College of Computer Studies: community forums, consultations and confidential concern reporting in one sign-in.",
  openGraph: {
    title: "ACCS - Access for College of Computer Studies",
    description: "Your Access to the College of Computer Studies.",
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
