import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildAtlas — Map Your Pipelines",
  description:
    "Visualize and debug CI/CD pipelines instantly. BuildAtlas transforms complex pipelines into clear visual maps.",
  openGraph: {
    title: "BuildAtlas — Map Your Pipelines",
    description: "Visualize and debug CI/CD pipelines instantly.",
    images: ["/cover.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}else if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`
          }}
        />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
