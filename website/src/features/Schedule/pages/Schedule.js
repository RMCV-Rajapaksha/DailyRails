import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Train, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import Spinner from "../../../components/Loader"; // Assume you have a Spinner component
import { fetchTrainSchedule } from "../../../store/actions/trainSchedleActions";

const stations = [
  "Colombo Fort",
  "Maradana",
  "Anuradhapura",
  "Kelaniya",
  "Ragama",
  "Gampaha",
  "Veyangoda",
  "Ambepussa",
  "Polgahawela",
  "Rambukkana",
  "Peradeniya",
  "Kandy",
  "Gampola",
  "Nawalapitiya",
  "Hatton",
  "Nanu Oya",
  "Haputale",
  "Bandarawela",
  "Badulla",
  "Slave Island",
  "Kollupitiya",
  "Bambalapitiya",
  "Wellawatte",
  "Dehiwala",
  "Mount Lavinia",
  "Moratuwa",
  "Panadura",
  "Kalutara South",
  "Aluthgama",
  "Bentota",
  "Ambalangoda",
  "Hikkaduwa",
  "Galle",
  "Matara",
  "Vavuniya",
  "Kilinochchi",
  "Jaffna",
  "Chavakachcheri",
  "Kodikamam",
  "Elephant Pass",
  "Kankesanthurai",
  "Gal Oya Junction",
  "Polonnaruwa",
  "Batticaloa",
  "Trincomalee",
  "Negombo",
  "Chilaw",
  "Puttalam",
  "Avissawella",
  "Homagama",
  "Maharagama",
  "Nugegoda",
];

const TrainSchedule = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
  });

  const dispatch = useDispatch();
  const { scheduleData, isLoading, error } = useSelector(
    (state) => state.trainSchedule
  );
  const [expandedTrain, setExpandedTrain] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = () => {
    dispatch(fetchTrainSchedule(formData.startLocation, formData.endLocation));
  };

  const toggleTrainDetails = (trainID) => {
    setExpandedTrain(expandedTrain === trainID ? null : trainID);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="h-full p-4 mx-auto max-w-7xl font-body"
    >
      {/* Header Section */}
      <motion.div variants={containerVariants} className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary">Train Schedule</h1>
        <p className="text-gray-600">
          Find the best train routes and schedules
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        variants={containerVariants}
        className="mb-8 bg-white rounded-lg shadow-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
          {/* Start Location */}
          <motion.div
            variants={itemVariants}
            className="relative w-full md:w-1/3"
          >
            <label
              htmlFor="startLocation"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Start Location
            </label>
            <select
              id="startLocation"
              value={formData.startLocation}
              onChange={handleInputChange}
              className="w-full py-3 pl-10 pr-4 border rounded"
            >
              <option value="">Select Start Location</option>
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
            <MapPin
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </motion.div>

          {/* End Location */}
          <motion.div
            variants={itemVariants}
            className="relative w-full md:w-1/3"
          >
            <label
              htmlFor="endLocation"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              End Location
            </label>
            <select
              id="endLocation"
              value={formData.endLocation}
              onChange={handleInputChange}
              className="w-full py-3 pl-10 pr-4 border rounded"
            >
              <option value="">Select End Location</option>
              {stations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
            <Train
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </motion.div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="text-white rounded-sm hover:bg-secondary"
          >
            Search
          </Button>
        </div>
      </motion.div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}

      {/* Error Message */}
      {error && <div className="my-4 text-center text-red-500">{error}</div>}

      {/* Results Table */}
      {!isLoading && scheduleData.length > 0 && (
        <motion.div
          variants={tableVariants}
          className="overflow-x-auto bg-white rounded-lg shadow-sm"
        >
          <table className="w-full">
            <thead>
              <motion.tr variants={rowVariants} className="bg-[#E5F0F0]">
                <th className="p-4 text-left text-primary">#</th>
                <th className="p-4 text-left text-primary">TRAIN NAME</th>
                <th className="p-4 text-left text-primary">START STATION</th>
                <th className="p-4 text-left text-primary">END STATION</th>
                <th className="p-4 text-left text-primary">DEPARTS</th>
                <th className="p-4 text-left text-primary">ARRIVES</th>
                <th className="p-4 text-left text-primary">DETAILS</th>
              </motion.tr>
            </thead>
            <tbody>
              {scheduleData.map((train, index) => (
                <React.Fragment key={train.TrainID}>
                  <motion.tr
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                    whileHover={{ scale: 1.005, backgroundColor: "#F8FAFC" }}
                  >
                    <td className="p-4 text-secondary-1">{train.TrainID}</td>
                    <td className="p-4 text-secondary-1">{train.Name}</td>
                    <td className="p-4 text-secondary-1">
                      {train.StartStationName}
                    </td>
                    <td className="p-4 text-secondary-1">
                      {train.EndStationName}
                    </td>
                    <td className="p-4 text-secondary-1">{train.StartTime}</td>
                    <td className="p-4 text-secondary-1">{train.EndTime}</td>
                    <td className="p-4 text-secondary-1">
                      <button
                        onClick={() => toggleTrainDetails(train.TrainID)}
                        className="flex items-center text-primary"
                      >
                        {expandedTrain === train.TrainID ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </td>
                  </motion.tr>
                  {expandedTrain === train.TrainID && (
                    <motion.tr
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50"
                    >
                      <td colSpan="7" className="p-4">
                        <div className="p-4 bg-white rounded-lg shadow-inner">
                          <h3 className="mb-2 text-lg font-bold text-primary">
                            Stopping Points
                          </h3>
                          <table className="w-full">
                            <thead>
                              <tr className="bg-[#E5F0F0]">
                                <th className="p-2 text-left text-primary">
                                  Station Name
                                </th>
                                <th className="p-2 text-left text-primary">
                                  Arrival Time
                                </th>
                                <th className="p-2 text-left text-primary">
                                  Departure Time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {train.stoppingPoints.map((point) => (
                                <tr key={point.PointID} className="border-b">
                                  <td className="p-2 text-secondary-1">
                                    {point.StationName}
                                  </td>
                                  <td className="p-2 text-secondary-1">
                                    {point.ArrivalTime}
                                  </td>
                                  <td className="p-2 text-secondary-1">
                                    {point.DepartureTime}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrainSchedule;