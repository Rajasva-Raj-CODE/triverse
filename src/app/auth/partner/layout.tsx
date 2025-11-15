// app/partner/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a partner",
  description: "Join our partner program",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
