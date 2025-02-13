const { Sequelize, DataTypes, Op } = require("sequelize");
const db = require("../../../models");
const StoppingPoint = db.StoppingPoint;
const Train = db.Train;
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
        TrainID: train.TrainID, // Changed from train.ID
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

const getStoppingPointsByLocations = async (req, res) => {
  const { Location_1, Location_2 } = req.body;

  try {
    const stoppingPoints = await StoppingPoint.findAll({
      where: {
        StationID: {
          [Op.or]: [Location_1, Location_2],
        },
      },
      include: [
        {
          model: db.Station,
          as: "station",
        },
      ],
    });

    res.status(200).json(stoppingPoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainDetailsByLocations = async (req, res) => {
  const { Location_1, Location_2 } = req.body;

  try {
    // Check if there are trains with StartStations and EndStations matching Location_1 and Location_2
    const directTrains = await Train.findAll({
      where: {
        StartStations: Location_1,
        EndStations: Location_2,
      },
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    if (directTrains.length > 0) {
      return res.status(200).json({
        success: true,
        data: directTrains,
      });
    }

    // Find stopping points for the given locations
    const stoppingPoints = await StoppingPoint.findAll({
      where: {
        StationID: {
          // Changed from StationName
          [Op.or]: [Location_1, Location_2],
        },
      },
      include: [
        {
          model: db.Station,
          as: "station",
        },
      ],
    });

    // Group stopping points by TrainID
    const groupedByTrainID = stoppingPoints.reduce((acc, point) => {
      if (!acc[point.TrainID]) {
        acc[point.TrainID] = [];
      }
      acc[point.TrainID].push(point);
      return acc;
    }, {});

    // Filter groups to find those with both locations
    const matchingTrainIDs = Object.keys(groupedByTrainID).filter((trainID) => {
      const points = groupedByTrainID[trainID];
      const hasLocation1 = points.some(
        (point) => point.StationName === Location_1
      );
      const hasLocation2 = points.some(
        (point) => point.StationName === Location_2
      );
      return hasLocation1 && hasLocation2;
    });

    if (matchingTrainIDs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trains found with the given locations",
      });
    }

    // Fetch train details and stopping points for the matching TrainID
    const trains = await Train.findAll({
      where: {
        ID: {
          [Op.in]: matchingTrainIDs,
        },
      },
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
      message: "Error fetching train details",
      error: error.message,
    });
  }
};
// Add searchTrainsByLocation to module exports
module.exports = {
  createTrain,
  getAllTrains,
  getTrainById,
  deleteTrain,
  editTrain,
  getStoppingPointsByLocations, // Add this line
  getTrainDetailsByLocations,
};
