import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "../LayOut/LayOut";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Found from "../pages/Found";
import Lost from "../pages/Lost";
import Schedule from "../pages/Schedule";
import Contact from "../pages/Contact";
import Map from "../pages/Map/Map";
import SubmitItem from "../pages/SubmitItem/SubmitItem";
import News from "../pages/News";

const router1 = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "found",
        element: <Found />,
      },
      {
        path: "lost",
        element: <Lost />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "submit",
        element: <SubmitItem />,
      },
      {
        path: "news",
        element: <News />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router1} />;
};

export default AppRouter;
