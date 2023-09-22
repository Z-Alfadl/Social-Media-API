const {Schema, model} = require('mongoose')
const Reaction = require('./Reaction')


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //Thought must be between 1-280 characters in length
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Formats the date as M/D/2023 when queried
            get: (createdAt) => createdAt.toLocaleDateString('en-US')
            
        },
        username: {
            type: String,
            required: true,
        },
        //Array of full reaction subdocuments
        reactions: [Reaction]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false
    }
)
//Creates a field computing the total number of reactions on query
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought