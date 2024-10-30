// features/trains/controllers/trainsController.js
const Train = require("../models/trainModel");

exports.createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ error: "Failed to create train." });
  }
};

exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.findAll();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trains." });
  }
};

exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findByPk(req.params.id);
    if (train) {
      res.status(200).json(train);
    } else {
      res.status(404).json({ error: "Train not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch train." });
  }
};

exports.updateTrain = async (req, res) => {
  try {
    const [updated] = await Train.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTrain = await Train.findByPk(req.params.id);
      res.status(200).json(updatedTrain);
    } else {
      res.status(404).json({ error: "Train not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update train." });
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    const deleted = await Train.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Train not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete train." });
  }
};
