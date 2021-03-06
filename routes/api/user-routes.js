const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// GET and POST routes for users: /api/users
router  
    .route('/')
    .get(getAllUser)
    .post(createUser); // Requires JSON: 
    // {
    //     "username": "JohnSmith",
    //     "email": "johnny@gmail.com"
    // }


// GET, PUT, DELETE routes for users by ID: /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser) // Requires JSON: 
    // {
    //     "username": "JohnSmith",
    //     "email": "johns@gmail.com"
    // }
    .delete(deleteUser);


// POST, DELETE routes for adding and removing friends: /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;