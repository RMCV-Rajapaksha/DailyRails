import React from "react";
import logo from "../../../assets/images/Logo-1.png";
import { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    jobRole: "Station Admin",
    id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your signup logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-body">
      <div className="w-full max-w-md p-8 bg-white rounded-sm shadow-md font-body">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="DailyRails Logo" className="h-16" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-primary font-body">
          Signup to DailyRails
        </h2>
        <form onSubmit={handleSubmit} className="font-body">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-bold text-primary font-body"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-primary font-body"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobRole"
              className="block mb-2 text-sm font-bold text-primary font-body"
            >
              Job Role
            </label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              placeholder="Station Admin"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-bold text-primary font-body"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="ID"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary font-body"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 font-body"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
