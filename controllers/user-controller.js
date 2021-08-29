// const {
//     getAllUser, (DONE)
//     getUserById, (DONE)
//     createUser, (DONE)
//     updateUser, (DONE)
//     deleteUser, (DONE)
//     addFriend,
//     deleteFriend
// } 

const { User } = require('../models');

const userController = {
    // GET all users /api/users
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        // Mongoose sort method in DESC order by id
        // .sort({ __id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    

    // CREATE new user  /api/users
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },


    // GET user by id  /api/users/:id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    // UPDATE user by id  /api/users/:id
    // update thoughts as well? 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },


    // DELETE user by id  /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }


    // ADD friend to user by id  /api/users/:userId/friends/:friendId



    // DELETE friend from user by id  /api/users/:userId/friends/:friendId
}

module.exports = userController;