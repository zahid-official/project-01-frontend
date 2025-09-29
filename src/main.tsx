import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router";
import Router from "./routes";
import ThemeProvider from "./providers/theme.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Router}></RouterProvider>
    </ThemeProvider>
  </StrictMode>
);
