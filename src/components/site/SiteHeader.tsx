"use client";

// Client component for the mobile menu and the scroll state. Nothing here
// touches data.

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Wordmark } from "@/components/site/Wordmark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="StudioOps home">
          <Wordmark className="text-sm" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<a href="#inquiry" />}
            className="hidden h-9 px-4 sm:inline-flex"
          >
            Start a project
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Wordmark className="text-sm" />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<a href={link.href} />}
                    className="rounded-md px-3 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={<a href="#inquiry" />}
                  className="mt-3 rounded-md bg-ink px-3 py-2.5 text-center text-sm font-medium text-paper"
                >
                  Start a project
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
