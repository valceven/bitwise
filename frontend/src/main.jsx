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
import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import DashboardClassroom from "./pages/dashboard/DashboardClassroom.jsx";
import DashboardStudentReport from "./pages/dashboard/DashboardStudentReport.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import DashboardPending from "./pages/dashboard/DashboardPending.jsx";
import ClassroomView from "./pages/dashboard/ClassroomView.jsx";
import LessonView from "./pages/dashboard/LessonView.jsx";
import TopicView from "./pages/dashboard/TopicView.jsx";

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
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "classroom", element: <DashboardClassroom /> },
      { path: "student-report", element: <DashboardStudentReport /> },
      { path: "pending", element: <DashboardPending /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "classroomview", element: <ClassroomView /> },
      { path: "lessonview", element: <LessonView /> },
      { path: "topicview", element: <TopicView /> },
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
