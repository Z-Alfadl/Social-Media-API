const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");
module.exports = {
  async getThoughts(req, res) {
    try {
      //Responds with all documents in thoughts collection
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      //finds thought by _id
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      //if not found, returns a message and 404 error
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      //creates a new document in the thoughts collection
      const dbThoughts = await Thought.create(req.body);
      //add id of new thought to User.thoughts array
      const userThoughts = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: dbThoughts._id } },
        { new: true }
      );
      //if the User that the thought is linked to does not exist, returns an error message
      if (!userThoughts) {
        return res.status(404).json({ message: "No user with this ID exists" });
      }
      res.json(dbThoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      //finds thought by _id and updates content of document.
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      //if not found, returns a message and 404 error
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {//Finds thought by _id and deletes document
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      //Finds User that created thought and updates thoughts array
      const userThoughts = await User.findOneAndUpdate(
        { username: thought.username },
        //when a thought document is deleted, remove its _id from associated user document
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      //If either thought or user are not found, returns 404 error with message
      if (!thought || !userThoughts) {
        return res
          .status(404)
          .json({ message: "No thought or user with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //add create/deleteReaction
  async createReaction(req, res) {
    try {
        //Find thought by _id and add reaction subdocument to reactions array
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
        //if not found, returns a message and 404 error
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
        //Find thought by _id and add reaction subdocument to reactions array
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } },
        { runValidators: true, new: true }
      );
        //if not found, returns a message and 404 error
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
