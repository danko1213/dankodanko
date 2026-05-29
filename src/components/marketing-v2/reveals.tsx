"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset any stale `.in` markers from the previous page so re-rendered
    // reveals animate, and re-observe everything that's currently on the page.
    let rafId = 0;
    let io: IntersectionObserver | null = null;

    const wire = () => {
      const els = document.querySelectorAll<HTMLElement>(".mp-reveal");
      if (els.length === 0) return;

      io?.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      els.forEach((el) => {
        // Elements already on screen (above-the-fold) reveal immediately so a
        // freshly navigated page is never stuck blank.
        const r = el.getBoundingClientRect();
        const onScreen = r.top < window.innerHeight && r.bottom > 0;
        if (onScreen) {
          el.classList.add("in");
        } else {
          el.classList.remove("in");
          io!.observe(el);
        }
      });
    };

    // Wait a frame so the new route's DOM has mounted before we query it.
    rafId = requestAnimationFrame(wire);
    // Safety net: if anything slips through (e.g. lazily mounted blocks),
    // make sure no .mp-reveal stays invisible forever.
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".mp-reveal:not(.in)").forEach((el) => {
        el.classList.add("in");
      });
    }, 1500);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
