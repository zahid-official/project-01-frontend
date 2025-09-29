import "./global.css";
import Router from "./routes";
import store from "./redux/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import ThemeProvider from "./providers/theme.provider";
import { RouterProvider as ReduxProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ReduxProvider router={Router}></ReduxProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
