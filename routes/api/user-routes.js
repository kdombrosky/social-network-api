const router = require('express').Router();
// destructure methods from user controller object 



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
    .delete(deleteUser)


module.exports = router;