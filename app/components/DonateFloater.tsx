"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeartCheckIcon, Cancel01Icon } from "hugeicons-react";

const DonateFloater: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.pathname === "/donate") {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-slide_up">
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss donate prompt"
        className="bg-white text-gray-400 hover:text-gray-600 rounded-full p-1 shadow-md border border-gray-100 transition-colors duration-200 self-start mt-1"
      >
        <Cancel01Icon size={14} />
      </button>

      <Link href="/donate">
        <div className="group flex items-center gap-3 bg-secondary text-primary pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
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
