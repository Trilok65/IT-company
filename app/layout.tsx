import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import "./site-enhancements.css";

export const metadata: Metadata = {
  title: "Nepal Exporting IT | Reliable Tech for Growing Businesses",
  description:
    "Nepal-based IT outsourcing. Custom software, cloud, and consulting delivered on time and on budget for companies worldwide.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Nepal Exporting IT",
    title: "Nepal Exporting IT | Reliable Tech for Growing Businesses",
    description:
      "Nepal-based IT outsourcing. Custom software, cloud, and consulting delivered on time and on budget for companies worldwide.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
