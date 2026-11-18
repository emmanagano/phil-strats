"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only after about two screens, and only while scrolling back up,
    // so it never sits on top of text or buttons the reader is using.
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setVisible(y > window.innerHeight * 2 && y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 z-40 sm:right-6 grid h-11 w-11 place-items-center rounded-full bg-ocean-900 text-white shadow-card-hover transition-colors duration-150 hover:bg-ocean-700 ${
        visible ? "" : "pointer-events-none invisible"
      }`}
    >
      <FaArrowUp className="h-4 w-4" />
    </button>
  );
}
