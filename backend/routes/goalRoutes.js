const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

// Create a goal
router.post("/", (req, res) => {
  res.status(200).json({ message: "Set Goal" });
});

// Update a goal
router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// Delete a goal
router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = router;
