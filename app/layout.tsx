import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Layout";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Cell Architecture Studio · Microscopic Journey of Life",
  description:
    "Cell Architecture Studio · Explore the Beauty of Life Under the Microscope",
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
      </body>
    </html>
  );
}
