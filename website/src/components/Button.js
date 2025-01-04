import React from "react";
import { motion } from "framer-motion";

const Button = ({
  type = "button",
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`p-3 text-white rounded-sm bg-primary ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      whileHover={{
        scale: 1.05,
        backgroundColor: "bg-primary",
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
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
