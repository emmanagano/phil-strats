"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import FAQ from "@/app/components/FAQ";
import PageHeader from "@/app/components/PageHeader";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_k5e306h",
          "template_o3ag3yo",
          form.current,
          "qDUHz4jJcfdXrK5WG"
        )
        .then(() => setStatus("Message sent successfully!"))
        .catch(() =>
          setStatus("Failed to send message. Please try again later.")
        );

      form.current.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-100)] py-10 px-4">
      <PageHeader title="Contact Us" />
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-6xl gap-10">
        <div className="lg:w-1/2 space-y-4">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Connect
          </p>
          <p className="text-gray-600">
            Whether you have questions, thoughts about our work, send us a
            message.
          </p>
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="lg:w-1/2 bg-white p-8 rounded-none space-y-6 shadow-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-sm focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-sm focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-500 rounded-sm focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-white hover:text-black border border-black transition-all duration-200 shadow-md"
          >
            Send Message
          </button>
          {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
        </form>
      </div>
      <FAQ />
    </div>
  );
}
