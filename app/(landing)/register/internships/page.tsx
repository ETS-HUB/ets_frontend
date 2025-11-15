"use client";
import React, { useState } from "react";

import HeroSection from "../_components/hero-section";
import JobFilter from "../_components/job-filter";
import JobCard from "../_components/job-card";

const InternshipRegistrationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Cybersecurity Intern",
      company: "ETS",
      location: "Remote",
      companyLogo: "",
      postedDate: "3 days ago",
    },
    {
      id: 2,
      title: "Software Engineering Intern",
      company: "ETS",
      location: "Remote",
      companyLogo: "",
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Product Design Intern",
      company: "ETS",
      location: "Remote",
      companyLogo: "",
      postedDate: "1 week ago",
    },
    {
      id: 4,
      title: "DevOps Intern",
      company: "ETS",
      location: "Remote",
      companyLogo: "",
      postedDate: "2 weeks ago",
    },
  ];
  return (
    <>
      <HeroSection
        title="Find Your Internship"
        description="Kickstart your career with ETS by joining our internship program. Gain hands-on experience, develop your skills, and contribute to meaningful projects while working alongside industry professionals. Fill out the form to apply for an internship and take the first step towards a rewarding career!"
        titleSize="medium"
        showButton={false}
        descriptionSize="large"
      />
      <div>
        <div className="lg:container lg:mx-auto px-5 md:px-10 py-8">
          <JobFilter
            onSearch={setSearchTerm}
            onJobTypeChange={(value) => console.log("Job type:", value)}
            onExperienceChange={(value) => console.log("Experience:", value)}
            onIndustryChange={(value) => console.log("Industry:", value)}
          />

          <div>
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipRegistrationPage;
