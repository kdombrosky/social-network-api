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
    .put(updateThought)
    .delete(deleteThought)


// POST, DELETE routes for /api/thoughts/:thoughtId/reactions
// to add or remove a reaction on a thought
router  
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;