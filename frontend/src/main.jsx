import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import HomePage from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ColorPalette from "./pages/ColorPalette.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/colors",
    element: <ColorPalette />,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
