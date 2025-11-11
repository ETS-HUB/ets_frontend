"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft01Icon, PlusSignIcon } from "hugeicons-react";
import toast from "react-hot-toast";
import { Button } from "@/app/components";
import Image from "next/image";

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

const EditEventPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  const isEditMode = !!eventId;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    day_of_week: "",
    image_url: "",
    tags: "",
    link: "",
  });
console.log(formData)
  // Fetch event data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchEventData();
    }
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/events/${eventId}`);

      if (!response.ok) {
        toast.error("Failed to fetch event data");
        router.push("/admin/events");
        return;
      }

      const data = await response.json();

      // Convert tags array to comma-separated string
      const tagsString = Array.isArray(data.tags) ? data.tags.join(", ") : "";

      setFormData({
        title: data.title || "",
        description: data.description || "",
        location: data.location || "",
        event_date: data.event_date || "",
        day_of_week: data.day_of_week || "",
        image_url: data.image_url || "",
        tags: tagsString,
        link: data.link || "",
      });
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load event");
      router.push("/admin/events");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "event_date" && value) {
      const date = new Date(value);
      const dayOfWeek = date
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase();
      setFormData((prev) => ({
        ...prev,
        day_of_week: dayOfWeek,
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image_url: data.secure_url }));
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(null);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      URL.revokeObjectURL(localPreview);
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const eventData = {
        ...formData,
        tags: tagsArray,
      };

      const url = isEditMode ? `/api/events/${eventId}` : "/api/events";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        toast.error(`Failed to ${isEditMode ? "update" : "create"} event`);
        return;
      }

      toast.success(
        `Event ${isEditMode ? "updated" : "created"} successfully!`
      );
      router.push("/admin/events");
    } catch (error) {
      toast.error(
        `Failed to ${isEditMode ? "update" : "create"} event. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-3 sm:px-4 md:px-6 xl:px-5 md:container mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft01Icon className="w-5 h-5" />
            Back to Events
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEditMode ? "Edit Event" : "Add New Event"}
          </h1>
          <p className="text-gray-600">
            {isEditMode
              ? "Update the event details below"
              : "Fill in the details below to create a new event"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="e.g., MAGIC LAS VEGAS"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                placeholder="Describe your event..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Las Vegas Convention Center, USA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Day of Week
                </label>
                <input
                  type="text"
                  name="day_of_week"
                  value={formData.day_of_week}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
              {(previewUrl || formData?.image_url) && (
                <div className="relative mt-3">
                  <Image
                    width={160}
                    height={160}
                    src={previewUrl || formData.image_url}
                    alt="Preview"
                    className="rounded-lg w-40 h-40 object-cover border"
                    unoptimized={!!previewUrl}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="e.g., FASHION, TECH, BEAUTY"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="https://example.com/event-details"
              />
            </div>

            <div className="flex gap-4 pt-6 items-center border-t justify-between border-gray-200">
              <Button
                variant="primary"
                type="submit"
                width="full"
                disabled={loading || uploading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <PlusSignIcon className="w-5 h-5" />
                    {isEditMode ? "Update Event" : "Create Event"}
                  </>
                )}
              </Button>

              <Link href="/admin/events" className="w-full">
                <Button
                  variant="primary"
                  width="full"
                  type="button"
                  className="bg-transparent text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
