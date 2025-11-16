"use client";
import React from "react";
import {
  DashboardSquare02Icon,
  Analytics01Icon,
  TeacherIcon,
  UserSharingIcon,
  JobShareIcon,
} from "hugeicons-react";

import DashboardLayout from "../_components/DashboardLayout";
import { usePathname } from "next/navigation";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const adminSidebarItems = [
    // {
    //   icon: DashboardSquare02Icon,
    //   label: "Dashboard",
    //   path: "/admin/dashboard",
    // },
    {
      icon: Analytics01Icon,
      label: "Events",
      path: "/admin/events",
    },
    {
      icon: TeacherIcon,
      label: "Volunteers",
      path: "/admin/volunteers",
    },
    {
      icon: UserSharingIcon,
      label: "Registrations",
      path: "/admin/registrations",
    },
    {
      icon: JobShareIcon,
      label: "Jobs",
      path: "/admin/jobs",
    },
  ];

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <DashboardLayout
      userImage=""
      userRole="Super Admin"
      userEmail="admin@etshub.org"
      sidebarItems={adminSidebarItems}
    >
      {children}
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
