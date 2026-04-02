"use client";

import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let rafId: number;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Expose globally so Navbar / Footer scroll-to functions can use it
      (window as unknown as Record<string, unknown>).lenis = lenis;

      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      return lenis;
    };

    const lenisPromise = init();

    return () => {
      cancelAnimationFrame(rafId);
      lenisPromise.then((lenis) => lenis?.destroy());
    };
  }, []);

  return <>{children}</>;
}
