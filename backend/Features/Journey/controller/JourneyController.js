const { Sequelize, DataTypes, Op } = require("sequelize");
const db = require("../../../models");
const Journey = db.Journey;

const getJourneyByStations = async (req, res) => {
  try {
    let { StartStation, EndStation } = req.body;

    console.log("Received request to get journey by stations:", StartStation, EndStation);

    if (!StartStation || !EndStation) {
      return res.status(400).json({
        success: false,
        message: "Both StartStation and EndStation are required.",
      });
    }

    // Clean up inputs (handle whitespace/case issues)
    StartStation = StartStation.trim().toUpperCase();
    EndStation = EndStation.trim().toUpperCase();

    const journey = await Journey.findOne({
      where: {
        StartPoint: StartStation,
        EndPoint: EndStation,
      },
    });

    console.log("Journey found:", journey);
    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found for the given stations.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        journeyId: journey.JourneyID,
        price: journey.Price,
      },
    });
  } catch (error) {
    console.error("Error fetching journey:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get all journey records
const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.findAll();

    return res.status(200).json({
      success: true,
      data: journeys,
    });
  } catch (error) {
    console.error("Error fetching all journeys:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add this to your JourneyController.js
const getJourneyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Journey ID is required",
      });
    }
    
    const journey = await Journey.findByPk(id);
    
    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    console.error("Error fetching journey by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add this to your exports
module.exports = {
  getJourneyByStations,
  getAllJourneys,
  getJourneyById
};
