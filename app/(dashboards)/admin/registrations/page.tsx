"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AddTeamIcon,
  ArrowRight01Icon,
  Briefcase01Icon,
  UserAdd01Icon,
} from "hugeicons-react";

interface Stats {
  volunteers: number;
  community: number;
  jobs: number;
}

const AdminRegistrationPage = () => {
  const [stats, setStats] = useState<Stats>({
    volunteers: 0,
    community: 0,
    jobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [volunteersRes, communityRes, jobsRes] = await Promise.all([
        fetch("/api/register/volunteer?limit=1"),
        fetch("/api/register/community?limit=1"),
        fetch("/api/jobs/applications?limit=1"),
      ]);

      const [volunteersData, communityData, jobsData] = await Promise.all([
        volunteersRes.json(),
        communityRes.json(),
        jobsRes.json(),
      ]);

      setStats({
        volunteers: volunteersData.pagination?.total || 0,
        community: communityData.pagination?.total || 0,
        jobs: jobsData.pagination?.total || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Volunteer Applications",
      count: stats.volunteers,
      icon: <UserAdd01Icon className="text-4xl" />,
      color: "from-blue-500 to-secondary",
      bgColor: "bg-blue-50",
      iconColor: "text-secondary",
      href: "/admin/registrations/volunteers",
      description: "View and manage volunteer applications",
    },
    {
      title: "Community Members",
      count: stats.community,
      icon: <AddTeamIcon className="text-4xl" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      href: "/admin/registrations/community",
      description: "View and manage community registrations",
    },
    {
      title: "Job Applications",
      count: stats.jobs,
      icon: <Briefcase01Icon className="text-4xl" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      href: "/admin/registrations/jobs",
      description: "View and manage job applications",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-[#172554] mb-2">
            Registration Management
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Overview of all applications and registrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.href} className="group block">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${card.bgColor} p-4 rounded-lg`}>
                    <div className={card.iconColor}>{card.icon}</div>
                  </div>
                  <div className="text-right">
                    {loading ? (
                      <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <div className="text-4xl font-bold text-gray-900">
                        {card.count}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
                    View all
                  </span>
                  <ArrowRight01Icon className="text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!loading && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-600">
                  Total Applications:{" "}
                  <span className="font-semibold text-gray-900">
                    {stats.volunteers + stats.community + stats.jobs}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-600">
                  This Month:{" "}
                  <span className="font-semibold text-gray-900">
                    {/* You can calculate this based on created_at */}
                    --
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-600">
                  Pending Review:{" "}
                  <span className="font-semibold text-gray-900">--</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRegistrationPage;
