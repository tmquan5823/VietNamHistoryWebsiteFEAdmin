import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./Router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/VietNamHistoryWebsiteFE">
          <Router />
        </BrowserRouter>
        <Analytics />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
