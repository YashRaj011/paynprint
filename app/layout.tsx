import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/Notification";

const cormorantGaramond = Cormorant_Garamond({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "PaynPrint – Hassle Free Document Printing",
  description:
    "Upload your document from your phone, pay online, and collect your print instantly. No queues. No Hassle",
  openGraph: {
    title: "PaynPrint – Hassle Free Document Printing",
    description:
      "Upload your document from your phone, pay online, and collect your print instantly. No queues. No Hassle",
    url: "https://paynprint.com",
    images: [
      {
        url: "/pnp_logo_full.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${nunito.variable} antialiased`}
      >
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
