"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const updatePosition = () => {
      setPosition({ x: targetRef.current.x, y: targetRef.current.y });
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(updatePosition);

    // Hover detection
    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        animate={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          x: position.x - (isHovering ? 20 : 4),
          y: position.y - (isHovering ? 20 : 4),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0 }}
        style={{
          backgroundColor: isHovering ? "rgba(250, 250, 250, 0.3)" : "#fafafa",
          border: isHovering ? "1px solid rgba(250, 250, 250, 0.6)" : "none",
        }}
      />
    </>
  );
}
