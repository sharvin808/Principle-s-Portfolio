import type { Metadata } from 'next';
import { playfair, inter } from '@/lib/fonts';
import ThemeProvider from '@/components/ThemeProvider';
import { LoadingProvider } from '@/components/ui/LoadingContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Academic Portfolio',
  description: 'Premium academic portfolio and research showcase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
