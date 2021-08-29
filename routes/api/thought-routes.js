const router = require('express').Router();
// destructure methods from thought controller object 
const {
    getAllThought,
    createThought,
    getThoughtById,
    // updateThought,
    removeThought,
    createReaction,
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
    // .put(updateThought)
    .delete(removeThought)


// POST, DELETE routes for /api/thoughts/:thoughtId/reactions
// to create or remove a reaction on a thought
router  
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);

module.exports = router;