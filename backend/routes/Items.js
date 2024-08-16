const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET all items with pagination and filtering
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const itemTypeFilter = req.query.itemType;

  const whereClause = itemTypeFilter ? { itemType: itemTypeFilter } : {};

  try {
    const { count, rows: items } = await Item.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      items,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// POST a new item
router.post("/", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an item by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Item.destroy({
      where: { id: id },
    });
    if (rowsDeleted > 0) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
