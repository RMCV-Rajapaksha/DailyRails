const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// Utility function for fetching items with pagination and filtering
async function fetchItems(req, res, statusFilter) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const itemTypeFilter = req.query.itemType;

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

    return res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      items,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch items" });
  }
}

// GET all approved items with pagination and filtering
router.get("/", (req, res) => {
  return fetchItems(req, res, "Approved");
});

// GET all not approved items with pagination and filtering
router.get("/notapprove", (req, res) => {
  return fetchItems(req, res, "Not Approved");
});

// POST a new item
router.post("/", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE an item by ID
router.delete("/:id", async (req, res) => {
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
});

// PATCH to update item status
router.patch("/:id/:status", async (req, res) => {
  try {
    const [updated] = await Item.update(
      { Status: req.params.status },
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
});

module.exports = router;
