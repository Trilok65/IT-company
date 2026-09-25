import "./globals.css";

export const metadata = {
  title: "Nepal Exporting IT | Grow Your Business Digitally",
  description: "Nepal-based IT outsourcing and digital delivery for companies worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
