const router = require('express').Router()
//import controllers here
const {
    getThoughts,
    createThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(createThoughts);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);



module.exports = router
