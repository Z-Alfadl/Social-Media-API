const router = require('express').Router()
//import controllers here
const { getUsers,
        createUser,
        getSingleUser,
        updateUser,
        deleteUser,
        addFriend,
        removeFriend
} = require('../../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(removeFriend)

module.exports = router
