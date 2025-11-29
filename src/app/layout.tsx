import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
  title: {
    default: "Ekam Bitt | Fullstack + Blockchain Engineer",
    template: "%s | Ekam Bitt",
  },
  description: "Portfolio of Ekam Bitt, a Fullstack and Blockchain Engineer building premium digital experiences.",
  keywords: ["Fullstack Engineer", "Blockchain Engineer", "Web3", "React", "Next.js", "TypeScript", "Solidity", "Portfolio"],
  authors: [{ name: "Ekam Bitt" }],
  creator: "Ekam Bitt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ekambitt.com",
    title: "Ekam Bitt | Fullstack + Blockchain Engineer",
    description: "Portfolio of Ekam Bitt, a Fullstack and Blockchain Engineer building premium digital experiences.",
    siteName: "Ekam Bitt Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekam Bitt | Fullstack + Blockchain Engineer",
    description: "Portfolio of Ekam Bitt, a Fullstack and Blockchain Engineer building premium digital experiences.",
    creator: "@ekambitt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
            <Toaster />
            <ScrollToTop />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
