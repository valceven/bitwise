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
import DashboardStudentReport from "./pages/dashboard/teacher/DashboardStudentReport.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import DashboardPending from "./pages/dashboard/teacher/DashboardPending.jsx";
import LessonView from "./pages/dashboard/student/LessonView.jsx";
import TopicView from "./pages/dashboard/student/TopicView.jsx";
import DashboardStudentReportTopics from "./pages/dashboard/teacher/DashboardStudentReportTopics.jsx";
import DashboardStudentReportLesson from "./pages/dashboard/teacher/DashboardStudentReportLesson.jsx";
import ClassroomView from "./pages/dashboard/student/ClassroomView.jsx";

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
      { path: "classroom", element: <DashboardClassroom />},
      { path: "profile", element: <ProfilePage /> },
      
      // Teacher routes
      { path: "teacher/classroom/:classCode", element: <DashboardStudentReport /> },
      { path: "teacher/classroom/:classCode/lesson/:lessonId", element: <DashboardStudentReportLesson /> },
      { path: "teacher/classroom/:classCode/lesson/:lessonId/topic/:topicId", element: <DashboardStudentReportTopics /> },
      { path: "teacher/classroom/:classCode/lesson/:lessonId/assessment/:assessmentId", element: <DashboardStudentReport /> },
      { path: "teacher/pending", element: <DashboardPending /> },
      
      // Student routes
      { path: "classroom/student/:classCode", element: <ClassroomView /> },
      { path: "classroom/student/:classCode/lesson/:lessonId", element: <LessonView /> },
      { path: "classroom/student/:classCode/lesson/:lessonId/topic/:topicId", element: <TopicView /> },
      
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
