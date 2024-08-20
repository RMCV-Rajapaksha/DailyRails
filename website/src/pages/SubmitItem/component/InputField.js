// src/components/InputField.js
import React from "react";

const TextAreaField = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) => {
  return (
    <div className={`w-full px-3 mb-5 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm text-primary font-body">
        {label}
      </label>
      <textarea
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
      />
    </div>
  );
};

export default InputField;
