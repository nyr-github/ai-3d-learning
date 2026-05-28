import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Layout";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Show3D · Science Communication",
  description:
    "Discover the beauty of biological entities, chemical molecules, and physical structures through interactive 3D models. Perfect for classroom teaching and self-study.",
};

export const viewport: Viewport = {
  themeColor: "#f8f3ea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head></head>
      <body className="bg-(--bg-primary) text-(--ink-secondary) font-(--font-sans) antialiased ">
        {children}
        <script
          async
          src="https://plausible.aivaded.com/api/loader/show3d.js"
        ></script>
      </body>
    </html>
  );
}
