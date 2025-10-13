"use client";
import React, { useState } from "react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#111828] text-white text-sm text-center py-2">
        📬 Stay updated with the latest travel guides, tips, and hidden gems in
        the Philippines!{" "}
        <Link
          href="/newsletter"
          className="underline hover:text-gray-300 transition"
        >
          Subscribe to our newsletter →
        </Link>
      </div>
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <header className="bg-white shadow-md transition-all duration-300">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 mr-12 min-w-[330px]">
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 relative">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    width="48"
                    height="48"
                  />
                </div>
                <span className="ml-3 font-semibold text-lg text-black hidden sm:inline">
                  Discover the Philippines, one island at a time
                </span>
                <span className="mx-4 text-gray-400 hidden sm:inline">|</span>
              </Link>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <div
              className={`hidden lg:flex items-center justify-end space-x-10 flex-grow`}
            >
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                Home
              </Link>
              <Link
                href="/articles"
                className={`${
                  pathname === "/articles"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600 font-semibold"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                Articles
              </Link>
              <Link
                href="/blurbs"
                className={`${
                  pathname === "/blurbs"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Blurbs</span>
              </Link>
              <Link
                href="/contact"
                className={`${
                  pathname === "/contact"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Contact</span>
              </Link>
              <Link
                href="/newsletter"
                className={`${
                  pathname === "/newsletter"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600 font-semibold"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Newsletter</span>
              </Link>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-md p-4">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className={`block py-2 ${
                  pathname === "/"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Home</span>
              </Link>
              <Link
                href="/articles"
                onClick={toggleMobileMenu}
                className={`block py-2 ${
                  pathname === "/articles"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Articles</span>
              </Link>
              <Link
                href="/blurbs"
                onClick={toggleMobileMenu}
                className={`block py-2 ${
                  pathname === "/blurbs"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Blurbs</span>
              </Link>
              <Link
                href="/contact"
                onClick={toggleMobileMenu}
                className={`block py-2 ${
                  pathname === "/contact"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Contact</span>
              </Link>
              <Link
                href="/newsletter"
                onClick={toggleMobileMenu}
                className={`block py-2 ${
                  pathname === "/newsletter"
                    ? "text-black font-bold after:scale-x-100"
                    : "text-gray-600"
                } hover:text-gray-900 relative after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100`}
              >
                <span>Newsletter</span>
              </Link>
            </div>
          )}
        </header>
      </div>
      {/* Main Content */}
      <div className="w-full">{children}</div>
      {/* Footer */}
      <footer className="bg-[#111828] text-white pt-6 border-t border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 mt-3 items-start px-4">
          {/* Socials & Newsletter (Left Column) */}
          <div className="text-center flex flex-col justify-start">
            <h2 className="text-xl font-bold mb-2 w-full text-center">
              Phil Strats
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Your go-to travel guide for exploring the Philippines from
              world-famous beaches and hidden islands to local food, culture,
              and unforgettable adventures. Discover the best of the
              Philippines, one trip at a time.
            </p>
            <div className="flex justify-center gap-4 items-center mt-4 w-full">
              <a
                href="https://www.instagram.com/xxo.emmy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://x.com/emsnagano"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
              >
                <FaXTwitter size={28} />
              </a>
            </div>
          </div>
          {/* Quick Links (Middle and Right Columns) */}
          <div className="col-span-2 grid grid-cols-2 gap-x-16 text-center justify-items-center">
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Home
                </Link>
                <Link
                  href="/articles"
                  className="hover:underline hover:text-yellow-400"
                >
                  Articles
                </Link>
                <Link
                  href="/blurbs"
                  className="hover:underline hover:text-yellow-400"
                >
                  Blurbs
                </Link>
                <Link
                  href="/contact"
                  className="hover:underline hover:text-yellow-400"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">See More</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/newsletter"
                  className="hover:underline hover:text-yellow-400"
                >
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-700 my-4" />
        <div className="bg-[#111828] text-white pt-1 pb-3 text-center text-sm w-full">
          © 2025 Philippine Strategies. All rights reserved.
        </div>
      </footer>
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 right-6 z-50 bg-[#111828] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#2c344f] transition-all"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default Layout;
