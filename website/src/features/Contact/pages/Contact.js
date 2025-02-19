import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button";

function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    NIC: "",
    Type: "",
    Description: "",
    ClosestStation: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.Name) {
      newErrors.Name = "Name is required";
    } else if (formData.Name.length > 20) {
      newErrors.Name = "Name must not exceed 20 characters";
    }

    // NIC validation
    if (!formData.NIC) {
      newErrors.NIC = "NIC No is required";
    } else if (formData.NIC.length > 20) {
      newErrors.NIC = "NIC must not exceed 20 characters";
    }

    // Type validation
    if (!formData.Type) {
      newErrors.Type = "Incident type is required";
    } else if (formData.Type.length > 50) {
      newErrors.Type = "Type must not exceed 50 characters";
    }

    // Description validation
    if (!formData.Description) {
      newErrors.Description = "Description is required";
    } else if (formData.Description.length > 1000) {
      newErrors.Description = "Description must not exceed 1000 characters";
    }

    // Station validation
    if (!formData.ClosestStation) {
      newErrors.ClosestStation = "Nearest station is required";
    } else if (formData.ClosestStation.length > 50) {
      newErrors.ClosestStation = "Station name must not exceed 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/reports",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Report submitted successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Please check the form for errors");
      } else {
        toast.error(error.response?.data?.message || "Failed to submit report");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      Name: "",
      NIC: "",
      Type: "",
      Description: "",
      ClosestStation: "",
    });
    setErrors({});
  };

  return (
    <div className="mt-20 mb-20 font-body">
      <ToastContainer />
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="Name"
            className="block mb-2 text-sm text-primary font-body"
          >
            Name
          </label>
          <input
            name="Name"
            onChange={handleChange}
            value={formData.Name}
            type="text"
            id="Name"
            maxLength={20}
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            placeholder="John Doe"
          />
          {errors.Name && (
            <p className="mt-1 text-xs text-red-500">{errors.Name}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="NIC"
            className="block mb-2 text-sm text-primary font-body"
          >
            NIC No
          </label>
          <input
            name="NIC"
            onChange={handleChange}
            value={formData.NIC}
            type="text"
            id="NIC"
            maxLength={20}
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
          />
          {errors.NIC && (
            <p className="mt-1 text-xs text-red-500">{errors.NIC}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="Type"
            className="block mb-2 text-sm text-primary font-body"
          >
            Type of Incident Reported
          </label>
          <textarea
            name="Type"
            onChange={handleChange}
            value={formData.Type}
            id="Type"
            maxLength={50}
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
          />
          {errors.Type && (
            <p className="mt-1 text-xs text-red-500">{errors.Type}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="Description"
            className="block mb-2 text-sm text-primary font-body"
          >
            Problem Description
          </label>
          <textarea
            name="Description"
            onChange={handleChange}
            value={formData.Description}
            id="Description"
            maxLength={1000}
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5 h-24"
          />
          {errors.Description && (
            <p className="mt-1 text-xs text-red-500">{errors.Description}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="ClosestStation"
            className="block mb-2 text-sm text-primary font-body"
          >
            Nearest Railway Station
          </label>
          <input
            name="ClosestStation"
            onChange={handleChange}
            value={formData.ClosestStation}
            id="ClosestStation"
            maxLength={50}
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
          />
          {errors.ClosestStation && (
            <p className="mt-1 text-xs text-red-500">{errors.ClosestStation}</p>
          )}
        </div>

        <Button
          type="submit"
          className="p-3 mr-2 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Report
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="p-3 text-white rounded-sm bg-primary hover:bg-secondary"
        >
          Reset
        </Button>
      </form>
    </div>
  );
}

export default Contact;
