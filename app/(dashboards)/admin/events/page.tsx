"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Event } from "@/lib/supabase";
import { PlusSignIcon, Calendar03Icon } from "hugeicons-react";

import EventCard from "./_components/event-card/EventCard";
import { Button } from "@/app/components";

const AdminEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events?limit=100");

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const result = await response.json();
      setEvents(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to delete event");
        return;
      }

      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-40 md:container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-40 md:container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button
                onClick={fetchEvents}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="px-3 sm:px-4 md:px-6 xl:px-5 md:container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Event Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all ETS events.
            </p>
          </div>
          <Link href="/admin/events/add-event">
            <Button variant="primary">
              <PlusSignIcon className="w-5 h-5" />
              <span className="ml-2">Add Event</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar03Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar03Icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    events.filter((e) => new Date(e.event_date) >= new Date())
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar03Icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Past Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    events.filter((e) => new Date(e.event_date) < new Date())
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar03Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first event
            </p>
            <Link
              href="/admin/events/add-event"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <PlusSignIcon className="w-5 h-5" />
              Add Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
