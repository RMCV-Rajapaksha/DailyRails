import React, { useEffect, useState } from "react";
import { database, ref } from "../config/firebase";
import { onValue, off } from "firebase/database";
import InputField from "../../../components/InputField";
import axiosInstance from "../../../utils/axiosInstance";

function Map() {
  const [train, setTrain] = useState("");
  const [trains, setTrains] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    fetchTrains();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB9W4g53QUfZ50HcuXDhou3aT6iFM_Zf_M`;
    script.async = true;

    const initMap = () => {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          zoom: 15,
          center: { lat: 6.9334922999, lng: 79.85050639999 },
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ visibility: "on" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ visibility: "on" }, { color: "#000000" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ visibility: "on" }],
            },
          ],
        }
      );

      setMap(mapInstance);
    };

    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axiosInstance.get("/trains");
      if (response.data.success) {
        console.log("Trains fetched:", response.data.data);
        setTrains(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      // Add error handling UI if needed
    }
  };

  const startTrackingTrain = () => {
    if (!train || !train.trim()) return;

    // Clear previous tracking if exists
    if (unsubscribe) {
      unsubscribe();
    }

    setIsTracking(true);
    const trainRef = ref(database, `/trains/${train}/location`);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
      if (data?.latitude && data?.longitude) {
        const newLocation = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        };
        setLocation(newLocation);
      }
    };

    onValue(trainRef, handleData);
    setUnsubscribe(() => () => off(trainRef, handleData));
  };

  useEffect(() => {
    if (!location.lat || !location.lng || !map) return;

    map.setCenter(location);

    if (marker) {
      marker.setPosition(location);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: "https://img.icons8.com/fluency/48/train.png",
          scaledSize: new window.google.maps.Size(50, 50),
          rotation: 0,
        },
        title: "Train Location",
      });

      setMarker(newMarker);
    }
  }, [location, map, marker]);

  return (
    <>
      <main className="relative h-screen body-font font-body">
        <div className="absolute inset-0 bg-gray-300">
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
        <div className="container flex px-5 py-24 mx-auto">
          <div className="relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0">
            <h2 className="mb-1 text-lg font-medium text-primary title-font">
              Locate Your Train in Real-Time
            </h2>
            <p className="mb-5 leading-relaxed text-secondary-1">
              Stay ahead of your schedule with DailyRails your daily commute
              companion.
            </p>

            <div className="relative mb-4">
              <label
                htmlFor="train"
                className="text-sm leading-7 text-primary font-body"
              >
                Select a Train
              </label>
              <select
                id="train"
                value={train}
                onChange={(e) => setTrain(e.target.value)}
                className="w-full px-3 py-2 text-base leading-8 transition-colors duration-200 ease-in-out border rounded-sm outline-none text-secondary bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
              >
                <option value="">Select a train</option>
                {trains.map((trainItem) => (
                  <option key={trainItem.TrainID} value={trainItem.TrainID}>
                    {trainItem.Name} ({trainItem.TrainID})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={startTrackingTrain}
              disabled={!train}
              className={`px-6 py-2 text-lg text-white border-0 rounded-sm ${
                !train ? "bg-gray-400" : "bg-primary hover:bg-secondary"
              } focus:outline-none`}
              aria-label="Track Train"
            >
              {isTracking ? "Tracking..." : "Track Train"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Map;
