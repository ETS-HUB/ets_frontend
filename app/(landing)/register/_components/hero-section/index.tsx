import React from "react";
import Link from "next/link";

import { Button } from "../../../../components";

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  showButton?: boolean;
  titleSize?: "small" | "medium" | "large";
  descriptionSize?: "small" | "medium" | "large";
  contentAlignment?: "left" | "center";
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonText = "Join Community",
  buttonLink = "/register/community",
  backgroundColor = "#172554",
  showButton = true,
  titleSize = "large",
  descriptionSize = "medium",
  contentAlignment = "center",
}) => {
  const titleSizeClasses = {
    small: "text-xl lg:text-3xl xl:text-4xl",
    medium: "text-3xl lg:text-5xl xl:text-6xl",
    large: "text-4xl lg:text-5xl xl:text-6xl",
  };

  const descriptionSizeClasses = {
    small: "text-sm",
    medium: "text-sm md:text-base",
    large: "text-lg",
  };

  const alignmentClasses =
    contentAlignment === "center" ? "text-center" : "text-center lg:text-left";

  const buttonAlignment =
    contentAlignment === "center"
      ? "justify-center"
      : "justify-center lg:justify-start";

  return (
    <section className="relative h-[65vh] sm:h-[55vh] md:h-[45vh] lg:h-[55vh] xl:h-[60vh] w-full mb-8 sm:mb-12 lg:mb-14">
      <div
        className="py-16 px-5 md:px-10 relative overflow-hidden flex items-center justify-center min-h-full"
        style={{ backgroundColor }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-linear-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="md:container mx-auto h-full flex items-center justify-center lg:my-20 my-10 relative">
          <div className="grid grid-cols-1 items-center w-full max-w-4xl">
            <div className={`animate-slide_up ${alignmentClasses}`}>
              <h1
                className={`${titleSizeClasses[titleSize]} font-bold text-[#ffffff]! md:mb-6 mb-4 leading-tight`}
              >
                {title}
              </h1>
              <p
                className={`"text-blue-50 leading-relaxed mb-8 mx-auto lg:mx-0 ${descriptionSizeClasses[descriptionSize]}`}
              >
                {description}
              </p>
              {showButton && (
                <div className={`flex ${buttonAlignment}`}>
                  <Button className="md:w-auto px-8 uppercase">
                    <Link href={buttonLink} target="_blank">
                      {buttonText}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
