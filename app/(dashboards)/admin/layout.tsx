"use client";
import React from "react";
import {
  DashboardSquare02Icon,
  Calendar02Icon,
  Analytics01Icon,
  TeacherIcon,
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
    // {
    //   icon: Calendar02Icon,
    //   label: "Schedule",
    //   path: "/admin/schedule",
    // },
    // {
    //   icon: Analytics01Icon,
    //   label: "Documents",
    //   path: "/admin/documents",
    // },
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
