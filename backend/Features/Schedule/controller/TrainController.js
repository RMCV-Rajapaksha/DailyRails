// controllers/TrainController.js

const db = require("../../../models");
const { Train, StoppingPoint } = db;
// TrainController.js - Updated createTrain function
const createTrain = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const {
      Name,
      TrainID,
      StartStations,
      EndStations,
      StartTime,
      EndTime,
      stoppingPoints,
    } = req.body;

    const train = await Train.create(
      {
        Name,
        TrainID,
        StartStations, // Map to correct column name
        EndStations, // Map to correct column name
        StartTime,
        EndTime,
      },
      { transaction: t }
    );

    if (stoppingPoints && stoppingPoints.length > 0) {
      const stoppingPointsWithTrainId = stoppingPoints.map((point) => ({
        ...point,
        TrainID: train.ID,
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithTrainId, {
        transaction: t,
      });
    }

    await t.commit();

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
    await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Error creating train schedule",
      error: error.message || error, // Better error handling
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

const searchTrainsByLocation = async (req, res) => {
  try {
    const { StartLocation, EndLocation } = req.body;

    if (!StartLocation || !EndLocation) {
      return res.status(400).json({
        success: false,
        message: "Start and End locations are required",
      });
    }

    const trains = await Train.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          {
            // Direct trains
            [db.Sequelize.Op.and]: [{ StartLocation }, { EndLocation }],
          },
        ],
      },
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
          where: {
            // Check if either location is in stopping points
            [db.Sequelize.Op.or]: [
              { StationName: StartLocation },
              { StationName: EndLocation },
            ],
          },
          required: false, // LEFT JOIN to include trains even if no stopping points match
        },
      ],
    });

    if (!trains.length) {
      return res.status(404).json({
        success: false,
        message: "No trains found between these locations",
      });
    }

    return res.status(200).json({
      success: true,
      data: trains,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching trains",
      error: error.message,
    });
  }
};

// Add to exports
module.exports = {
  createTrain,
  getAllTrains,
  getTrainById,
  deleteTrain,
  searchTrainsByLocation, // Add new function to exports
};
