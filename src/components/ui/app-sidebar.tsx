import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import generateSidebar from "@/utils/generateSidebar";
import { Link } from "react-router";
import Logo from "../layout/Logo";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  // RTK Query mutation hook
  const { data } = useProfileInfoQuery(undefined);
  const userRole = data?.data?.role;

  // Nav items based on user role
  const navItems = {
    navMain: generateSidebar(userRole),
  };

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <div className="pt-4.5">
          <Link className="w-full flex justify-center items-center" to="/">
            <Logo design="" />
          </Link>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
