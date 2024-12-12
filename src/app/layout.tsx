import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { ReactQueryProvider } from '@/providers';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Sastra Bali Admin',
  description: 'Best Bali language learning platform integrated with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ReactQueryProvider>
            <Provider defaultTheme='light'>{children}</Provider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
