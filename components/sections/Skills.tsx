"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Palette,
  Cloud,
  Layers,
  Database,
  Cpu,
  Globe,
  GitBranch,
  Zap,
  Box,
  Monitor,
} from "lucide-react";

interface SkillCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  span?: "wide" | "tall" | "normal";
  accent?: string;
}

const cards: SkillCard[] = [
  {
    icon: <Code2 size={28} />,
    title: "React & Next.js",
    description: "App Router, RSC, streaming SSR, edge runtime, ISR",
    span: "normal",
    accent: "#61dafb",
  },
  {
    icon: <Layers size={28} />,
    title: "TypeScript",
    description: "Strict mode, generic utilities, conditional types, Zod",
    span: "normal",
    accent: "#3178c6",
  },
  {
    icon: <Globe size={28} />,
    title: "Three.js / WebGL",
    description: "Custom shaders, GLSL, particle systems, post-processing FX",
    span: "wide",
    accent: "#ccff00",
  },
  {
    icon: <Server size={28} />,
    title: "Node.js & Go",
    description:
      "High-throughput APIs, microservices, gRPC, event-driven architecture",
    span: "normal",
    accent: "#68a063",
  },
  {
    icon: <Database size={28} />,
    title: "Databases",
    description: "PostgreSQL, Redis, MongoDB, vector DBs — schema design & query optimization",
    span: "tall",
    accent: "#336791",
  },
  {
    icon: <Palette size={28} />,
    title: "Figma & Design",
    description: "Design systems, component libraries, interaction prototyping",
    span: "normal",
    accent: "#f24e1e",
  },
  {
    icon: <Cloud size={28} />,
    title: "Cloud & DevOps",
    description: "AWS, GCP, Vercel, Docker, Kubernetes, CI/CD pipelines",
    span: "normal",
    accent: "#ff9900",
  },
  {
    icon: <Zap size={28} />,
    title: "Animation",
    description: "Framer Motion, GSAP, CSS animations, Lenis smooth scroll",
    span: "normal",
    accent: "#ccff00",
  },
  {
    icon: <Cpu size={28} />,
    title: "AI / ML Integration",
    description: "OpenAI, Claude API, LangChain, vector search, RAG pipelines",
    span: "wide",
    accent: "#a78bfa",
  },
  {
    icon: <Box size={28} />,
    title: "State & Data",
    description: "Zustand, React Query, tRPC, GraphQL, Prisma ORM",
    span: "normal",
    accent: "#e36700",
  },
  {
    icon: <GitBranch size={28} />,
    title: "Git & Collaboration",
    description: "GitHub Actions, trunk-based dev, semantic versioning",
    span: "normal",
    accent: "#f05032",
  },
  {
    icon: <Monitor size={28} />,
    title: "Testing & QA",
    description: "Vitest, Playwright, Cypress, Testing Library, Storybook",
    span: "normal",
    accent: "#15c213",
  },
];

function Card({ card, index }: { card: SkillCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.055,
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      data-cursor="pointer"
      className="card-glass"
      style={{
        gridColumn: card.span === "wide" ? "span 2" : "span 1",
        gridRow: card.span === "tall" ? "span 2" : "span 1",
        padding: "clamp(20px, 2.5vw, 28px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: card.span === "tall" ? 280 : 140,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: `${card.accent ?? "var(--color-accent)"}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: card.accent ?? "var(--color-accent)",
          flexShrink: 0,
        }}
      >
        {card.icon}
      </div>

      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
            color: "var(--color-fg)",
            marginBottom: 6,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: "var(--color-fg-muted)",
          }}
        >
          {card.description}
        </p>
      </div>

      {card.span === "tall" && (
        <div
          style={{
            marginTop: "auto",
            height: 1,
            background: `linear-gradient(to right, ${card.accent ?? "var(--color-accent)"}40, transparent)`,
          }}
        />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 20 }}
      >
        <span className="section-tag">Capabilities</span>
      </motion.div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 56,
        }}
      >
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
          Tech I reach
          <br />
          for <span style={{ color: "var(--color-accent)" }}>every day</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "var(--color-fg-muted)",
            maxWidth: 300,
            lineHeight: 1.7,
          }}
        >
          Opinionated stack. Pragmatic choices. I pick the right tool for the job —
          not the fashionable one.
        </motion.p>
      </div>

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 16,
        }}
      >
        {cards.map((card, i) => (
          <Card key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
