import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  companyLogo: string;
  postedDate: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  companyLogo,
  postedDate,
}) => {
  return (
    <Link
      href={`/register/internships/${id}`}
      className="bg-white block rounded-xl border border-gray-200 p-10 mb-10 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-white shrink-0">
            <Image
              width={56}
              height={56}
              src={companyLogo}
              alt={company}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <span>{company}</span>
              <span className="text-gray-300">•</span>
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400 shrink-0">{postedDate}</div>
      </div>
    </Link>
  );
};

export default JobCard;
