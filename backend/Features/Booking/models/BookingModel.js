const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      BookingID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      TrainID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "TRAINS", // References the TRAINS table
          key: "TrainID",
        },
      },
      JourneyID: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "JOURNEY", // References the JOURNEY table
          key: "JourneyID",
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
      indexes: [
        {
          fields: ["TrainID"],
        },
        {
          fields: ["JourneyID"],
        },
        {
          fields: ["PassengerNIC"],
        },
      ],
    }
  );

  Booking.associate = (models) => {
    Booking.hasOne(models.Payment);
    Booking.belongsTo(models.Train);
    Booking.belongsTo(models.Journey);
    Booking.hasMany(models.BookingSeats);
  };

  return Booking;
};
