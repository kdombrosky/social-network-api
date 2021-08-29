const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: 'e-mail is required',
            unique: true,
            // match a valid e-mail
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectID,
                ref: 'Thought'
            }
        ],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual to retrieve and return the length of the user's 'friends' array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// create User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;