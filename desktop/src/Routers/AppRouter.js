import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainAdminLayOut from "../pages/MainAdmin/LayOut/MainAdminLayOut";

const router1 = createBrowserRouter([
  {
    path: "/",
    element: <MainAdminLayOut />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      // {
      //   path: "booking",
      //   element: <Booking />,
      // },
      // {
      //   path: "found",
      //   element: <Found />,
      // },
      // {
      //   path: "lost",
      //   element: <Lost />,
      // },
      // {
      //   path: "schedule",
      //   element: <Schedule />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "map",
      //   element: <Map />,
      // },
      // {
      //   path: "submit",
      //   element: <SubmitItem />,
      // },
      // {
      //   path: "news",
      //   element: <News />,
      // },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router1} />;
};

export default AppRouter;
