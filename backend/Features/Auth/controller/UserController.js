const bcrypt = require("bcrypt");
const db = require("../../../models");
const User = db.User;
const jwt = require("jsonwebtoken"); // Add this import

// Add this helper function
const generateNextUserId = async () => {
  try {
    const lastUser = await User.findOne({
      order: [["UserID", "DESC"]],
    });

    if (!lastUser) {
      return "USR0001";
    }

    const lastId = lastUser.UserID;
    const numericPart = parseInt(lastId.replace("USR", ""));
    const nextNumericPart = numericPart + 1;

    return `USR${String(nextNumericPart).padStart(4, "0")}`;
  } catch (error) {
    throw new Error("Failed to generate user ID");
  }
};

// POST a new user
const postUser = async (req, res) => {
  const userData = req.body;
  try {
    const existingUser = await User.findOne({
      where: { Email: userData.Email },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const nextId = await generateNextUserId();
    const hashedPassword = await bcrypt.hash(userData.Password, 10);

    const newUser = await User.create({
      ...userData,
      UserID: nextId,
      Password: hashedPassword,
    });

    // Remove password from response
    const userResponse = newUser.toJSON();
    delete userResponse.Password;

    res.json({
      success: true,
      message: "New User Successfully Created",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create User",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { Email: req.body.Email },
      attributes: ["UserID", "Email", "Name", "Password"], // Explicitly select fields
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtToken = jwt.sign(
      {
        UserID: user.UserID, // Changed from ID
        Email: user.Email,
        Name: user.Name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token: jwtToken,
      user: {
        UserID: user.UserID,
        Email: user.Email,
        Name: user.Name,
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

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "None", secure: true });
    res.status(200).json("User Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  postUser,
  userLogin,
  adminLogout,
};
