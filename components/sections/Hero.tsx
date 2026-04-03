"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, stagger, useAnimate } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const headline = ["Cloud", "Infrastructure", "Engineer."];

export default function Hero() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = async () => {
      await animate(
        ".char",
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: stagger(0.04) }
      );
      await animate(".hero-sub", { opacity: 1, y: 0 }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
      await animate(".hero-cta", { opacity: 1, y: 0 }, { duration: 0.5, ease: [0.16, 1, 0.3, 1] });
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
        background: "linear-gradient(135deg, #04050e 0%, #070918 100%)",
      }}
    >
      {/* Three.js background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.9 }}>
        <HeroScene />
      </div>

      {/* Vignettes */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(4,5,14,0.8) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(4,5,14,0.65) 0%, transparent 65%)",
      }} />

      {/* Content */}
      <div ref={scope} style={{ position: "relative", zIndex: 2, maxWidth: 960 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 32 }}
        >
          <span className="section-tag" style={{ color: "#00d4ff" }}>
            Available for work
          </span>
        </motion.div>

        {/* Headline — whiteSpace nowrap prevents mid-word wrapping */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 5vw, 5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#e8e8f0",
            marginBottom: 32,
          }}
        >
          {headline.map((word, wi) => (
            <span
              key={wi}
              style={{
                display: "inline-block",
                marginRight: "0.22em",
                overflow: "hidden",
                whiteSpace: "nowrap",
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
                    color: wi === 1 ? "#00d4ff" : "#e8e8f0",
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
              fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
              color: "rgba(232,232,240,0.55)",
              letterSpacing: "0.01em",
              lineHeight: 1.65,
              maxWidth: 520,
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            Systems Engineer specializing in Linux, cloud platforms (AWS, Azure,
            Alibaba), and virtualization. Building resilient infrastructure at scale.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="hero-cta"
          style={{ display: "flex", gap: 16, alignItems: "center", opacity: 0, transform: "translateY(20px)" }}
        >
          <MagneticButton onClick={scrollToWork}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px",
              background: "#0a84ff",
              color: "#ffffff",
              borderRadius: 9999,
              fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(10,132,255,0.4)",
            }}>
              View My Work <ArrowDown size={16} />
            </span>
          </MagneticButton>

          <MagneticButton href="#contact">
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px",
              background: "rgba(255,255,255,0.07)",
              color: "#e8e8f0",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 9999,
              fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "0.9rem",
              letterSpacing: "0.02em",
              backdropFilter: "blur(12px)",
            }}>
              Let&apos;s Talk
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], y: [0, 16, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 48,
            background: "linear-gradient(to bottom, #00d4ff, transparent)",
            transformOrigin: "top",
          }}
        />
        <span style={{
          fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(232,232,240,0.35)",
        }}>Scroll</span>
      </motion.div>
    </section>
  );
}
