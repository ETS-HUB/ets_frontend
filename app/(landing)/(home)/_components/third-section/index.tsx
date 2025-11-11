"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Call02Icon,
  CheckmarkCircle01Icon,
  ConnectIcon,
  MeetingRoomIcon,
} from "hugeicons-react";

import "./index.css";
import { Button } from "../../../../components";

interface ActionItem {
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  text: string;
  to: string;
}

const ThirdSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-index");
            if (indexAttr) {
              const index = parseInt(indexAttr, 10);
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const setItemRef =
    (index: number) =>
    (el: HTMLDivElement | null): void => {
      itemRefs.current[index] = el;
    };

  const checklistItems: string[] = [
    "Connect with leading education technology innovators and experts.",
    "Explore entrepreneurial opportunities in the education sector.",
    "Discover cutting-edge technologies transforming learning environments.",
  ];

  const actionItems: ActionItem[] = [
    { icon: MeetingRoomIcon, text: "Workshops", to: "/events" },
    { icon: Call02Icon, text: "Seminars", to: "/events" },
    { icon: ConnectIcon, text: "Community", to: "/events" },
  ];

  return (
    <section
      className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 container mx-auto"
      aria-labelledby="third-section-heading"
    >
      <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
        <div className="flex flex-col w-full lg:w-[45%] xl:w-[40%]">
          <h2
            id="third-section-heading"
            className="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight sm:leading-snug md:leading-[1.4] lg:leading-[45px] font-mont text-[#1a1a1a] font-bold"
          >
            <span className="text-secondary">
              education technology <br /> summit: <br />
            </span>
            education <br /> entrepreneurship <br /> technology
          </h2>

          <ul className="flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6 text-sm sm:text-base md:text-lg text-gray mt-6 sm:mt-8 md:mt-12 lg:mt-16">
            {checklistItems.map((text, index) => (
              <li key={index} className="flex items-start gap-x-2 sm:gap-x-3">
                <CheckmarkCircle01Icon
                  color="#3a0ca3"
                  className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5"
                />
                <span className="flex-1 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-4 sm:gap-y-5 md:gap-y-6 font-normal w-full lg:w-[55%] xl:w-[60%]">
          <h3 className="uppercase text-[#1A1A1A] text-lg sm:text-xl md:text-2xl leading-tight sm:leading-relaxed font-semibold">
            Shaping lives positively
          </h3>

          <p className="text-gray text-sm sm:text-base md:text-lg leading-relaxed sm:leading-7 md:leading-8 lg:leading-9">
            Our mission is to merge technology and education, creating a vibrant
            student community. We foster collaboration, innovation, and
            skill-building through workshops, project teams, and industry
            partnerships, empowering students to become change-makers who drive
            transformative impact and excel in a rapidly evolving digital world.
          </p>

          <div className="flex items-stretch mt-4 sm:mt-6 md:mt-8 flex-col sm:flex-row gap-6 sm:gap-4 md:gap-6 lg:gap-8 w-full lg:w-full xl:w-[90%] mx-auto justify-between">
            {actionItems.map((item, index) => (
              <div
                key={index}
                ref={setItemRef(index)}
                data-index={index}
                className={`animate-item flex-1 ${
                  !isMobile && visibleItems.has(index)
                    ? `animate-slide-in-right animate-delay-${index * 200}`
                    : !isMobile
                    ? "opacity-0 translate-x-8"
                    : "visible"
                }`}
                style={{
                  animationDelay:
                    !isMobile && visibleItems.has(index)
                      ? `${index * 0.2}s`
                      : "0s",
                  transition: !isMobile
                    ? "opacity 0.3s ease-out, transform 0.3s ease-out"
                    : "none",
                }}
              >
                <Link
                  href={item.to}
                  className="flex flex-col justify-center items-center gap-y-3 sm:gap-y-4 p-4 sm:p-5 md:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 h-full"
                >
                  <item.icon
                    size={isMobile ? 32 : 40}
                    strokeWidth={2}
                    className="text-secondary w-8 h-8 sm:w-10 sm:h-10"
                  />
                  <span className="font-mont text-base sm:text-lg md:text-xl text-black font-medium text-center">
                    {item.text}
                  </span>
                  <Button
                    variant="tertiary"
                    className="text-xs sm:text-sm md:text-base"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
