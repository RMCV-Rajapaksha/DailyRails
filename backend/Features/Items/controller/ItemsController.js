const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models"); // Adjust the path according to your project structure
const Item = db.Item; // Ensure this path is correct

// Utility function for fetching items with pagination and filtering
async function fetchItems(req, res, statusFilter, itemTypeFilter) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const whereClause = { Status: statusFilter };

  if (itemTypeFilter) {
    whereClause.ItemType = itemTypeFilter;
  }

  try {
    const { count, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      total: count,
      totalPages,
      currentPage: page,
      items,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET all approved items with pagination and filtering
const getItemApproved = async (req, res) => {
  return fetchItems(req, res, "Approved");
};

// GET all not approved items with pagination and filtering
const getItemNotApproved = async (req, res) => {
  return fetchItems(req, res, "Not Approved");
};

// GET all lost items with pagination and filtering
const getLostItems = async (req, res) => {
  return fetchItems(req, res, "Approved", "Lost");
};

// GET all found items with pagination and filtering
const getFoundItems = async (req, res) => {
  return fetchItems(req, res, "Approved", "Found");
};

// POST a new item
const postItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE an item by ID
const deleteItem = async (req, res) => {
  try {
    const rowsDeleted = await Item.destroy({
      where: { id: req.params.id },
    });

    if (rowsDeleted > 0) {
      return res.json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete item" });
  }
};

// PATCH to update item status
const patchItem = async (req, res) => {
  try {
    const [updated] = await Item.update(
      { Status: "Approved" },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      return res.json(updatedItem);
    } else {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update item status" });
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
