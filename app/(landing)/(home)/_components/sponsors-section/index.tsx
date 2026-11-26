"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import partner1 from "../../../../../assets/images/partner_1.jpeg";
import partner2 from "../../../../../assets/images/partner_2.jpeg";
import partner3 from "../../../../../assets/images/partner_3.jpg";
import partner4 from "../../../../../assets/images/partner_4.png";

import "./index.css";

interface Sponsor {
  name: string;
  logo: string | StaticImageData;
}

const sponsors: Sponsor[] = [
  {
    name: "ASISA",
    logo: partner1,
  },
  {
    name: "NRC",
    logo: partner2,
  },
  {
    name: "Sponsor Three",
    logo: partner3,
  },
  {
    name: "Sponsor Four",
    logo: partner4,
  },
  // {
  //   name: "Sponsor Five",
  //   logo: partner2,
  // },
  // {
  //   name: "Sponsor Six",
  //   logo: partner2,
  // },
];

const SponsorsSection: React.FC = () => {
  // Duplicate the list so the marquee loops seamlessly
  const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="w-full mb-12 sm:mb-16 lg:mb-24 overflow-hidden">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <span className="text-sm sm:text-base uppercase tracking-[3px] sm:tracking-[4px] text-lightblue font-semibold">
          Our Sponsors &amp; Partners
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee w-max">
          {items.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="flex items-center justify-center mx-8 sm:mx-12 shrink-0"
              title={sponsor.name}
            >
              <div className="relative h-20 sm:h-28 w-40 sm:w-56 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 640px) 160px, 224px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
