const { Sequelize, DataTypes, Op } = require("sequelize");
const db = require("../../../models");
const StoppingPoint = db.StoppingPoint;
const Train = db.Train;
const Station = db.Station;

// Modified createTrain function
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

    // Check if train with this ID already exists
    const existingTrain = await Train.findByPk(TrainID);
    if (existingTrain) {
      return res.status(400).json({
        success: false,
        message: "Train with this ID already exists",
      });
    }

    const train = await Train.create(
      {
        Name,
        TrainID,
        StartStations,
        EndStations,
        StartTime,
        EndTime,
      },
      { transaction: t }
    );

    if (stoppingPoints && stoppingPoints.length > 0) {
      const stoppingPointsWithTrainId = stoppingPoints.map((point, index) => ({
        ...point,
        PointID: `SP${TrainID}${String(index + 1).padStart(2, "0")}`,
        TrainID: train.TrainID,
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithTrainId, {
        transaction: t,
      });
    }

    await t.commit();

    const trainWithStops = await Train.findByPk(train.TrainID, {
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

const editTrain = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { id } = req.params;
    console.log("Edit Train Request ID:", id);

    const {
      Name,
      TrainID,
      StartStations,
      EndStations,
      StartTime,
      EndTime,
      stoppingPoints,
    } = req.body;

    // Find the existing train
    const train = await Train.findByPk(id, { transaction: t });

    if (!train) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    // Update train details
    await train.update(
      {
        Name,
        TrainID,
        StartStations,
        EndStations,
        StartTime,
        EndTime,
      },
      { transaction: t }
    );

    // Handle stopping points
    if (stoppingPoints && Array.isArray(stoppingPoints)) {
      // Remove existing stopping points
      await StoppingPoint.destroy({
        where: { TrainID: train.TrainID }, // Changed from train.ID
        transaction: t,
      });

      // Add new stopping points with generated PointIDs
      const stoppingPointsWithIds = stoppingPoints.map((point, index) => ({
        ...point,
        PointID: `SP${train.TrainID}${String(index + 1).padStart(2, "0")}`,
        TrainID: train.TrainID, // Changed from train.ID
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithIds, {
        transaction: t,
      });
    }

    await t.commit();

    // Fetch updated train with stopping points
    const updatedTrain = await Train.findByPk(train.TrainID, {
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Train updated successfully",
      data: updatedTrain,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error editing train:", error);
    return res.status(500).json({
      success: false,
      message: "Error editing train schedule",
      error: error.message,
    });
  }
};

const getTrainsBetweenStations = async (req, res) => {
  const { Location_1, Location_2 } = req.body;

  try {
    // Check if the stations are available in the Station table
    const station1 = await Station.findOne({
      where: { StationName: Location_1 },
    });
    const station2 = await Station.findOne({
      where: { StationName: Location_2 },
    });

    if (!station1 || !station2) {
      return res
        .status(404)
        .json({ message: "One or both stations not found" });
    }

    // Get the StationID for both stations
    const station1ID = station1.StationID;
    const station2ID = station2.StationID;

    // Search the StoppingPoint table for entries with the same TrainID that match the StationID of both stations
    const stoppingPoints1 = await StoppingPoint.findAll({
      where: { StationID: station1ID },
    });
    const stoppingPoints2 = await StoppingPoint.findAll({
      where: { StationID: station2ID },
    });

    const trainIDs1 = stoppingPoints1.map((sp) => sp.TrainID);
    const trainIDs2 = stoppingPoints2.map((sp) => sp.TrainID);

    const commonTrainIDs = trainIDs1.filter((trainID) =>
      trainIDs2.includes(trainID)
    );

    if (commonTrainIDs.length === 0) {
      return res
        .status(404)
        .json({ message: "No trains found between the specified stations" });
    }

    // Retrieve the train details from the Train table using the TrainID, including stopping points
    const trains = await Train.findAll({
      where: { TrainID: commonTrainIDs },
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    return res.status(200).json(trains);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

// Add searchTrainsByLocation to module exports
module.exports = {
  createTrain, //
  getAllTrains, //
  getTrainById, //
  deleteTrain, //
  editTrain, //

  getTrainsBetweenStations,
};
