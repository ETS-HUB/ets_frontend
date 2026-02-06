"use client";
import React, { useState, useEffect } from "react";
import { Spin, Empty } from "antd";

import HeroSection from "../register/_components/hero-section";
import JobFilter from "../register/_components/job-filter";
import JobCard from "./_components/job-card";
import toast from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  company_logo: string | null;
  created_at: string;
  slug: string;
  job_type: string;
  is_active: boolean;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const InternshipRegistrationPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [experience, setExperience] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchJobs = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      if (jobType && jobType !== "all") {
        params.append("jobType", jobType);
      }

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/jobs?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const result = await response.json();
      setJobs(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast.error("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchJobs();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getPostedDate = (createdAt: string) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 30)} month${
      Math.floor(diffDays / 30) > 1 ? "s" : ""
    } ago`;
  };
  const activeJobs = jobs.filter((job) => job.is_active === true);

  return (
    <>
      <HeroSection
        title="Find Your Next Job"
        description="Kickstart your career with ETS by joining our internship program. Gain hands-on experience, develop your skills, and contribute to meaningful projects while working alongside industry professionals. Fill out the form to apply for an internship and take the first step towards a rewarding career!"
        titleSize="medium"
        showButton={false}
        descriptionSize="medium"
      />
      <div>
        <div className="lg:container lg:mx-auto px-5 md:px-10 py-8">
          <JobFilter
            onSearch={setSearchTerm}
            onJobTypeChange={setJobType}
            onExperienceChange={setExperience}
            onIndustryChange={setIndustry}
          />

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : activeJobs.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <Empty
                description={
                  <span className="text-gray-500">
                    No jobs found. Try adjusting your filters.
                  </span>
                }
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  Showing {activeJobs.length} of {pagination.total} jobs
                </p>
              </div>

              <div>
                {activeJobs.map((job) => (
                  <JobCard
                    slug={job.slug}
                    key={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    companyLogo={job.company_logo ?? ""}
                    postedDate={getPostedDate(job.created_at)}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => fetchJobs(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 ${
                      pagination.page !== 1
                        ? "bg-gray-900 cursor-pointer text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Previous
                  </button>

                  <span className="text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => fetchJobs(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 ${
                      pagination.page !== pagination.totalPages
                        ? "bg-gray-900 cursor-pointer text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InternshipRegistrationPage;
