// controllers/TrainController.js

const db = require("../../../models");
const { Train, StoppingPoint } = db;
// TrainController.js - Updated createTrain function
const createTrain = async (req, res) => {

  const t = await db.sequelize.transaction();
   console.log("req.body", req.body);

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
   console.log(1);

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
   console.log(2);
    if (stoppingPoints && stoppingPoints.length > 0) {
      const stoppingPointsWithTrainId = stoppingPoints.map((point) => ({
        ...point,
        TrainID: train.ID,
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithTrainId, {
        transaction: t,
      });
    }
    console.log(3);
    await t.commit();

    const trainWithStops = await Train.findByPk(train.ID, {
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    console.log(4);
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

const editTrain = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { id } = req.params; // Assuming the train ID is passed as a URL parameter
    console.log("Edit Train Request ID:", id);

    // Extract data from request body
    const {
      Name,
      TrainID,
      StartStations,
      EndStations,
      StartTime,
      EndTime,
      stoppingPoints,
    } = req.body;

    console.log("Request Body:", req.body);

    // Find the existing train
    const train = await Train.findByPk(id, { transaction: t });

    if (!train) {
      console.log("Train not found:", id);
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    console.log("Found Train:", train);

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

    console.log("Train updated successfully");

    // Handle stopping points
    if (stoppingPoints && Array.isArray(stoppingPoints)) {
      // Remove existing stopping points
      await StoppingPoint.destroy({
        where: { TrainID: train.ID },
        transaction: t,
      });
      console.log("Existing stopping points removed");

      // Add new stopping points
      const stoppingPointsWithTrainId = stoppingPoints.map((point) => ({
        ...point,
        TrainID: train.ID,
      }));

      await StoppingPoint.bulkCreate(stoppingPointsWithTrainId, {
        transaction: t,
      });
      console.log("New stopping points added");
    }

    // Commit the transaction
    await t.commit();
    console.log("Transaction committed successfully");

    // Fetch the updated train with stopping points
    const updatedTrain = await Train.findByPk(train.ID, {
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints",
        },
      ],
    });

    console.log("Updated Train with Stopping Points:", updatedTrain);

    // Send success response
    return res.status(200).json({
      success: true,
      data: updatedTrain,
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await t.rollback();
    console.error("Error editing train:", error);

    return res.status(500).json({
      success: false,
      message: "Error editing train schedule",
      error: error.message || error,
    });
  }
};
 
 
// Add this new function in TrainController.js
const searchTrainsByLocation = async (req, res) => {
  try {
    const { StartLocation, EndLocation } = req.body;
    
    const trains = await Train.findAll({
      where: {
        StartStations: StartLocation,
        EndStations: EndLocation
      },
      include: [
        {
          model: StoppingPoint,
          as: "stoppingPoints"
        }
      ]
    });

    if (!trains || trains.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trains found for this route"
      });
    }

    return res.status(200).json({
      success: true,
      data: trains
    });
  } catch (error) {
    return res.status(500).json({
      success: false, 
      message: "Error searching trains",
      error: error.message
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
  searchTrainsByLocation // Add this line
};