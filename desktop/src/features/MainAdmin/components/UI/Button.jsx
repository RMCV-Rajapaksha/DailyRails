import React from "react";

const Button = ({ handleClick, className, text, disabled = false }) => {
    return (
        <button
            onClick={(e) => handleClick(e.target.value)}
            className={
                "border-2  px-12 py-2 font-semibold bg-secondary text-white" +
                "  hover:bg-primary  cursor-pointer " +
                "rounded-md mb-4 " +
                className
            }
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
