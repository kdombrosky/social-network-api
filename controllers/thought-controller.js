// const {
//     getAllThought, (DONE)
//     getThoughtById, (DONE)
//     createThought, (DONE)
//     updateThought,
//     removeThought, (DONE)
//     createReaction,
//     removeReaction
// } 

const { Thought } = require('../models');


const thoughtController = {
    // GET all Thoughts
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


    // GET thought by id
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


    // CREATE new thought 
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { _id: params.userId },
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


    // UPDATE thought by id
    // updateThought()



    // DELETE thought by id 
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            // return User Promise so we can do something with the results
            return User.findOneAndUpdate(
                { _id: params.userId },
                // Mongo $pull method to remove thought from associated array
                { $pull: { thoughts: params.thoughtId } },
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


    // CREATE new reaction
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


    // DELETE reaction
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