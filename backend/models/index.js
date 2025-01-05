"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.json"))[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Model definitions
const models = [
  {
    name: "Item",
    path: "../Features/Items/models/ItemsModels",
  },
  {
    name: "Announcement",
    path: "../Features/Announcement/models/AnnouncementModel",
  },
  {
    name: "Report",
    path: "../Features/Reports/models/ReportModels",
  },
  {
    name: "Admin",
    path: "../Features/Auth/models/AdminModel",
  },
  {
    name: "User",
    path: "../Features/Auth/models/UserModel",
  },
  {
    name: "Train",
    path: "../Features/Schedule/models/TrainModel",
  },
  {
    name: "Payment",
    path: "../Features/Booking/models/PaymentModel",
  },
  {
    name: "StoppingPoint",
    path: "../Features/Schedule/models/StoppingPointModel",
  }
];

// Load models from current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.endsWith(".test.js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    console.log(`Loaded model from directory: ${model.name}`);
  });

// Load models from features
models.forEach(({ name, path: modelPath }) => {
  try {
    const model = require(path.join(__dirname, modelPath))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  } catch (error) {
    console.error(`Error loading model ${name}:`, error);
  }
});

// Initialize associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
      console.log(`Associated model: ${modelName}`);
    } catch (error) {
      console.error(`Error associating model ${modelName}:`, error);
    }
  }
});

// Add sequelize instance and class to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
