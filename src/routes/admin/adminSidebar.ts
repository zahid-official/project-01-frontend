import AddTourType from "@/pages/admin/tour/AddTourType";
import GetTourTypes from "@/pages/admin/tour/GetTourTypes";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// Lazy loading
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const AddTour = lazy(() => import("@/pages/admin/tour/AddTour"));
const GetTours = lazy(() => import("@/pages/admin/tour/GetTours"));

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
      {
        title: "Add TourType",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "All TourTypes",
        url: "/admin/get-tour-types",
        component: GetTourTypes,
      },
    ],
  },
];

export default adminSidebarItems;
