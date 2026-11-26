"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckmarkCircle01Icon,
  BookOpen01Icon,
  UserGroupIcon,
  ChartRoseIcon,
  GraduateMaleIcon,
} from "hugeicons-react";

const PAYSTACK_ONE_TIME = "https://paystack.shop/pay/ets-donate";
const PAYSTACK_MONTHLY = "https://paystack.shop/pay/ets-monthly";

const HERO_IMAGE =
  "https://res.cloudinary.com/dwiq71xwx/image/upload/v1742086714/ets7_nrjhq7.jpg";

const impacts = [
  {
    icon: GraduateMaleIcon,
    stat: "200+",
    label: "Students trained",
    description:
      "Hands-on cohorts equipping young Africans with practical, job-ready tech skills.",
  },
  {
    icon: UserGroupIcon,
    stat: "1,000+",
    label: "Community members",
    description:
      "A growing peer network of builders, designers, and founders across Nigerian campuses.",
  },
  {
    icon: ChartRoseIcon,
    stat: "10+",
    label: "Tech tracks",
    description:
      "From frontend engineering to data science, with structured learning paths for every goal.",
  },
  {
    icon: BookOpen01Icon,
    stat: "10+",
    label: "Community events",
    description:
      "Workshops, hackathons, and seminars that turn theory into real-world execution.",
  },
];

const whyDonate = [
  "Fund free workshops for students who can't afford bootcamps",
  "Sponsor equipment, tools, and software licenses",
  "Support mentorship programmes connecting students with industry professionals",
  "Help us expand to more campuses across Africa",
  "Cover operational costs so we keep events free and accessible",
  "Enable scholarships for outstanding members to attend tech conferences",
];

type DonationType = "one-time" | "monthly";

const DonatePage: React.FC = () => {
  const [donationType, setDonationType] = useState<DonationType>("one-time");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const paystackLink =
    donationType === "one-time" ? PAYSTACK_ONE_TIME : PAYSTACK_MONTHLY;

  return (
    <div className="overflow-x-hidden">
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-neutral-900">
        <Image
          src={HERO_IMAGE}
          alt="Students collaborating during an ETS workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/25" />

        <div className="relative w-full lg:container mx-auto px-5 md:px-10 pt-40 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-5 leading-[1.1] font-mont">
              Invest in Africa&apos;s next tech generation
            </h1>

            <p className="text-base sm:text-lg text-primary/85 leading-relaxed mb-8 max-w-xl">
              Your donation funds free workshops, mentorship, and project
              cohorts for students who would otherwise have no access to quality
              tech education.
            </p>

            <a
              href="#donate-now"
              className="inline-block bg-primary text-neutral-900 font-semibold px-8 py-3.5 rounded-md hover:bg-tertiary transition-colors duration-200"
            >
              Donate now
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="lg:container mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] font-mont leading-snug">
              What your support has built
            </h2>
            <p className="text-base text-gray mt-3 leading-relaxed">
              A look at the reach ETS has achieved so far.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200">
            {impacts.map((item, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 border-b border-r border-gray-200 flex flex-col gap-3"
              >
                <item.icon size={26} className="text-neutral-700" />
                <span className="text-4xl font-bold text-[#1a1a1a] font-mont">
                  {item.stat}
                </span>
                <span className="font-semibold text-base text-[#1a1a1a]">
                  {item.label}
                </span>
                <p className="text-sm text-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="lg:container mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-5 font-mont leading-snug">
                Where your money goes
              </h2>
              <p className="text-base sm:text-lg text-gray leading-relaxed mb-8">
                ETS is a community-first organisation. We keep overheads lean so
                the overwhelming majority of donations fund programmes, events,
                and resources that go straight to students and members.
              </p>

              <ul className="flex flex-col gap-y-3 sm:gap-y-4">
                {whyDonate.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckmarkCircle01Icon
                      size={22}
                      color="#404040"
                      className="shrink-0 mt-0.5"
                    />
                    <span className="text-sm sm:text-base text-[#1a1a1a] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/2">
              <figure className="border-l-4 border-neutral-800 bg-white p-8 sm:p-10 shadow-sm">
                <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-[#1a1a1a] mb-6">
                  &ldquo;ETS gave me access to hands-on projects and a
                  supportive peer network that accelerated my practical skills
                  when I had no money for a bootcamp.&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-semibold text-base text-[#1a1a1a]">
                    Adesewa Opeyemi
                  </p>
                  <p className="text-gray text-sm">
                    300 Level, Computer Science, LASU
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section
        id="donate-now"
        className="py-16 sm:py-20 lg:py-24 bg-white scroll-mt-20"
      >
        <div className="lg:container mx-auto px-5 md:px-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] font-mont leading-snug">
              Make a donation
            </h2>
            <p className="text-base text-gray mt-4 leading-relaxed">
              Choose how you&apos;d like to give. You&apos;ll enter your amount
              on Paystack&apos;s secure checkout.
            </p>

            <div
              role="tablist"
              aria-label="Donation frequency"
              className="inline-flex mt-8 bg-gray-100 rounded-md p-1"
            >
              {(["one-time", "monthly"] as DonationType[]).map((type) => (
                <button
                  key={type}
                  role="tab"
                  aria-selected={donationType === type}
                  onClick={() => setDonationType(type)}
                  className={`px-6 py-2.5 rounded text-sm font-semibold transition-colors duration-200 ${
                    donationType === type
                      ? "bg-white text-[#1a1a1a] shadow-sm"
                      : "text-gray hover:text-[#1a1a1a]"
                  }`}
                >
                  {type === "one-time" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray mt-5 min-h-10">
              {donationType === "monthly"
                ? "Monthly gifts help us plan workshops ahead and reach more students consistently."
                : "A single gift toward workshops, mentorship, and cohort costs."}
            </p>

            <a
              href={paystackLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-neutral-900 text-primary font-semibold px-10 py-3.5 rounded-md hover:bg-neutral-700 transition-colors duration-200"
            >
              {donationType === "monthly" ? "Give monthly" : "Donate"}
            </a>

            <p className="text-xs text-gray mt-4">
              Payments are processed securely via Paystack.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-900">
        <div className="lg:container mx-auto px-5 md:px-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 font-mont">
              Can&apos;t donate right now?
            </h2>
            <p className="text-primary/80 text-base sm:text-lg mb-8 leading-relaxed">
              There are other ways to support what we do. Your time and network
              are just as valuable.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register/volunteer"
                className="bg-primary text-neutral-900 font-semibold px-7 py-3.5 rounded-md hover:bg-tertiary transition-colors duration-200 text-center"
              >
                Volunteer with us
              </Link>
              <Link
                href="/register/community"
                className="border border-primary text-primary font-semibold px-7 py-3.5 rounded-md hover:bg-primary hover:text-neutral-900 transition-colors duration-200 text-center"
              >
                Join the community
              </Link>
              {/* <a
                href="#contact"
                className="border border-primary/40 text-primary/90 font-semibold px-7 py-3.5 rounded-md hover:border-primary hover:text-primary transition-colors duration-200 text-center"
              >
                Become a partner
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
