const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");
const db = require("../../../models");
const Station = db.Station;
const Train = db.Train;
const StoppingPoint = db.StoppingPoint;

// Helper function to generate next station ID
const generateNextStationId = async () => {
  try {
    const lastStation = await Station.findOne({
      order: [["StationID", "DESC"]],
    });

    if (!lastStation) {
      // If no stations exist, start with STN0001
      return "STN0001";
    }

    // Extract the numeric part and increment
    const lastId = lastStation.StationID;
    const numericPart = parseInt(lastId.replace("STN", ""));
    const nextNumericPart = numericPart + 1;

    // Format the new ID with leading zeros
    return `STN${String(nextNumericPart).padStart(4, "0")}`;
  } catch (error) {
    throw new Error("Failed to generate station ID");
  }
};

// Modified create station function
const createStation = async (req, res) => {
  try {
    // Check if station name already exists
    const existingStation = await Station.findOne({
      where: {
        StationName: req.body.StationName,
      },
    });

    if (existingStation) {
      return res.status(400).json({
        success: false,
        message: "Station with this name already exists",
      });
    }

    // Generate the station ID
    const stationId = await generateNextStationId();

    // Create the station with generated ID
    const station = await Station.create({
      ...req.body,
      StationID: stationId,
    });

    res.status(201).json({
      success: true,
      message: "Station created successfully",
      data: station,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create station",
      error: error.message,
    });
  }
};

// Read all stations
const getAllStations = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const stations = await Station.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    res.status(200).send({
      totalItems: stations.count,
      totalPages: Math.ceil(stations.count / limit),
      currentPage: page,
      stations: stations.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a single station by ID
const getStationById = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).send();
    }
    res.status(200).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a station by ID
const updateStationById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "StationName",
    "StationID",
    "StationAddress",
    "StationLine",
    "ContactNumber",
  ]; // Add other fields as necessary
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).send();
    }

    updates.forEach((update) => (station[update] = req.body[update]));
    await station.save();
    res.status(200).send(station);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a station by ID
const deleteStationById = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).send();
    }
    await station.destroy();
    res.status(200).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStationSchedule = async (req, res) => {
  try {
    const { stationId } = req.params;

    // First, verify if the station exists
    const station = await Station.findByPk(stationId);
    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    // Get all trains that start or end at this station
    const directTrains = await Train.findAll({
      where: {
        [Op.or]: [{ StartStations: stationId }, { EndStations: stationId }],
      },
      include: [
        {
          model: Station,
          as: "startStation",
          attributes: ["StationName"],
        },
        {
          model: Station,
          as: "endStation",
          attributes: ["StationName"],
        },
      ],
    });

    // Get all stopping points for this station
    const stoppingPoints = await StoppingPoint.findAll({
      where: {
        StationID: stationId,
      },
      include: [
        {
          model: Train,
          as: "train",
          include: [
            {
              model: Station,
              as: "startStation",
              attributes: ["StationName"],
            },
            {
              model: Station,
              as: "endStation",
              attributes: ["StationName"],
            },
          ],
        },
      ],
    });

    // Format the response
    const schedule = {
      stationName: station.StationName,
      directTrains: directTrains.map((train) => ({
        trainId: train.TrainID,
        trainName: train.Name,
        isStarting: train.StartStations === stationId,
        isTerminating: train.EndStations === stationId,
        startStation: train.startStation?.StationName,
        endStation: train.endStation?.StationName,
        departureTime: train.StartTime,
        arrivalTime: train.EndTime,
      })),
      stoppingTrains: stoppingPoints.map((stop) => ({
        trainId: stop.train.TrainID,
        trainName: stop.train.Name,
        startStation: stop.train.startStation?.StationName,
        endStation: stop.train.endStation?.StationName,
        arrivalTime: stop.ArrivalTime,
        departureTime: stop.DepartureTime,
      })),
    };

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error("Error fetching station schedule:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching station schedule",
      error: error.message,
    });
  }
};

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStationById,
  deleteStationById,
  getStationSchedule,
};
