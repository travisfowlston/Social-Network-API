const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThought,
  deleteThought,
  addNewReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// Route to retrieve all thoughts and create a new thought
router.route("/").get(getAllThoughts).post(createNewThought);

// Route to retrieve a single thought, update a thought, and delete a thought by its id
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route to add a new reaction to a thought
router.route("/:thoughtId/reactions").post(addNewReaction);

// Route to delete a reaction from a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
