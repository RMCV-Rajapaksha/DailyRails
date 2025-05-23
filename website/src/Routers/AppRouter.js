import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "../LayOut/LayOut";
import Home from "../features/Home/Home";
import Booking from "../features/Booking/pages/Booking";
import Found from "../features/Recovery/pages/Found";
import Lost from "../features/Recovery/pages/Lost";
import Schedule from "../features/Schedule/pages/Schedule";
import Contact from "../features/Contact/pages/Contact";
import Map from "../features/Map/pages/Map";
import SubmitItem from "../features/Recovery/pages/SubmitItem";
import News from "../features/News/pages/News";
import NoUrl from "../features/NoUrl"; // Ensure this import is correct
import SeatBooking from "../features/Booking/pages/SelectSeat";
import Success from "../features/Booking/pages/Success";
import Cancle from "../features/Booking/pages/Cancle";

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
        path: "seatBooking",
        element: <SeatBooking />,
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
      {
        path: "success:id",
        element: <Success />,
      },
      {
        path: "cancle",
        element: <Cancle />,
      },
      {
        path: "*",
        element: <NoUrl />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router1} />;
};

export default AppRouter;
