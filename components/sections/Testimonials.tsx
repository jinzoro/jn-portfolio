"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Working with them was transformative. They don't just write code — they think about the product holistically. The dashboard they built for us became the most praised feature in our Series A pitch.",
    name: "Sarah Chen",
    title: "Co-founder & CEO",
    company: "Luminary AI",
    initial: "SC",
  },
  {
    quote:
      "I've worked with a lot of senior engineers, but very few who can move between high-level architecture and pixel-perfect UI without missing a beat. An exceptional collaborator.",
    name: "Marcus Johansson",
    title: "VP of Engineering",
    company: "Linear",
    initial: "MJ",
  },
  {
    quote:
      "They delivered in half the time we estimated, without any quality trade-offs. The performance optimizations alone saved us $40K/month in infrastructure costs.",
    name: "Priya Nair",
    title: "CTO",
    company: "Atlas Platform",
    initial: "PN",
  },
];

const INTERVAL = 5500;

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / INTERVAL, 1);
      setProgress(p);

      if (p >= 1) {
        setActive((prev) => (prev + 1) % testimonials.length);
        startRef.current = ts;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    startRef.current = null;
    setProgress(0);
  };

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(204,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 20 }}
      >
        <span className="section-tag">Testimonials</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--color-fg)",
          marginBottom: 72,
        }}
      >
        What people
        <br />
        <span style={{ color: "var(--color-accent)" }}>say about the work</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ maxWidth: 860, position: "relative" }}
      >
        {/* Decorative quote */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -20,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(8rem, 16vw, 18rem)",
            color: "rgba(204,255,0,0.06)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          "
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
              lineHeight: 1.65,
              color: "var(--color-fg)",
              letterSpacing: "-0.01em",
              marginBottom: 40,
              position: "relative",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>

        {/* Author */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "var(--color-bg)",
                flexShrink: 0,
              }}
            >
              {t.initial}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  color: "var(--color-fg)",
                  marginBottom: 2,
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.78rem",
                  color: "var(--color-fg-muted)",
                }}
              >
                {t.title} · {t.company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              data-cursor="pointer"
              style={{
                position: "relative",
                height: 2,
                width: i === active ? 56 : 24,
                background: "var(--color-border)",
                border: "none",
                borderRadius: 2,
                overflow: "hidden",
                transition: "width 0.3s ease",
                cursor: "none",
              }}
            >
              {i === active && (
                <motion.div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "var(--color-accent)",
                    width: `${progress * 100}%`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
