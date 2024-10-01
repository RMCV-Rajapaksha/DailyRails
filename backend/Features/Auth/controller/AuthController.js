const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models");
const User = db.User;

// POST a new user
const postUser = async (req, res) => {
  console.log(req.body); // Log the incoming request body
  const user = req.body;

  try {
    const newUser = await User.create(user); // Use the User model instead of Announcement
    res.json(newUser);
  } catch (error) {
    console.error("Error details:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  postUser,
};
