"use client";
import React from "react";
import { Divider, Button } from "antd";
import { ArrowLeft01Icon } from "hugeicons-react";
import Image from "next/image";

import { Button as CustomButton } from "@/app/components";

const JobDetailsPage = () => {
  const jobData = {
    title: "Graduate & Undergraduate Intern",
    company: "Aradel",
    companyLogo: "",
    postedDate: "3 days ago",
    location: "Lagos and Port Harcourt",
    jobType: "Internship",
    duration: "6-12 months",
    description:
      "Are you an undergraduate or a fresh graduate seeking development opportunities? Join our 2025/2026 internship program, designed to equip you with valuable on-the-job experience, provide coaching support, and help you gain meaningful exposure and insights into the Energy Industry.",
    programDetails: [
      {
        label: "graduate internships",
        description:
          "are for a maximum duration of twelve months (1 year), while",
      },
      {
        label: "undergraduate internships",
        description:
          "are for a maximum duration of six (6) months or as stipulated by the university. Location is Lagos and Port Harcourt only.",
      },
    ],
    eligibilityCriteria: {
      undergraduates: [
        "Be enrolled in a full-time undergraduate program.",
        "Be a 300-level/400-level student.",
        "Have the relevant approval or authorization for an internship in the 2025/2026 academic year.",
      ],
      graduates: [
        "Hold a bachelor's degree from a recognized university.",
        "Have graduated with a minimum of Second-Class Upper (2:1) or Upper Credit for HND holders.",
        "Should be a recent graduate (less than one year post-graduation).",
      ],
    },
    responsibilities: [
      "Assist in day-to-day operations and project execution",
      "Collaborate with cross-functional teams on strategic initiatives",
      "Conduct research and analysis to support business decisions",
      "Participate in training sessions and professional development programs",
      "Present findings and recommendations to senior management",
    ],
    requirements: [
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication abilities",
      "Proficiency in Microsoft Office Suite",
      "Ability to work independently and in team settings",
      "Demonstrated interest in the Energy Industry",
    ],
    benefits: [
      "Competitive monthly stipend",
      "Hands-on experience in the Energy sector",
      "Professional mentorship and coaching",
      "Certificate of completion",
      "Potential for full-time employment upon successful completion",
    ],
    applicationDeadline: "December 15, 2024",
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleApply = () => {
    console.log("Apply for job");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-28 px-5">
      <div className="max-w-5xl mx-auto">
        <Button
          type="text"
          icon={<ArrowLeft01Icon />}
          onClick={handleBack}
          className="mb-8 text-gray-500 text-base py-2 px-0!"
        >
          Back
        </Button>

        <div className="mb-6">
          <Image
            width={80}
            height={80}
            src={jobData.companyLogo}
            alt={jobData.company}
            className="w-20 h-20 rounded-xl border border-gray-200 object-contain bg-white p-2"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#172554] m-0">
              {jobData.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap text-gray-500 text-base mb-4">
            <span>{jobData.company}</span>
            <span>•</span>
            <span>{jobData.postedDate}</span>
          </div>
        </div>

        <Divider />

        <section className="mb-10">
          <p className="text-base leading-relaxed text-gray-500 mb-6">
            {jobData.description}
          </p>

          <p className="text-base leading-relaxed text-gray-500">
            Our{" "}
            <span className="font-bold text-gray-900">
              {jobData.programDetails[0].label}
            </span>{" "}
            {jobData.programDetails[0].description}{" "}
            <span className="font-bold text-gray-900">
              {jobData.programDetails[1].label}
            </span>{" "}
            {jobData.programDetails[1].description}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#172554] mb-6">
            Eligibility Criteria:
          </h2>

          <div className="mb-8">
            <h3 className="text-base font-bold text-[#172554] mb-4 uppercase tracking-wide">
              UNDERGRADUATES
            </h3>
            <ul className="pl-5 m-0">
              {jobData.eligibilityCriteria.undergraduates.map((item, index) => (
                <li
                  key={index}
                  className="text-base leading-relaxed text-gray-500 mb-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-base font-bold text-[#172554] mb-4 uppercase tracking-wide">
              GRADUATES
            </h3>
            <ul className="pl-5 m-0">
              {jobData.eligibilityCriteria.graduates.map((item, index) => (
                <li
                  key={index}
                  className="text-base leading-relaxed text-gray-500 mb-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#172554] mb-6">
            Key Responsibilities
          </h2>
          <ul className="pl-5 m-0">
            {jobData.responsibilities.map((item, index) => (
              <li
                key={index}
                className="text-base leading-relaxed text-gray-500 mb-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#172554] mb-6">
            Requirements
          </h2>
          <ul className="pl-5 m-0">
            {jobData.requirements.map((item, index) => (
              <li
                key={index}
                className="text-base leading-relaxed text-gray-500 mb-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#172554] mb-6">
            What We Offer
          </h2>
          <ul className="pl-5 m-0">
            {jobData.benefits.map((item, index) => (
              <li
                key={index}
                className="text-base leading-relaxed text-gray-500 mb-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-yellow-100 border border-yellow-400 rounded-lg px-5 py-4 mb-8">
          <span className="text-yellow-900 text-base font-semibold">
            Application Deadline: {jobData.applicationDeadline}
          </span>
        </div>

        <div className="flex justify-center pt-6 pb-10">
          <CustomButton
            variant="primary"
            onClick={handleApply}
            className="w-full"
          >
            Apply now
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
