import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/dashboard/Analytics"));
const Division = lazy(() => import("@/pages/admin/tourManagement/Division"));
const TourTypes = lazy(() => import("@/pages/admin/tourManagement/TourTypes"));
const Tours = lazy(() => import("@/pages/admin/tourManagement/Tours"));

const adminSidebarItems: ISidebarItems[] = [
  // Dashboard
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },

  // Tour management
  {
    title: "Tour Management",
    items: [
      {
        title: "Divisions List",
        url: "/admin/divisions",
        component: Division,
      },
      {
        title: "Tour Types List",
        url: "/admin/tour-types",
        component: TourTypes,
      },
      {
        title: "Tours",
        url: "/admin/tours",
        component: Tours,
      },
    ],
  },
];

export default adminSidebarItems;
