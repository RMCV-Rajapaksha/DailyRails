import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainAdminLayOut from "../LayOut/MainLayOut";
import Home from "../features/Pages/Home";
import Dashboard from "../features/DashboardPage";
import LoginPage from "../features/Authentication/pages/LoginPage";
import SeatBooking from "../features/MainAdmin/tickets/SeatBooking";

const router1 = createBrowserRouter([
  {
    path: "/",
    element: <MainAdminLayOut />,
    children: [
      {
        index: true,
        element:  <LoginPage />,
      },{
        path: "dashboard",
        children: [
          { index: true, element: <Dashboard section="home" /> },
          { path: "train-schedule", element: <Dashboard section="schedules" /> },
          {path: "routes", element: <Dashboard section="routes" />},
          {path: "train-management", element: <Dashboard section="trains" />},
          {path: "tickets", element: <Dashboard section="tickets" />},
          {path: "register", element: <Dashboard section="admins" />},
          {path: "notifications", element: <Dashboard section="notifications" />},
          {path: "lost", element: <Dashboard section="losts" />},
          {path: "found", element: <Dashboard section="founds" />},
          {path: "logout", element: <Dashboard section="logout" />},

        ],
      }
     
    ],
  },{
    path: "/announcements",
    children: [
      {
        index: true,
        element: <Home />,
      },]}
  
]);

const AppRouter = () => {
  return <RouterProvider router={router1} />;
};

export default AppRouter;
