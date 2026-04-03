"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

const skills = [
  "Linux", "Windows Server", "AWS", "Azure", "Alibaba Cloud", "Proxmox VE",
  "Zabbix", "Grafana", "Nginx", "HAProxy", "Traefik", "PowerDNS",
  "Keycloak", "Active Directory", "JIRA", "ServiceNow", "GitLab", "PowerShell",
];

const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 4, suffix: "", label: "Companies" },
  { value: 6, suffix: "+", label: "Certifications" },
  { value: 3, suffix: "", label: "Cloud platforms" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || !ref.current) return;
    hasStarted.current = true;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) {
        ref.current.textContent = Math.round(eased * value) + suffix;
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} style={{ display: "inline" }}>
      0{suffix}
    </span>
  );
}

const bioLines = [
  "I'm a Systems Engineer with 7+ years of experience in Linux,",
  "cloud infrastructure (AWS, Azure, Alibaba Cloud), and enterprise IT.",
  "I've built private cloud platforms, managed Active Directory for 1,000+ users,",
  "and maintained critical infrastructure across international datacenters.",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)",
        position: "relative",
      }}
    >
      {/* Section tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <span className="section-tag">About me</span>
      </motion.div>

      {/* Two-column */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "center",
        }}
      >
        {/* Image column */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              clipPath:
                "polygon(0 4%, 96% 0, 100% 96%, 4% 100%)",
              borderRadius: 4,
              aspectRatio: "4/5",
              maxWidth: 480,
            }}
          >
            <motion.div style={{ y: imageY, height: "112%", position: "relative" }}>
              <Image
                src="/images/avatar.jpg"
                alt="Idriss Zabari"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            </motion.div>
          </div>

          {/* Accent square */}
          <div
            style={{
              position: "absolute",
              bottom: -16,
              right: -16,
              width: 80,
              height: 80,
              background: "var(--color-accent)",
              borderRadius: 4,
              zIndex: -1,
            }}
          />
        </motion.div>

        {/* Text column */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-fg)",
              marginBottom: 32,
            }}
          >
            I keep systems
            <br />
            <span style={{ color: "var(--color-accent)" }}>running</span>
            <br />
            at scale.
          </h2>

          {/* Bio lines — staggered reveal */}
          <div style={{ marginBottom: 48 }}>
            {bioLines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3 + i * 0.08,
                  }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                    lineHeight: 1.75,
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              marginBottom: 36,
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5 + i * 0.1,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--color-accent)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-fg-muted)",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Download CV */}
          <motion.a
            href="/resume.pdf"
            download="Idriss-ZABARI-Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 28px",
              background: "var(--color-accent)",
              color: "#ffffff",
              borderRadius: 9999,
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.875rem",
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px rgba(0,113,227,0.3)",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,113,227,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,113,227,0.3)";
            }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
        </div>
      </div>

      {/* Skills marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          marginTop: "clamp(64px, 10vw, 120px)",
          overflow: "hidden",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "20px 0",
        }}
      >
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
                paddingRight: 40,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-fg-muted)",
                  transition: "color 0.2s ease",
                }}
              >
                {skill}
              </span>
              <span style={{ color: "var(--color-accent)", fontSize: 6 }}>◆</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
