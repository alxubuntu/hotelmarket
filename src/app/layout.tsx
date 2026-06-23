import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-neutral-background font-sans text-neutral-dark antialiased">
        {children}
      </body>
    </html>
  );
}
