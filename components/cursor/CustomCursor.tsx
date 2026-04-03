"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 400, damping: 40, mass: 0.5 };
  const ringConfig = { stiffness: 500, damping: 40, mass: 0.3 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  const frameRef = useRef<number>(0);
  const rawX = useRef(-100);
  const rawY = useRef(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
    };

    const tick = () => {
      cursorX.set(rawX.current);
      cursorY.set(rawY.current);
      frameRef.current = requestAnimationFrame(tick);
    };

    const detectHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']");
      setIsPointer(!!hoverable);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", detectHover, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", detectHover);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: dotX,
          top: dotY,
          zIndex: 99998,
          pointerEvents: "none",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00d4ff",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          zIndex: 99997,
          pointerEvents: "none",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.8 : 1,
          backgroundColor: isPointer
            ? "rgba(0,212,255,0.08)"
            : "transparent",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid rgba(0,212,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </motion.div>
    </>
  );
}
