import React, { useEffect, useState } from "react";
import { database, ref } from "../config/firebase";
import { onValue, off } from "firebase/database";
import InputField from "../../../components/InputField";
import axiosInstance from "../../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

function Map() {
  const [trains, setTrains] = useState([]);
  const [selectedTrainId, setSelectedTrainId] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch trains when component mounts
  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/trains");
      if (response.data.success) {
        console.log("Trains fetched:", response.data.data);
        setTrains(response.data.data);
        toast.success("Train data loaded successfully");
      } else {
        // toast.error("Failed to load train data");
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch train data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      toast.info("Map initialized");
    };

    script.onload = initMap;
    script.onerror = () =>
      toast.error(
        "Failed to load Google Maps. Please check your internet connection."
      );
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getLocation = () => {
    if (!selectedTrainId) {
      toast.warning("Please select a train first");
      return;
    }

  
    const locationRef = ref(database, selectedTrainId);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
      if (data) {
        const newLocation = { lat: data.latitude, lng: data.longitude };
        setLocation(newLocation);
        toast.success("Location updated successfully");
      } else {
        console.log("No location data found for this train");
        toast.error("No location data available for this train at the moment");
      }
    };

    onValue(locationRef, handleData, (error) => {
      console.error("Firebase error:", error);
      toast.error(`Error retrieving location: ${error.message}`);
    });

    return () => {
      off(locationRef, handleData);
    };
  };

  useEffect(() => {
    if (!location.lat || !location.lng || !map) return;

    map.setCenter(location);

    if (marker) {
      marker.setPosition(location);
    } else {
      // Create a new marker with a train icon
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
      toast.info("Train location displayed on map");
    }
  }, [location, map, marker]);

  // Find the train name based on selected ID
  const getSelectedTrainName = () => {
    const selectedTrain = trains.find(
      (train) => train.TrainID === selectedTrainId
    );
    return selectedTrain ? selectedTrain.Name : "";
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
                value={selectedTrainId}
                onChange={(e) => setSelectedTrainId(e.target.value)}
                className="w-full px-3 py-2 text-base leading-8 transition-colors duration-200 ease-in-out border rounded-sm outline-none text-secondary bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
                disabled={loading}
              >
                <option value="">Select Train</option>
                {trains.map((train) => (
                  <option key={train.TrainID} value={train.TrainID}>
                    {train.Name} ({train.TrainID})
                  </option>
                ))}
              </select>
            </div>

            {selectedTrainId && (
              <div className="p-3 mb-4 rounded-sm bg-gray-50">
                <p className="text-sm text-secondary-1">
                  <strong>Selected:</strong> {getSelectedTrainName()}
                </p>
              </div>
            )}

            <button
              onClick={getLocation}
              disabled={!selectedTrainId || loading}
              className={`px-6 py-2 text-lg text-white border-0 rounded-sm ${
                !selectedTrainId || loading
                  ? "bg-gray-400"
                  : "bg-primary hover:bg-secondary"
              } focus:outline-none`}
              aria-label="Get Updates"
            >
              {loading ? "Loading..." : "Get Updates"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Map;
