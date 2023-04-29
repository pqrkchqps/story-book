// server/controllers/storyController.js

const User = require("../models/User");
const Story = require("../models/Story");

exports.createStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id;

    const newStory = new Story({ title, content, author });
    await newStory.save();

    await User.findByIdAndUpdate(author, { $push: { stories: newStory._id } });

    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "username");
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    if (story.author.toString() !== req.user._id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    story.title = title;
    story.content = content;

    await story.save();

    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    if (story.author.toString() !== req.user._id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await story.remove();
    res.status(200).json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
