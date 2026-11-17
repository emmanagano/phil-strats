"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-ocean-900 text-white shadow-card-hover transition-colors duration-150 hover:bg-coral-500 ${
        visible ? "" : "pointer-events-none invisible"
      }`}
    >
      <FaArrowUp className="h-4 w-4" />
    </button>
  );
}
