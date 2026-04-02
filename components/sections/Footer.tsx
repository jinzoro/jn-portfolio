"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const scrollToTop = () => {
    const lenis = (window as unknown as Record<string, unknown>).lenis as {
      scrollTo: (target: number, opts?: object) => void;
    } | undefined;
    lenis
      ? lenis.scrollTo(0, { duration: 1.4 })
      : window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "32px clamp(24px, 6vw, 96px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      {/* Left */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.8rem",
          color: "var(--color-fg-muted)",
          letterSpacing: "0.02em",
        }}
      >
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </p>

      {/* Center */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.8rem",
          color: "var(--color-fg-muted)",
        }}
      >
        Designed & built with{" "}
        <span style={{ color: "var(--color-accent)" }}>↑ attention</span>
      </p>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        data-cursor="pointer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: 9999,
          padding: "8px 16px",
          color: "var(--color-fg-muted)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "none",
          transition: "color 0.25s ease, border-color 0.25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "var(--color-accent)";
          el.style.borderColor = "var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.color = "var(--color-fg-muted)";
          el.style.borderColor = "var(--color-border)";
        }}
      >
        <ArrowUp size={14} />
        Back to top
      </button>
    </motion.footer>
  );
}
