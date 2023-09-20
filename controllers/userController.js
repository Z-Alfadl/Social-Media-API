const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUsers = await User.create(req.body);
      res.json(dbUsers);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //Add getSingleUser, update/deleteUser
  async getSingleUser(req, res) {
    try {
      //gets document for single user, omitting version key
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      //if no user exists with that id, return an error
      if (!user) {
        res.status(404).json({ message: "No user with that ID exists" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {runValidators: true, new: true}
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
        const user = await User.findOneAndDelete({_id: req.params.userId});
        if (!user) {
            res.status(404).json({ message: "No user with that ID exists" });
          }
    
          res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  //Add add/deleteFriend
  async addFriend(req, res) {
    try {
        const friend = await User.findOneAndUpdate(
            //finds user by userId paramater
            {_id: req.params.userId},
            //add friendId parameter to User.friends array
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        if (!friend) {
            res.status(404).json({ message: "No user with that ID exists" });
        }
  
        res.json(friend);
        
    } catch (err) {
        res.status(500).json(err)
    }
  },
  async removeFriend(req, res) {
    try {
        const friend = await User.findOneAndUpdate(
            //finds user by userId paramater
            {_id: req.params.userId},
            //add friendId parameter to User.friends array
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        if (!friend) {
            res.status(404).json({ message: "No user with that ID exists" });
        }
  
        res.json(friend);
        
    } catch (err) {
        res.status(500).json(err)
    }
  },

};
