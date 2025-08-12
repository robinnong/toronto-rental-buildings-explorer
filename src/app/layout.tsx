import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Toronto Rental Buildings Explorer",
  description:
    "Explore a catalog of purpose-built rental buildings in Toronto.",
};

// A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.
// See: https://nextjs.org/docs/app/getting-started/layouts-and-pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://kit.fontawesome.com/d7ddcd0e10.js"
        crossOrigin="anonymous"
      />
      <Script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
      />
    </html>
  );
}
