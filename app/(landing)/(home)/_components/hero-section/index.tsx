"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "../../../../components";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Hero {
  id: number;
  backgroundImg: string;
}

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isMobile = useIsMobile();

  const heroes: Hero[] = [
    {
      id: 0,
      backgroundImg:
        "https://res.cloudinary.com/dwiq71xwx/image/upload/w_1200,q_50,f_auto/v1742086712/hero1_ygddd4.jpg",
    },
    {
      id: 1,
      backgroundImg:
        "https://res.cloudinary.com/dwiq71xwx/image/upload/w_1200,q_50,f_auto/v1742086712/hero_t4od4j.jpg",
    },
    {
      id: 2,
      backgroundImg:
        "https://res.cloudinary.com/dwiq71xwx/image/upload/w_1200,q_50,f_auto/v1742086712/banner_v3ewcs.jpg",
    },
  ];

  const mobileBackgroundImg = heroes[0].backgroundImg;

  useEffect(() => {
    if (!isMobile) {
      const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % heroes.length);
      }, 20000);
      return () => clearInterval(intervalId);
    }
  }, [isMobile, heroes.length]);

  return (
    <section
      className="relative h-[80vh] sm:h-[70vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] w-full mb-12 sm:mb-16 lg:mb-24"
      id="home"
      aria-label="Hero section"
    >
      <div className="h-full relative w-full">
        {isMobile && (
          <div
            style={{
              backgroundImage: `url(${mobileBackgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Education Technology Summit background"
          />
        )}

        {!isMobile &&
          heroes.map((hero) => (
            <div
              key={hero.id}
              style={{
                backgroundImage: `url(${hero.backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: activeIndex === hero.id ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label={`Education Technology Summit background ${
                hero.id + 1
              }`}
            />
          ))}

        <div className="absolute inset-0 w-full h-full bg-black opacity-50" />

        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-20">
          <div className="container mx-auto max-w-7xl h-full flex items-center justify-center">
            <div className="animate-slide_up text-center flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-1 w-full max-w-5xl px-2">
              <h1 className="text-primary font-mont text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] leading-tight sm:leading-snug md:leading-[1.3] lg:leading-[1.4] xl:leading-[70px] tracking-tight font-bold uppercase">
                Bridging Tech Education Landscapes
              </h1>

              <hr className="h-0.5 bg-primary w-3/4 sm:w-2/3 md:w-1/2" />

              <div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7 mt-2 sm:mt-3 md:mt-4 w-full">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed sm:leading-relaxed md:leading-[1.7] lg:leading-[30px] font-medium max-w-3xl px-2">
                  ETS stands as a vibrant community that delves into innovative
                  solutions where education, entrepreneurship, and technology
                  converge.
                </p>

                <div className="w-fit sm:w-auto">
                  <Button
                    variant="primary"
                    width="fit"
                    className="uppercase w-full sm:w-auto px-6 sm:px-8 md:px-10 lg:px-12 text-sm sm:text-base md:text-base"
                  >
                    <Link
                      href="/register/community"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      Join Community
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
