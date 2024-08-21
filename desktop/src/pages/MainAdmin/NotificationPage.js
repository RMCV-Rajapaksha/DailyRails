import React, { useState } from "react";
import {
  FaInfoCircle,
  FaPencilAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "./components/SideBar";

const NotificationsPage = () => {
  const [formData, setFormData] = useState({
    id: null,
    username: "",
    title: "",
    description: "",
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Station Alert: Stay Informed on the Move!",
      content: "Never miss an update with our real-time station notifications!",
    },
    {
      id: 2,
      title: "Train Delay: Expect Delays on Line 3",
      content:
        "Due to track maintenance, expect delays on Line 3 for the next two hours.",
    },
    // Add more notifications here...
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setNotifications(
        notifications.map((notification) =>
          notification.id === formData.id
            ? {
                ...notification,
                title: formData.title,
                content: formData.description,
              }
            : notification
        )
      );
    } else {
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          title: formData.title,
          content: formData.description,
        },
      ]);
    }
    setFormData({ id: null, username: "", title: "", description: "" });
  };

  const handleEdit = (notification) => {
    setFormData({
      id: notification.id,
      username: "",
      title: notification.title,
      description: notification.content,
    });
  };

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-primary">Notifications</h1>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <form
              onSubmit={handleSubmit}
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded-sm shadow-md"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="username"
                >
                  To
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-sm shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full px-4 py-2 font-bold text-white rounded-sm bg-primary hover:bg-tertiary focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {formData.id ? "Update Notification" : "Submit Notification"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-2/3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded-sm shadow-md"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <FaInfoCircle className="mr-2 text-primary" />
                    <h2 className="text-xl font-bold">{notification.title}</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-primary hover:text-primary"
                      onClick={() => handleEdit(notification)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-base text-gray-700">
                  {notification.content}
                </p>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <nav className="inline-flex shadow rounded-sm-md">
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm-l-md hover:bg-gray-50">
                  <FaChevronLeft />
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-white border-t border-b border-gray-300 text-primary">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-sm-r-md hover:bg-gray-50">
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
