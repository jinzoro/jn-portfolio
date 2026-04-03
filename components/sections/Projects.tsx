"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CONVOTISCLOUD",
    category: "Private Cloud Infrastructure",
    year: "2024 — Present",
    company: "CONVOTIS",
    summary: "Full ownership of CONVOTIS's proprietary cloud platform — from zero to production.",
    description:
      "Led the design and deployment of CONVOTISCLOUD, CONVOTIS's internal cloud platform comparable to AWS and Azure. Architected dedicated Proxmox VE clusters segmented by business function, implemented Proxmox Backup Server (PBS) across all PVE nodes for redundant backup coverage, and deployed GLPI for IT asset management. Set up a full monitoring stack with Zabbix and Grafana, configured Keycloak for SSO across services, and managed daily infrastructure administration — backups, security patching, performance tuning, and incident resolution.",
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
    summary: "Full datacenter deployment in Germany — capacity, HA, and network architecture.",
    description:
      "Assisted in the full infrastructure rollout of a datacenter in Germany. Responsibilities included capacity planning, network architecture design, and deploying high-availability configurations. Configured HAProxy and Traefik as load balancers, PowerDNS for internal DNS resolution, and Nginx as a reverse proxy. Designed Proxmox VE clusters with isolation by business function to ensure resource optimization and security boundaries between workloads.",
    accent: "#6366f1",
    tags: ["HAProxy", "Traefik", "PowerDNS", "Nginx", "Proxmox", "High Availability"],
    bg: "linear-gradient(135deg, #09091f 0%, #0f0f30 100%)",
  },
  {
    id: 3,
    title: "Enterprise Identity",
    category: "Identity & Access Management",
    year: "2023",
    company: "LEYTON",
    summary: "Centralized Active Directory for 1,000+ users across the Casablanca site.",
    description:
      "Designed and implemented a centralized Active Directory system on Windows Server at LEYTON's Casablanca site, covering over 1,000 users. Configured Group Policy Objects for security enforcement, managed user lifecycle and access rights, integrated VPN MFA for secure remote access, and maintained ongoing Active Directory health. This project significantly improved IT governance and reduced support overhead for user management.",
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
    summary: "Organization-wide rollout of SentinelOne EDR and WorkspaceOne UEM.",
    description:
      "Managed and executed the organization-wide deployment of SentinelOne EDR and VMware WorkspaceOne UEM at LEYTON. Configured policies, enrollment profiles, and automated threat response rules. Delivered unified endpoint visibility across all managed devices, enforced compliance policies, and integrated VPN MFA for an additional security layer — significantly improving the organization's security posture.",
    accent: "#10b981",
    tags: ["SentinelOne", "WorkspaceOne", "VPN MFA", "Windows", "Endpoint Management"],
    bg: "linear-gradient(135deg, #021510 0%, #041f18 100%)",
  },
  {
    id: 5,
    title: "MagicInfo Platform",
    category: "Digital Signage",
    year: "2023",
    company: "LEYTON",
    summary: "Full deployment of Samsung MagicInfo digital signage across multiple office sites.",
    description:
      "Deployed and managed Samsung MagicInfo Server for digital signage across multiple LEYTON office sites. Handled server installation, device enrollment, content scheduling, and network integration. Configured display groups, managed content playlists, and ensured reliable connectivity between signage devices and the MagicInfo server — enabling real-time content updates across all screens.",
    accent: "#f59e0b",
    tags: ["MagicInfo", "Windows Server", "Network", "IT Management"],
    bg: "linear-gradient(135deg, #1a0f00 0%, #251600 100%)",
  },
];

type Project = (typeof projects)[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
        background: "rgba(4,5,14,0.75)",
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 660,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 24,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(40px) saturate(200%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
          padding: "clamp(28px, 4vw, 48px)",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          data-cursor="pointer"
          style={{
            position: "absolute", top: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(232,232,240,0.7)",
          }}
        >
          <X size={16} />
        </button>

        {/* Company badge */}
        <div style={{ marginBottom: 20 }}>
          <span style={{
            padding: "4px 14px",
            borderRadius: 9999,
            border: `1px solid ${project.accent}40`,
            background: `${project.accent}12`,
            fontSize: "0.7rem",
            color: project.accent,
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}>
            {project.company} — {project.year}
          </span>
        </div>

        {/* Category */}
        <p style={{
          fontSize: "0.75rem",
          color: "rgba(232,232,240,0.4)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}>
          {project.category}
        </p>

        {/* Title */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          letterSpacing: "-0.03em",
          color: "#f0eef8",
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          {project.title}
        </h2>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 24 }} />

        {/* Full description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.95rem",
          lineHeight: 1.8,
          color: "rgba(232,232,240,0.7)",
          marginBottom: 28,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: "5px 12px",
              borderRadius: 9999,
              border: `1px solid ${project.accent}35`,
              background: `${project.accent}10`,
              color: project.accent,
              fontSize: "0.72rem",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      data-cursor="pointer"
      style={{
        minWidth: "clamp(280px, 34vw, 500px)",
        maxWidth: "clamp(280px, 34vw, 500px)",
        height: 420,
        borderRadius: 20,
        border: `1px solid ${hovered ? project.accent + "45" : "rgba(255,255,255,0.09)"}`,
        overflow: "hidden",
        position: "relative",
        background: project.bg,
        scrollSnapAlign: "start",
        flexShrink: 0,
        transition: "border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}20`
          : "0 8px 24px rgba(0,0,0,0.3)",
        cursor: "none",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 70% 50% at 50% 110%, ${project.accent}22 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Glass top sheen */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "rgba(255,255,255,0.15)",
      }} />

      {/* Number */}
      <div style={{
        position: "absolute", top: 24, right: 24,
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "3.5rem", color: `${project.accent}12`,
        lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Company badge */}
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <span style={{
          padding: "4px 12px", borderRadius: 9999,
          border: `1px solid ${project.accent}30`,
          background: `${project.accent}10`,
          fontSize: "0.62rem", color: project.accent,
          fontFamily: "var(--font-body)", letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 600,
        }}>
          {project.company}
        </span>
      </div>

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, padding: 28,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} style={{
              padding: "3px 9px", borderRadius: 9999,
              border: `1px solid ${project.accent}28`,
              color: project.accent, fontSize: "0.65rem",
              fontFamily: "var(--font-body)", letterSpacing: "0.07em",
              textTransform: "uppercase", fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 6,
        }}>
          <span style={{
            fontSize: "0.68rem", color: "rgba(240,238,232,0.4)",
            fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase",
          }}>{project.category}</span>
          <span style={{ fontSize: "0.68rem", color: "rgba(240,238,232,0.3)", fontFamily: "var(--font-body)" }}>
            {project.year}
          </span>
        </div>

        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          letterSpacing: "-0.03em", color: "#f0eee8",
          lineHeight: 1.1, marginBottom: 10,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontFamily: "var(--font-body)", fontWeight: 300,
          fontSize: "0.82rem", lineHeight: 1.6,
          color: "rgba(240,238,232,0.5)",
          marginBottom: 16,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {project.summary}
        </p>

        <motion.div
          animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <span style={{
            fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: "0.8rem", color: project.accent, letterSpacing: "0.04em",
          }}>
            Click for details
          </span>
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowUpRight size={14} color={project.accent} />
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
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        style={{ padding: "clamp(80px, 12vw, 160px) 0", position: "relative", overflow: "hidden" }}
      >
        {/* Header */}
        <div style={{
          padding: "0 clamp(24px, 6vw, 96px)", marginBottom: 56,
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 24,
        }}>
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
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                letterSpacing: "-0.03em", lineHeight: 1.05,
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
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "0.9rem", color: "var(--color-fg-muted)",
              maxWidth: 260, lineHeight: 1.7,
            }}
          >
            Drag to explore ← →
            <br />Click any card for the full breakdown.
          </motion.p>
        </div>

        {/* Scroll */}
        <motion.div
          ref={scrollRef}
          className="horizontal-scroll"
          drag="x"
          dragConstraints={scrollRef}
          style={{ padding: "0 clamp(24px, 6vw, 96px) 16px" }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
          ))}
          <div style={{ minWidth: 1, flexShrink: 0 }} />
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
