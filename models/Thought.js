const { Schema, model, Types } = require('mongoose');
// import date format 

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add date format getter 
        },
    },
    {
        toJSON: {
            // getters: true
        }
    }
);


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is required',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add date format getter 
        },
        username: {
            type: String,
            required: true
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
);

// Virtual to retrieve and return the length of the thought's 'reactions' array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;