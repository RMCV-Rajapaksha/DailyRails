// features/trains/models/trainModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database"); // Adjust as per your config path

const Train = sequelize.define("Train", {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  route: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'on-time' },
  departureTime: { type: DataTypes.TIME },
  arrivalTime: { type: DataTypes.TIME },
  capacity: { type: DataTypes.INTEGER },
}, { timestamps: true });

module.exports = Train;
