"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartCheckIcon, Cancel01Icon } from "hugeicons-react";

const DonateFloater: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state whenever the user navigates to a new page
  useEffect(() => {
    setDismissed(false);
  }, [pathname]);

  // Track scroll threshold
  useEffect(() => {
    setScrolled(false); // reset on page change so it re-triggers

    const onScroll = () => {
      if (window.scrollY > 300) setScrolled(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/donate") return null;
  if (dismissed || !scrolled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-slide_up">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss donate prompt"
        className="bg-white text-gray-600 hover:text-gray-600 rounded-full p-2 shadow-md border border-gray-300 transition-colors duration-200 self-start mt-1"
      >
        <Cancel01Icon size={17} strokeWidth={2} />
      </button>

      {/* Floater */}
      <Link href="/donate">
        <div className="group flex items-center gap-3 bg-secondary text-primary pl-6 pr-7 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="bg-primary/20 rounded-full p-1.5 group-hover:bg-primary/30 transition-colors duration-200">
            <HeartCheckIcon size={18} className="text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
              Support ETS
            </span>
            <span className="text-sm font-bold">Donate today</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DonateFloater;
