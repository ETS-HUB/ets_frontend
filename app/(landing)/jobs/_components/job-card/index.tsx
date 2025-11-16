import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobCardProps {
  slug: string;
  title: string;
  company: string;
  location: string;
  companyLogo: string;
  postedDate: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  slug,
  title,
  company,
  location,
  companyLogo,
  postedDate,
}) => {
  return (
    <Link
      href={`/jobs/${slug}`}
      className="bg-white block rounded-xl border border-gray-200 p-4 sm:p-6 md:p-10 mb-4 sm:mb-6 md:mb-10 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-white shrink-0">
            <Image
              width={56}
              height={56}
              src={companyLogo}
              alt={company}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 leading-snug">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span className="truncate max-w-[120px] sm:max-w-none">
                {company}
              </span>
              <span className="text-gray-300">•</span>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-gray-400 shrink-0 self-start sm:self-center mt-1 sm:mt-0 ml-auto sm:ml-0">
          {postedDate}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
