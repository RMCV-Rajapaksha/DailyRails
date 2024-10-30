// features/trains/services/trainService.js
const Train = require("../models/trainModel");

const createTrain = async (trainData) => {
  return await Train.create(trainData);
};

const getAllTrains = async () => {
  return await Train.findAll();
};

const getTrainById = async (id) => {
  return await Train.findByPk(id);
};

const updateTrain = async (id, trainData) => {
  const [updated] = await Train.update(trainData, { where: { id } });
  return updated ? await Train.findByPk(id) : null;
};

const deleteTrain = async (id) => {
  return await Train.destroy({ where: { id } });
};

module.exports = { createTrain, getAllTrains, getTrainById, updateTrain, deleteTrain };
