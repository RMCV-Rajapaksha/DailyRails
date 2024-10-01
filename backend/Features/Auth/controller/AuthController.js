const db = require("../../../models");
const User = db.User;

// POST a new user
const postUser = async (req, res) => {
  console.log("dhdhhdhk");
  console.log(req.body); // Log the incoming request body
  const user = req.body;

  try {
    const newUser = await User.create(user); // Use the User model instead of Announcement
    res.json(newUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Other controller functions (delete, update) for Announcement would go here

module.exports = {
  postUser,
  // other exports for deleteAnnouncement, putAnnouncement...
};
