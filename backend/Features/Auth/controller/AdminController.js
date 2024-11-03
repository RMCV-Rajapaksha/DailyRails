const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const Admin = db.Admin;
const { sendEmail } = require("../../../Services/EmailService"); // Import the email service

// POST a new admin
const postAdmin = async (req, res) => {
  const adminData = req.body;
  try {
    const existingAdmin = await Admin.findOne({
      where: { Email: adminData.Email },
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(adminData.Password, 10);
    adminData.Password = hashedPassword;

    const newAdmin = await Admin.create(adminData);

    // Send email notification
    const emailSubject = "New Admin Account Created";
    const emailText = `Hello ${adminData.Name},\n\nYour admin account has been successfully created.\n\nBest regards,\nYour Company your company mail is ${adminData.Email} and password is ${adminData.Password}`;
    await sendEmail(adminData.Email, emailSubject, emailText);

    res.json("New Admin Role is Successfully Created");
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to create admin" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { Email: req.body.Email } });
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

    res.json({ message: "Login successful", token: jwtToken });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "None", secure: true });
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
