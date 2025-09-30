import "./global.css";
import Router from "./routes";
import store from "./redux/store";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "./providers/theme.provider";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={Router}></RouterProvider>
        <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
