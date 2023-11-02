const {Schema, Types} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: {
            //Instead of an _id field, sets name to reactionId, maintains same function
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            //Max length of reaction body
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Formats the date as M/D/2023 when queried
            get: (createdAt) => createdAt.toLocaleDateString('en-US')
        }
    },
    {
      toJSON: {
        getters: true,
      },
      //disables creation of _id field, replaced with reactionId above
      _id: false,
    }
)


module.exports = reactionSchema