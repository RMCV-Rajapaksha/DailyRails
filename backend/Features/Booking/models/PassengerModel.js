const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Passenger = sequelize.define(
    "Passenger",
    {
        PassengerNIC: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: "PASSENGER",
      timestamps: true,
      indexes: [
        {
          fields: ["PassengerNIC"],
        },
        {
          fields: ["Email"],
        },
      ],
    }
  );

  Passenger.associate = (models) => {

    if (!models.Booking) {
      console.error("Required models are not loaded properly");
      return;
    }

    Passenger.hasMany(models.Booking, {
      foreignKey: "PassengerNIC",
      as: "bookings",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    
  };

  return Passenger;
};

