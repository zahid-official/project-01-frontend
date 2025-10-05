import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import GetTours from "@/pages/admin/GetTours";
import type { ISidebarItems } from "@/types";

const adminSidebarItems: ISidebarItems[] = [
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
