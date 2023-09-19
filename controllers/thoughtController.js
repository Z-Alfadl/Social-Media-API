const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models')
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
            const dbThoughts = await Thought.create(req.body)
            res.json(dbThoughts)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

}