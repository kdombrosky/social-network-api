// const {
//     getAllThought, (DONE)
//     getThoughtById, (DONE)
//     createThought, (DONE)
//     updateThought,
//     removeThought, (DONE)
//     createReaction, (DONE)
//     removeReaction (DONE)
// } 

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


    // CREATE new thought  /api/thoughts
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ username }) => {
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { username: params.username },
                // push Thought's id to user's thoughts array
                { $push: { thoughts: _id } },
                // to receive back the updated User with new comment
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    // GET thought by id /api/thoughts/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    // UPDATE thought by id /api/thoughts/:id
    // updateThought()



    // DELETE thought by id  /api/thoughts/:thoughtId
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { username: params.username },
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


    // CREATE new reaction /api/thoughts/:thoughtId/reactions
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // Mongo $push method to push reaction into reactions array property of thought
            { $push: { reactions: body } },
            { new: true }
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
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // MongoDB $pull operator to remove specific reaction from reactions array
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;