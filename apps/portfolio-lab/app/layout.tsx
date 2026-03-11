import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idea Lab",
  description: "개인 아이디어를 기록하고 평가하고 다시 찾아보는 로컬 기반 정리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.10),_transparent_30%),linear-gradient(180deg,#fffaf0_0%,#f6f3ee_100%)]">
          <header className="border-b border-black/5 bg-white/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-950">
                Idea Lab
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
                <Link href="/ideas" className="hover:text-zinc-950">
                  아이디어 목록
                </Link>
                <Link href="/ideas/new" className="hover:text-zinc-950">
                  새 아이디어
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

