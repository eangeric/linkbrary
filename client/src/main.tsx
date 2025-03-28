import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import PublicRoute from "./Utils/PublicRoute";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import PrivateRoute from "./Utils/PrivateRoute";

const router = createBrowserRouter([
  { element: <PrivateRoute />, children: [{ element: <Home />, path: "/" }] },
  {
    element: <PublicRoute />,
    children: [
      { element: <Login />, path: "/login" },
      { element: <Signup />, path: "/signup" },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
