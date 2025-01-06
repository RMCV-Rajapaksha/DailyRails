import React from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

const ItemCard = ({ title, description, date, contactNo }) => {
  // Animation variants for the card
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      rotate: -45,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="p-6 bg-white border rounded-sm border-secondary"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <div className="flex items-start space-x-3">
        <motion.div className="flex-shrink-0" variants={iconVariants}>
          <Info className="w-6 h-6 text-tertiary" />
        </motion.div>
        <motion.div className="flex-1" variants={contentVariants}>
          <motion.h2
            className="mb-2 text-xl font-semibold text-secondary-1"
            variants={contentVariants}
          >
            {title}
          </motion.h2>
          <motion.p className="mb-4 text-secondary" variants={contentVariants}>
            {description}
          </motion.p>
          <motion.p
            className="text-sm text-left text-gray-500"
            variants={contentVariants}
          >
            {contactNo}
          </motion.p>
          <motion.p
            className="text-sm text-right text-gray-500"
            variants={contentVariants}
          >
            <p>{new Date(date).toLocaleDateString()}</p>
          </motion.p>
          <motion.p
            className="text-sm text-right text-gray-500"
            variants={contentVariants}
          ></motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
