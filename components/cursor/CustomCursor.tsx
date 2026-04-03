"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot: essentially instant
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 100, mass: 0.05 });
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 100, mass: 0.05 });

  // Ring: very slight trail for polish — still fast
  const ringX = useSpring(cursorX, { stiffness: 800, damping: 60, mass: 0.08 });
  const ringY = useSpring(cursorY, { stiffness: 800, damping: 60, mass: 0.08 });

  const frameRef = useRef<number>(0);

  useEffect(() => {
    // Set position directly in mousemove — no rAF loop delay
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const detectHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        !!(target.closest("a") || target.closest("button") || target.closest("[data-cursor='pointer']"))
      );
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

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
          mixBlendMode: "difference",
        }}
        animate={{ opacity: isHidden ? 0 : 1, scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffffff" }} />
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
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.7 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.8)",
            background: isPointer ? "rgba(255,255,255,0.06)" : "transparent",
          }}
        />
      </motion.div>
    </>
  );
}
