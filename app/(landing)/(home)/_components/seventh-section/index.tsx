"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

import { flipCards } from "../../../../../constants";
import FlipCard from "@/app/components/ui/flip-cards/FlipCard";

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const SeventhSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MotionWrapper: React.FC<MotionWrapperProps> = ({
    children,
    className,
    ...motionProps
  }) => {
    if (isMobile) return <div className={className}>{children}</div>;
    return (
      <motion.div className={className} {...motionProps}>
        {children}
      </motion.div>
    );
  };

  return (
    <section
      className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-40 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
      aria-labelledby="training-tracks-heading"
    >
      <div className="flex flex-col justify-center items-center gap-y-2 sm:gap-y-3 md:gap-y-4 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h2
          id="training-tracks-heading"
          className="text-[#1a1a1a] font-mont text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight px-4"
        >
          Some of Our Training Tracks
        </h2>
        <p className="text-sm sm:text-base md:text-base lg:text-lg text-lightgray">
          Learn industry skills from the community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 lg:gap-y-16 xl:gap-y-20">
        {(isMobile ? flipCards.slice(0, 3) : flipCards).map((card, index) => (
          <MotionWrapper
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.01 }}
            className="h-[350px] sm:h-[380px] md:h-[400px] lg:h-[420px] xl:h-[450px]"
          >
            <FlipCard
              frontBg={card.frontBg}
              backBg={card.backBg}
              frontContent={card.frontContent}
              backContent={card.backContent}
            />
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
};

export default SeventhSection;
