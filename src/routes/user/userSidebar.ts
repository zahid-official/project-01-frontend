import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const Bookings = lazy(() => import("@/pages/user/Bookings"));

const userSidebarItems: ISidebarItems[] = [
  {
    title: "Bookings History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];

export default userSidebarItems;
