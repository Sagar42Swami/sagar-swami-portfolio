import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Sagar Swami | Software Engineer & ML Engineer",
  description: "Portfolio of Sagar Swami, featuring full-stack applications (React.js, Spring Boot, Node.js) and machine learning engines with measurable outcomes.",
  keywords: ["Sagar Swami", "Software Engineer", "Machine Learning Engineer", "React Developer", "Java Developer", "Python Developer", "Spring Boot", "Pune"],
  authors: [{ name: "Sagar Swami" }],
  openGraph: {
    title: "Sagar Swami | Software Engineer & ML Engineer",
    description: "Recruiter-focused portfolio highlighting technical skills, machine learning confidence, and software engineering impact.",
    url: "https://sagarswami.dev",
    siteName: "Sagar Swami Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Swami | Software Engineer & ML Engineer",
    description: "Full-stack and ML engineering work with production-style habits.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen font-sans bg-background text-foreground antialiased flex flex-col selection:bg-brand-cyan/20 selection:text-brand-cyan">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
