const { ObjectId } = require('mongoose').Types;
const { User } = require('../models')
module.exports = {
    async getUsers(req, res) {
        try {
         const users = await User.find() 
         res.json(users)  
        } catch (err) {
        return res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const dbUsers = await User.create(req.body)
            res.json(dbUsers)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}