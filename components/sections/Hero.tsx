"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, stagger, useAnimate } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const headline = ["Cloud", "Infrastructure", "Engineer."];

const charVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = async () => {
      await animate(
        ".char",
        { opacity: 1, y: 0 },
        {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: stagger(0.04),
        }
      );
      await animate(
        ".hero-sub",
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      );
      await animate(
        ".hero-cta",
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      );
    };
    sequence();
  }, [animate]);

  const scrollToWork = () => {
    const el = document.getElementById("projects");
    if (!el) return;
    const lenis = (window as unknown as Record<string, unknown>).lenis as {
      scrollTo: (el: HTMLElement) => void;
    } | undefined;
    lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(24px, 6vw, 96px)",
        overflow: "hidden",
      }}
    >
      {/* Three.js background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.85,
        }}
      >
        <HeroScene />
      </div>

      {/* Gradient vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(8,8,8,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div ref={scope} style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 32 }}
        >
          <span className="section-tag">Available for work</span>
        </motion.div>

        {/* Split headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "var(--color-fg)",
            marginBottom: 32,
          }}
        >
          {headline.map((word, wi) => (
            <span
              key={wi}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                overflow: "hidden",
              }}
            >
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="char"
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(80px)",
                    color: wi === 1 ? "var(--color-accent)" : "var(--color-fg)",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div style={{ overflow: "hidden", marginBottom: 48 }}>
          <p
            className="hero-sub"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-fg-muted)",
              letterSpacing: "0.01em",
              lineHeight: 1.6,
              maxWidth: 540,
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            Systems Engineer specializing in Linux, cloud platforms (AWS, Azure,
            Alibaba), and virtualization infrastructure. I build resilient systems that scale.
          </p>
        </div>

        {/* CTA row */}
        <div
          className="hero-cta"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          <MagneticButton
            onClick={scrollToWork}
            className="magnetic-cta"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                background: "var(--color-accent)",
                color: "var(--color-bg)",
                borderRadius: 9999,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
                transition: "transform 0.2s ease",
              }}
            >
              View My Work
              <ArrowDown size={16} />
            </span>
          </MagneticButton>

          <MagneticButton href="#contact">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                background: "transparent",
                color: "var(--color-fg)",
                border: "1px solid var(--color-border)",
                borderRadius: 9999,
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
              }}
            >
              Let&apos;s Talk
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], y: [0, 16, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
            transformOrigin: "top",
          }}
        />
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-fg-muted)",
          }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
