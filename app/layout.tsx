import type { Metadata } from 'next';
import { Inter, Kalam, Roboto } from 'next/font/google';
import './globals.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const kalam = Kalam({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kalam',
});

export const metadata: Metadata = {
  title: 'Nuvola Coffee Shop',
  description: 'Created by Bulut Yerli',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${kalam.variable}`}>
        <div className="main_container">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
