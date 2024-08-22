import React from "react";

import HeroTrain from "../assets/images/HeroTrain.png";
import GPS from "../assets/images/GPS.png";
import Schedule from "../assets/images/Schedule.png";
import Booking from "../assets/images/Booking.png";

import LostAndFound from "../assets/images/LostAndFound.png";

import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-white font-body">
        <div className="w-full overflow-hidden max-w-7xl ">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 bg-transparent md:w-1/2">
              <h1 className="mb-2 font-bold text-8xl text-navy-900 font-body text-primary">
                DailyRails
              </h1>
              <h2 className="mb-4 text-4xl font-bold text-navy-700">
                Navigate your day, one train at a time
              </h2>
              <p className="mb-4 text-xl text-secondary-1">
                Welcome to DailyRails, your ultimate solution for real-time
                train tracking across Sri Lanka. DailyRails enhances your
                commute with up-to-the-minute train locations, notifications for
                breakdowns and cancellations, detailed schedules, and predicted
                arrival times. Stay informed and plan your journeys with
                confidence. Features like online ticket booking make train
                travel more efficient and stress-free. Join us in transforming
                train commuting with DailyRails, making your travels smoother
                and more reliable nationwide.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="map"
                  className="px-6 py-2 text-white transition-colors rounded-sm bg-primary hover:bg-secondary-1 hover:bg-navy-800"
                >
                  Map
                </Link>
                <Link
                  to="schedule"
                  className="px-6 py-2 transition-colors bg-white border-2 rounded-sm text-navy-900 border-primary hover:bg-secondary-1"
                >
                  Schedule
                </Link>
              </div>
            </div>
            <div className="relative md:w-1/2">
              <div className="h-full ">
                <img
                  src={HeroTrain}
                  alt="Train illustration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
          <div className="order-2 hidden grid-cols-1 gap-4 mt-8 lg:order-1 md:grid">
            <img
              className="w-full mt-4 rounded-lg lg:mt-10 md:hidden "
              src={GPS}
              alt="office content 2"
            />
          </div>

          <div className="order-1 font-light lg:order-2 sm:text-lg ">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">
              Your Journey, Streamlined
            </h2>
            <p className="mb-4 text-xl text-secondary-1">
              Navigate your daily commute with precision using our Live Map
              feature. Experience real-time train tracking like never
              before-watch trains move along their routes, view current
              locations, and stay updated on any disruptions or blockages. Our
              interactive map offers a clear, intuitive interface to help you
              plan your journey, avoid delays, and make informed decisions on
              the go. With DailyRails, your train travel is always on track!
            </p>
          </div>
          <div className="order-1 order-2 grid-cols-1 gap-4 mt-8 md:grid lg:hidden">
            <img
              className="w-full mt-4 rounded-lg lg:mt-10"
              src={GPS}
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section class="bg-white ">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
          <div class="font-light  sm:text-lg ">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">
              Your Reliable Train Timetable
            </h2>
            <p class="mb-4 text-xl text-secondary">
              DailyRails' Timetable feature provides detailed and up-to-date
              train schedules across Sri Lanka. Users can easily search routes,
              view departure and arrival times, and find the best connections
              with an intuitive interface. Continuously updated for changes,
              including delays and cancellations, the Timetable ensures accurate
              information. Whether a daily commuter or occasional traveler,
              DailyRails makes train travel simpler and more reliable.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-8">
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={Schedule}
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
          <div className="order-2 hidden grid-cols-1 gap-4 mt-8 lg:order-1 md:grid">
            <img
              className="w-full mt-4 rounded-lg lg:mt-10 md:hidden"
              src={Booking}
              alt="office content 2"
            />
          </div>

          <div className="order-1 font-light text-gray-500 lg:order-2 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">
              Seamless Ticket Booking
            </h2>
            <p className="mb-4 text-xl text-secondary-1">
              Secure your seat with ease using our streamlined ticket booking
              system. Whether you're on the go or planning ahead, DailyRails
              makes purchasing your train tickets quick and hassle-free. Enjoy a
              seamless experience from your mobile app or website, and never
              miss a train again. Book your journey today and travel with
              confidence!
            </p>
          </div>
          <div className="order-1 order-2 grid-cols-1 gap-4 mt-8 md:grid lg:hidden">
            <img
              className="w-full mt-4 rounded-lg lg:mt-10"
              src={Booking}
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <section class="bg-white ">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">
              Lost & Found Hub
            </h2>
            <p class="mb-4 text-xl text-secondary-1">
              Lost something on your journey? Our Lost & Found Hub is here to
              help! Quickly report or search for lost items with ease. From
              misplaced belongings to found objects, our intuitive platform
              connects you with the right solutions, ensuring your lost items
              are reunited with you swiftly. DailyRails makes recovering your
              valuables straightforward and stress-free.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-8">
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src={LostAndFound}
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
