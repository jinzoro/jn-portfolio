"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CONVOTISCLOUD",
    category: "Private Cloud Infrastructure",
    year: "2024 — Present",
    company: "CONVOTIS",
    description:
      "Designed and deployed CONVOTIS's proprietary cloud platform from the ground up — full ownership of Proxmox VE cluster architecture, Proxmox Backup Server (PBS) integration, GLPI asset management, and a complete monitoring stack with Zabbix and Grafana.",
    accent: "#00d4ff",
    tags: ["Proxmox VE", "PBS", "GLPI", "Zabbix", "Grafana", "Keycloak"],
    bg: "linear-gradient(135deg, #030c18 0%, #051428 100%)",
  },
  {
    id: 2,
    title: "DE Datacenter",
    category: "Infrastructure & Networking",
    year: "2024",
    company: "CONVOTIS",
    description:
      "Assisted in full datacenter deployment in Germany — capacity planning, high-availability Proxmox cluster segmentation by business function, and network architecture with HAProxy, Traefik, and PowerDNS.",
    accent: "#6366f1",
    tags: ["HAProxy", "Traefik", "PowerDNS", "Proxmox", "High Availability"],
    bg: "linear-gradient(135deg, #09091f 0%, #0f0f30 100%)",
  },
  {
    id: 3,
    title: "Enterprise Identity",
    category: "Identity & Access Management",
    year: "2023",
    company: "LEYTON",
    description:
      "Designed and implemented a centralized Active Directory system on Windows Server for 1,000+ users across the Casablanca site — Group Policy enforcement, security hardening, and VPN MFA integration.",
    accent: "#3b82f6",
    tags: ["Active Directory", "Windows Server", "Group Policy", "VPN MFA"],
    bg: "linear-gradient(135deg, #040e20 0%, #061528 100%)",
  },
  {
    id: 4,
    title: "Endpoint Security",
    category: "Security & UEM",
    year: "2023",
    company: "LEYTON",
    description:
      "Deployed SentinelOne EDR and VMware WorkspaceOne UEM across the organization, delivering unified endpoint visibility, policy enforcement, and automated threat response at scale.",
    accent: "#10b981",
    tags: ["SentinelOne", "WorkspaceOne", "VPN MFA", "Windows"],
    bg: "linear-gradient(135deg, #021510 0%, #041f18 100%)",
  },
  {
    id: 5,
    title: "MagicInfo Platform",
    category: "Digital Signage",
    year: "2023",
    company: "LEYTON",
    description:
      "Managed the full deployment and integration of Samsung MagicInfo Server for digital signage across multiple office sites — content scheduling, device management, and network configuration.",
    accent: "#f59e0b",
    tags: ["MagicInfo", "Windows Server", "Network", "IT Management"],
    bg: "linear-gradient(135deg, #1a0f00 0%, #251600 100%)",
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
        border: `1px solid ${hovered ? project.accent + "40" : "rgba(255,255,255,0.08)"}`,
        overflow: "hidden",
        position: "relative",
        background: project.bg,
        scrollSnapAlign: "start",
        flexShrink: 0,
        transition: "border-color 0.4s ease",
        cursor: "none",
      }}
    >
      {/* Glow on hover */}
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

      {/* Company badge */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 28,
          padding: "4px 12px",
          borderRadius: 9999,
          border: `1px solid ${project.accent}30`,
          background: `${project.accent}10`,
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            color: project.accent,
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {project.company}
        </span>
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
              color: "rgba(240,238,232,0.5)",
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
              color: "rgba(240,238,232,0.4)",
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
            color: "#f0eee8",
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
            maxHeight: hovered ? 140 : 0,
            transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "0.875rem",
              lineHeight: 1.65,
              color: "rgba(240,238,232,0.65)",
              marginBottom: 16,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* CTA */}
        <motion.div
          animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.5 }}
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
            View Details
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
            <span style={{ color: "var(--color-accent)" }}>Projects</span>
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
          <br />Real infrastructure and systems work across companies.
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
        <div style={{ minWidth: 1, flexShrink: 0 }} />
      </motion.div>
    </section>
  );
}
