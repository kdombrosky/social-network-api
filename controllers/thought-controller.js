const { Thought, User } = require('../models');


const thoughtController = {
    // GET all thoughts /api/thoughts
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        // Mongoose sort method in DESC order by id
        // need to sort by created at 
        .sort({ __id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    // POST new thought  /api/thoughts
    // Expects:
    // {
    //     "thoughtText": ""
    //     "username": ""
    // }
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { username: body.username },
                // push Thought's id to user's thoughts array
                { $push: { thoughts: dbThoughtData._id } },
                // to receive back the updated User with new comment
                { new: true, runValidators: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this username!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    // GET thought by id /api/thoughts/:thoughtId
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    // PUT Thought by id /api/thoughts/:thoughtId
    // Expects:
    // {
    //     "thoughtText": ""
    //     "username": ""
    // }
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    // DELETE thought by id  /api/thoughts/:thoughtId
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { username: deletedThought.username },
                // Mongo $pull method to remove thought from associated array
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this username!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    // POST new reaction /api/thoughts/:thoughtId/reactions
    // Expects:
    // {
    //     "reactionBody": "",
    //     "username": ""
    // }
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // Mongo $push method to push reaction into reactions array property of thought
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },


    // DELETE reaction /api/thoughts/:thoughtId/reactions
    // Expects:
    // {
    //     "reactionId": "612d3bc1a3bd2b9734711878"
    // }
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // MongoDB $pull operator to remove specific reaction from reactions array
            { $pull: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;