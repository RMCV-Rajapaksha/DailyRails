import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const TrainScheduleTable = ({
  scheduleData,
  expandedTrain,
  toggleTrainDetails,
  tableVariants,
  rowVariants,
}) => (
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
              <td className="p-4 text-secondary-1">{train.StartStationName}</td>
              <td className="p-4 text-secondary-1">{train.EndStationName}</td>
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
);

export default TrainScheduleTable;
