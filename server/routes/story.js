// server/routes/story.js

const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, storyController.createStory);
router.get("/all", verifyToken, storyController.getAllStories);
router.get("/:id", verifyToken, storyController.getStory);
router.put("/:id", verifyToken, storyController.updateStory);
router.delete("/:id", verifyToken, storyController.deleteStory);

module.exports = router;
