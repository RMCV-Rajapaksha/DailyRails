const bcrypt = require("bcrypt");
const db = require("../../../models");
const User = db.User;

// POST a new user
const postUser = async (req, res) => {
  const user = req.body;

  try {
    const existingUser = await User.findOne({ where: { Email: user.Email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;

    const newUser = await User.create(user);
    res.json({ message: "New User is Successfully Created" });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: "Failed to create User" });
  }
};
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { Email: req.body.Email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const jwtToken = jwt.sign(
      {
        ID: user.ID,
        Email: user.Email,
        Name: user.Name,
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
  postUser,
  userLogin,
  adminLogout,
};
