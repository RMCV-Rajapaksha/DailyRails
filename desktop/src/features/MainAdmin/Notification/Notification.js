import React, { useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaPencilAlt,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaBullhorn
} from "react-icons/fa";
import apiService from "../../../http";
import { toast } from "react-toastify";

const Notifications = () => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    announcementID: null,
    announcementTo: "",
    title: "",
    description: "",
  });

  const [notifications, setNotifications] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const newForm = {
      ...formData,
      AnnouncementTo: formData.announcementTo,
      Title: formData.title,
      Description: formData.description,
      
    };
     console.log(newForm);
    try {

      if(edit){
        await apiService.put(`/api/announcements/${formData.announcementID}`, newForm);
        toast.success("Notification updated successfully!");
        await fetchNotifications();
        setEdit(false);
        return;
      }else{
        await apiService.post("/api/announcements/", newForm);
        console.log(formData);
        toast.success("Notification submitted successfully!");
        await fetchNotifications();
      }
     
  
      // setNotifications([
      //   ...notifications,
      //   {
      //     AnnouncementTo: formData.announcementTo,
      //     Title: formData.title,
      //     Description: formData.description,
      //   },
      // ]);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit notification!");
    }

    setFormData({ announcementID: null, announcementTo: "", title: "", description: "" });
  };


  const fetchNotifications = async () => {

    try {
      const response = await apiService.get("/api/announcements/");
      setNotifications(response.announcements.reverse());
    
      console.log("Notifications fetched successfully!");

      toast.success("Notifications fetched successfully!");
    } catch (error) {
      console.error("Failed to fetch notifications. Please try again.");
      toast.error("Failed to fetch notifications. Please try again.");
    }
  };

  useEffect(() => {
    
    return () => {
      fetchNotifications();
     
    }
  }, []);

  const handleEdit = (id) => {
    const notification = notifications.find((notif) => notif.AnnouncementID === id);
    if (notification) {
      setEdit(true);

      setFormData({
        announcementID: notification.AnnouncementID,
        announcementTo: notification.AnnouncementTo,
        title: notification.Title,
        description: notification.Description,
      });
    }
  };
  

  const handleDelete = async (id) => {
     try {
      await apiService.delete(`/api/announcements/${id}`);
      toast.success("Notification deleted successfully!");
      await fetchNotifications();

    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification!");
    }


  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-bold text-primary">Notifications</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full md:w-1/3">
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white rounded-md shadow-md"
            >
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                {formData.announcementTo ? "Edit Notification" : "Create Notification"}
              </h2>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="announcementTo"
                >
                  To
                </label>
                <input
                  className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="announcementTo"
                  type="text"
                  placeholder="AnnouncementTo"
                  name="announcementTo"
                  value={formData.announcementTo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  id="description"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary"
                type="submit"
              >
                {formData.announcementID ? "Update Notification" : "Submit Notification"}
              </button>
            </form>
          </div>

          {/* Notifications List Section */}
          <div className="w-full md:w-2/3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.AnnouncementID}
                  className="p-6 mb-4 bg-white rounded-md shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                    <h2 className="flex items-center mb-2 text-xl font-bold text-red-900">
                        <FaBullhorn className="mr-2" />
                        {notification.AnnouncementTo}
                      </h2>
                      <h2 className="flex items-center mb-2 text-xl font-bold text-primary">
                        <FaInfoCircle className="mr-2" />
                        {notification.title}
                        
                      </h2>
                    
                      <p className="text-gray-700">{notification.Description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-primary hover:text-primary-dark"
                        onClick={() => handleEdit(notification.AnnouncementID)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(notification.AnnouncementID)}

                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notifications available.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <nav className="inline-flex shadow rounded-md">
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                  <FaChevronLeft />
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-white border-t border-b border-gray-300 text-primary">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
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

export default Notifications;
