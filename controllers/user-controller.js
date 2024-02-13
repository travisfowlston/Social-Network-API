const { User, Thought } = require("../models");

module.exports = {
  // Retrieves all users from the database
  async getAllUsers(req, res) {
    try {
      const allUsers = await User.find().select("-__v");
      res.json(allUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Retrieves a single user by their id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Creates a new user
  async createNewUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Updates a user by their id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Deletes a user by their id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json({
        message: "The user and their thoughts have been successfully deleted!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Adds a new friend to a user's friend list
  async addNewFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Deletes a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const deletedFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(deletedFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
