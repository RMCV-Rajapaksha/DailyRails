import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import TrainScheduleForm from "../components/TrainScheduleForm";
import TrainScheduleTable from "../components/TrainScheduleTable";
import LoadingSpinner from "../../../components/Loader";
import { fetchTrainSchedule } from "../../../store/actions/trainSchedleActions";
import {
  containerVariants,
  itemVariants,
  tableVariants,
  rowVariants,
} from "../utils/animationVariants";

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
      <TrainScheduleForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        stations={stations}
        itemVariants={itemVariants}
      />

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Error Message */}
      {error && <div className="my-4 text-center text-red-500">{error}</div>}

      {/* Results Table */}
      {!isLoading && scheduleData.length > 0 && (
        <TrainScheduleTable
          scheduleData={scheduleData}
          expandedTrain={expandedTrain}
          toggleTrainDetails={toggleTrainDetails}
          tableVariants={tableVariants}
          rowVariants={rowVariants}
        />
      )}
    </motion.div>
  );
};

export default TrainSchedule;
