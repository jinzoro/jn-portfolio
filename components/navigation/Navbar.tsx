"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const overlayVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as Record<string, unknown>).lenis as {
      scrollTo: (el: HTMLElement, opts?: object) => void;
    } | undefined;
    lenis ? lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 32px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(240,238,232,0.06)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.03em",
            color: "var(--color-fg)",
            textDecoration: "none",
          }}
          data-cursor="pointer"
        >
          IZ<span style={{ color: "var(--color-accent)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              data-cursor="pointer"
              style={{
                position: "relative",
                padding: "6px 14px",
                background: "transparent",
                border: "none",
                color:
                  activeSection === link.href
                    ? "var(--color-fg)"
                    : "var(--color-fg-muted)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 14,
                    right: 14,
                    height: 1,
                    background: "var(--color-accent)",
                    borderRadius: 1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            data-cursor="pointer"
            style={{
              marginLeft: 8,
              padding: "8px 20px",
              border: "1px solid var(--color-border)",
              borderRadius: 9999,
              color: "var(--color-fg)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-fg)";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="pointer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            background: "transparent",
            border: "none",
            color: "var(--color-fg)",
          }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "var(--color-bg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                onClick={() => scrollTo(link.href)}
                data-cursor="pointer"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-fg)"; }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
