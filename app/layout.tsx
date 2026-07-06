import "../global.css";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Prabhanjan | Full Stack Developer",
    template: "%s | Prabhanjan",
  },
  description:
    "Prabhanjan — Information Science student and Full Stack Developer. Builds efficient web applications, scalable backend systems, and developer tooling.",
  openGraph: {
    title: "Prabhanjan | Full Stack Developer",
    description:
      "Information Science student and Full Stack Developer at BMSCE.",
    url: "https://prabhanjan.live",
    siteName: "Prabhanjan.live",
    images: [
      {
        url: "https://static.vecteezy.com/system/resources/previews/003/693/837/non_2x/p-letter-logo-icon-for-business-and-company-vector.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  twitter: {
    title: "Prabhanjan | Full Stack Developer",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/Prabhanjan.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0B0F14] text-[#e6edf3] antialiased overflow-x-hidden pb-[22px]">
        {children}

        {/* VS Code-style Status Bar */}
        <footer
          className="vscode-statusbar"
          role="contentinfo"
          aria-label="Editor status bar"
        >
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M1 2.5A1.5 1.5 0 012.5 1h11A1.5 1.5 0 0115 2.5v11a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 13.5v-11zm1.5-.5a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-11z"/>
              <path d="M4 8a4 4 0 118 0 4 4 0 01-8 0zm1 0a3 3 0 106 0 3 3 0 00-6 0z"/>
            </svg>
            main
          </span>
          <span>TypeScript</span>
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
          <span className="ml-auto">Prabhanjan.live</span>
          <span>▲ Ready</span>
        </footer>
      </body>
    </html>
  );
}
