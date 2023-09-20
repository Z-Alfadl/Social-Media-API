const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models')
module.exports = {
    async getThoughts(req, res) {
        try {
         const thoughts = await Thought.find() 
         res.json(thoughts)  
        } catch (err) {
        return res.status(500).json(err)
        }
    },
    async createThoughts(req, res) {
        try {
            //creates a new document in the thoughts collection
            const dbThoughts = await Thought.create(req.body)
            //add id of new thought to User.thoughts array
            const userThoughts = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: dbThoughts._id}},
                {new: true}
            )
            res.json(dbThoughts)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID exists'})
            }
            res.json(thought)  
           } catch (err) {
           return res.status(500).json(err)
           }
    },
    //update/deleteThought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body},
                {runValidators: true, new: true}
                )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID exists'})
            }
            res.json(thought)  
           } catch (err) {
           return res.status(500).json(err)
           }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            const userThoughts = await User.findOneAndUpdate(
                {username: thought.username},
                //when a thought document is deleted, remove its id from associated user document
                {$pull: {thoughts: thought._id}},
                {new: true}
            )
            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID exists'})
            }
            res.json(thought)  
           } catch (err) {
           return res.status(500).json(err)
           }
    },
    //add create/deleteReaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: { reactions: req.body}},
                {runValidators: true, new: true}
                )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID exists'})
            }
            res.json(thought)  
           } catch (err) {
           return res.status(500).json(err)
           }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: { reactions: req.body}},
                {runValidators: true, new: true}
                )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID exists'})
            }
            res.json(thought)  
           } catch (err) {
           return res.status(500).json(err)
           }
    }
}