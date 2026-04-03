"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Server,
  Cloud,
  Layers,
  Cpu,
  Globe,
  GitBranch,
  Zap,
  Box,
  Monitor,
  Shield,
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
    icon: <Server size={28} />,
    title: "Linux & Windows Server",
    description: "Debian, Ubuntu, RHEL family, Windows Server — administration, hardening, and automation",
    span: "normal",
    accent: "#68a063",
  },
  {
    icon: <Cloud size={28} />,
    title: "Cloud Platforms",
    description: "AWS, Azure, Alibaba Cloud — infrastructure provisioning, IAM, networking, and cost management",
    span: "normal",
    accent: "#ff9900",
  },
  {
    icon: <Cpu size={28} />,
    title: "Proxmox Virtualization",
    description: "Proxmox VE cluster design, Proxmox Backup Server (PBS), Mail Gateway, and Datacenter Manager — full lifecycle ownership",
    span: "normal",
    accent: "#e65800",
  },
  {
    icon: <Monitor size={28} />,
    title: "Monitoring & Observability",
    description: "Zabbix and Grafana for infrastructure health dashboards, alerting, and proactive incident detection",
    span: "normal",
    accent: "#f97316",
  },
  {
    icon: <Globe size={28} />,
    title: "Networking & Load Balancing",
    description: "Nginx, Apache, HAProxy, Traefik, PowerDNS, VPN MFA — traffic routing and high-availability setups",
    span: "normal",
    accent: "#00d4ff",
  },
  {
    icon: <Layers size={28} />,
    title: "Identity & Access",
    description: "Keycloak SSO, Active Directory — user lifecycle, group policies, and zero-trust access control",
    span: "normal",
    accent: "#6366f1",
  },
  {
    icon: <Box size={28} />,
    title: "IT Service Management",
    description: "JIRA, ServiceNow, Zammad, Confluence, OpenProject, BookStack — ticket workflows and documentation",
    span: "normal",
    accent: "#3b82f6",
  },
  {
    icon: <GitBranch size={28} />,
    title: "Automation & DevOps",
    description: "GitLab CI/CD, PowerShell scripting, Git — pipeline automation and infrastructure-as-code practices",
    span: "normal",
    accent: "#f05032",
  },
  {
    icon: <Shield size={28} />,
    title: "Security & Endpoint",
    description: "SentinelOne EDR, WorkspaceOne UEM, VPN MFA — endpoint protection and compliance enforcement",
    span: "normal",
    accent: "#a78bfa",
  },
  {
    icon: <Zap size={28} />,
    title: "Certifications",
    description: "AWS CCP · ITIL v4 · CompTIA Network+ · Azure AI-900 · Cloud Computing Masterclass",
    span: "normal",
    accent: "#fbbf24",
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
        gridColumn: "span 1",
        gridRow: "span 1",
        padding: "clamp(20px, 2.5vw, 28px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 180,
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
          Tools I use
          <br />
          <span style={{ color: "var(--color-accent)" }}>every day</span>
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
          Battle-tested tools. Pragmatic choices. I use what keeps systems stable, secure, and observable.
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
