const router = require('express').Router();
// destructure methods from user controller object 
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// GET and POST routes for /api/users
router  
    .route('/')
    .get(getAllUser)
    .post(createUser);


// GET, PUT, DELETE routes for /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// POST, DELETE routes /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;