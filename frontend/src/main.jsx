import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./styles/index.css"; 

import Layout from "./components/Layout.jsx";
import HomePage from "./pages/Home.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ColorPalette from "./pages/ColorPalette.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "colors", element: <ColorPalette /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <PageNotFound />,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
    errorElement: <PageNotFound />,
  },
  {
    path: "/profile",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <ProfilePage /> }, 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
