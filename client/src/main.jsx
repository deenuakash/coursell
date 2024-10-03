import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Courses, Home, Login, Purchases, Search, Settings } from "./pages";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ModalProvider from "./contexts/ModalContext.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/new-courses",
        element: <Courses />,
      },
      {
        path: "/purchases",
        element: <ProtectedRoute element={<Purchases />} />,
      },
      { path: "/settings", element: <ProtectedRoute element={<Settings />} /> },
      { path: "/login", element: <Login /> },
      { path: "/search", element: <Search /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>
);
