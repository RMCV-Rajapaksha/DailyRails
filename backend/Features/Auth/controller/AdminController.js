const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models");
const User = db.Admin;

// POST a new user
const postUser = async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({ where: { Email: user.Email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    const newUser = await User.create(user);
    res.json(newUser);
  } catch (error) {
    console.error("Error details:", error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  postUser,
};
