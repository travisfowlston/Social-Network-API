const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// Route to retrieve all users and create a new user
router.route("/").get(getAllUsers).post(createNewUser);

// Route to retrieve a single user, update a user, and delete a user by their id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Route to add a new friend and delete a friend from a user's friend list
router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;
