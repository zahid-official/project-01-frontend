import role from "@/constants/role";
import adminSidebarItems from "@/routes/admin/adminSidebar";
import userSidebarItems from "@/routes/user/userSidebar";
import type { TRole } from "@/types";

const generateSidebar = (userRole: TRole) => {
  switch (userRole) {
    case role.SUPER_ADMIN:
      return [...adminSidebarItems];
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.USER:
      return [...userSidebarItems];

    default:
      return [];
  }
};

export default generateSidebar;
