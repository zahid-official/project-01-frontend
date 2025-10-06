import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/dashboard/Analytics"));
const Tours = lazy(() => import("@/pages/admin/tourManagement/Tours"));
const TourTypes = lazy(() => import("@/pages/admin/tourManagement/TourTypes"));

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
        title: "Tours",
        url: "/admin/tours",
        component: Tours,
      },
      {
        title: "Tour Types",
        url: "/admin/tour-types",
        component: TourTypes,
      },
    ],
  },
];

export default adminSidebarItems;
