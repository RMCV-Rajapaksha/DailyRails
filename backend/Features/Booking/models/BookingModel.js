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
      Class: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    if (
      !models.Payment ||
      !models.Train ||
      !models.Journey ||
      !models.BookingSeats
    ) {
      console.error("Required models are not loaded properly");
      return;
    }

    Booking.hasOne(models.Payment, {
      foreignKey: "BookingID",
      as: "payment",
    });

    Booking.belongsTo(models.Train, {
      foreignKey: "TrainID",
      as: "train",
    });

    Booking.belongsTo(models.Journey, {
      foreignKey: "JourneyID",
      as: "journey",
    });

    Booking.hasMany(models.BookingSeats, {
      foreignKey: "BookingID",
      as: "bookingSeats",
    });
  };

  return Booking;
};
