"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luminary",
    category: "SaaS / Finance",
    year: "2024",
    description:
      "An AI-powered financial dashboard that processes 50M+ transactions daily. Built with Next.js, Go microservices, and a real-time WebSocket layer.",
    accent: "#ccff00",
    tags: ["Next.js", "Go", "PostgreSQL", "WebSocket"],
    bg: "linear-gradient(135deg, #0d1200 0%, #141a00 100%)",
  },
  {
    id: 2,
    title: "Phantom",
    category: "Design Tool",
    year: "2024",
    description:
      "A collaborative vector design tool with multiplayer cursors and conflict-free real-time sync using CRDTs.",
    accent: "#6366f1",
    tags: ["React", "Rust", "CRDTs", "Canvas API"],
    bg: "linear-gradient(135deg, #07071a 0%, #0d0d24 100%)",
  },
  {
    id: 3,
    title: "Atlas",
    category: "Platform / Maps",
    year: "2023",
    description:
      "Location intelligence platform powering 200+ enterprise clients with custom map overlays, geofencing, and predictive routing.",
    accent: "#00d4ff",
    tags: ["TypeScript", "MapboxGL", "Python", "Redis"],
    bg: "linear-gradient(135deg, #001215 0%, #001a1f 100%)",
  },
  {
    id: 4,
    title: "Forma",
    category: "E-Commerce",
    year: "2023",
    description:
      "High-conversion fashion storefront with a 3D product viewer, AR try-on, and a headless Shopify back-end.",
    accent: "#ff6b35",
    tags: ["Next.js", "Three.js", "Shopify", "Contentful"],
    bg: "linear-gradient(135deg, #150800 0%, #1f0f00 100%)",
  },
  {
    id: 5,
    title: "Signal",
    category: "Dev Tools / CLI",
    year: "2022",
    description:
      "Open-source observability CLI that aggregates logs from AWS, GCP, and Azure into a unified terminal UI.",
    accent: "#a78bfa",
    tags: ["Rust", "TUI", "AWS", "GCP"],
    bg: "linear-gradient(135deg, #0a0715 0%, #110d1e 100%)",
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="pointer"
      style={{
        minWidth: "clamp(300px, 36vw, 520px)",
        maxWidth: "clamp(300px, 36vw, 520px)",
        height: 440,
        borderRadius: 20,
        border: `1px solid ${hovered ? project.accent + "30" : "var(--color-border)"}`,
        overflow: "hidden",
        position: "relative",
        background: project.bg,
        scrollSnapAlign: "start",
        flexShrink: 0,
        transition: "border-color 0.4s ease",
        cursor: "none",
      }}
    >
      {/* Background glow on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${project.accent}18 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Number */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 28,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "4rem",
          color: `${project.accent}14`,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: 9999,
                border: `1px solid ${project.accent}30`,
                color: project.accent,
                fontSize: "0.7rem",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Category + year */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--color-fg-muted)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              color: "var(--color-fg-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-fg)",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          {project.title}
        </h3>

        {/* Description — slides up on hover */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? 120 : 0,
            transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "0.875rem",
              lineHeight: 1.65,
              color: "var(--color-fg-muted)",
              marginBottom: 16,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* CTA */}
        <motion.div
          animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.25 }}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.82rem",
              color: project.accent,
              letterSpacing: "0.04em",
            }}
          >
            View Case Study
          </span>
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>
            <ArrowUpRight size={15} color={project.accent} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 clamp(24px, 6vw, 96px)",
          marginBottom: 56,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <span className="section-tag">Selected work</span>
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
            }}
          >
            Projects that
            <br />
            <span style={{ color: "var(--color-accent)" }}>moved the needle</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "var(--color-fg-muted)",
            maxWidth: 280,
            lineHeight: 1.7,
          }}
        >
          Drag to explore ← →
          <br />A curated selection of work across startups and enterprise.
        </motion.p>
      </div>

      {/* Horizontal scroll */}
      <motion.div
        ref={scrollRef}
        className="horizontal-scroll"
        drag="x"
        dragConstraints={scrollRef}
        style={{
          padding: "0 clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
        }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {/* End padding */}
        <div style={{ minWidth: 1, flexShrink: 0 }} />
      </motion.div>
    </section>
  );
}
