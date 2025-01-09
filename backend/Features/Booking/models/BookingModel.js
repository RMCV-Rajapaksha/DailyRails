const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      BookingID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      TrainID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TRAINS', // References the TRAINS table
          key: 'ID',
        },
      },
      JourneyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'JOURNEY', // References the JOURNEY table
          key: 'ID',
        },
      },
      NoOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PassengerNIC: {
        type: DataTypes.STRING, // Changed to STRING to accommodate NIC format
        allowNull: false,
      },
      Date: {
        type: DataTypes.DATEONLY, // Changed to DATEONLY for date format
        allowNull: false,
      },
      Time: {
        type: DataTypes.TIME, // Changed to TIME for time format
        allowNull: false,
      },
    },
    {
      tableName: "BOOKING",
      timestamps: true,
    }
  );

  return Booking;
};