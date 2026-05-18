"use client";
import { BrandLogoIcon } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Menu, X } from "lucide-react";
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

export function Header() {
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
    </div>
  );

  return (
    <header className="flex items-center justify-between md:justify-start gap-6 md:px-4 py-3 bg-linear-to-r from-(--bg-card) to-(--bg-secondary) ">
      <div className="flex items-center gap-2">
        <div
          className="w-12 h-12 grid place-items-center bg-linear-to-br from-(--accent-primary) to-(--accent-secondary) rounded-lg shadow-md text-white"
          aria-hidden="true"
        >
          <BrandLogoIcon />
        </div>
        <div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold tracking-tight text-(--ink-primary)">
              Curio 3D Lab
            </h1>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Database className="w-4 h-4 mr-2" />
                Models
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-2 w-64">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/project/${project.slug}`}
                      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-(--bg-hover) transition-colors ${
                        pathname === `/project/${project.slug}`
                          ? "bg-(--bg-secondary)"
                          : ""
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
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex justify-center items-center px-4 py-2.5 text-xs text-(--ink-muted) ">
      <span>
        © {new Date().getFullYear()} Curio 3D Lab · Designed for Classroom
        Teaching & Science Communication
      </span>
    </footer>
  );
}
