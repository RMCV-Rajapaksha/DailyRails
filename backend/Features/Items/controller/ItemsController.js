const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models"); // Adjust the path according to your project structure
const Item = db.Item; // Ensure this path is correct

// Utility function for fetching items with pagination and filtering
async function fetchItems(req, res, statusFilter, itemTypeFilter) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const whereClause = { Status: statusFilter };
    if (itemTypeFilter) {
      whereClause.ItemType = itemTypeFilter;
    }

    const { count, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [["createdAt", "DESC"]], // Add sorting
    });

    return res.status(200).json({
      success: true,
      data: {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items: items,
      },
    });
  } catch (error) {
    console.error("Fetch items error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: error.message,
    });
  }
}

const generateNextItemId = async () => {
  try {
    const lastItem = await Item.findOne({
      order: [["ItemID", "DESC"]],
    });

    if (!lastItem) {
      return "ITM0001";
    }

    const lastId = lastItem.ItemID;
    const numericPart = parseInt(lastId.replace("ITM", ""));
    const nextNumericPart = numericPart + 1;

    return `ITM${String(nextNumericPart).padStart(4, "0")}`;
  } catch (error) {
    throw new Error("Failed to generate item ID");
  }
};

// GET all approved items
const getItemApproved = async (req, res) => {
  try {
    await fetchItems(req, res, "Approved");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved items",
      error: error.message,
    });
  }
};

// GET all not approved items
const getItemNotApproved = async (req, res) => {
  try {
    await fetchItems(req, res, "Not Approved");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch not approved items",
      error: error.message,
    });
  }
};

// GET all lost items
const getLostItems = async (req, res) => {
  try {
    await fetchItems(req, res, "Approved", "Lost");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch lost items",
      error: error.message,
    });
  }
};

// GET all found items
const getFoundItems = async (req, res) => {
  try {
    await fetchItems(req, res, "Approved", "Found");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch found items",
      error: error.message,
    });
  }
};

// POST a new item
const postItem = async (req, res) => {
  try {
    const nextId = await generateNextItemId();
    const newItem = await Item.create({
      ...req.body,
      ItemID: nextId,
      Status: "Not Approved", // Set default status
    });
    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create item",
      error: error.message,
    });
  }
};

// DELETE an item by ID
const deleteItem = async (req, res) => {
  try {
    const rowsDeleted = await Item.destroy({
      where: { ItemID: req.params.id },
    });

    if (rowsDeleted > 0) {
      return res.json({
        success: true,
        message: "Item deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: error.message,
    });
  }
};

// PATCH to update item status
const patchItem = async (req, res) => {
  try {
    // Find the item first to check if it exists
    const item = await Item.findOne({
      where: { ItemID: req.params.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check if item is already approved
    if (item.Status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Item is already approved",
        data: item,
      });
    }

    // Update the item status
    const [rowsUpdated] = await Item.update(
      { Status: req.body.Status || "Approved" },
      {
        where: { ItemID: req.params.id },
      }
    );

    if (rowsUpdated > 0) {
      const updatedItem = await Item.findByPk(req.params.id);
      return res.json({
        success: true,
        message: "Item status updated successfully",
        data: updatedItem,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update item status",
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update item status",
      error: error.message,
    });
  }
};

module.exports = {
  getItemApproved,
  getItemNotApproved,
  getLostItems,
  getFoundItems,
  postItem,
  deleteItem,
  patchItem,
};
