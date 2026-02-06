"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar03Icon,
  Location01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";

import { EventCardData } from "@/types/event";

export const NextEventHighlight: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<EventCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeUntil, setTimeUntil] = useState<string>("");

  useEffect(() => {
    fetchNextEvent();
  }, []);

  useEffect(() => {
    if (nextEvent) {
      updateTimeUntil();
      const interval = setInterval(updateTimeUntil, 60000);
      return () => clearInterval(interval);
    }
  }, [nextEvent]);

  const updateTimeUntil = () => {
    if (!nextEvent) return;

    const now = new Date();
    const eventDate = new Date(nextEvent.event_date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      setTimeUntil("happening today");
    } else if (diffDays === 1) {
      setTimeUntil("happening tomorrow");
    } else if (diffDays > 1) {
      setTimeUntil(`happening in ${diffDays} days`);
    } else {
      setTimeUntil("event has passed");
    }
  };

  const fetchNextEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events?upcoming=true&limit=1");

      if (!response.ok) {
        throw new Error("Failed to fetch next event");
      }

      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const event = result.data[0];
        setNextEvent({
          id: event.id,
          date: {
            day: new Date(event.event_date).getDate().toString(),
            dayOfWeek: new Date(event.event_date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
          },
          title: event.title,
          location: event.location,
          description: event.description || "",
          image: event.image_url || "/placeholder-event.jpg",
          tags: event.tags || [],
          link: event.link || "#",
          imageAlt: `${event.title} event`,
          event_date: event.event_date,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16">
        <div className="px-10 lg:container mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!nextEvent) {
    return null;
  }

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-2">
      <div className="px-4 sm:px-6 md:px-10 lg:container mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm font-semibold">
            Next Event
          </span>
        </div>

        <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-46 2xl:h-46 relative opacity-80">
                <Image
                  src={nextEvent.image || "/og-image.jpg"}
                  alt={nextEvent.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-46 2xl:h-46 relative opacity-80">
                <Image
                  src={nextEvent.image || "/og-image.jpg"}
                  alt={nextEvent.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="text-center px-4 sm:px-8 md:px-12 lg:px-24 xl:px-40">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-tight text-gray-700 font-normal">
                {nextEvent.title ||
                  `Join for an exciting event bringing together professionals and enthusiasts to share knowledge, network, and explore new opportunities in our community.`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-center md:justify-between items-center sm:items-start lg:items-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto">
          <div className="text-center sm:text-left w-full sm:w-auto sm:flex-1 lg:flex-none">
            <h3 className="text-gray-500 uppercase text-xs tracking-wider mb-3 font-semibold">
              When
            </h3>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Calendar03Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-700">
                  {nextEvent.date.dayOfWeek}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {new Date(nextEvent.event_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left w-full sm:w-auto sm:flex-1 lg:flex-none">
            <h3 className="text-gray-500 uppercase text-xs tracking-wider mb-3 font-semibold">
              Where
            </h3>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Location01Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
              <p className="text-base sm:text-lg text-gray-700 wrap-break-word">
                {nextEvent.location}
              </p>
            </div>
          </div>

          <div className="text-center sm:mr-auto lg:mr-0 sm:text-left w-full sm:w-auto sm:flex-1 lg:flex-none">
            <h3 className="text-gray-500 uppercase text-xs tracking-wider mb-3 font-semibold">
              Status
            </h3>
            <p className="text-base sm:text-lg font-semibold text-yellow-600 capitalize">
              {timeUntil}
            </p>
            {nextEvent.tags.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                {nextEvent.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 capitalize bg-gray-800 text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <Link
            href={nextEvent.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
          >
            Register Now
            <ArrowRight01Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>

        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <div className="inline-block animate-bounce">
            <ArrowDown01Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
