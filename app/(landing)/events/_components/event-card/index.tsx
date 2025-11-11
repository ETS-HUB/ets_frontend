import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, Location02Icon } from "hugeicons-react";

interface EventCardProps {
  date: {
    day: string;
    dayOfWeek: string;
  };
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  imageAlt?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  title,
  location,
  description,
  image,
  tags,
  link = "#",
  imageAlt = "Event image",
}) => {
  return (
    <article className="border-b border-gray-300 pb-8 mb-8 last:border-b-0">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Date Section */}
        <div className="shrink-0 w-20 md:w-24">
          <div className="text-left">
            <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
              {date.dayOfWeek}
            </p>
            <p className="text-5xl md:text-6xl font-bold text-gray-900 leading-none">
              {date.day}
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-64 lg:w-72">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Navigation Arrows Overlay */}
            <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 uppercase leading-tight">
                {title}
              </h3>

              <div className="flex items-start gap-2 mb-4 text-gray-700">
                <Location02Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm md:text-base">{location}</p>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                {description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 border border-gray-400 text-gray-800 text-xs md:text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow Link */}
            <Link
              href={link}
              className="flex-shrink-0 text-orange-500 hover:text-orange-600 transition-colors"
              aria-label={`View details for ${title}`}
            >
              <ArrowUpRight01Icon className="w-8 h-8 md:w-10 md:h-10" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
