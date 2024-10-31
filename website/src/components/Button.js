import React from "react";
import { motion } from "framer-motion";

const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`p-3 text-white rounded-sm bg-primary ${className}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: "var(--secondary)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        opacity: { duration: 0.2 },
        y: { duration: 0.2 },
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
