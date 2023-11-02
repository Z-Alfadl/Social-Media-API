const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
module.exports = {
  async getUsers(req, res) {
    try {
      //finds all Users
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      //gets document for single user
      const user = await User.findOne({ _id: req.params.userId });

      //if no user exists with that id, return an error
      if (!user) {
        res.status(404).json({ message: "No user with that ID exists" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      //creates a new user
      const dbUsers = await User.create(req.body);
      res.json(dbUsers);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      //finds user by _id and updates according to req.body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with that ID exists" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      //finds user by _id and deletes
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      //Finds and deletes thoughts associated with user's username
      const thoughts = await Thought.deleteMany({ username: user.username });

      if (!user) {
        res.status(404).json({ message: "No user with that ID exists" });
      }
      res.json(`${user.username} has been deleted`);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const usersfriend = await User.findOneAndUpdate(
        //finds user by userId paramater
        { _id: req.params.userId },
        //add friendId parameter to User.friends array
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!usersfriend) {
        res.status(404).json({ message: "No user with that ID exists" });
      }

      res.json(`Friend succesfully added to ${usersfriend.username}'s friends list`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const usersfriend = await User.findOneAndUpdate(
        //finds user by userId paramater
        { _id: req.params.userId },
        //add friendId parameter to User.friends array
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!usersfriend) {
        res.status(404).json({ message: "No user with that ID exists" });
      }

      res.json(`Friend has been removed from ${usersfriend.username}'s friends list`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
