const { User, Thought } = require("../models");

module.exports = {
  // Retrieves all thoughts from the database
  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thought.find();
      res.json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Retrieves a single thought by its id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Creates a new thought
  async createNewThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Updates a thought by its id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Deletes a user by their id
  async deleteThought(req, res) {
    try {
      await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({
        message: "The thought has been successfully deleted!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Adds a reaction to a thought
  async addNewReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json(newReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Deletes a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const deletedReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      res.json(deletedReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
