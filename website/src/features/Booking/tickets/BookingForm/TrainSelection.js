import React, { useState, useContext, useEffect } from "react";
import BookingContext from "../Context/BookingContext";
import apiService from "../../../../http/index";
import { toast } from "react-toastify";

export const TrainSelection = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [availableTrains, setAvailableTrains] = useState([]);
  const [allJourneys, setAllJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle train selection
  const handleTrainChange = (e) => {
    const selectedTrainId = e.target.value;

    // Find the selected train from available trains
    const selectedTrain = availableTrains.find(
      (train) => train.TrainID === selectedTrainId
    );

    // Find the matching journey based on start and end stations
    const matchingJourney = allJourneys.find(
      (journey) =>
        journey.StartPoint === bookingDetails.startStation.id &&
        journey.EndPoint === bookingDetails.endStation.id
    );

    console.log("Selected train:", selectedTrain);
    console.log("Matching journey:", matchingJourney);
    console.log("Start station ID:", bookingDetails.startStation.id);
    console.log("End station ID:", bookingDetails.endStation.id);

    if (selectedTrain) {
      const updatedBookingDetails = {
        ...bookingDetails,
        trainId: selectedTrainId,
        trainName: selectedTrain.Name || `Train ${selectedTrain.TrainID}`,
        departureTime: selectedTrain.StartTime,
        arrivalTime: selectedTrain.EndTime,
        // Ensure journeyId is always set
        journeyId:
          matchingJourney?.JourneyID ||
          `JRN_${selectedTrainId}_${bookingDetails.startStation.id}_${bookingDetails.endStation.id}`,
        // Keep the price from class selection or use journey price as fallback
        price: bookingDetails.price || matchingJourney?.Price || 0,
      };

      console.log("Updated booking details:", updatedBookingDetails);

      setBookingDetails(updatedBookingDetails);
    }
  };

  // Continue button handler - separated from selection
  const handleContinue = () => {
    if (bookingDetails.trainId) {
      // Validate that journeyId is present
      if (!bookingDetails.journeyId) {
        console.error("Missing journeyId when continuing");
        toast.error(
          "Journey information is missing. Please reselect your train."
        );
        return;
      }

      console.log("Continuing with booking details:", bookingDetails);
      onNextStep();
    } else {
      toast.error("Please select a train to continue");
    }
  };

  // Fetch all journeys
  const fetchJourneys = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/api/journeys/all");
      console.log("Fetched journeys:", response.data);
      const journeys = response.data || [];
      setAllJourneys(journeys);
      return journeys;
    } catch (error) {
      console.error("Error fetching journeys:", error);
      toast.error("Failed to fetch journey data.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch trains based on selected stations
  const fetchTrains = async () => {
    try {
      setLoading(true);

      // Check if both start and end station are selected
      if (!bookingDetails.startStation?.id || !bookingDetails.endStation?.id) {
        console.log("Missing station selection", bookingDetails);
        setAvailableTrains([]);
        return;
      }

      console.log(
        "Searching for trains between:",
        bookingDetails.startStation.name,
        bookingDetails.endStation.name
      );

      // Use the dedicated search endpoint
      const response = await apiService.post("/api/trains/search", {
        Location_1: bookingDetails.startStation.name,
        Location_2: bookingDetails.endStation.name,
      });

      console.log("Train search response:", response.data);

      // Check if response.data is already an array or needs to be extracted
      const trainsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      console.log("Processed train data:", trainsData);
      setAvailableTrains(trainsData);

      if (trainsData.length > 0) {
        toast.success(`Found ${trainsData.length} trains between stations`);
      } else {
        toast.error("No trains found between the selected stations.");
      }
    } catch (error) {
      console.error("Error searching for trains:", error);
      toast.error("Failed to fetch trains between stations.");
      setAvailableTrains([]);
    } finally {
      setLoading(false);
    }
  };

  // When station selection changes, fetch trains
  useEffect(() => {
    if (bookingDetails.startStation?.id && bookingDetails.endStation?.id) {
      console.log(
        "Stations selected, fetching trains:",
        bookingDetails.startStation.name,
        bookingDetails.endStation.name
      );

      // First fetch journeys, then fetch trains
      fetchJourneys().then(() => {
        fetchTrains();
      });
    } else {
      console.log("Waiting for station selection...");
    }
  }, [bookingDetails.startStation?.id, bookingDetails.endStation?.id]);

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">
          Journey: {bookingDetails.startStation?.name} to{" "}
          {bookingDetails.endStation?.name}
        </p>
      </div>

      <label className="mb-1 text-sm font-semibold text-gray-700">
        Select Train:
      </label>
      <select
        value={bookingDetails.trainId || ""}
        onChange={handleTrainChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading || availableTrains.length === 0}
      >
        <option value="">Select a train</option>
        {availableTrains.map((train) => (
          <option key={train.TrainID} value={train.TrainID}>
            {train.Name || `Train ${train.TrainID}`}
            {train.StartTime && train.EndTime
              ? ` (${train.StartTime} - ${train.EndTime})`
              : ""}
          </option>
        ))}
      </select>

      {loading && (
        <p className="mt-2 text-sm text-gray-500">
          Loading available trains...
        </p>
      )}
      {!loading && availableTrains.length === 0 && (
        <p className="mt-2 text-sm text-red-500">
          {bookingDetails.startStation?.name && bookingDetails.endStation?.name
            ? "No trains available for this route"
            : "Please select both start and end stations"}
        </p>
      )}

      {/* Show selected train and journey info */}
      {bookingDetails.trainId && (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <h4 className="font-medium">Selected Train:</h4>
          <p className="text-sm text-gray-600">
            Train: {bookingDetails.trainName}
          </p>
          <p className="text-sm text-gray-600">
            Journey ID: {bookingDetails.journeyId}
          </p>
          {bookingDetails.departureTime && (
            <p className="text-sm text-gray-600">
              Time: {bookingDetails.departureTime} -{" "}
              {bookingDetails.arrivalTime}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex space-x-4">
        <button
          onClick={onPreviousStep}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!bookingDetails.trainId || !bookingDetails.journeyId}
          className={`px-4 py-2 ${
            !bookingDetails.trainId || !bookingDetails.journeyId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
