import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axon Code | Desarrollo Tecnológico y Soluciones Avanzadas',
  description:
    'Axon Code — Inteligencia Artificial, Desarrollo de Software Premium y Consultoría Tecnológica. Transformamos tu producto digital.',
  keywords: [
    'desarrollo software',
    'inteligencia artificial',
    'soluciones cloud',
    'consultoría tecnológica',
    'Madrid',
  ],
  openGraph: {
    title: 'Axon Code | Desarrollo Tecnológico y Soluciones Avanzadas',
    description:
      'Transformamos ideas en productos digitales de alto rendimiento. IA · Software · Cloud.',
    siteName: 'Axon Code',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-dm-sans antialiased w-full">
        {children}
      </body>
    </html>
  );
}
