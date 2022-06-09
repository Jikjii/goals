const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").delete(deleteGoal).put(updateGoal);

// router.get("/", getGoals);

// Create a goal
// router.post("/", setGoal);

// Update a goal
// router.put("/:id", updateGoal);

// Delete a goal
// router.delete("/:id", deleteGoal);

module.exports = router;
