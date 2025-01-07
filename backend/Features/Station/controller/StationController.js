const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models");
const Station = db.Station;

// Create a new station
const createStation = async (req, res) => {
  try {
    const existingStation = await Station.findOne({
      where: { StationName: req.body.StationName },
    });
    if (existingStation) {
      return res.status(400).send({ message: "Station already exists" });
    }

    const station = await Station.create(req.body);
    res.status(201).send(station);
  } catch (error) {
    res.status(400).send(error);
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

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStationById,
  deleteStationById,
};
