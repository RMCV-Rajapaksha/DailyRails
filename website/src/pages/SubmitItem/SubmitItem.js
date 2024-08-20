import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

function SubmitItem() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  return (
    <>
      <div className="mt-20 mb-20 font-body">
        <form className="max-w-sm mx-auto">
          <InputField
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <InputField
            label="Title"
            id="title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            required
          />
          <InputField
            label="Description"
            id="description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <InputField
            label="Contact Number"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact number"
            required
          />
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="lost"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
              <label
                htmlFor="lost"
                className="text-sm font-medium ms-2 text-primary"
              >
                Lost
              </label>
            </div>
            <div className="flex items-center h-5 ml-4">
              <input
                id="found"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
              <label
                htmlFor="found"
                className="text-sm font-medium ms-2 text-primary"
              >
                Found
              </label>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default SubmitItem;
