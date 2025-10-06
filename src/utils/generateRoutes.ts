import type { ISidebarItems } from "@/types";

const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

export default generateRoutes;
