import type { Metadata } from "next";
import { Montserrat, Varela_Round } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Site Configuration
const siteConfig = {
  name: "ETS Hub",
  title: "ETS Hub - Empowering Tech Students & Innovators",
  description:
    "Join ETS Hub, a vibrant community of students, creators, and tech enthusiasts passionate about innovation, learning, and building the future of technology together.",
  url: "https://etshub.org",
  ogImage: "https://etshub.org/og-image.jpg",
  links: {
    twitter: "https://twitter.com/etshub",
    instagram: "https://instagram.com/etshub",
    linkedin: "https://linkedin.com/company/etshub",
    github: "https://github.com/etshub",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ETS Hub",
    "tech community",
    "student tech organization",
    "innovation",
    "technology events",
    "tech workshops",
    "hackathons",
    "student developers",
    "tech networking",
    "coding community",
    "tech career",
    "tech mentorship",
    "student innovation",
    "tech skills",
    "programming community",
  ],
  authors: [
    {
      name: "ETS Hub Team",
      url: siteConfig.url,
    },
  ],
  creator: "ETS Hub",
  publisher: "ETS Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ETS Hub - Empowering Tech Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@etshub",
    site: "@etshub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body
        className={`${montserrat.variable} ${varelaRound.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
