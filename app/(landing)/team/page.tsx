"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  TwitterIcon,
  InstagramIcon,
  Linkedin02Icon,
  UserIcon,
  GithubIcon,
} from "hugeicons-react";
import { Modal, Spin } from "antd";
import Image from "next/image";
import toast from "react-hot-toast";

interface Volunteer {
  id: number;
  name: string;
  role: string;
  specialty?: string;
  additionalInfo?: string;
  image?: string;
  bio?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  slug: string;
}

const openPositions = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    type: "Volunteer",
    description:
      "Help build amazing user experiences with React, Next.js, and modern web technologies.",
  },
  {
    id: 2,
    title: "Content Creator",
    department: "Marketing",
    type: "Volunteer",
    description:
      "Create engaging content for our social media platforms and community.",
  },
  {
    id: 3,
    title: "Event Coordinator",
    department: "Operations",
    type: "Volunteer",
    description:
      "Plan and execute tech events, workshops, and community gatherings.",
  },
];

const TeamPage = () => {
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleMembers, setVisibleMembers] = useState(new Set<number>());
  const [teamMembers, setTeamMembers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/volunteers");

      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }

      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleMembers((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (window.innerWidth >= 768) {
      memberRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    } else {
      setVisibleMembers(new Set(teamMembers.map((_, index) => index)));
    }

    return () => observer.disconnect();
  }, [teamMembers]);

  return (
    <>
      <section className="relative py-32 bg-linear-to-br from-tertiary via-yellow-200 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-lightblue rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide_up">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
              Meet Our Team
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-secondary mb-6 leading-tight">
            Leadership Team
          </h1>

          <p className="text-xl md:text-2xl text-lightgray max-w-3xl mx-auto leading-relaxed mb-8">
            We&apos;re students, creators, and tech enthusiasts united by our
            passion for innovation and our commitment to fostering an inclusive
            space where everyone can grow and contribute.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://forms.gle/Huv91gi2yr6ZJs4o8" target="_blank">
              <button className="bg-secondary hover:bg-lightblue text-white px-8 py-4 w-full rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Join Our Team
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-secondary to-lightblue hover:from-lightblue hover:to-secondary text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View open positions
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Creative Minds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get to know the talented individuals who bring{" "}
              <span className="text-lightblue font-semibold">ETS </span>
              visions to life
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No team members found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/team/${member.slug}`}
                  className="block h-full"
                >
                  <div
                    ref={(el) => {
                      memberRefs.current[index] = el;
                    }}
                    data-index={index}
                    className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col ${
                      visibleMembers.has(index)
                        ? "md:animate-slideUpFowards md:opacity-100"
                        : "md:opacity-0 md:translate-y-8"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Image section */}
                    <div className="aspect-4/5 bg-linear-to-br from-gray-100 to-gray-200 relative overflow-hidden shrink-0">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={300}
                          height={375}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UserIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm leading-relaxed line-clamp-3">
                            {member.bio}
                          </p>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        {member?.twitter && (
                          <Link
                            href={member.twitter}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <TwitterIcon className="w-5 h-5 text-secondary" />
                          </Link>
                        )}
                        {member?.instagram && (
                          <Link
                            href={member.instagram}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <InstagramIcon className="w-5 h-5 text-secondary" />
                          </Link>
                        )}
                        {member?.linkedin && (
                          <Link
                            href={member.linkedin}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Linkedin02Icon className="w-5 h-5 text-secondary" />
                          </Link>
                        )}
                        {member?.github && (
                          <Link
                            href={member.github}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <GithubIcon className="w-5 h-5 text-secondary" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-semibold mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {member.additionalInfo}
                      </p>
                    </div>

                    <div className="absolute inset-0 border-2 border-tertiary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-20 lg:mb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-secondary to-lightblue rounded-full mb-8">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We&apos;re looking for talented people
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            We are always looking for passionate, dynamic, and talented
            individuals to join our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              View Open Positions
            </button>

            <Link href="/handbook.pdf" target="_blank">
              <button className="border-2 border-lightgray w-full text-lightgray hover:bg-tertiary hover:text-secondary hover:border-tertiary px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Learn more about our culture
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Modal
        title={
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Open Positions
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Join our passionate community of tech enthusiasts and make an
              impact on campus
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={800}
        className="[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-header]:rounded-t-2xl font-montserrat!"
      >
        <div className="space-y-6 mt-4 max-h-[70vh] overflow-y-auto pr-2">
          {openPositions.map((position) => (
            <div
              key={position.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      {position.department}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {position.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="https://forms.gle/Huv91gi2yr6ZJs4o8"
                  target="_blank"
                  className="mt-4 sm:mt-0"
                >
                  <button className="bg-secondary hover:bg-lightblue text-white px-6 py-2 rounded-full font-semibold transition-colors">
                    Apply Now
                  </button>
                </Link>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {position.description}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default TeamPage;
