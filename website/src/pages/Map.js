import React, { useEffect, useState } from "react";
import { database, ref } from "../firebase";
import { onValue, off } from "firebase/database";

function Map() {
  const [train, setTrain] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getLocation = () => {
    const locationRef = ref(database, train);

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

    onValue(locationRef, handleData);

    // Clean up the listener on unmount
    return () => {
      off(locationRef, handleData);
    };
  };

  useEffect(() => {
    if (train) {
      getLocation();
    }
  }, [train]);

  const generateMapSrc = () => {
    const { latitude, longitude } = location;
    if (latitude && longitude) {
      return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    }
    return `https://maps.google.com/maps?q=0,0&z=1&output=embed`;
  };

  return (
    <>
      <main className="relative h-screen text-gray-600 body-font">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            title="map"
            scrolling="no"
            src={generateMapSrc()}
            style={{ border: 0 }}
          ></iframe>
        </div>
        <div className="container flex px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0">
            <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">
              Locate Your Train in Real-Time
            </h2>
            <p className="mb-5 leading-relaxed text-gray-600">
              Stay ahead of your schedule with DailyRails your daily commute
              companion.
            </p>
            <div className="relative mb-4">
              <label
                htmlFor="train"
                className="text-sm leading-7 text-primary font-body"
              >
                Name of the train or No
              </label>
              <input
                onChange={(e) => setTrain(e.target.value)}
                type="text"
                id="train"
                name="train"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border rounded-sm outline-none bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <button
              onClick={getLocation}
              className="px-6 py-2 text-lg text-white border-0 rounded-sm bg-primary focus:outline-none hover:bg-secondary"
              aria-label="Get Updates"
            >
              Get Updates
            </button>
            <p className="mt-3 text-xs text-gray-500"></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Map;
