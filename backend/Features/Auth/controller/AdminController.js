const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../../../models");
const User = db.Admin;

// POST a new user
const postAdmin = async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await User.findOne({ where: { Email: user.Email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;

    const newUser = await User.create(user);
    res.json("New Admin Role is Successfully Created");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { Email: req.body.Email } });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.Password,
      admin.Password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const jwtToken = jwt.sign(
      {
        ID: admin.ID,
        Email: admin.Email,
        Name: admin.Name,
        JobTitle: admin.JobTitle,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const adminLogout = async (res, req) => {
  try {
    res.clearCookie("token", { sameSite: "None", secure: true }); // Closing parenthesis moved to correct position
    res.status(200).json("User Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  postAdmin,
  adminLogin,
  adminLogout,
};
