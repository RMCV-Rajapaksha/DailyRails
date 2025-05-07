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
      PassengerNIC: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "PASSENGER", // References the JOURNEY table
          key: "PassengerNIC",
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
        }
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Booking.belongsTo(models.Train, {
      foreignKey: "TrainID",
      as: "train",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Booking.belongsTo(models.Journey, {
      foreignKey: "JourneyID",
      as: "journey",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
     
    });

    Booking.belongsTo(models.Passenger, {
      foreignKey: "PassengerNIC",
      as: "passenger",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Booking.hasMany(models.BookingSeats, {
      foreignKey: "BookingID",
      as: "bookingSeats",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Booking;
};
