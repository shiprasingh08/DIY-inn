
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/navbar/Navbar';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DIY Inn',
  description: 'DIY Project Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
