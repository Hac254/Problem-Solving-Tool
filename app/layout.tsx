import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Problem Solving Tool",
  description: "Unlock your potential with structured problem-solving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>{children}
      <Script id="handle-hydration-error">
          {`
            (function() {
              var originalError = console.error;
              console.error = function() {
                if (arguments[0].includes('Hydration failed')) {
                  return;
                }
                originalError.apply(console, arguments);
              };
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
