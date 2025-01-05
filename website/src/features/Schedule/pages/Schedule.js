import React, { useState } from "react";
import { MapPin, Train, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

const TrainSchedule = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    date: "",
  });

  const [scheduleData] = useState([
    {
      id: 1,
      trainName:
        "1008 Intercity Express - Badulla - Colombo Fort 10:15 - 21:10",
      departs: "10:15",
      arrives: "21:10",
      class: "Observation Saloon",
      available: 14,
      price: "3000 LKR",
    },
    {
      id: 2,
      trainName: "1046 Night Mail - Badulla - Colombo Fort 18:00 - 05:40",
      departs: "02:00",
      arrives: "22:00",
      class: "Second Class Sleeperetts",
      available: 5,
      price: "5000 LKR",
    },
  ]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Search with:", formData);
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
      {/* Search Section */}
      <motion.div
        variants={containerVariants}
        className="mb-8 bg-white rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-4">
          {/* Start Location */}
          <motion.div variants={itemVariants} className="relative">
            <InputField
              label="Start Location"
              id="startLocation"
              value={formData.startLocation}
              onChange={handleInputChange}
              placeholder="From"
              className="mb-0"
            />
            <MapPin
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </motion.div>

          {/* End Location */}
          <motion.div variants={itemVariants} className="relative">
            <InputField
              label="End Location"
              id="endLocation"
              value={formData.endLocation}
              onChange={handleInputChange}
              placeholder="To"
              className="mb-0"
            />
            <Train
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </motion.div>

          {/* Search Button */}
          <motion.div
            variants={itemVariants}
            className="flex items-end pb-2.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleSearch}
              className="text-white rounded-sm hover:bg-secondary"
            >
              Search
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Results Table */}
      <motion.div
        variants={tableVariants}
        className="overflow-x-auto bg-white rounded-lg shadow-sm"
      >
        <table className="w-full">
          <thead>
            <motion.tr variants={rowVariants} className="bg-[#E5F0F0]">
              <th className="w-8 p-4 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left text-primary">#</th>
              <th className="p-4 text-left text-primary">TRAIN NAME</th>
              <th className="p-4 text-left text-primary">DEPARTS</th>
              <th className="p-4 text-left text-primary">ARRIVES</th>
              <th className="p-4 text-left text-primary">CLASS</th>
              <th className="p-4 text-left text-primary">AVAILABLE</th>
              <th className="p-4 text-left text-primary">PRICE</th>
            </motion.tr>
          </thead>
          <tbody>
            {scheduleData.map((train, index) => (
              <motion.tr
                key={train.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50"
                whileHover={{ scale: 1.005, backgroundColor: "#F8FAFC" }}
              >
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4 text-secondary-1">{train.id}</td>
                <td className="p-4 text-secondary-1">{train.trainName}</td>
                <td className="p-4 text-secondary-1">{train.departs}</td>
                <td className="p-4 text-secondary-1">{train.arrives}</td>
                <td className="p-4 text-secondary-1">{train.class}</td>
                <td className="p-4 text-secondary-1">{train.available}</td>
                <td className="p-4 text-secondary-1">{train.price}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default TrainSchedule;
