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
    <div className="space-y-6">
      {/* Route Information */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <p className="text-sm font-medium text-primary">
          Journey:{" "}
          <span className="text-secondary font-semibold">
            {bookingDetails.startStation?.name} →{" "}
            {bookingDetails.endStation?.name}
          </span>
        </p>
      </div>

      {/* Train Selection */}
      <div className="space-y-3">
        <label className="text-lg font-semibold text-primary block">
          Available Trains:
        </label>

        {loading ? (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
              <p className="text-secondary font-medium">
                Loading available trains...
              </p>
            </div>
          </div>
        ) : availableTrains.length === 0 ? (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
            <div className="text-red-500 text-4xl mb-3">🚫</div>
            <p className="text-red-600 font-medium">
              {bookingDetails.startStation?.name &&
              bookingDetails.endStation?.name
                ? "No trains available for this route"
                : "Please select both start and end stations"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {availableTrains.map((train) => (
              <div
                key={train.TrainID}
                onClick={() =>
                  handleTrainChange({ target: { value: train.TrainID } })
                }
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                  bookingDetails.trainId === train.TrainID
                    ? "border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg"
                    : "border-gray-300 bg-white hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        bookingDetails.trainId === train.TrainID
                          ? "text-primary"
                          : "text-gray-800"
                      }`}
                    >
                      {train.Name || `Train ${train.TrainID}`}
                    </h3>
                    <p
                      className={`text-sm ${
                        bookingDetails.trainId === train.TrainID
                          ? "text-secondary"
                          : "text-gray-600"
                      }`}
                    >
                      Train ID: {train.TrainID}
                    </p>
                  </div>

                  {train.StartTime && train.EndTime && (
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          bookingDetails.trainId === train.TrainID
                            ? "text-primary"
                            : "text-gray-800"
                        }`}
                      >
                        {train.StartTime} - {train.EndTime}
                      </p>
                      <p
                        className={`text-sm ${
                          bookingDetails.trainId === train.TrainID
                            ? "text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        Departure - Arrival
                      </p>
                    </div>
                  )}

                  {bookingDetails.trainId === train.TrainID && (
                    <div className="ml-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                        ✓ Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Train Information */}
      {bookingDetails.trainId && (
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-800 mb-4 flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Train Selected
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Train:</span>
              <span className="text-green-800 font-semibold">
                {bookingDetails.trainName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Journey ID:</span>
              <span className="text-green-800 font-mono text-sm">
                {bookingDetails.journeyId}
              </span>
            </div>
            {bookingDetails.departureTime && (
              <div className="flex justify-between">
                <span className="font-medium text-green-700">Schedule:</span>
                <span className="text-green-800 font-semibold">
                  {bookingDetails.departureTime} - {bookingDetails.arrivalTime}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
        >
          ← Back to Stations
        </button>
        <button
          onClick={handleContinue}
          disabled={
            !bookingDetails.trainId || !bookingDetails.journeyId || loading
          }
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !bookingDetails.trainId || !bookingDetails.journeyId || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Loading...
            </span>
          ) : (
            "Continue to Class Selection →"
          )}
        </button>
      </div>
    </div>
  );
};
