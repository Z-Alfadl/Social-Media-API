const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            //trim removes any whitespace before/after string
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //if submitted email does not match regex, return message string
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Not a valid email address']
        },
        //stores array of _id of thoughts linked to the user
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        //stores array of _id of users adding user as friend
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        //includes virtuals when query response returns document as JSON, default is false
    toJSON: {
        virtuals: true,
    },
    id: false,
}
)
//on get query, calculates length of friends array and adds friendCount property
userSchema.virtual('friendCount')
.get(function() {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;
