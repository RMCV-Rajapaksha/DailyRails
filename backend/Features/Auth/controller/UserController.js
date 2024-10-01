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

module.exports = {
  postUser,
};
