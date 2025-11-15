// app/reset-password/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'reset-password Password',
  description: 'Send password reset-password link via email',
};

export default function ResetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
