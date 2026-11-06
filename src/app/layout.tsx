import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
