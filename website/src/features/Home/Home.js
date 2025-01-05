import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import HeroTrain from "../../assets/images/HeroTrain.png";
import GPS from "../../assets/images/GPS.png";
import Schedule from "../../assets/images/Schedule.png";
import Booking from "../../assets/images/Booking.png";
import LostAndFound from "../../assets/images/LostAndFound.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const floatingAnimation = {
  animate: {
    y: [-8, 8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const FloatingImage = ({ src, alt, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      animate="animate"
      variants={floatingAnimation}
    >
      <img src={src} alt={alt} className={className} />
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate("/map");
  };

  const handleScheduleClick = () => {
    navigate("/schedule");
  };

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="px-4 py-12 bg-white md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-between max-w-6xl mx-auto md:flex-row">
          <motion.div className="mb-8 md:w-1/2 md:mb-0" {...fadeInLeft}>
            <motion.h1
              className="mb-4 text-4xl font-bold md:text-5xl text-primary"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              DailyRails
            </motion.h1>
            <motion.p
              className="mb-6 text-xl text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Navigate your day, one train at a time
            </motion.p>
            <motion.p
              className="mb-8 text-secondary-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Welcome to DailyRails, your ultimate solution for real-time train
              tracking across Sri Lanka. DailyRails enhances your commute with
              up-to-the-minute train locations, notifications for delays, and
              comprehensive journey planning tools.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                onClick={handleMapClick}
                className={
                  "p-3 text-white rounded-sm bg-primary hover:bg-secondary"
                }
              >
                Map
              </Button>
              <Button
                onClick={handleScheduleClick}
                className="!bg-transparent !text-primary border border-primary hover:!bg-primary hover:!text-white "
              >
                Schedule
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2" {...fadeInRight}>
            <FloatingImage
              src={HeroTrain}
              alt="Hero Train"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="px-4 py-16 bg-gray-50 md:px-8 lg:px-16">
        <div className="flex flex-col items-center max-w-6xl gap-12 mx-auto md:flex-row-reverse">
          <motion.div className="md:w-1/2" {...fadeInRight}>
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Your Journey, Streamlined
            </h2>
            <p className="text-secondary">
              Navigate your daily commute with precision using our Live Map
              feature. Experience real-time train locations, ETA updates, and
              smart route suggestions.
            </p>
          </motion.div>
          <motion.div className="md:w-1/2" {...fadeInLeft}>
            <FloatingImage src={GPS} alt="GPS Navigation" className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="px-4 py-16 bg-white md:px-8 lg:px-16">
        <div className="flex flex-col items-center max-w-6xl gap-12 mx-auto md:flex-row">
          <motion.div className="md:w-1/2" {...fadeInLeft}>
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Your Reliable Train Timetable
            </h2>
            <p className="text-secondary">
              DailyRails' Timetable feature provides detailed and up-to-date
              train schedules. Access comprehensive information about departure,
              arrival times, and find the best connections.
            </p>
          </motion.div>
          <motion.div className="md:w-1/2" {...fadeInRight}>
            <FloatingImage src={Schedule} alt="Schedule" className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="px-4 py-16 bg-gray-50 md:px-8 lg:px-16">
        <div className="flex flex-col items-center max-w-6xl gap-12 mx-auto md:flex-row-reverse">
          <motion.div className="md:w-1/2" {...fadeInRight}>
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Seamless Ticket Booking
            </h2>
            <p className="text-secondary">
              Secure your seat with ease using our streamlined ticket booking
              system. Whether you're on the go or planning ahead, DailyRails
              makes ticket reservations hassle-free.
            </p>
          </motion.div>
          <motion.div className="md:w-1/2" {...fadeInLeft}>
            <FloatingImage
              src={Booking}
              alt="Ticket Booking"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Lost & Found Section */}
      <section className="px-4 py-16 bg-white md:px-8 lg:px-16">
        <div className="flex flex-col items-center max-w-6xl gap-12 mx-auto md:flex-row">
          <motion.div className="md:w-1/2" {...fadeInLeft}>
            <h2 className="mb-4 text-3xl font-bold text-primary">
              Lost & Found Hub
            </h2>
            <p className="text-secondary">
              Lost something on your journey? Our Lost & Found Hub is here to
              help! Quickly report or search for lost items with ease.
            </p>
          </motion.div>
          <motion.div className="md:w-1/2" {...fadeInRight}>
            <FloatingImage
              src={LostAndFound}
              alt="Lost and Found"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
