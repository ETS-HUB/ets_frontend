"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft01Icon, ImageUploadIcon, TagIcon, CategoryIcon } from "hugeicons-react";
import toast from "react-hot-toast";
import { Button } from "@/app/components";
import Image from "next/image";

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

const CATEGORIES = [
  "Technology",
  "Business",
  "Lifestyle",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

const CreateBlogPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "",
    tags: "",
    published: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setCoverPreview(localPreview);
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
        setFormData((prev) => ({ ...prev, cover_image: data.secure_url }));
        URL.revokeObjectURL(localPreview);
        setCoverPreview(null);
        toast.success("Cover image uploaded!");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      URL.revokeObjectURL(localPreview);
      setCoverPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        cover_image: formData.cover_image,
        category: formData.category,
        tags: tagsArray,
        published: formData.published,
      };

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to create blog post");
        return;
      }

      toast.success("Blog post created successfully!");
      router.push("/admin/blog");
    } catch (error) {
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-3 sm:px-4 md:px-6 xl:px-8 mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft01Icon className="w-5 h-5" />
            Back to Blogs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Write and publish your blog post
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter blog title..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                placeholder="auto-generated-from-title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Brief summary of your post..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={16}
                  className="w-full px-4 py-4 resize-none focus:outline-none text-gray-800 leading-relaxed"
                  placeholder="Write your blog content here..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2">
                    <CategoryIcon className="w-4 h-4" />
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="inline-flex items-center gap-2">
                    <TagIcon className="w-4 h-4" />
                    Tags
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="tech, tutorial, guide"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  <ImageUploadIcon className="w-4 h-4" />
                  Cover Image
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-200 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
              />
              {(coverPreview || formData.cover_image) && (
                <div className="relative mt-4">
                  <Image
                    width={320}
                    height={180}
                    src={coverPreview || formData.cover_image}
                    alt="Cover preview"
                    className="rounded-lg w-full max-w-sm object-cover border border-gray-200"
                    unoptimized={!!coverPreview}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white font-medium">Uploading...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <Button
                variant="primary"
                type="submit"
                width="fit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Create Blog Post"
                )}
              </Button>

              <Link href="/admin/blog">
                <Button
                  variant="gray"
                  width="fit"
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

export default CreateBlogPage;