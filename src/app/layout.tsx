import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
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
  title: "ACCS · Access for College of Computer Studies",
  description:
    "Your Access to the College of Computer Studies: student support, an academic forum, and confidential concern reporting in one place. Coming soon.",
  openGraph: {
    title: "ACCS · Access for College of Computer Studies",
    description: "Your Access to the College of Computer Studies. Coming soon.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="ds-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
