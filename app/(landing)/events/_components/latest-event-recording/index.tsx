"use client";
import { Button } from "@/app/components";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export const LatestEventRecording: React.FC = () => {
  const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestVideo();
  }, []);

  const fetchLatestVideo = async () => {
    try {
      const response = await fetch("/api/youtube/latest");
      if (response.ok) {
        const data = await response.json();
        setLatestVideo(data);
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

  if (!latestVideo) {
    return null;
  }

  return (
    <div className="w-full bg-linear-to-r from-white via-purple-200 to-yellow-300 py-16 md:py-20">
      <div className="px-5 md:px-10 lg:container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                Latest Recording
              </span>
            </div>

            <h2 className="text-3xl tracking-tight md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
              Our community in action
            </h2>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Watch highlights from our recent events and see how ETS brings
              together students, professionals, and industry leaders. Experience
              the energy, insights, and connections that make our community
              thrive.
            </p>

            <div className="pt-4">
              <Link
                href="https://www.youtube.com/@etshubofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  View All Recordings
                  <ArrowRight01Icon />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${latestVideo.id}`}
                  title={latestVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 bg-gray-50">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                  {latestVideo.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {latestVideo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
