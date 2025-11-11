"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CursorPointer01Icon,
  HandPrayerIcon,
  Link01Icon,
  PiggyBankIcon,
} from "hugeicons-react";

interface CardItem {
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  title: string;
  description: string;
  ctaText: string;
}

const SixthSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [visibleIcons, setVisibleIcons] = useState<Set<number>>(new Set());
  const [visibleLinks, setVisibleLinks] = useState<Set<number>>(new Set());

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-index");
            if (!indexAttr) return;
            const index = parseInt(indexAttr);

            if (entry.target.classList.contains("card-item")) {
              setVisibleItems((prev) => new Set([...prev, index]));
            } else if (entry.target.classList.contains("icon-item")) {
              setVisibleIcons((prev) => new Set([...prev, index]));
            } else if (entry.target.classList.contains("link-item")) {
              setVisibleLinks((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const allRefs = [
      ...itemRefs.current,
      ...iconRefs.current,
      ...linkRefs.current,
    ].filter((ref): ref is HTMLDivElement => ref !== null);

    allRefs.forEach((ref) => observerRef.current?.observe(ref));

    return () => observerRef.current?.disconnect();
  }, [isMobile]);

  const cardItems: CardItem[] = [
    {
      icon: CursorPointer01Icon,
      title: "Join Our Network",
      description:
        "Connect with innovators, developers, designers, and founders who share your passion for tech",
      ctaText: "Connect Now",
    },
    {
      icon: HandPrayerIcon,
      title: "Partner with Us",
      description:
        "Collaborate with us to drive positive change and empower the next generation of tech leaders",
      ctaText: "Partner Today",
    },
    {
      icon: PiggyBankIcon,
      title: "Support Our Mission",
      description:
        "Contribute to our cause and help us create a more inclusive and accessible tech ecosystem",
      ctaText: "Support Us",
    },
  ];

  return (
    <section
      className="relative bg-secondary py-12 sm:py-16 md:py-20 lg:py-24 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
      id="sponsors"
      aria-labelledby="community-heading"
    >
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 container mx-auto justify-center items-center text-primary">
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <div className="flex flex-col lg:w-4/5 xl:w-3/4 2xl:w-2/3 text-center mx-auto gap-y-4 sm:gap-y-5 md:gap-y-6 lg:gap-y-7 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
            <h2
              id="community-heading"
              className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-mont leading-tight"
            >
              Unlock the Power of Community
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed md:leading-7 px-2">
              We&apos;re dedicated to bridging the gaps in tech through
              immersive workshops, hackathons, events, mentorship programs, and
              more.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10 w-full mb-8 sm:mb-10 md:mb-12 lg:mb-0">
            {cardItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={`card-item group border border-primary rounded-lg md:rounded-xl flex flex-col px-5 sm:px-6 md:px-7 py-7 sm:py-8 md:py-9 lg:py-10 gap-y-3 sm:gap-y-4 hover:bg-primary hover:bg-opacity-5 transition-all duration-300 ease-in-out ${
                  !isMobile && visibleItems.has(index)
                    ? "visible animate-slide-up"
                    : !isMobile
                    ? "opacity-0 translate-y-8"
                    : "visible"
                }`}
                style={{
                  animationDelay:
                    !isMobile && visibleItems.has(index)
                      ? `${index * 0.2}s`
                      : "0s",
                  transition: !isMobile
                    ? "opacity 0.6s ease-out, transform 0.6s ease-out"
                    : "none",
                }}
              >
                {/* Icon Container */}
                <div className="bg-primary rounded-lg sm:rounded-xl w-fit p-2.5 sm:p-3 transition-transform duration-300 ease-in-out group-hover:scale-110">
                  <div
                    ref={(el) => {
                      iconRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`icon-item ${
                      !isMobile && visibleIcons.has(index)
                        ? "visible animate-scale-in"
                        : !isMobile
                        ? "opacity-0 scale-75"
                        : "visible"
                    }`}
                    style={{
                      animationDelay:
                        !isMobile && visibleIcons.has(index)
                          ? `${index * 0.2 + 0.3}s`
                          : "0s",
                      transition: !isMobile
                        ? "opacity 0.4s ease-out, transform 0.4s ease-out"
                        : "none",
                    }}
                  >
                    <item.icon
                      size={isMobile ? 32 : 40}
                      color="#1a1a1a"
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold font-mont leading-tight transition-colors duration-300 ease-in-out group-hover:text-lightblue">
                  {item.title}
                </h3>

                <p className="text-sm group-hover:text-lightblue sm:text-base md:text-base lg:text-lg leading-relaxed sm:leading-relaxed md:leading-7 transition-colors duration-300 ease-in-out">
                  {item.description}
                </p>

                <a
                  href="#contact"
                  className="flex items-center gap-x-1.5 sm:gap-x-2 text-sm sm:text-base md:text-base lg:text-lg font-medium mt-1 sm:mt-2 transition-all duration-300 ease-in-out group-hover:text-lightblue"
                  aria-label={`${item.ctaText} - Navigate to contact section`}
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-lightblue after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full">
                    {item.ctaText}
                  </span>
                  <div
                    ref={(el) => {
                      linkRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`link-item transition-all duration-300 ease-in-out group-hover:translate-x-1 ${
                      !isMobile && visibleLinks.has(index)
                        ? "visible animate-slide-in-right"
                        : !isMobile
                        ? "opacity-0 translate-x-4"
                        : "visible"
                    }`}
                    style={{
                      animationDelay:
                        !isMobile && visibleLinks.has(index)
                          ? `${index * 0.2 + 0.6}s`
                          : "0s",
                      transition: !isMobile
                        ? "opacity 0.3s ease-out, transform 0.3s ease-out"
                        : "none",
                    }}
                  >
                    <Link01Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-in-out group-hover:rotate-[-15deg]" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixthSection;
