import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AddTour = lazy(() => import("@/pages/admin/AddTour"));
const GetTours = lazy(() => import("@/pages/admin/GetTours"));

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
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      {
        title: "All Tours",
        url: "/admin/get-tours",
        component: GetTours,
      },
    ],
  },
];

export default adminSidebarItems;
