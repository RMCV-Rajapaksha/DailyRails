const db = require("../models");
const Admin = db.Admin;

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { ID: decoded.ID } });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error("Error details:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const isMainAdmin = async (req, es, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { ID: decoded.ID } });

    if (user.JobTitle === "MainAdmin") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized main admin role" });
    }
  } catch (error) {
    console.error("Error details:", error);
    return res.status(401).json({ error: "Unauthorized admin role" });
  }
};

const isStationAdmin = async (res, req, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { ID: decoded.ID } });

    if (user.JobTitle === "StationAdmin") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized station admin role" });
    }
  } catch (error) {
    console.error("Error details:", error);
    return res.status(401).json({ error: "Unauthorized admin role" });
  }
};

const isCounter = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { ID: decoded.ID } });

    if (user.JobTitle === "Counter") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized counter role" });
    }
  } catch (error) {
    console.error("Error details:", error);
    return res.status(401).json({ error: "Unauthorized counter role" });
  }
};

const isTrainDriver = async (res, req, next) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findOne({ where: { ID: decoded.ID } });

    if (user.JobTitle === "TrainDriver") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized train driver role" });
    }
  } catch (error) {
    console.error("Error details:", error);
    return res.status(401).json({ error: "Unauthorized counter role" });
  }
};

module.exports = {
  isAuthenticated,
  isMainAdmin,
  isCounter,
  isTrainDriver,
};
