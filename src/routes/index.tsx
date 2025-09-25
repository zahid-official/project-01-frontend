import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/about/About";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

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

  // Dashboard layout
  {
    path: "dashboard",
    Component: DashboardLayout,
  },
]);

export default Router;
