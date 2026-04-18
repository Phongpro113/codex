import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from 'sonner'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codex Internal",
  description: "Codex Internal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Toaster
          position="top-right"  // Góc phải trên
          richColors          // Bật màu sắc phong phú
          toastOptions={{
            style: {
              background: 'maroon',      // Nền Maroon
              color: 'white',         // Chữ trắng
              border: 'none',
            },
            className: 'my-toast',
          }}
        />
      </body>
    </html>
  );
}
