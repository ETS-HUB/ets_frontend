import { Calendar03Icon, Delete02Icon, Edit02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Event } from "@/lib/supabase";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(event)
    setIsDeleting(true);
    try {
      await onDelete(event.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={event.id}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
      >
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <Calendar03Icon className="w-16 h-16 text-gray-500" />
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
            <p className="text-xs font-semibold text-gray-600">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {new Date(event.event_date).getDate()}
            </p>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description || "No description available"}
          </p>
          <p className="text-sm text-gray-500 mb-4">📍 {event.location}</p>

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {event.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{event.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t border-gray-200 justify-end">
            <Link
              href={`/admin/events/edit/${event.id}`}
              className="p-2 bg-secondary text-white rounded-lg hover:scale-105  transition-transform"
              aria-label="Edit event"
              title="Edit event"
            >
              <Edit02Icon className="w-5 h-5" />
            </Link>

            <button
              onClick={showModal}
              className="p-2 bg-red-600 text-white rounded-lg cursor-pointer hover:scale-105  transition-transform"
              aria-label="Delete event"
              title="Delete event"
            >
              <Delete02Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <ExclamationCircleOutlined className="text-red-500 text-2xl" />
            <span className="text-lg font-semibold">Delete Event?</span>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Delete Event"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          loading: isDeleting,
          size: "large",
        }}
        cancelButtonProps={{
          size: "large",
          disabled: isDeleting,
        }}
        centered
        width={500}
      >
        <div className="pl-9">
          <p className="text-gray-600 mb-3">
            You are about to permanently delete this event:
          </p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900 mb-1">{event.title}</p>
            <p className="text-sm text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-600">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <p className="text-sm text-red-600 mt-3 font-medium">
            This action cannot be undone.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default EventCard;
