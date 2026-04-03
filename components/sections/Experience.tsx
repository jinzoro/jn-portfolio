"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    company: "CONVOTIS",
    role: "Systems Engineer",
    period: "Jun 2024 — Present",
    location: "Remote / Germany",
    bullets: [
      "Lead virtualization infrastructure for CONVOTISCLOUD, the company's proprietary cloud platform — full ownership of Proxmox VE clusters and backup systems.",
      "Assisted in datacenter deployment in Germany: capacity planning, network architecture, and high-availability configuration.",
      "Designed and administered Proxmox Backup Server (PBS) integrated across all PVE clusters, ensuring a robust and redundant backup strategy.",
    ],
    accent: "#00d4ff",
  },
  {
    company: "LEYTON",
    role: "IT Analyst",
    period: "Nov 2022 — Jun 2024",
    location: "Casablanca",
    bullets: [
      "Implemented a centralized Active Directory system on Windows Server, streamlining user management for 1,000+ users across the organization.",
      "Managed deployment and integration of WorkspaceOne, SentinelOne, Magicinfo, and VPN MFA across multiple sites.",
      "Delivered worldwide technical support, resolving complex incidents to maintain operational efficiency.",
    ],
    accent: "#6366f1",
  },
  {
    company: "BMCI — DIGIFI",
    role: "IT Consultant",
    period: "Feb 2022 — Nov 2022",
    location: "Casablanca",
    bullets: [
      "Executed detailed test cases and conducted manual and regression testing as a Junior Software Tester.",
      "Identified and documented defects, improving overall software quality and delivery processes.",
    ],
    accent: "#3b82f6",
  },
  {
    company: "CONCENTRIX",
    role: "Technical Adviser L2",
    period: "Oct 2018 — Nov 2019",
    location: "Casablanca",
    bullets: [
      "Resolved complex technical cases related to optical fiber issues that had eluded front-line resolution.",
      "Played a key role in network management, ensuring seamless functionality and improved performance metrics.",
    ],
    accent: "#10b981",
  },
];

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-card-grid">
      {/* Left card */}
      <div className={isLeft ? "timeline-left-col" : "timeline-empty-col"} style={{ padding: "0 32px 0 0" }}>
        {isLeft && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="card-glass"
            style={{ padding: 28, textAlign: "right" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px",
                borderRadius: 9999,
                border: `1px solid ${exp.accent}30`,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  color: exp.accent,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {exp.period}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
                color: "var(--color-fg)",
                marginBottom: 4,
              }}
            >
              {exp.company}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: exp.accent,
                marginBottom: 16,
              }}
            >
              {exp.role}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div
        className="timeline-center-col"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: exp.accent,
            border: "3px solid var(--color-bg)",
            boxShadow: `0 0 0 2px ${exp.accent}40`,
            marginTop: 28,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Right card */}
      <div className={!isLeft ? "timeline-right-col" : "timeline-empty-col"} style={{ padding: "0 0 0 32px" }}>
        {!isLeft && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1,
            }}
            className="card-glass"
            style={{ padding: 28 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px",
                borderRadius: 9999,
                border: `1px solid ${exp.accent}30`,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  color: exp.accent,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {exp.period}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
                color: "var(--color-fg)",
                marginBottom: 4,
              }}
            >
              {exp.company}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: exp.accent,
                marginBottom: 16,
              }}
            >
              {exp.role}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 20 }}
      >
        <span className="section-tag">Career</span>
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
        Where I&apos;ve
        <br />
        <span style={{ color: "var(--color-accent)" }}>done the work</span>
      </motion.h2>

      {/* Timeline */}
      <div ref={timelineRef} style={{ position: "relative" }}>
        {/* Animated vertical line */}
        <div
          className="timeline-line-wrapper"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            bottom: 0,
            width: 1,
            background: "var(--color-border)",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: lineHeight,
              background:
                "linear-gradient(to bottom, var(--color-accent), rgba(204,255,0,0.3))",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
