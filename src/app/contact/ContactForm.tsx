"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-control bg-white px-4 py-3 text-base font-normal text-ocean-900 outline-none ring-1 ring-sand-300 transition placeholder:text-muted focus:ring-2 focus:ring-lagoon-600";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        "service_k5e306h",
        "template_o3ag3yo",
        form.current,
        "qDUHz4jJcfdXrK5WG"
      );
      form.current.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-5 rounded-card border border-sand-200 bg-sand-100/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ocean-900">
          Name
          <input type="text" name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-semibold text-ocean-900">
          Email
          <input type="email" name="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-semibold text-ocean-900">
        Message
        <textarea
          name="message"
          rows={6}
          required
          placeholder="A destination tip, a question, or just a hello…"
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 w-full rounded-control bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean-900 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" className="min-h-6 text-center text-sm">
        {status === "sent" && (
          <span className="text-lagoon-700">Thanks! Your message is on its way — we&apos;ll reply soon.</span>
        )}
        {status === "error" && (
          <span className="text-coral-700">Something went wrong. Please try again in a moment.</span>
        )}
      </p>
    </form>
  );
}
