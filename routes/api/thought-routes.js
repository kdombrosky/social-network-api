const router = require('express').Router();
// destructure methods from thought controller object 
const {
    getAllThought,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');


// GET and POST routes for /api/thoughts
router  
    .route('/')
    .get(getAllThought)
    .post(createThought);


// GET, PUT, DELETE routes for /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    // updateThought JSON:
    // {
    //     "thoughtText": ""
    //     "username": ""
    // }
    .put(updateThought)
    .delete(deleteThought)


// POST, DELETE routes for /api/thoughts/:thoughtId/reactions
router  
    .route('/:thoughtId/reactions')
    // addReaction JSON:
    // {
    //     "reactionBody": "",
    //     "username": ""
    // }
    .post(addReaction)
    // removeReaction JSON: 
    // {
    //     "reactionId": "612d3bc1a3bd2b9734711878"
    // }
    .delete(removeReaction);

module.exports = router;