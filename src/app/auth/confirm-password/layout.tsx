import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'confirm-password Password reset-password',
  description: 'Enter your new password',
};

export default function ConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
