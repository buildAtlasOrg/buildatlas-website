import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { cn } from "@/lib/utils";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "BuildAtlas | Read your pipeline before you read the logs",
  description:
    "BuildAtlas turns CI/CD failures into maps your team can actually read, trace, and hand off.",
  openGraph: {
    title: "BuildAtlas | Read your pipeline before you read the logs",
    description:
      "BuildAtlas turns CI/CD failures into maps your team can actually read, trace, and hand off.",
    images: ["/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sans.variable, mono.variable, "font-sans")}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
