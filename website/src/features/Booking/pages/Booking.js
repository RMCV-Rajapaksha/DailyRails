import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

import train_01 from "../../../assets/images/train_01.jpg";
import train_02 from "../../../assets/images/train_02.jpg";
import train_03 from "../../../assets/images/train_03.jpg";
import BookingPage from "../tickets/BookingPage";

const images = [train_01, train_02, train_03];

function Booking() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(0);

  const reset = () => {
    setFrom("");
    setTo("");
    setDate("");
    setSeats(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <>
      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative h-screen overflow-hidden text-white bg-gradient-to-r font-body"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={images[currentImageIndex]}
              alt="Background Image"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative z-10 flex flex-col items-start justify-center mx-8 mt-48 lg:mx-28 lg:mt-48 h-1/2 p-1/4"
          variants={heroVariants}
        >
          <motion.h1
            variants={textVariants}
            className="mb-4 text-6xl font-bold leading-tight text-left"
          >
            DailyRails
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="mb-8 text-lg text-left text-gray-300"
          >
            Online Train Seats Reservation
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Form */}
      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={formContainerVariants}
        className="flex items-center justify-center"
      >
        <form className="w-full max-w-lg p-5">
          <motion.div variants={formItemVariants}>
            <InputField
              label="From"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter departure station"
              required
            />
          </motion.div>

          <motion.div variants={formItemVariants}>
            <InputField
              label="To"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter destination station"
              required
            />
          </motion.div>

          <motion.div variants={formItemVariants}>
            <InputField
              label="Date"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={formItemVariants}>
            <InputField
              label="Seats"
              type="number"
              id="seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="Enter number of seats"
              required
            />
          </motion.div>

          <motion.div className="flex gap-2 mt-4" variants={formItemVariants}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                type="submit"
                className="p-3 text-white rounded-sm bg-primary hover:bg-secondary"
              >
                Submit
              </Button>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                type="reset"
                onClick={reset}
                className={
                  "p-3 text-white rounded-sm bg-primary hover:bg-secondary"
                }
              >
                Reset
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div> */}

      <BookingPage/>
    </>
  );
}

export default Booking;
