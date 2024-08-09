import React, { useEffect, useState } from "react";
import { database } from "../firebase";

function Map() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const locationRef = database.ref("location");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data); // Log Firebase data
      if (data) {
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    };

    locationRef.on("value", handleData);

    // Clean up the listener on unmount
    return () => {
      locationRef.off("value", handleData);
    };
  }, []);

  const generateMapSrc = () => {
    const { latitude, longitude } = location;
    if (latitude && longitude) {
      return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    }
    // Default location or loading state
    return `https://maps.google.com/maps?q=0,0&z=1&output=embed`;
  };

  return (
    <>
      <main className="relative h-screen text-gray-600 body-font">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src={generateMapSrc()}
            style={{ border: 0 }}
          ></iframe>
        </div>
        <div className="container flex px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Feedback
            </h2>
            <p className="mb-5 leading-relaxed text-gray-600">
              We value your feedback to improve our services.
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="text-sm leading-7 text-primary font-body"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border rounded-sm outline-none bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="text-sm leading-7 text-primary font-body"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out border rounded-sm outline-none resize-none bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
              ></textarea>
            </div>
            <button
              className="px-6 py-2 text-lg text-white border-0 rounded-sm bg-primary focus:outline-none hover:bg-secondary"
              aria-label="Submit feedback"
            >
              Submit
            </button>
            <p className="mt-3 text-xs text-gray-500">
              Thank you for helping us improve DailyRails.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Map;
