import type { Metadata, Viewport } from "next";
import { Archivo, Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next } from "next/font/google";
import { Footer } from "./_sections/Footer";
import { Nav } from "./_sections/Nav";
import "./globals.css";

// Archivo's width axis gives the sign system its expanded headlines and condensed map labels.
const sign = Archivo({ subsets: ["latin"], variable: "--font-sign", axes: ["wdth"] });
// Atkinson Hyperlegible was drawn for readers with low vision, which suits a site called Access.
const read = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-read", adjustFontFallback: false });
const mono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], variable: "--font-mono", adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://access-ccs.com"),
  title: "ACCS for the QCU College of Computer Studies",
  description:
    "ACCS is the workspace for QCU BSIT, BSCS and BSIS students and faculty. Join forums, book consultations and send confidential reports with one sign-in.",
  openGraph: {
    title: "ACCS for the QCU College of Computer Studies",
    description: "Your access to the College of Computer Studies.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#032E87" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sign.variable} ${read.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
