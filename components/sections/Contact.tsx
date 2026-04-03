"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";

const EMAIL = "izabari.pro@gmail.com";

const socials = [
  { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/yourhandle" },
  { icon: <Twitter size={20} />, label: "Twitter", href: "https://twitter.com/yourhandle" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Invalid email";
    if (!fields.message.trim()) e.message = "Message is required";
    else if (fields.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 96px)",
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(10,132,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 24, position: "relative" }}
      >
        <span className="section-tag">Get in touch</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 7rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          color: "var(--color-fg)",
          marginBottom: 72,
          position: "relative",
          maxWidth: 900,
        }}
      >
        Let&apos;s build
        <br />
        something{" "}
        <span style={{ color: "var(--color-accent)" }}>great.</span>
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(48px, 6vw, 96px)",
          position: "relative",
        }}
      >
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--color-fg-muted)",
              marginBottom: 40,
            }}
          >
            Currently open to full-time roles and select freelance projects.
            Drop me a message and I&apos;ll reply within 24 hours.
          </p>

          {/* Email copy */}
          <button
            onClick={copyEmail}
            data-cursor="pointer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: 9999,
              padding: "12px 20px",
              color: "var(--color-fg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              marginBottom: 40,
              transition: "border-color 0.25s ease",
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{ color: "var(--color-accent)" }}
                >
                  <Check size={16} />
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Copy size={16} />
                </motion.span>
              )}
            </AnimatePresence>
            {EMAIL}
          </button>

          {/* Social links */}
          <div style={{ display: "flex", gap: 12 }}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                title={social.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 9999,
                  border: "1px solid var(--color-border)",
                  color: "var(--color-fg-muted)",
                  textDecoration: "none",
                  transition: "border-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-accent)";
                  el.style.color = "var(--color-accent)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-border)";
                  el.style.color = "var(--color-fg-muted)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  minHeight: 340,
                  textAlign: "center",
                }}
              >
                {/* Animated checkmark */}
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M18 32 L28 42 L46 22"
                    stroke="var(--color-accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    letterSpacing: "-0.02em",
                    color: "var(--color-fg)",
                  }}
                >
                  Message sent!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.6,
                    maxWidth: 280,
                  }}
                >
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {(["name", "email"] as const).map((field) => (
                  <div key={field} className="float-label-group">
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder=" "
                      value={fields[field]}
                      onChange={(e) =>
                        setFields((f) => ({ ...f, [field]: e.target.value }))
                      }
                      style={{
                        borderColor: errors[field]
                          ? "#ff4d4d"
                          : undefined,
                      }}
                    />
                    <label>
                      {field === "name" ? "Your Name" : "Email Address"}
                    </label>
                    <AnimatePresence>
                      {errors[field] && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.72rem",
                            color: "#ff4d4d",
                            marginTop: 6,
                            paddingLeft: 4,
                          }}
                        >
                          {errors[field]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="float-label-group">
                  <textarea
                    rows={5}
                    placeholder=" "
                    value={fields.message}
                    onChange={(e) =>
                      setFields((f) => ({ ...f, message: e.target.value }))
                    }
                    style={{
                      borderColor: errors.message ? "#ff4d4d" : undefined,
                    }}
                  />
                  <label>Your Message</label>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.72rem",
                          color: "#ff4d4d",
                          marginTop: 6,
                          paddingLeft: 4,
                        }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {formState === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        color: "#ff4d4d",
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,77,77,0.25)",
                        background: "rgba(255,77,77,0.06)",
                      }}
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={formState === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="pointer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "16px 32px",
                    background:
                      formState === "loading"
                        ? "rgba(0,113,227,0.5)"
                        : "var(--color-accent)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 9999,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.02em",
                    cursor: formState === "loading" ? "wait" : "none",
                    transition: "background 0.3s ease",
                    alignSelf: "flex-start",
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: "2px solid var(--color-bg)",
                          borderTopColor: "transparent",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
