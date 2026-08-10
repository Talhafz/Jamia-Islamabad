import type { Metadata } from 'next';
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: '--font-noto-nastaliq',
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jamia Islamabad | Education Management System',
  description: 'Welcome to Jamia Islamabad - A premium institution offering integrated Dars-e-Nizami and modern academic pathways.',
  keywords: 'Jamia Islamabad, Islamic education, Dars-e-Nizami, Hifz Quran, Islamabad Madrasa, EMS',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ur"
      dir="ltr"
      className={`${inter.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--color-emerald-bg)] text-[var(--color-text-body)] overflow-x-hidden" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          {/* Main content container */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

