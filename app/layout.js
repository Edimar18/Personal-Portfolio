import '@fontsource/archivo/500.css';
import '@fontsource/archivo/700.css';
import '@fontsource/archivo/900.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './globals.css';

export const metadata = {
  title: 'Edimar Mosquida — Portfolio',
  description:
    'IoT-specialized BSIT student bridging hardware and software — embedded systems, mobile development, and applied AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-body antialiased">{children}</body>
    </html>
  );
}
