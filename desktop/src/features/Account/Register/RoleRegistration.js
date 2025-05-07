import React, { useState } from "react";
import Joi from "joi";
import { Input } from "../../MainAdmin/components/UI/Input";
import apiService from "../../../http";
import { toast } from "react-toastify";

const RoleRegistration = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    JobTitle: "",
  });

  const [errors, setErrors] = useState({});

  const roles = ["MainAdmin", "StationAdmin", "Counter", "TrainDriver Staff"]; // Predefined roles

  const inputDataStructure = {
    Name: {
      key: "Name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      data: "",
      validation: Joi.string().required().messages({
        "string.empty": "Name should not be empty",
        "any.required": "Name is required",
      }),
    },
    Email: {
      key: "Email",
      type: "email",
      label: "Email",
      placeholder: "Enter Email",
      data: "",
      validation: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.empty": "Email should not be empty",
          "any.required": "Email is required",
        }),
    },
    Password: {
      key: "Password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
      data: "",
      validation: Joi.string().required(),
    },
    JobTitle: {
      key: "JobTitle",
      type: "select",
      label: "Job Title",
      placeholder: "Select a Role",
      data: "",
      validation: Joi.string().required().messages({
        "string.empty": "Job Title should not be empty",
        "any.required": "Job Title is required",
      }),
    },
  };

  const [inputs, setInputs] = useState(inputDataStructure);

  const handleChange = (input) => {
    let input_list = { ...inputs };
    input_list[inputs.key] = input;
    setInputs(input_list);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.Name = inputs.Name.data;
    formData.Email = inputs.Email.data;
    formData.Password = inputs.Password.data;
    formData.JobTitle = inputs.JobTitle.data;

    console.log("Form Data Submitted:", formData);

    // Send the form data to the server
    try {
      const response = await apiService.post("/api/admin/register", formData);
      toast.success("Role registered successfully!");
      console.log("Form datar:", formData);
    } catch (error) {
      toast.error(error || "An error occurred. Please try again.");
      console.error(error);
      setErrors(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }

    setInputs(inputDataStructure);
    setFormData({
      Name: "",
      Email: "",
      Password: "",
      JobTitle: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Role Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              input={inputs.Name || ""}
              handleChange={handleChange}
              labelClassName={inputs.Name}
            />
            <Input
              input={inputs.Email || ""}
              handleChange={handleChange}
              labelClassName={inputs.Email}
            />
            <Input
              input={inputs.Password || ""}
              handleChange={handleChange}
              labelClassName={inputs.Password}
            />
            <Input
              input={inputs.JobTitle || ""}
              handleChange={handleChange}
              labelClassName={inputs.JobTitle}
              options={roles}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Register Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleRegistration;
