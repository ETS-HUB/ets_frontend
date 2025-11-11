"use client";
import React from "react";
import { QuoteDownIcon, QuoteUpIcon } from "hugeicons-react";
import Image from "next/image";

import { AnimationWrapper } from "../../../../components/AnimationWrapper";
import { useIsMobile } from "@/hooks/useIsMobile";

const FirstSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="container mx-auto px-7 md:px-8 lg:px-20 xl:px-40 relative mb-16 md:mb-24">
        <div className="flex w-full lg:flex-row flex-col lg:gap-x-10 xl:gap-x-20 items-center">
          <div className="order-last lg:order-first w-full lg:w-1/2 xl:w-[500px] mt-10 lg:mt-0">
            <AnimationWrapper
              className="relative rounded-lg overflow-hidden aspect-video lg:aspect-square w-full"
              delay={0}
              id="first-section"
            >
              <div className="absolute top-68 inset-10 w-full h-full bg-cover bg-no-repeat bg-center animate-blur" />

              <Image
                width={600}
                height={600}
                src="https://res.cloudinary.com/dwiq71xwx/image/upload/w_600,q_80,f_auto/v1742086712/community_djtv4p.jpg"
                className="w-full h-full object-cover animate-image"
                alt="ets-featured-image"
              />
            </AnimationWrapper>
          </div>

          <AnimationWrapper
            className="w-full lg:w-1/2 order-first lg:order-last animate-fadeInRight"
            delay={300}
          >
            <div className="w-full gap-y-2 md:gap-y-4 mb-4 flex flex-col justify-start items-start relative">
              <span className="text-base md:text-lg uppercase tracking-[3px] md:tracking-[4.2px] text-lightblue font-semibold">
                Our mission
              </span>
              <span className="text-2xl md:text-3xl lg:text-[40px] capitalize text-secondary font-semibold">
                Journey to Impact Lives.
              </span>
            </div>
            <div className="text-[#1a1a1a] text-base md:text-lg lg:text-2xl my-5 md:my-8 lg:my-10 flex gap-2 md:gap-3 relative">
              <AnimationWrapper
                className="shrink-0 animate-scaleIn"
                delay={500}
              >
                <QuoteUpIcon
                  strokeWidth={2}
                  size={isMobile ? 20 : 40}
                  color="#4361ee"
                />
              </AnimationWrapper>
              <div>
                ETS stands as a vibrant community that delves into innovative
                solutions where education, entrepreneurship, and technology
                converge.
              </div>
              <AnimationWrapper
                className="absolute md:-bottom-5 bottom-0 right-0 shrink-0 animate-scaleIn"
                delay={500}
              >
                <QuoteDownIcon
                  size={isMobile ? 20 : 40}
                  color="#f7e927"
                  strokeWidth={2}
                />
              </AnimationWrapper>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-gray leading-relaxed md:leading-[30px]">
              The technology sector offers unparalleled career opportunities and
              significantly higher rewards. However, financial barriers prevent
              many young people, especially in Africa, from accessing quality
              tech education.
              <br />
              <br />
              Education Technology Summit, a student-led organization, bridges
              this gap by fostering peer-to-peer learning, mentorship, and
              project development. We empower members to create innovative
              solutions, driving positive change across Africa through
              technology innovation.
            </p>
          </AnimationWrapper>
        </div>
      </div>
    </>
  );
};

export default FirstSection;
