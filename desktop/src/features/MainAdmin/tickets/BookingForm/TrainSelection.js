import React, { useState, useContext, useEffect } from "react";
import BookingContext from "../Context/BookingContext";
import apiService from "../../../../http/index";
import { toast } from "react-toastify";

export const TrainSelection = ({ onNextStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [availableTrains, setAvailableTrains] = useState([]);
  const [allJourneys, setAllJourneys] = useState([]);

  const handleTrainChange = (e) => {
    const selectedTrain = e.target.value;

    const matchingJourney = allJourneys.find(
      (journey) =>
        journey.StartPoint === bookingDetails.startStation.id &&
        journey.EndPoint === bookingDetails.endStation.id
    );

    if (matchingJourney) {
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        trainId: selectedTrain,
        journeyId: matchingJourney.JourneyID,
        price: matchingJourney.Price,
      }));
      onNextStep();
    } else {
      toast.error("No journey found for the selected stations.");
    }
  };

  const fetchJourneys = async () => {
    try {
      const response = await apiService.get("/api/journeys/all");
      console.log("Fetched journeys:", response.data);
      const journeys = response.data || [];
      setAllJourneys(journeys);
    } catch (error) {
      console.error("Error fetching journeys:", error);
      toast.error("Failed to fetch journey data.");
    }
  };

  const fetchTrains = async () => {
    try {
      const response = await apiService.get("/api/trains");
      const allTrains = response.data || [];

      const filteredTrains = allTrains.filter(
        (train) =>
          train.StartStations === bookingDetails.startStation?.id &&
          train.EndStations === bookingDetails.endStation?.id
      );

      setAvailableTrains(filteredTrains);

      if (filteredTrains.length > 0) {
        toast.success("Filtered trains loaded successfully!");
      } else {
        toast.error("No trains found between the selected stations.");
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      toast.error("Failed to fetch trains.");
    }
  };

  useEffect(() => {
    if (bookingDetails.startStation.name && bookingDetails.endStation.name) {
      fetchJourneys().then(fetchTrains);
    }
  }, [bookingDetails.startStation.name, bookingDetails.endStation.name]);

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-semibold text-gray-700">Select Train:</label>
      <select
        value={bookingDetails.trainId || ""}
        onChange={handleTrainChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a train</option>
        {availableTrains.map((train) => (
          <option key={train.TrainID} value={train.TrainID}>
            {train.TrainName || `Train ${train.TrainID}`}
          </option>
        ))}
      </select>
    </div>
  );
};
