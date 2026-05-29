"use client";
import { Brand3DLogo } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Menu, X, Box } from "lucide-react";
import { projects } from "@/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { Project } from "@/data";
import { Tripo3DPromoLink } from "@/components/Tripo3DPromoLink";

interface HeaderProps {
  project?: Project;
}

export function Header({ project }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuContent = (
    <div className="p-2">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/project/${project.slug}`}
          onClick={() => setOpen(false)}
          className={`flex items-start gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
            pathname === `/project/${project.slug}` ? "bg-(--bg-secondary)" : ""
          }`}
        >
          <span className="text-2xl">🧬</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-(--ink-primary)">
              {project.name}
            </div>
            <div className="text-xs text-(--ink-muted) mt-0.5">
              {project.description}
            </div>
            <div className="text-[10px] text-(--ink-muted) mt-1">
              {project.models.length} models
            </div>
          </div>
        </Link>
      ))}
      <Link
        href="/viewer"
        onClick={() => setOpen(false)}
        className={`flex items-start gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
          pathname === "/viewer" ? "bg-(--bg-secondary)" : ""
        }`}
      >
        <span className="text-2xl">📦</span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-(--ink-primary)">
            3D GLB Viewer
          </div>
          <div className="text-xs text-(--ink-muted) mt-0.5">
            Import and view your own GLB files
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <header className="flex items-center justify-between md:justify-start gap-6 md:px-4 py-3 bg-linear-to-r from-(--bg-card) to-(--bg-secondary) ">
      <div className="flex items-center gap-2">
        <Brand3DLogo />
        <div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold tracking-tight text-(--ink-primary)">
              {project?.name || "Show3D"}
            </h1>
          </Link>
          {project && <p className="text-sm text-(--ink-muted)">@Show3D</p>}
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden md:flex items-center justify-between grow gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Database className="w-4 h-4 mr-2" />
                Browse Models
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-2 w-64">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/project/${project.slug}`}
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
                        pathname === `/project/${project.slug}`
                          ? "bg-(--bg-secondary)"
                          : ""
                      }`}
                    >
                      <span className="text-xl">{project.icon}</span>
                      <div className="text-sm font-semibold text-(--ink-primary)">
                        {project.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                3D Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-2 w-56">
                  <Link
                    href="/viewer"
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
                      pathname === "/viewer" ? "bg-(--bg-secondary)" : ""
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    <div className="text-sm font-semibold text-(--ink-primary)">
                      3D Viewer
                    </div>
                  </Link>
                  <Link
                    href="/converter"
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
                      pathname === "/converter" ? "bg-(--bg-secondary)" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <div className="text-sm font-semibold text-(--ink-primary)">
                      3D Converter
                    </div>
                  </Link>
                  <Link
                    href="/optimize"
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
                      pathname === "/optimize" ? "bg-(--bg-secondary)" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className="text-sm font-semibold text-(--ink-primary)">
                      GLB Optimizer
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Tripo3D Promo Link - Desktop */}
        <Tripo3DPromoLink size="md" />
      </div>

      {/* Mobile Sidebar Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-(--bg-hover) transition-colors">
              <Menu className="w-5 h-5 text-(--ink-primary)" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Models
              </SheetTitle>
            </SheetHeader>
            {menuContent}

            {/* Tools Section - Mobile */}
            <div className="px-2 mt-4">
              <div className="text-xs font-semibold text-(--ink-muted) uppercase tracking-wider px-3 mb-2">
                Tools
              </div>
              <Link
                href="/viewer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors"
              >
                <Box className="w-5 h-5 text-(--accent-primary)" />
                <div className="text-sm font-semibold text-(--ink-primary)">
                  3D Viewer
                </div>
              </Link>
              <Link
                href="/converter"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors"
              >
                <svg
                  className="w-5 h-5 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <div className="text-sm font-semibold text-(--ink-primary)">
                  3D Converter
                </div>
              </Link>
              <Link
                href="/optimize"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors"
              >
                <svg
                  className="w-5 h-5 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <div className="text-sm font-semibold text-(--ink-primary)">
                  GLB Optimizer
                </div>
              </Link>
            </div>

            {/* Tripo3D Promo Link - Mobile */}
            <div className="px-4 py-3 mt-2 border-t border-(--border-color)">
              <Tripo3DPromoLink size="md" className="w-full justify-center" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4 py-2.5 text-xs text-(--ink-muted) ">
      <span>
        © {new Date().getFullYear()} Show3D · Designed for Classroom Teaching &
        Science Communication & Product Demonstration
      </span>
      <span className="hidden sm:inline">|</span>
      <Tripo3DPromoLink size="sm" />
    </footer>
  );
}
