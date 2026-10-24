import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["600", "700"],
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
  themeColor: "#032E87",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
