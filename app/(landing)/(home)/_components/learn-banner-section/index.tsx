"use client";

import React from "react";
import {
  ArrowRight01Icon,
  AiBrain01Icon,
  BookOpen01Icon,
  Award01Icon,
} from "hugeicons-react";

const features = [
  { icon: AiBrain01Icon, text: "AI-powered learning paths" },
  { icon: BookOpen01Icon, text: "Structured tech curricula" },
  { icon: Award01Icon, text: "Certificates & milestones" },
];

const LearnBannerSection: React.FC = () => {
  return (
    <section className="lg:container mx-auto px-5 md:px-10 mb-16 lg:mb-24">
      <div className="relative rounded-2xl overflow-hidden bg-[#1A1953] px-8 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-lightblue/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="flex flex-col gap-5 w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-lightblue/20 text-lightblue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-lightblue animate-pulse" />
              Now Live — ETS Learn
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary font-mont leading-tight">
              Your AI-powered <br className="hidden sm:block" />
              tech learning platform
            </h2>

            <p className="text-primary/70 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              ETS Learn is our dedicated platform for structured tech education
              — AI-guided paths, hands-on projects, and community cohorts all in
              one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-2">
              <a
                href="http://learn.etshub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-secondary font-semibold px-8 py-3.5 rounded-full hover:bg-tertiary transition-all duration-300 hover:scale-105 shadow-md text-sm sm:text-base"
              >
                Start Learning
                <ArrowRight01Icon size={18} />
              </a>
              <a
                href="http://learn.etshub.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary font-semibold px-8 py-3.5 rounded-full hover:border-primary transition-all duration-300 text-sm sm:text-base"
              >
                Explore courses
              </a>
            </div>
          </div>

          {/* Right — feature pills */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-primary/10 hover:bg-primary/15 transition-colors duration-200 rounded-xl px-5 py-4"
              >
                <div className="bg-lightblue/20 rounded-lg p-2.5 shrink-0">
                  <f.icon size={22} className="text-lightblue" />
                </div>
                <span className="text-primary font-medium text-sm sm:text-base">
                  {f.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnBannerSection;
