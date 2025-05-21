const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const newBooking = sequelize.define("newBooking", {
      trainId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      journeyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seatNumbers: {
        type: DataTypes.STRING, // Changed from ARRAY to STRING
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('seatNumbers');
          return rawValue ? rawValue.split(',') : [];
        },
        set(val) {
          this.setDataValue('seatNumbers', 
            Array.isArray(val) ? val.join(',') : val);
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      passengerNic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startStationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endStationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return newBooking;
  };