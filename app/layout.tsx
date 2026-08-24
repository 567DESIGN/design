import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shijun Peng — Visual Designer",
  description: "Portfolio of Shijun Peng, visual, brand and AI designer.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
