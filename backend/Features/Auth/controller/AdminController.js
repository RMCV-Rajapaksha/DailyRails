const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const Admin = db.Admin;
const { sendEmail } = require("../../../Services/EmailService"); // Import the email service

// Add this helper function after the imports
const generateNextEmployeeId = async () => {
  try {
    // Get the last admin ordered by EmployeeID
    const lastAdmin = await Admin.findOne({
      order: [["EmployeeID", "DESC"]],
    });

    if (!lastAdmin) {
      // If no admins exist, start with EMP0001
      return "EMP0001";
    }

    // Extract the numeric part and increment
    const lastId = lastAdmin.EmployeeID;
    const numericPart = parseInt(lastId.replace("EMP", ""));
    const nextNumericPart = numericPart + 1;

    // Format the new ID with leading zeros
    return `EMP${String(nextNumericPart).padStart(4, "0")}`;
  } catch (error) {
    throw new Error("Failed to generate employee ID");
  }
};

// Modified postAdmin function
const postAdmin = async (req, res) => {
  const adminData = req.body;
  try {
    // Check for existing email
    const existingAdmin = await Admin.findOne({
      where: { Email: adminData.Email },
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    // Generate the next employee ID
    const nextId = await generateNextEmployeeId();

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.Password, 10);

    // Create new admin with generated ID
    const newAdmin = await Admin.create({
      ...adminData,
      EmployeeID: nextId,
      Password: hashedPassword,
    });

    // Send email notification
    await sendEmail(adminData);

    // Remove password from response
    const adminResponse = newAdmin.toJSON();
    delete adminResponse.Password;

    res.json({
      success: true,
      message: "New Admin Role is Successfully Created",
      data: adminResponse,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create admin",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    // Find admin by email
    const admin = await Admin.findOne({
      where: { Email: req.body.Email },
      attributes: ["EmployeeID", "Email", "Name", "JobTitle", "Password"], // Explicitly select fields
    });

    // Check if admin exists
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(
      req.body.Password,
      admin.Password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        EmployeeID: admin.EmployeeID,
        Email: admin.Email,
        Name: admin.Name,
        JobTitle: admin.JobTitle,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    // Send successful response
    res.json({
      success: true,
      message: "Login successful",
      token: jwtToken,
      user: {
        EmployeeID: admin.EmployeeID,
        Email: admin.Email,
        Name: admin.Name,
        JobTitle: admin.JobTitle,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

const adminUpdate = async (req, res) => {
  const adminData = req.body;
  try {
    const admin = await Admin.findOne({
      where: { EmployeeID: req.params.id },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const updatedAdmin = await admin.update(adminData);

    res.json(updatedAdmin);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to update admin" });
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
  adminUpdate,
};
