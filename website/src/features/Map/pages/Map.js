// import React, { useEffect, useState } from "react";
// import { database, ref } from "../firebase";
// import { onValue, off } from "firebase/database";

// function Map() {
//   const [train, setTrain] = useState("");
//   const [location, setLocation] = useState({ lat: null, lng: null });
//   const [path, setPath] = useState([]);
//   const [map, setMap] = useState(null);
//   const [polyline, setPolyline] = useState(null);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAr8aKdJM4aYjfOwVqP2wz9WC4vC0Qu05s";
//     script.async = true;

//     const initMap = () => {
//       const mapInstance = new window.google.maps.Map(
//         document.getElementById("map"),
//         {
//           zoom: 15,
//           center: { lat: 6.9334922999, lng: 79.85050639999 },
//           styles: [
//             {
//               featureType: "all",
//               elementType: "labels",
//               stylers: [{ visibility: "off" }],
//             },
//             {
//               featureType: "administrative",
//               elementType: "geometry",
//               stylers: [{ visibility: "off" }],
//             },
//             {
//               featureType: "landscape",
//               elementType: "geometry",
//               stylers: [{ visibility: "on" }],
//             },
//             {
//               featureType: "poi",
//               elementType: "geometry",
//               stylers: [{ visibility: "off" }],
//             },
//             {
//               featureType: "road",
//               elementType: "geometry",
//               stylers: [{ visibility: "off" }],
//             },
//             {
//               featureType: "transit.line",
//               elementType: "geometry",
//               stylers: [{ visibility: "on" }, { color: "#000000" }],
//             },
//             {
//               featureType: "water",
//               elementType: "geometry",
//               stylers: [{ visibility: "on" }],
//             },
//           ],
//         }
//       );

//       setMap(mapInstance);

//       const polylineInstance = new window.google.maps.Polyline({
//         map: mapInstance,
//         path: [],
//         strokeColor: "#111B47",
//         strokeOpacity: 1.0,
//         strokeWeight: 2,
//       });
//       setPolyline(polylineInstance);
//     };

//     script.onload = initMap;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const getLocation = () => {
//     setPath([]);
//     if (!train) return;

//     const locationRef = ref(database, train);

//     const handleData = (snapshot) => {
//       const data = snapshot.val();
//       console.log("Firebase Data:", data);
//       if (data) {
//         const newLocation = { lat: data.latitude, lng: data.longitude };
//         setLocation(newLocation);
//         setPath((prevPath) => [...prevPath, newLocation]);
//       }
//     };

//     onValue(locationRef, handleData);

//     return () => {
//       off(locationRef, handleData);
//     };
//   };

//   useEffect(() => {
//     if (!location.lat || !location.lng || !map || !polyline) return;

//     map.setCenter(location);

//     new window.google.maps.Marker({
//       position: location,
//       map: map,
//       title: "Train Location",
//     });

//     polyline.setPath(path);
//   }, [location, path, map, polyline]);
//   return (
//     <>
//       <main className="relative h-screen body-font font-body">
//         <div className="absolute inset-0 bg-gray-300">
//           <div id="map" style={{ width: "100%", height: "100%" }}></div>
//         </div>
//         <div className="container flex px-5 py-24 mx-auto">
//           <div className="relative z-10 flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0">
//             <h2 className="mb-1 text-lg font-medium text-primary title-font">
//               Locate Your Train in Real-Time
//             </h2>
//             <p className="mb-5 leading-relaxed text-secondary-1">
//               Stay ahead of your schedule with DailyRails your daily commute
//               companion.
//             </p>
//             <div className="relative mb-4">
//               <label
//                 htmlFor="train"
//                 className="text-sm leading-7 text-primary font-body"
//               >
//                 Name of the train or No
//               </label>
//               <input
//                 onChange={(e) => setTrain(e.target.value)}
//                 type="text"
//                 id="train"
//                 name="train"
//                 className="w-full px-3 py-1 text-base leading-8 transition-colors duration-200 ease-in-out border rounded-sm outline-none text-secondary bg-gray-50 border-secondary-1 focus:border-primary focus:ring-2 focus:ring-primary-200"
//               />
//             </div>

//             <button
//               onClick={getLocation}
//               className="px-6 py-2 text-lg text-white border-0 rounded-sm bg-primary focus:outline-none hover:bg-secondary"
//               aria-label="Get Updates"
//             >
//               Get Updates
//             </button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Map;

import React, { useEffect, useState } from "react";
import { database, ref } from "../config/firebase";
import { onValue, off } from "firebase/database";
import InputField from "../../../components/InputField";

function Map() {
  const [train, setTrain] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao`;
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
    };
  }, []);

  const getLocation = () => {
    if (!train) return;

    const locationRef = ref(database, train);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
      if (data) {
        const newLocation = { lat: data.latitude, lng: data.longitude };
        setLocation(newLocation);
      }
    };

    onValue(locationRef, handleData);

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
      // Create a new marker with an arrow icon
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: "https://img.icons8.com/fluency/48/train.png", // Replace with your arrow icon URL
          scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
          rotation: 0, // Replace with actual direction if available
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

            <InputField
              label="Name of the train or No"
              id="train"
              value={train}
              onChange={(e) => setTrain(e.target.value)}
              placeholder="Name of the train or No "
              required
            />

            <button
              onClick={getLocation}
              className="px-6 py-2 text-lg text-white border-0 rounded-sm bg-primary focus:outline-none hover:bg-secondary"
              aria-label="Get Updates"
            >
              Get Updates
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Map;
