const router = require('express').Router();

const { validateUserAvatar, validateUserUpdate, validateId } = require('../middlewares/requestValidation');

const {
  getUsers, getProfile, updateUser, updateAvatar, getMyProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);

router.get('/users/:userId', validateId, getProfile);

router.patch('/users/me', validateUserUpdate, updateUser);

router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
