// controllers/TrainController.js

const db = require("../models");
const { Train, StoppingPoint } = db;

const createTrain = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    // 1. Create the train record
    const {
      Name,
      StartStations,
      EndStations,
      StartTime,
      EndTime,
      stoppingPoints,
    } = req.body;

    const train = await Train.create(
      {
        Name,
        StartStations,
        EndStations,
        StartTime,
        EndTime,
      },
      { transaction: t }
    );

    // 2. Create stopping points with train ID
    if (stoppingPoints && stoppingPoints.length > 0) {
      const stoppingPointsWithTrainId = stoppingPoints.map((point) => ({
        ...point,
        TrainID: train.ID,
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithTrainId, {
        transaction: t,
      });
    }

    // 3. Commit transaction
    await t.commit();

    // 4. Fetch complete train data with stopping points
    const trainWithStops = await Train.findByPk(train.ID, {
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    return res.status(201).json({
      success: true,
      data: trainWithStops,
    });
  } catch (error) {
    // Rollback transaction on error
    await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Error creating train schedule",
      error: error.message,
    });
  }
};

// Get all trains with their stopping points
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.findAll({
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: trains,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching trains",
      error: error.message,
    });
  }
};

// Get single train by ID
const getTrainById = async (req, res) => {
  try {
    const train = await Train.findByPk(req.params.id, {
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: train,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching train",
      error: error.message,
    });
  }
};

// Delete train and its stopping points
const deleteTrain = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const train = await Train.findByPk(req.params.id);

    if (!train) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    await train.destroy({ transaction: t });
    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Train and stopping points deleted successfully",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Error deleting train",
      error: error.message,
    });
  }
};

module.exports = {
  createTrain,
  getAllTrains,
  getTrainById,
  deleteTrain,
};
