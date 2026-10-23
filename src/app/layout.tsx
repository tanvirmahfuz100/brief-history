import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sourceSerif4 = Source_Serif_4({
  weight: ["400", "600"],
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "A Brief History of Past Questions",
  description:
    "Public, login-free archive of past exam questions for the Department of Accounting & Information Systems, University of Barishal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`}>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
