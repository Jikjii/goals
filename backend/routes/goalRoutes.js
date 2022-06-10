const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

// router.get("/", getGoals);

// Create a goal
// router.post("/", setGoal);

// Update a goal
// router.put("/:id", updateGoal);

// Delete a goal
// router.delete("/:id", deleteGoal);

module.exports = router;
