import Bookings from "@/pages/user/Bookings";
import type { ISidebarItems } from "@/types";

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
