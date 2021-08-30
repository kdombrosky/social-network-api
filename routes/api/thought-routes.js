const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


// GET and POST routes for /api/thoughts
router  
    .route('/')
    .get(getAllThought)
    .post(createThought); // Requires JSON: 
    // {
    //     "thoughtText": "A brand new thought!"
    //     "username": "JohnSmith"
    // }


// GET, PUT, DELETE routes for /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought) // Requires JSON: 
    // {
    //     "thoughtText": "Fill out updated thought text here!"
    //     "username": "JohnSmith"
    // }
    .delete(deleteThought)


// POST, DELETE routes for /api/thoughts/:thoughtId/reactions
router  
    .route('/:thoughtId/reactions')
    .post(addReaction) // Requires JSON: 
    // {
    //     "reactionBody": "WOW",
    //     "username": "JohnSmith"
    // }
    .delete(deleteReaction); // Requires JSON: 
    // {
    //     "reactionId": "612d3bc1a3bd2b9734711878"
    // }

module.exports = router;