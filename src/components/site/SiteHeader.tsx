"use client";

// Client only for the scrolled state of the bar. The menu itself is a native
// disclosure and needs no JavaScript at all.

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/site/Wordmark";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

/**
 * The mobile menu is a details/summary disclosure rather than a dialog.
 *
 * A dialog primitive brings focus trapping, scroll locking and an inert
 * background — all of which a modal needs and a navigation panel does not.
 * The panel sits under the bar in the normal flow, so the browser's own
 * behaviour is correct and the library it replaced was 111 KB gzipped.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  /*
   * One delegated listener rather than a handler per link.
   *
   * In-page links leave their hash in the address bar, so reloading drops the
   * visitor back at whichever section they last jumped to rather than at the
   * top of the site. This scrolls to the target and puts the URL back.
   *
   * Delegation is what makes it reach the anchors in the hero and the footer
   * too — those are Server Components, and giving each one a click handler
   * would mean shipping them to the browser for the sake of one line.
   *
   * A hash arriving from outside is still honoured on first load; only the
   * hash this page creates for itself is cleaned up.
   */
  /*
   * Clear a hash that arrived in the URL.
   *
   * Cleaning up only on click was not enough: a hash already sitting in the
   * address bar — from a bookmark, from history, or from a click made before
   * this existed — survives every reload, and the browser jumps to it every
   * time. It is honoured once so an external deep link still works, then the
   * URL is put back so the next reload lands at the top.
   *
   * #main is the skip link's target and is left alone.
   */
  useEffect(() => {
    const { hash, pathname, search } = window.location;
    if (!hash || hash === "#main") return;

    window.history.replaceState(null, "", pathname + search);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname);

      // Close the mobile menu if the click came from inside it.
      anchor.closest("details")?.removeAttribute("open");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      /*
        The blur is always on — over a solid background at the top of the page
        it does nothing visible, and switching it on mid-scroll popped. Only
        the background and the border animate, and they animate together.
      */
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-rule bg-paper/85"
          : "border-transparent bg-paper/0"
      }`}
    >
      <div className="site-x flex h-16 w-full items-center justify-between">
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
          <a
            href="#inquiry"
            className="hidden h-9 items-center rounded-lg bg-ink px-4 text-sm font-medium text-paper transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Start a project
          </a>

          <details className="group md:hidden">
            <summary
              className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg text-ink transition-colors hover:bg-sunken [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <Menu
                className="size-5 group-open:hidden"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <X
                className="hidden size-5 group-open:block"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </summary>

            <nav
              aria-label="Mobile"
              className="site-x absolute inset-x-0 top-16 flex flex-col gap-1 border-b border-rule bg-paper pb-5"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                      className="rounded-md py-2.5 text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#inquiry"
                className="mt-2 rounded-lg bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
              >
                Start a project
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
