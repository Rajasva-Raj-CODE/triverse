import type { Metadata } from "next";
import ResponsiveNav from "./components/Navbar/ResponsiveNav";

export const metadata: Metadata = {
  title: "🏠 Triverse",
  description: "Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ResponsiveNav />
        {children}
      </body>
    </html>
  );
}
