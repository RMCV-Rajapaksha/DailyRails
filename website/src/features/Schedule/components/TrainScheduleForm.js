import React from "react";
import { MapPin, Train } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../components/Button";

const TrainScheduleForm = ({
  formData,
  handleInputChange,
  handleSearch,
  stations,
  itemVariants,
}) => (
  <motion.div
    variants={itemVariants}
    className="mb-8 bg-white rounded-lg shadow-sm"
  >
    <div className="flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
      {/* Start Location */}
      <motion.div variants={itemVariants} className="relative w-full md:w-1/3">
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
      <motion.div variants={itemVariants} className="relative w-full md:w-1/3">
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
);

export default TrainScheduleForm;
