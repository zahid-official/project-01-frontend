import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import generateRoutes from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import adminSidebarItems from "./admin/adminSidebar";
import userSidebarItems from "./user/userSidebar";

const Router = createBrowserRouter([
  // Common layout
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  // Admin dashboard
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to={"/admin/analytics"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  // User dashboard
  {
    path: "/user",
    Component: DashboardLayout,
    children: [
      { index: true, element: <Navigate to={"/user/bookings"} /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  // Auth
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "verify",
    Component: Verify,
  },
]);

export default Router;
