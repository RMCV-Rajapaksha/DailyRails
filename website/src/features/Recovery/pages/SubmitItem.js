import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitItem } from "../../../store/actions/submitItemActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

const initialFormData = {
  Name: "",
  ItemType: "Lost",
  Title: "",
  Description: "",
  ContactNo: "",
};

function SubmitItem() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.items.isLoading);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleItemTypeChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ItemType: e.target.id,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = "Name is required.";
    if (!formData.Title.trim()) newErrors.Title = "Title is required.";
    if (!formData.Description.trim())
      newErrors.Description = "Description is required.";
    if (!formData.ContactNo.trim()) {
      newErrors.ContactNo = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.ContactNo)) {
      newErrors.ContactNo = "Enter a valid 10-digit contact number.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(submitItem(formData));
    setFormData(initialFormData);
    toast.success("Item submitted successfully!");
  };

  return (
    <>
      <div className="mt-28 mb-30 h-3/5 font-body">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            id="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          {errors.Name && <p className="text-sm text-red-500">{errors.Name}</p>}

          <InputField
            label="Title"
            id="Title"
            value={formData.Title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
          {errors.Title && (
            <p className="text-sm text-red-500">{errors.Title}</p>
          )}

          <InputField
            label="Description"
            id="Description"
            value={formData.Description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
          {errors.Description && (
            <p className="text-sm text-red-500">{errors.Description}</p>
          )}

          <InputField
            label="Contact Number"
            id="ContactNo"
            value={formData.ContactNo}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
          {errors.ContactNo && (
            <p className="text-sm text-red-500">{errors.ContactNo}</p>
          )}

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="Lost"
                type="radio"
                checked={formData.ItemType === "Lost"}
                onChange={handleItemTypeChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
              <label
                htmlFor="Lost"
                className="text-sm font-medium ms-2 text-primary"
              >
                Lost
              </label>
            </div>
            <div className="flex items-center h-5 ml-4">
              <input
                id="Found"
                type="radio"
                checked={formData.ItemType === "Found"}
                onChange={handleItemTypeChange}
                className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
                required
              />
              <label
                htmlFor="Found"
                className="text-sm font-medium ms-2 text-primary"
              >
                Found
              </label>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={
              "p-3 text-white rounded-sm bg-primary hover:bg-secondary"
            }
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default SubmitItem;
