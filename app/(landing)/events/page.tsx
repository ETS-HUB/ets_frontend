"use client";
import React, { useEffect, useState } from "react";
import { ArrowDown01Icon, Search01Icon } from "hugeicons-react";
import { Dropdown } from "antd";

import EventCard from "./_components/event-card";
import { EventHeroSection } from "./_components";
import { formatEventDate, groupEventsByMonth, sortMonthKeys } from "@/helpers";
import { EventCardData } from "@/types/event";
import { Event } from "@/lib/supabase";

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const allTags = Array.from(
    new Set(events.flatMap((event) => event.tags)),
  ).sort();

  const eventsByMonth = groupEventsByMonth(events);
  const sortedMonths = sortMonthKeys(Object.keys(eventsByMonth));

  useEffect(() => {
    fetchEvents();
  }, [pagination.currentPage, searchTerm, selectedTag]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.pageSize.toString(),
      });

      if (searchTerm) {
        params.append("search", searchTerm);
      }

      if (selectedTag) {
        params.append("tag", selectedTag);
      }

      const response = await fetch(`/api/events?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const result = await response.json();
      const data: Event[] = result.data;

      const transformedEvents: EventCardData[] = data.map((event) => {
        const { day, dayOfWeek } = formatEventDate(event.event_date);

        return {
          id: event.id,
          date: {
            day,
            dayOfWeek,
          },
          title: event.title,
          location: event.location,
          description: event.description || "",
          image: event.image_url || "/placeholder-event.jpg",
          tags: event.tags || [],
          link: event.link || "#",
          imageAlt: `${event.title} event`,
          event_date: event.event_date,
        };
      });

      setEvents(transformedEvents);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchInput("");
    setSelectedTag("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  if (loading && events.length === 0) {
    return (
      <section>
        <EventHeroSection />
        <div className="px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-40 md:container mx-auto py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <EventHeroSection />
        <div className="px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-40 md:container mx-auto py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button
                onClick={fetchEvents}
                className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <EventHeroSection />
      <div className="px-10 h-36 md:h-36 lg:h-4" />
      <div className="px-10 lg:container mx-auto md:py-12 md:mt-10">
        <div className="mb-8 md:mb-12 space-y-6">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 items-center max-w-2xl"
          >
            <div className="relative flex-1">
              <Search01Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search events by title, description, or location..."
                className="w-full pl-10 pr-4 py-2 md:py-2 border border-gray-300 text-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Search
            </button>
          </form>

          {allTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Filter by Category
              </h3>
              <Dropdown
                menu={{
                  items: allTags.map((tag) => ({
                    key: tag,
                    label: tag,
                    onClick: () => handleTagFilter(tag),
                  })),
                }}
                trigger={["click"]}
              >
                <button className="px-4 py-2 border capitalize border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2">
                  {selectedTag || "Select Category"}
                  <ArrowDown01Icon className="w-4 h-4" />
                </button>
              </Dropdown>
            </div>
          )}

          {(searchTerm || selectedTag) && (
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <span className="text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedTag && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                  Tag: {selectedTag}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="text-sm text-gray-600">
            Showing {events.length} of {pagination.totalItems} events
          </div>
        </div>

        {events.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">No events found</p>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters to see all events
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {loading && (
              <div className="fixed inset-0 bg-white opacity-75 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            )}

            {sortedMonths.map((month) => (
              <div key={month} className="space-y-6">
                <div className="inline-block bg-gray-900 text-white px-6 py-3 text-lg md:text-xl font-bold uppercase tracking-wide">
                  {month}
                </div>

                <div className="space-y-0">
                  {eventsByMonth[month].map((event) => (
                    <EventCard
                      key={event.id}
                      date={event.date}
                      title={event.title}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      tags={event.tags}
                      link={event.link}
                      imageAlt={event.imageAlt}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pagination.hasPreviousPage
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  return (
                    page === 1 ||
                    page === pagination.totalPages ||
                    Math.abs(page - pagination.currentPage) <= 1
                  );
                })
                .map((page, index, array) => {
                  const prevPage = array[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-3 py-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          pagination.currentPage === page
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pagination.hasNextPage
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPage;
